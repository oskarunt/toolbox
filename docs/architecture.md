# Architecture

## Capture and review

1. The repository owner opens an issue using the structured form.
2. The workflow verifies that both the issue author and workflow actor are the repository owner.
3. A read-only job sends the submitted URL and the factual enrichment schema to Parallel's Task API.
4. Parallel returns structured metadata plus a research basis containing its evidence.
5. A separate write-enabled job treats that response as untrusted input, validates and normalizes it, creates a Markdown entry, and regenerates the catalog.
6. The workflow opens a pull request. Merging it admits the entry and closes the inbox issue.

The enrichment job has no repository write permission. The publishing job has no Parallel API key. This separation prevents researched page content from directly modifying the repository.

## Data ownership

The owner controls personal fields such as `status`, the optional name override, type override, and the note explaining why something was saved. Parallel may only supply factual fields: official name, neutral summary, suggested type, technical topics, languages, license, and official links.

## Deterministic publishing

Every accepted item is a Markdown file with conventional YAML frontmatter under `entries/`. `scripts/generate-readme.mjs` reads those files, validates them against `config/entry.schema.json`, sorts them, and renders `README.md` without AI involvement.
