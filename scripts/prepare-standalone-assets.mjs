import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const webRoot = join(repositoryRoot, "apps", "web");
const nextRoot = join(webRoot, ".next");
const standaloneBase = join(nextRoot, "standalone");
const verifyOnly = process.argv.includes("--verify");

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function isDirectory(path) {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

async function findServerFiles(directory, depth = 0) {
  if (depth > 6 || !(await isDirectory(directory))) return [];

  const matches = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);

    if (entry.isFile() && entry.name === "server.js") {
      matches.push(entryPath);
      continue;
    }

    if (entry.isDirectory()) {
      matches.push(...(await findServerFiles(entryPath, depth + 1)));
    }
  }

  return matches;
}

async function detectStandaloneRoot() {
  const preferredServers = [
    join(standaloneBase, "server.js"),
    join(standaloneBase, "apps", "web", "server.js"),
  ];

  for (const serverPath of preferredServers) {
    if (await isFile(serverPath)) return dirname(serverPath);
  }

  const discoveredServers = await findServerFiles(standaloneBase);
  if (discoveredServers.length === 1) return dirname(discoveredServers[0]);

  if (discoveredServers.length > 1) {
    throw new Error(
      `Multiple standalone server.js files found; refusing to guess:\n${discoveredServers.join("\n")}`,
    );
  }

  throw new Error(`Standalone server.js not found below ${standaloneBase}`);
}

async function buildManifest(directory, base = directory) {
  const entries = [];

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      entries.push(...(await buildManifest(entryPath, base)));
      continue;
    }

    if (entry.isFile()) {
      const fileStat = await stat(entryPath);
      entries.push(`${relative(base, entryPath)}:${fileStat.size}`);
    }
  }

  return entries.sort();
}

async function assertDirectoryMatches(source, destination, label) {
  if (!(await isDirectory(source))) {
    throw new Error(`${label} source directory not found: ${source}`);
  }

  if (!(await isDirectory(destination))) {
    throw new Error(`${label} destination directory not found: ${destination}`);
  }

  const sourceManifest = await buildManifest(source);
  const destinationManifest = await buildManifest(destination);

  if (sourceManifest.length === 0) {
    throw new Error(`${label} source directory is empty: ${source}`);
  }

  if (JSON.stringify(sourceManifest) !== JSON.stringify(destinationManifest)) {
    throw new Error(`${label} destination does not match its source directory.`);
  }

  console.log(`${label.toUpperCase().replaceAll(" ", "_")}_VERIFIED=YES`);
}

async function copyDirectory(source, destination, label) {
  if (!(await isDirectory(source))) {
    throw new Error(`${label} source directory not found: ${source}`);
  }

  await rm(destination, { recursive: true, force: true });
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true });
  console.log(`${label.toUpperCase().replaceAll(" ", "_")}_COPIED=YES`);
}

async function main() {
  const standaloneRoot = await detectStandaloneRoot();
  const staticSource = join(nextRoot, "static");
  const staticDestination = join(standaloneRoot, ".next", "static");
  const publicSource = join(webRoot, "public");
  const publicDestination = join(standaloneRoot, "public");

  console.log(`STANDALONE_ROOT=${relative(repositoryRoot, standaloneRoot)}`);

  if (!verifyOnly) {
    await copyDirectory(staticSource, staticDestination, "standalone static assets");

    if (await isDirectory(publicSource)) {
      await copyDirectory(publicSource, publicDestination, "standalone public assets");
    } else {
      await rm(publicDestination, { recursive: true, force: true });
      console.log("STANDALONE_PUBLIC_ASSETS_SKIPPED=NO_PUBLIC_DIRECTORY");
    }
  }

  await assertDirectoryMatches(
    staticSource,
    staticDestination,
    "standalone static assets",
  );

  if (await isDirectory(publicSource)) {
    await assertDirectoryMatches(
      publicSource,
      publicDestination,
      "standalone public assets",
    );
  } else {
    console.log("STANDALONE_PUBLIC_ASSETS_VERIFIED=NO_PUBLIC_DIRECTORY");
  }

  console.log("STANDALONE_ASSET_PACKAGE_READY=YES");
}

main().catch((error) => {
  console.error("STANDALONE_ASSET_PACKAGE_READY=NO");
  console.error(error);
  process.exitCode = 1;
});
