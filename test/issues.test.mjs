import test from "node:test";
import assert from "node:assert/strict";
import { parseIssueBody } from "../scripts/lib/issues.mjs";

test("parses the GitHub issue form without requiring optional judgment", () => {
  const result = parseIssueBody(`### Link

https://example.com/project

### Name (optional)

_No response_

### Kind

Let the agent decide

### Status

Watching

### Why I saved it (optional)

_No response_`);

  assert.deepEqual(result, {
    submittedUrl: "https://example.com/project",
    submittedName: null,
    kind: null,
    status: "watching",
    note: ""
  });
});

test("preserves an owner's explicit kind, status, and note", () => {
  const result = parseIssueBody(`### Link
https://example.com
### Name (optional)
Example
### Kind
Tool
### Status
Tried
### Why I saved it (optional)
Handy for local testing.`);
  assert.equal(result.kind, "tool");
  assert.equal(result.status, "tried");
  assert.equal(result.note, "Handy for local testing.");
});
