import { test } from "node:test";
import assert from "node:assert/strict";

// Grammar copied exactly from UIUXDesignStandards scripts/catalog.mjs (ADR 0001 is Proposed).
const CANONICAL_ID = /^[a-z][a-z0-9]*(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)+$/; // exact copy of UIUXDesignStandards scripts/catalog.mjs line 94
const domains = ["azid", "azsecret", "aziac", "azgov", "aznet", "azdata", "azdeploy", "azops"];
const reserved = ["testing", "security", "scm", "verification"]; // EngineeringStandards domains

test("candidate rule-ID domains fit the portfolio grammar", () => {
  for (const d of domains) assert.match(d + ".example-rule", CANONICAL_ID);
});
test("candidate domains do not shadow EngineeringStandards domains", () => {
  for (const d of domains) assert.ok(!reserved.includes(d));
});
test("grammar rejects malformed ids", () => {
  for (const bad of ["test-.example--rule", "Test.rule", "x", "azid/example-rule", "azid example-rule", "azid_example-rule", "azidexample-rule"]) assert.doesNotMatch(bad, CANONICAL_ID);
});
