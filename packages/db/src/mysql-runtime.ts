import {
  DatabaseRuntimeConfigError,
  readDatabaseRuntimeConfig,
  type DatabaseRuntimeConfig,
  type DatabaseRuntimeEnvironment,
} from "./runtime-config.ts";

export type DatabaseRuntimeErrorCode =
  | "DATABASE_RUNTIME_CLOSED"
  | "DATABASE_ADAPTER_INITIALIZATION_FAILED";

export class DatabaseRuntimeError extends Error {
  readonly code: DatabaseRuntimeErrorCode;

  constructor(code: DatabaseRuntimeErrorCode) {
    super(`Database runtime operation failed (${code}).`);
    this.name = "DatabaseRuntimeError";
    this.code = code;
  }
}

export type DatabasePool = {
  end(): Promise<void> | void;
};

export type DatabaseDriver<TAdapter> = {
  createPool(config: DatabaseRuntimeConfig): DatabasePool;
  createDrizzle(pool: DatabasePool): TAdapter;
};

export type DatabaseDriverLoader<TAdapter> =
  () => Promise<DatabaseDriver<TAdapter>>;

export type MySqlRuntimeOptions<TAdapter> = Readonly<{
  readEnvironment(): DatabaseRuntimeEnvironment;
  loadDriver?: DatabaseDriverLoader<TAdapter>;
}>;

export type MySqlRuntime<TAdapter> = Readonly<{
  initialize(): Promise<TAdapter>;
  close(): Promise<void>;
  isClosed(): boolean;
}>;

async function loadDefaultDatabaseDriver(): Promise<
  DatabaseDriver<unknown>
> {
  const [mysqlModule, drizzleModule] = await Promise.all([
    import("mysql2/promise"),
    import("drizzle-orm/mysql2"),
  ]);

  return {
    createPool(config) {
      return mysqlModule.createPool({
        uri: config.databaseUrl,
        connectTimeout: config.connectTimeoutMs,
        connectionLimit: config.poolLimit,
        queueLimit: config.queueLimit,
        waitForConnections: true,
      });
    },

    createDrizzle(pool) {
      return drizzleModule.drizzle(
        pool as ReturnType<typeof mysqlModule.createPool>,
      );
    },
  };
}

export function createMySqlRuntime<TAdapter = unknown>(
  options: MySqlRuntimeOptions<TAdapter>,
): MySqlRuntime<TAdapter> {
  const loadDriver =
    options.loadDriver ??
    (
      loadDefaultDatabaseDriver as unknown as
        DatabaseDriverLoader<TAdapter>
    );

  let closed = false;
  let pool: DatabasePool | undefined;
  let initialization: Promise<TAdapter> | undefined;

  async function initializeInternal(): Promise<TAdapter> {
    try {
      const config = readDatabaseRuntimeConfig(
        options.readEnvironment(),
      );

      const driver = await loadDriver();
      const createdPool = driver.createPool(config);

      pool = createdPool;

      return driver.createDrizzle(createdPool);
    } catch (error: unknown) {
      if (error instanceof DatabaseRuntimeConfigError) {
        throw error;
      }

      const poolToClose = pool;
      pool = undefined;

      if (poolToClose !== undefined) {
        try {
          await poolToClose.end();
        } catch {
          // Initialization remains failed and no underlying detail is exposed.
        }
      }

      throw new DatabaseRuntimeError(
        "DATABASE_ADAPTER_INITIALIZATION_FAILED",
      );
    }
  }

  return Object.freeze({
    initialize(): Promise<TAdapter> {
      if (closed) {
        return Promise.reject(
          new DatabaseRuntimeError("DATABASE_RUNTIME_CLOSED"),
        );
      }

      initialization ??= initializeInternal();

      return initialization;
    },

    async close(): Promise<void> {
      if (closed) {
        return;
      }

      closed = true;

      if (initialization !== undefined) {
        try {
          await initialization;
        } catch {
          // A failed initialization is already represented by its safe error.
        }
      }

      const poolToClose = pool;
      pool = undefined;

      if (poolToClose !== undefined) {
        try {
          await poolToClose.end();
        } catch {
          // Closing remains idempotent and does not expose driver details.
        }
      }
    },

    isClosed(): boolean {
      return closed;
    },
  });
}
