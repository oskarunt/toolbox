import test from "node:test";
import assert from "node:assert/strict";
import { renderReadme } from "../scripts/lib/readme.mjs";

test("renders entries deterministically by type and name", () => {
  const make = (name) => ({
    filename: `${name.toLowerCase()}.md`,
    note: "",
    data: {
      name,
      summary: `${name} summary.`,
      type: "tool",
      status: "watching",
      links: {
        submitted: `https://example.com/${name.toLowerCase()}`,
        homepage: null,
        documentation: null,
        repository: null,
        package: null
      }
    }
  });
  const template = `# Test\n\n<!-- toolbox:highlights:start -->\n<!-- toolbox:highlights:end -->\n\n<!-- toolbox:catalog:start -->\n<!-- toolbox:catalog:end -->\n`;
  const output = renderReadme([make("Zulu"), make("Alpha")], template);
  assert.ok(output.indexOf("Alpha") < output.indexOf("Zulu"));
  assert.match(output, /\[Alpha\]\(entries\/alpha\.md\)/);
  assert.equal(output, renderReadme([make("Zulu"), make("Alpha")], template));
});

test("renders personal judgment for tried and recommended highlights", () => {
  const entry = {
    filename: "example.md",
    note: "My go-to choice.",
    data: {
      name: "Example",
      summary: "An example.",
      type: "tool",
      status: "recommended",
      links: {
        submitted: "https://example.com",
        homepage: "https://example.com",
        documentation: null,
        repository: null,
        package: null
      }
    }
  };
  const template = `<!-- toolbox:highlights:start -->\n<!-- toolbox:highlights:end -->\n<!-- toolbox:catalog:start -->\n<!-- toolbox:catalog:end -->`;
  const output = renderReadme([entry], template);
  assert.match(output, /### Recommended/);
  assert.match(output, /Why I saved it.*My go-to choice/);
});
