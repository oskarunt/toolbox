#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { loadEntries } from "./lib/entries.mjs";
import { renderReadme } from "./lib/readme.mjs";

const template = await readFile("README.template.md", "utf8");
await writeFile("README.md", renderReadme(await loadEntries(), template), "utf8");
console.log("Generated README.md");
