# ADR 0001: Skeleton and rule-ID domains (AZE-B01)

Status: **Proposed.** Nothing is frozen; acceptance criteria need an owner decision.

- Skeleton only: package.json, one test, this ADR. The standards/, rules/, schemas/ and scripts/ layout used by existing packs is not yet created. Node >=18, ESM, zero dependencies.
- Candidate domains: azid azsecret aziac azgov aznet azdata azdeploy azops. All fit the UIUXDesignStandards canonical-ID pattern (checked in test/skeleton.test.mjs against a hard-coded copy of that pattern, which would not detect later drift in UIUXDesignStandards; a live drift check is follow-up); none shadows the 16 EngineeringStandards domains listed in the test (a dated snapshot, not read live).
- Vendored core with provenance: not yet vendored; follow-up.
- Fixtures-only validation in v1; no real adoption claimed. Profile of the SoftwareTestingStandards core release-evidence schema is not started and stays blocked until that schema is frozen by the owner.
