# Toolbox

A personal, evolving index of libraries, tools, services, and technical ideas I may want to return to.

This is intentionally not an exhaustive “awesome list,” and inclusion is not automatically an endorsement. The goal is to make discovery easy to capture without losing the context or judgment that made something interesting in the first place.

## How to read it

| Status | Meaning |
| --- | --- |
| **Recommended** | I have enough experience with it to actively suggest it. |
| **Tried** | I have used or meaningfully evaluated it, but am not necessarily endorsing it. |
| **Watching** | Saved for later investigation; interesting, but not yet evaluated. |
| **Archived** | Kept for historical context but no longer active in the main catalog. |

Items are classified by what they primarily are: reusable **libraries**, runnable **tools**, hosted **services**, learning **resources**, focused **snippets**, or reusable **patterns**. Hybrid projects are assigned the closest practical type.

## Highlights

The entries where I have direct experience or a stronger opinion appear first. The personal note is mine; factual descriptions and links are reviewed metadata.

<!-- toolbox:highlights:start -->
<!-- toolbox:highlights:end -->

## Full catalog

<!-- toolbox:catalog:start -->
<!-- toolbox:catalog:end -->

## How this repository works

Each item is a standalone Markdown file in [`entries/`](entries/). Validated YAML frontmatter stores predictable facts and classifications for scripts, search, and agent-friendly discovery; the Markdown body preserves my informal reason for saving it.

New finds begin as owner-created GitHub Issues. A bounded AI research step proposes factual metadata and official links, then a pull request keeps the result reviewable before it enters the library. The AI does not invent personal opinions and does not generate this README: [`scripts/generate-readme.mjs`](scripts/generate-readme.mjs) builds it deterministically from this human-authored template and the validated entries.

For the details, see the [entry format](docs/entries.md), [architecture](docs/architecture.md), [contribution flow](CONTRIBUTING.md), and [repository setup](docs/setup.md).

## License

The repository's original code and content are available under the [MIT License](LICENSE). Each listed project remains subject to its own license and terms.
