import { readFile } from "node:fs/promises";

export async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

export function stableUnique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}
