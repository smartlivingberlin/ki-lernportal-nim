/**
 * Operator helper: hash a staging bootstrap password to nim-scrypt-v1.
 * Reads the password from stdin (or argv[2]); prints only the hash.
 * Never logs or stores the plaintext. Do not commit the output.
 */
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { hashPassword } from "../packages/auth/src/password-hashing.ts";

async function readPassword(): Promise<string> {
  const fromArg = process.argv[2];
  if (typeof fromArg === "string" && fromArg.length > 0) {
    return fromArg;
  }

  if (input.isTTY) {
    const rl = createInterface({ input, output });
    try {
      const value = await rl.question(
        "Staging bootstrap password (not stored): ",
      );
      return value;
    } finally {
      rl.close();
    }
  }

  const chunks: Buffer[] = [];
  for await (const chunk of input) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8").replace(/\r?\n$/, "");
}

const password = await readPassword();
if (!password) {
  console.error("ERROR=password required via stdin or argv");
  process.exitCode = 1;
} else {
  const encoded = await hashPassword(password);
  process.stdout.write(`${encoded}\n`);
}
