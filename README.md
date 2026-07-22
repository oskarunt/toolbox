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
### Recommended

- [OpenCode](entries/opencode.md) — An open source AI coding agent available as a terminal-based interface, desktop app, or IDE extension. [homepage](https://opencode.ai/) · [docs](https://opencode.ai/docs) · [source](https://github.com/anomalyco/opencode) · [package](https://www.npmjs.com/package/opencode-ai)
  - **Why I saved it:** Open-source AI coding harness. Supports models across different providers - OpenAI, Anthropic, open weight models, etc... Active development, awesome team. Excited for upcoming v2
- [Vercel AI SDK](entries/vercel-ai-sdk.md) — A unified TypeScript SDK for building AI applications with a consistent API for interacting with various model providers. [homepage](https://ai-sdk.dev/) · [docs](https://ai-sdk.dev/docs) · [source](https://github.com/vercel/ai) · [package](https://www.npmjs.com/package/ai)
  - **Why I saved it:** My go-to SDK for AI apps since 2025. Extensible, well structured, great DX. Fun fact: OpenCode uses this internally :)

### Tried

- [hetzner-k3s](entries/hetzner-k3s.md) — A CLI tool that creates production-ready Kubernetes clusters on Hetzner Cloud. [homepage](https://hetzner-k3s.com/) · [docs](https://vitobotta.github.io/hetzner-k3s/) · [source](https://github.com/vitobotta/hetzner-k3s) · [package](https://github.com/vitobotta/hetzner-k3s/releases)
- [Mastra](entries/mastra.md) — A TypeScript framework for building, testing, and deploying AI agents and workflows. [homepage](https://mastra.ai/) · [docs](https://mastra.ai/docs) · [source](https://github.com/mastra-ai/mastra) · [package](https://www.npmjs.com/package/@mastra/core)
  - **Why I saved it:** Framework for AI agents, applications and workflows. Nice DX, easy to get an agent running quick. Allows defining workflows as well!
- [Pi](entries/pi.md) — A minimal, extensible, terminal-based AI coding agent harness. [homepage](https://pi.dev/) · [docs](https://pi.dev/docs/latest) · [source](https://github.com/earendil-works/pi) · [package](https://www.npmjs.com/package/@earendil-works/pi-coding-agent)
  - **Why I saved it:** Minimal and extensible/customizable agent harness. Very slim system prompt compared to OpenCode for example
- [Pulumi](entries/pulumi.md) — An open-source infrastructure as code platform that enables users to define, deploy, and manage cloud infrastructure using general-purpose programming languages. [homepage](https://www.pulumi.com/) · [docs](https://www.pulumi.com/docs/) · [source](https://github.com/pulumi/pulumi) · [package](https://www.pulumi.com/registry/)
  - **Why I saved it:** Super nice IaC. Used it through [SST](https://sst.dev/) initially.
- [Stagehand](entries/stagehand.md) — An open source AI browser automation framework used to control web browsers with natural language and code. [homepage](https://www.stagehand.dev/) · [docs](https://docs.stagehand.dev/) · [source](https://github.com/browserbase/stagehand) · [package](https://www.npmjs.com/package/@browserbasehq/stagehand)
<!-- toolbox:highlights:end -->

## Full catalog

<!-- toolbox:catalog:start -->
### Libraries

- [BlockNote](entries/blocknote.md) — An open-source, block-based rich text editor library for React applications. _watching_ · [homepage](https://www.blocknotejs.org/) · [docs](https://www.blocknotejs.org/docs) · [source](https://github.com/TypeCellOS/BlockNote) · [package](https://www.npmjs.com/package/@blocknote/core)
- [CrewAI](entries/crewai.md) — An open-source multi-agent orchestration framework and cloud platform for building and managing AI agents. _watching_ · [homepage](https://crewai.com/) · [docs](https://docs.crewai.com/) · [source](https://github.com/crewaiinc/crewai) · [package](https://pypi.org/project/crewai/)
- [DeepEval](entries/deepeval.md) — An open-source LLM evaluation framework for testing and benchmarking large-language model systems. _watching_ · [homepage](https://deepeval.com/) · [docs](https://deepeval.com/docs/introduction) · [source](https://github.com/confident-ai/deepeval) · [package](https://pypi.org/project/deepeval/)
- [LlamaIndex](entries/llamaindex.md) — An open-source data orchestration framework for building large language model applications. _watching_ · [homepage](https://www.llamaindex.ai/) · [docs](https://developers.llamaindex.ai/) · [source](https://github.com/run-llama/llama_index) · [package](https://pypi.org/project/llama-index/)
- [Mastra](entries/mastra.md) — A TypeScript framework for building, testing, and deploying AI agents and workflows. _tried_ · [homepage](https://mastra.ai/) · [docs](https://mastra.ai/docs) · [source](https://github.com/mastra-ai/mastra) · [package](https://www.npmjs.com/package/@mastra/core)
- [Stagehand](entries/stagehand.md) — An open source AI browser automation framework used to control web browsers with natural language and code. _tried_ · [homepage](https://www.stagehand.dev/) · [docs](https://docs.stagehand.dev/) · [source](https://github.com/browserbase/stagehand) · [package](https://www.npmjs.com/package/@browserbasehq/stagehand)
- [TipTap](entries/tiptap.md) — A headless, open-source rich text editor framework for the web. _watching_ · [homepage](https://tiptap.dev/) · [docs](https://tiptap.dev/docs) · [source](https://github.com/ueberdosis/tiptap) · [package](https://www.npmjs.com/package/@tiptap/react)
- [turbovec](entries/turbovec.md) — A Rust-based vector index with Python bindings that implements the TurboQuant algorithm for quantized vector search. _watching_ · [docs](https://github.com/RyanCodrai/turbovec/blob/main/docs/api.md) · [source](https://github.com/RyanCodrai/turbovec) · [package](https://pypi.org/project/turbovec/)
- [Vercel AI SDK](entries/vercel-ai-sdk.md) — A unified TypeScript SDK for building AI applications with a consistent API for interacting with various model providers. _recommended_ · [homepage](https://ai-sdk.dev/) · [docs](https://ai-sdk.dev/docs) · [source](https://github.com/vercel/ai) · [package](https://www.npmjs.com/package/ai)
- [Xberg (formerly Kreuzberg)](entries/xberg-formerly-kreuzberg.md) — A polyglot document intelligence framework with a Rust core that extracts text, metadata, images, and structured information from over 97 document formats. _watching_ · [homepage](https://xberg.dev/) · [docs](https://docs.xberg.io/) · [source](https://github.com/xberg-io/xberg) · [package](https://crates.io/crates/xberg)

### Tools

- [Autumn](entries/autumn.md) — An open-source billing infrastructure that integrates with Stripe to provide a system of record for subscriptions, usage metering, credits, and feature entitlements. _watching_ · [homepage](https://useautumn.com/) · [docs](https://docs.useautumn.com/) · [source](https://github.com/useautumn/autumn) · [package](https://www.npmjs.com/package/@useautumn/js)
- [estonian-mcp](entries/estonian-mcp.md) — An offline Model Context Protocol (MCP) server that provides AI agents with tools for Estonian language processing, including spelling, morphology, and legal terminology, by wrapping EstNLTK, EKI Reeglid, and Riigi Teataja. _watching_ · [source](https://github.com/silly-geese/estonian-mcp) · [package](https://smithery.ai/servers/silly-geese/estonian-mcp)
- [hetzner-k3s](entries/hetzner-k3s.md) — A CLI tool that creates production-ready Kubernetes clusters on Hetzner Cloud. _tried_ · [homepage](https://hetzner-k3s.com/) · [docs](https://vitobotta.github.io/hetzner-k3s/) · [source](https://github.com/vitobotta/hetzner-k3s) · [package](https://github.com/vitobotta/hetzner-k3s/releases)
- [Hey API](entries/hey-api.md) — An ecosystem for turning OpenAPI specifications into production-ready code, including SDKs, validators, and query hooks. _watching_ · [homepage](https://heyapi.dev/) · [docs](https://heyapi.dev/docs) · [source](https://github.com/hey-api/hey-api) · [package](https://npmjs.com/package/@hey-api/openapi-ts)
- [Lightpanda](entries/lightpanda.md) — A fast, lightweight headless browser engine built from scratch in Zig for automation, crawling, and AI agents. _watching_ · [homepage](https://lightpanda.io/) · [docs](https://lightpanda.io/docs) · [source](https://github.com/lightpanda-io/browser) · [package](https://hub.docker.com/r/lightpanda/browser)
- [Medusa](entries/medusa.md) — An open-source, headless commerce platform and framework for building customizable e-commerce solutions. _watching_ · [homepage](https://medusajs.com/) · [docs](https://docs.medusajs.com/) · [source](https://github.com/medusajs/medusa) · [package](https://www.npmjs.com/package/@medusajs/medusa)
- [Meilisearch](entries/meilisearch.md) — An open-source, high-performance search engine that provides an API for indexing and searching content. _watching_ · [homepage](https://www.meilisearch.com/) · [docs](https://www.meilisearch.com/docs) · [source](https://github.com/meilisearch/meilisearch)
- [OpenCode](entries/opencode.md) — An open source AI coding agent available as a terminal-based interface, desktop app, or IDE extension. _recommended_ · [homepage](https://opencode.ai/) · [docs](https://opencode.ai/docs) · [source](https://github.com/anomalyco/opencode) · [package](https://www.npmjs.com/package/opencode-ai)
- [OpenPanel](entries/openpanel.md) — An open-source web and product analytics platform that serves as an alternative to Mixpanel. _watching_ · [homepage](https://openpanel.dev/) · [docs](https://openpanel.dev/docs) · [source](https://github.com/Openpanel-dev/openpanel) · [package](https://npmjs.com/package/@openpanel/sdk)
- [Pi](entries/pi.md) — A minimal, extensible, terminal-based AI coding agent harness. _tried_ · [homepage](https://pi.dev/) · [docs](https://pi.dev/docs/latest) · [source](https://github.com/earendil-works/pi) · [package](https://www.npmjs.com/package/@earendil-works/pi-coding-agent)
- [Pulumi](entries/pulumi.md) — An open-source infrastructure as code platform that enables users to define, deploy, and manage cloud infrastructure using general-purpose programming languages. _tried_ · [homepage](https://www.pulumi.com/) · [docs](https://www.pulumi.com/docs/) · [source](https://github.com/pulumi/pulumi) · [package](https://www.pulumi.com/registry/)
- [Windmill](entries/windmill.md) — An open-source developer platform and workflow engine for building internal apps, APIs, and background jobs. _watching_ · [homepage](https://www.windmill.dev/) · [docs](https://www.windmill.dev/docs) · [source](https://github.com/windmill-labs/windmill) · [package](https://pypi.org/project/wmill)

### Services

- [Confident AI](entries/confident-ai.md) — An AI quality platform for enterprise teams to standardize AI evaluations and observability. _watching_ · [homepage](https://www.confident-ai.com/) · [docs](https://docs.confident-ai.com/) · [source](https://github.com/confident-ai/deepeval) · [package](https://pypi.org/project/deepeval/)
- [Polar](entries/polar.md) — A billing platform and Merchant of Record for developers building AI-era software, providing payments, subscriptions, and usage-based billing with global tax handling. _watching_ · [homepage](https://polar.sh/) · [docs](https://polar.sh/docs) · [source](https://github.com/polarsource/polar)
- [Stainless](entries/stainless.md) — An SDK, documentation, and MCP server generation platform acquired by Anthropic in May 2026 whose hosted products are winding down. _watching_ · [homepage](https://www.stainless.com/) · [docs](https://www.stainless.com/docs/) · [source](https://github.com/stainless-api)
- [VoyageAI](entries/voyageai.md) — An AI platform providing embedding models and rerankers for search and retrieval. _watching_ · [homepage](https://www.voyageai.com/) · [docs](https://docs.voyageai.com/) · [source](https://github.com/voyage-ai/voyageai-python) · [package](https://pypi.org/project/voyageai/)
<!-- toolbox:catalog:end -->

## How this repository works

Each item is a standalone Markdown file in [`entries/`](entries/). Validated YAML frontmatter stores predictable facts and classifications for scripts, search, and agent-friendly discovery; the Markdown body preserves my informal reason for saving it.

New finds begin as owner-created GitHub Issues. A bounded AI research step proposes factual metadata and official links, then a pull request keeps the result reviewable before it enters the library. The AI does not invent personal opinions and does not generate this README: [`scripts/generate-readme.mjs`](scripts/generate-readme.mjs) builds it deterministically from this human-authored template and the validated entries.

For the details, see the [entry format](docs/entries.md), [architecture](docs/architecture.md), [contribution flow](CONTRIBUTING.md), and [repository setup](docs/setup.md).

## License

The repository's original code and content are available under the [MIT License](LICENSE). Each listed project remains subject to its own license and terms.
