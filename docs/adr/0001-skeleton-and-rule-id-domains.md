# ADR 0001: Skeleton and rule-ID domains (AZE-B01)

Status: **Proposed.** Nothing is frozen; acceptance criteria need an owner decision.

- Layout mirrors existing packs. Node >=18, ESM, zero dependencies.
- Candidate domains: azid azsecret aziac azgov aznet azdata azdeploy azops. All fit the UIUXDesignStandards canonical-ID pattern (verified by value in test/skeleton.test.mjs); none shadows EngineeringStandards domains.
- Vendored core with provenance: not yet vendored; follow-up.
- Fixtures-only validation in v1; no real adoption claimed. Profile of the SoftwareTestingStandards core release-evidence schema is not started and stays blocked until that schema is frozen by the owner.
