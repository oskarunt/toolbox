#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { readJson, stableUnique } from "./lib/files.mjs";
import { assertPublicUrl } from "./lib/issues.mjs";
import { assertValid, normalizeEnrichment, validatorFor } from "./lib/validation.mjs";
import { slugify, writeEntry } from "./lib/entries.mjs";

const [candidatePath = "candidate.json", reviewPath = "review.md"] = process.argv.slice(2);
const artifact = await readJson(candidatePath);
if (artifact.version !== 1) throw new Error(`Unsupported candidate version: ${artifact.version}`);

const { validate: validateEnrichment } = await validatorFor("config/enrichment.schema.json");
assertValid(validateEnrichment, artifact.enrichment, "candidate enrichment");
const enrichment = normalizeEnrichment(artifact.enrichment);
const input = artifact.issue.input;
const ownerName = input.submittedName?.replace(/\s+/g, " ").trim() || null;
if (ownerName && ownerName.length > 100) throw new Error("The submitted name exceeds 100 characters.");

const entry = {
  schema_version: 1,
  id: slugify(ownerName || enrichment.name),
  name: ownerName || enrichment.name,
  summary: enrichment.summary,
  type: input.kind || enrichment.type,
  status: input.status,
  topics: enrichment.topics,
  languages: enrichment.languages,
  license: enrichment.license,
  ...(enrichment.license_note ? { license_note: enrichment.license_note } : {}),
  added: new Date(artifact.issue.created_at).toISOString().slice(0, 10),
  source_issue: artifact.issue.number,
  links: {
    submitted: assertPublicUrl(input.submittedUrl, "submitted link"),
    ...enrichment.links
  }
};

const { validate: validateEntry } = await validatorFor("config/entry.schema.json");
assertValid(validateEntry, entry, "materialized entry");
const filename = await writeEntry(entry, input.note);
const sourceUrls = stableUnique(
  [input.submittedUrl, ...Object.values(enrichment.links)].filter(Boolean).map((url) =>
    assertPublicUrl(url, "official source")
  )
);
const review = [
  `Prepared from #${artifact.issue.number} using bounded Parallel research.`,
  "",
  "Review the factual metadata and personal classification before merging.",
  "",
  "## Official links to review",
  "",
  ...sourceUrls.map((url) => `- <${url}>`),
  "",
  `Parallel run: \`${artifact.parallel_run_id}\``,
  "",
  `Closes #${artifact.issue.number}`,
  ""
].join("\n");
await writeFile(reviewPath, review, "utf8");
console.log(`Wrote entries/${filename}`);
