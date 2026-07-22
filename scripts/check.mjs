#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { loadEntries, serializeEntry } from "./lib/entries.mjs";
import { renderReadme } from "./lib/readme.mjs";

const entries = await loadEntries();
for (const entry of entries) {
  if (entry.contents !== serializeEntry(entry.data, entry.note)) {
    throw new Error(`${entry.filename} is not in canonical YAML format.`);
  }
}
const expected = renderReadme(entries);
const actual = await readFile("README.md", "utf8");
if (actual !== expected) {
  throw new Error("README.md is stale. Run `npm run generate` and commit the result.");
}
console.log(`Validated ${entries.length} entries and README.md.`);
