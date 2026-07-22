const TYPE_LABELS = {
  library: "Libraries",
  tool: "Tools",
  service: "Services",
  resource: "Resources",
  snippet: "Snippets",
  pattern: "Patterns"
};

function escapeMarkdown(value) {
  return value.replace(/([\\[\]_*`<>])/g, "\\$1");
}

function primaryUrl(entry) {
  return entry.links.homepage || entry.links.repository || entry.links.documentation || entry.links.submitted;
}

function secondaryLinks(entry, primary) {
  const labels = {
    documentation: "docs",
    repository: "source",
    package: "package"
  };
  return Object.entries(labels)
    .filter(([key]) => entry.links[key] && entry.links[key] !== primary)
    .map(([key, label]) => `[${label}](${entry.links[key]})`);
}

export function renderReadme(entries) {
  const lines = [
    "# Toolbox",
    "",
    "A personal library of technology, tools, and ideas worth remembering.",
    "",
    "> This catalog is generated deterministically from the Markdown files in `entries/`. Submit new finds through the **Add to toolbox** issue form.",
    ""
  ];

  for (const type of Object.keys(TYPE_LABELS)) {
    const matches = entries
      .filter(({ data }) => data.type === type && data.status !== "archived")
      .sort((a, b) => a.data.name.localeCompare(b.data.name));
    if (matches.length === 0) continue;
    lines.push(`## ${TYPE_LABELS[type]}`, "");
    for (const { data } of matches) {
      const primary = primaryUrl(data);
      const extras = secondaryLinks(data, primary);
      const metadata = [`_${data.status}_`, ...extras].join(" · ");
      lines.push(
        `- [${escapeMarkdown(data.name)}](${primary}) — ${escapeMarkdown(data.summary)} ${metadata}`
      );
    }
    lines.push("");
  }

  const archived = entries
    .filter(({ data }) => data.status === "archived")
    .sort((a, b) => a.data.name.localeCompare(b.data.name));
  if (archived.length) {
    lines.push("## Archived", "");
    for (const { data } of archived) {
      lines.push(`- [${escapeMarkdown(data.name)}](${primaryUrl(data)}) — ${escapeMarkdown(data.summary)}`);
    }
    lines.push("");
  }

  if (entries.length === 0) lines.push("_Nothing here yet._", "");
  lines.push(
    "## Repository setup",
    "",
    "See [`docs/setup.md`](docs/setup.md) for the one-time Parallel secret and GitHub Actions configuration.",
    ""
  );
  return `${lines.join("\n").trimEnd()}\n`;
}
