# Agent instructions

This repository is a personal knowledge library. Preserve the distinction between reviewed facts and owner judgment.

- Treat `entries/*.md` as the canonical records. Keep one entry per file.
- Keep YAML frontmatter machine-readable and canonical. The `id` must equal the filename stem, `schema_version` is `1`, and topics use lowercase kebab-case.
- Preserve the Markdown body as the owner's personal note. Do not invent, expand, or rewrite personal opinions.
- Prefer official homepages, documentation, source repositories, and package registries for factual metadata.
- Do not edit generated catalog regions in `README.md`. Edit `README.template.md` for narrative changes or an entry file for catalog changes, then run `npm run generate`.
- Before proposing changes, run `npm run check` and `npm test`.

See `docs/entries.md` for field semantics and `docs/architecture.md` for the trust boundary around enrichment.
