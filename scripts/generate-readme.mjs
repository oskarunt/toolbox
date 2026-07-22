#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { loadEntries } from "./lib/entries.mjs";
import { renderReadme } from "./lib/readme.mjs";

await writeFile("README.md", renderReadme(await loadEntries()), "utf8");
console.log("Generated README.md");
