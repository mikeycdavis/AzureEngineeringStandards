import { test } from "node:test";
import assert from "node:assert/strict";

// Grammar copied by value from UIUXDesignStandards (domain.kebab-case-name). Not frozen (ADR 0001 is Proposed).
const CANONICAL_ID = /^[a-z][a-z0-9-]*\.[a-z][a-z0-9-]*$/;
const domains = ["azid", "azsecret", "aziac", "azgov", "aznet", "azdata", "azdeploy", "azops"];
const reserved = ["testing", "security", "scm", "verification"]; // EngineeringStandards domains

test("candidate rule-ID domains fit the portfolio grammar", () => {
  for (const d of domains) assert.match(d + ".example-rule", CANONICAL_ID);
});
test("candidate domains do not shadow EngineeringStandards domains", () => {
  for (const d of domains) assert.ok(!reserved.includes(d));
});
