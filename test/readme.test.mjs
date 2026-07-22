import test from "node:test";
import assert from "node:assert/strict";
import { renderReadme } from "../scripts/lib/readme.mjs";

test("renders entries deterministically by type and name", () => {
  const make = (name) => ({
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
  const output = renderReadme([make("Zulu"), make("Alpha")]);
  assert.ok(output.indexOf("Alpha") < output.indexOf("Zulu"));
  assert.equal(output, renderReadme([make("Zulu"), make("Alpha")]));
});
