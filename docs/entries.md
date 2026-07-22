# Entry format

Every saved item is one Markdown file under `entries/`. The filename stem and the frontmatter `id` are the same stable identifier.

The YAML frontmatter is the machine-readable record. It contains the schema version, identity, neutral summary, type, status, topics, languages, licensing information, capture date, source issue, and official links. The Markdown body is deliberately unstructured: it is the owner's personal reason for saving the item and may be empty.

## Statuses

- `watching`: saved for later investigation; not an endorsement.
- `tried`: used or meaningfully evaluated.
- `recommended`: actively recommended based on experience.
- `archived`: retained for history but excluded from the active catalog.

## Types

- `library`: reusable code intended to be consumed by other code.
- `tool`: runnable software used to perform a task.
- `service`: a hosted product or SaaS offering.
- `resource`: material primarily meant to teach, explain, or reference.
- `snippet`: a small, focused piece of reusable code.
- `pattern`: a reusable technical approach or design.

Hybrid projects use the closest practical primary type. Topics use lowercase kebab-case; programming languages use their conventional display names.

## Editing rules

Entry files are canonical and must validate against [`config/entry.schema.json`](../config/entry.schema.json). `README.md` is generated from [`README.template.md`](../README.template.md) and the entries, so narrative changes belong in the template and catalog changes belong in entry files.
