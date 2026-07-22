#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { loadEntries } from "./lib/entries.mjs";
import { renderReadme } from "./lib/readme.mjs";

const entries = await loadEntries();
const expected = renderReadme(entries);
const actual = await readFile("README.md", "utf8");
if (actual !== expected) {
  throw new Error("README.md is stale. Run `npm run generate` and commit the result.");
}
console.log(`Validated ${entries.length} entries and README.md.`);
