import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { assertValid, validatorFor } from "./validation.mjs";

export function slugify(value) {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  if (!slug) throw new Error("Could not create a safe filename from the entry name.");
  return slug;
}

export function serializeEntry(entry, note = "") {
  // JSON is a strict subset of YAML, giving us safe, deterministic frontmatter
  // without requiring a parser dependency in this small repository.
  const frontmatter = JSON.stringify(sortRecursively(entry), null, 2);
  const body = note.trim();
  return `---\n${frontmatter}\n---\n${body ? `\n${body}\n` : ""}`;
}

export function parseEntry(contents, filename = "entry") {
  const match = contents.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) throw new Error(`${filename} does not contain valid YAML frontmatter.`);
  try {
    return { data: JSON.parse(match[1]), note: match[2].trim() };
  } catch (error) {
    throw new Error(`${filename} has invalid JSON-compatible YAML frontmatter: ${error.message}`);
  }
}

function sortRecursively(value) {
  if (Array.isArray(value)) return value.map(sortRecursively);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, sortRecursively(value[key])])
    );
  }
  return value;
}

export async function loadEntries(directory = "entries") {
  let filenames;
  try {
    filenames = (await readdir(directory)).filter((name) => name.endsWith(".md")).sort();
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const { validate } = await validatorFor("config/entry.schema.json");
  return Promise.all(
    filenames.map(async (filename) => {
      const parsed = parseEntry(await readFile(path.join(directory, filename), "utf8"), filename);
      assertValid(validate, parsed.data, filename);
      return { ...parsed, filename };
    })
  );
}

export async function writeEntry(entry, note, directory = "entries") {
  await mkdir(directory, { recursive: true });
  const base = slugify(entry.name);
  let filename = `${base}.md`;
  const existing = new Set(await readdir(directory));
  if (existing.has(filename)) filename = `${base}-${entry.source_issue}.md`;
  await writeFile(path.join(directory, filename), serializeEntry(entry, note), "utf8");
  return filename;
}
