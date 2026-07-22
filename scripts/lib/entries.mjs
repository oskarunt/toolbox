import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
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
  const frontmatter = YAML.stringify(canonicalEntry(entry), { lineWidth: 0 }).trimEnd();
  const body = note.trim();
  return `---\n${frontmatter}\n---\n${body ? `\n${body}\n` : ""}`;
}

export function parseEntry(contents, filename = "entry") {
  const match = contents.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) throw new Error(`${filename} does not contain valid YAML frontmatter.`);
  const document = YAML.parseDocument(match[1], { schema: "core", uniqueKeys: true });
  if (document.errors.length) {
    throw new Error(`${filename} has invalid YAML frontmatter: ${document.errors[0].message}`);
  }
  return { data: document.toJS({ maxAliasCount: 0 }), note: match[2].trim() };
}

function canonicalEntry(entry) {
  return {
    schema_version: entry.schema_version,
    id: entry.id,
    name: entry.name,
    summary: entry.summary,
    type: entry.type,
    status: entry.status,
    topics: entry.topics,
    languages: entry.languages,
    license: entry.license,
    ...(entry.license_note ? { license_note: entry.license_note } : {}),
    added: entry.added,
    source_issue: entry.source_issue,
    links: {
      homepage: entry.links.homepage,
      documentation: entry.links.documentation,
      repository: entry.links.repository,
      package: entry.links.package,
      submitted: entry.links.submitted
    }
  };
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
      const contents = await readFile(path.join(directory, filename), "utf8");
      const parsed = parseEntry(contents, filename);
      assertValid(validate, parsed.data, filename);
      if (parsed.data.id !== path.basename(filename, ".md")) {
        throw new Error(`${filename} must use its filename stem as its stable id.`);
      }
      return { ...parsed, filename, contents };
    })
  );
}

export async function writeEntry(entry, note, directory = "entries") {
  await mkdir(directory, { recursive: true });
  let id = entry.id || slugify(entry.name);
  let filename = `${id}.md`;
  const existing = new Set(await readdir(directory));
  if (existing.has(filename)) {
    id = `${id}-${entry.source_issue}`;
    filename = `${id}.md`;
  }
  await writeFile(path.join(directory, filename), serializeEntry({ ...entry, id }, note), "utf8");
  return filename;
}
