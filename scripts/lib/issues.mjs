const FIELD_LABELS = [
  "Link",
  "Name (optional)",
  "Kind",
  "Status",
  "Why I saved it (optional)"
];

function clean(value) {
  const result = value.trim();
  return result === "_No response_" ? "" : result;
}

export function parseIssueBody(body) {
  const headings = FIELD_LABELS.map((label) => ({
    label,
    marker: `### ${label}`,
    index: body.indexOf(`### ${label}`)
  }))
    .filter(({ index }) => index >= 0)
    .sort((a, b) => a.index - b.index);

  const values = {};
  for (let index = 0; index < headings.length; index += 1) {
    const current = headings[index];
    const next = headings[index + 1];
    const start = current.index + current.marker.length;
    values[current.label] = clean(body.slice(start, next?.index ?? body.length));
  }

  const submittedUrl = values.Link;
  if (!submittedUrl) throw new Error("The issue is missing the required Link field.");
  assertPublicUrl(submittedUrl, "submitted link");

  const kindValue = values.Kind || "Let the agent decide";
  const kindMap = {
    "Let the agent decide": null,
    Library: "library",
    Tool: "tool",
    "Service / SaaS": "service",
    Resource: "resource",
    Snippet: "snippet",
    Pattern: "pattern"
  };
  if (!(kindValue in kindMap)) throw new Error(`Unknown Kind value: ${kindValue}`);

  const status = (values.Status || "Watching").toLowerCase();
  if (!["watching", "tried", "recommended"].includes(status)) {
    throw new Error(`Unknown Status value: ${values.Status}`);
  }

  return {
    submittedUrl,
    submittedName: values["Name (optional)"] || null,
    kind: kindMap[kindValue],
    status,
    note: values["Why I saved it (optional)"] || ""
  };
}

export function assertPublicUrl(value, label = "URL") {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${label} is not a valid URL: ${value}`);
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error(`${label} must use HTTP or HTTPS.`);
  }
  if (url.username || url.password) throw new Error(`${label} must not contain credentials.`);
  if (["localhost", "127.0.0.1", "::1"].includes(url.hostname)) {
    throw new Error(`${label} must be a public URL.`);
  }
  return url.toString();
}
