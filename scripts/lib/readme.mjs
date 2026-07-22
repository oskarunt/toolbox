const TYPE_LABELS = {
  library: "Libraries",
  tool: "Tools",
  service: "Services",
  resource: "Resources",
  snippet: "Snippets",
  pattern: "Patterns"
};

const GENERATED_REGIONS = {
  highlights: ["<!-- toolbox:highlights:start -->", "<!-- toolbox:highlights:end -->"],
  catalog: ["<!-- toolbox:catalog:start -->", "<!-- toolbox:catalog:end -->"]
};

function escapeMarkdown(value) {
  return value.replace(/([\\[\]_*`<>])/g, "\\$1");
}

function externalLinks(entry) {
  const labels = {
    homepage: "homepage",
    documentation: "docs",
    repository: "source",
    package: "package"
  };
  const links = Object.entries(labels)
    .filter(([key]) => {
      const url = entry.links[key];
      if (!url) return false;
      if (key === "homepage" && url === entry.links.repository) return false;
      if (
        key === "documentation" &&
        (url === entry.links.homepage || url === entry.links.repository)
      ) {
        return false;
      }
      return true;
    })
    .map(([key, label]) => `[${label}](${entry.links[key]})`);
  if (links.length === 0) links.push(`[submitted link](${entry.links.submitted})`);
  return links;
}

function entryLine({ data, filename }, includeStatus = true) {
  const metadata = [includeStatus ? `_${data.status}_` : null, ...externalLinks(data)]
    .filter(Boolean)
    .join(" · ");
  return `- [${escapeMarkdown(data.name)}](entries/${filename}) — ${escapeMarkdown(data.summary)} ${metadata}`;
}

function renderHighlights(entries) {
  const lines = [];
  for (const [status, heading] of [
    ["recommended", "Recommended"],
    ["tried", "Tried"]
  ]) {
    const matches = entries
      .filter(({ data }) => data.status === status)
      .sort((a, b) => a.data.name.localeCompare(b.data.name));
    if (matches.length === 0) continue;
    lines.push(`### ${heading}`, "");
    for (const entry of matches) {
      lines.push(entryLine(entry, false));
      if (entry.note) {
        lines.push(`  - **Why I saved it:** ${entry.note.replace(/\s+/g, " ")}`);
      }
    }
    lines.push("");
  }
  return lines.length ? lines.join("\n").trimEnd() : "_No tried or recommended entries yet._";
}

function renderCatalog(entries) {
  const lines = [];

  for (const type of Object.keys(TYPE_LABELS)) {
    const matches = entries
      .filter(({ data }) => data.type === type && data.status !== "archived")
      .sort((a, b) => a.data.name.localeCompare(b.data.name));
    if (matches.length === 0) continue;
    lines.push(`### ${TYPE_LABELS[type]}`, "");
    for (const entry of matches) lines.push(entryLine(entry));
    lines.push("");
  }

  const archived = entries
    .filter(({ data }) => data.status === "archived")
    .sort((a, b) => a.data.name.localeCompare(b.data.name));
  if (archived.length) {
    lines.push("### Archived", "");
    for (const entry of archived) lines.push(entryLine(entry));
    lines.push("");
  }

  return lines.length ? lines.join("\n").trimEnd() : "_Nothing here yet._";
}

function replaceRegion(template, name, contents) {
  const [start, end] = GENERATED_REGIONS[name];
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  if (!pattern.test(template)) throw new Error(`README template is missing the ${name} region.`);
  return template.replace(pattern, `${start}\n${contents}\n${end}`);
}

export function renderReadme(entries, template) {
  let output = replaceRegion(template, "highlights", renderHighlights(entries));
  output = replaceRegion(output, "catalog", renderCatalog(entries));
  return `${output.trimEnd()}\n`;
}
