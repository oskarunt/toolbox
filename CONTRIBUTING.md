# Contributing

This is a personal toolbox, so new entries are accepted through the repository's **Add to toolbox** issue form. Only issues opened by the repository owner trigger enrichment.

The issue is the inbox. Opening one starts a read-only Parallel research job. A separate job validates its structured output, creates an entry, regenerates `README.md`, and opens a pull request. Nothing enters the catalog until that pull request is reviewed and merged.

## Local checks

Requires Node.js 22 or newer.

```sh
npm run generate
npm run check
npm test
```

Entry files in `entries/` are canonical. `README.md` is generated and must not be edited independently.
