# Evidence index (charter #1)

SHA-256 of authoritative evidence files (kept outside the repo):

```
8f77df68a2fcc0c10744e811d55454361496af33725357601dc00a8c1afba81f  02-AzureEngineeringStandards-charter.md
f9f4a77dcbe29ede1eb01462cd122bb13f39893636d6d77e822ec27fd3467add  02-azure-source-ledger.md
```

'Opened' sources are tool-extracted, not human-reviewed.

Note: `docs/charter.md` in this repository is charter revision 5, derived from the hashed evidence charter above. It differs from the hashed file by corrections made after review (evidence path, conventions reference, source-status note, corrected cross-references, the fixture-only note, revision-4 wording fixes to standards 04, 07, 08, 10 and the Key Vault scope line from the identity/secrets source ledger, and a revision-5 amendment to threat T1 per owner ruling S5 (no deterministic hash prefix of a secret; report only file, line, rule ID and category) (`02-identity-secrets-source-ledger.md`, SHA-256 `ba4df4d5b11cb2ca65ff9d5bfd73192799387c7fd5eb9e823df7a058c9f6ab52`), the AZE-B10 scope change from a Bicep static parser to ARM JSON ingestion per AZ17, the standard count corrected from ~32 to 30, and the Key Vault slug fix). The hashed file is the pre-review text; this repository's charter governs where they differ.
