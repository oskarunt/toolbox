import test from "node:test";
import assert from "node:assert/strict";
import { parseEntry, serializeEntry } from "../scripts/lib/entries.mjs";

test("serializes conventional YAML frontmatter in canonical field order", () => {
  const entry = {
    schema_version: 1,
    id: "example",
    name: "Example",
    summary: "A useful example.",
    type: "tool",
    status: "watching",
    topics: ["testing"],
    languages: ["TypeScript"],
    license: "MIT",
    license_note: "Commercial extensions use a separate license.",
    added: "2026-07-22",
    source_issue: 1,
    links: {
      submitted: "https://example.com/source",
      homepage: "https://example.com",
      documentation: "https://example.com/docs",
      repository: null,
      package: null
    }
  };

  const output = serializeEntry(entry, "Personal note.");
  assert.match(output, /^---\nschema_version: 1\nid: example\nname: Example\n/);
  assert.doesNotMatch(output, /^---\n\{/);
  assert.deepEqual(parseEntry(output).data, entry);
  assert.equal(parseEntry(output).note, "Personal note.");
});

test("rejects duplicate YAML keys", () => {
  assert.throws(
    () => parseEntry("---\nname: First\nname: Second\n---\n", "duplicate.md"),
    /invalid YAML frontmatter/
  );
});
