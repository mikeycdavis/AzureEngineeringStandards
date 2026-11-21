<!-- Charter revision 3; authoritative evidence: F:\GitHub Evidence\AzureEngineeringStandards\evidence-1\ -->
# Charter packet 02 — AzureEngineeringStandards

Status: DRAFT, read-only. Backlog IDs are draft labels, not issue numbers. See
`00-shared-conventions.md` (kept in F:\GitHub Evidence\SoftwareTestingStandards\evidence-1\, not in this repository).

## 1. Purpose

Govern Azure infrastructure, identity, secrets, deployment and operations as declared in a
repository's code and evidence.

> A clean result means: for the Azure surfaces this project declared and the framework could
> actually evaluate from code and ingested evidence, the recorded evidence supports it — and
> everything about the live tenant it did not observe remains visible.

## 2. Scope

- **Identity and access:** Microsoft Entra ID app registrations and service principals, managed
  identities, workload identity federation (OIDC) for pipelines, RBAC role assignments and scope,
  least privilege, no standing owner/contributor at broad scope, privileged access.
- **Secrets and keys:** Key Vault usage (access model, RBAC vs access policies, soft-delete/purge
  protection, rotation), no secrets in IaC/parameters/pipeline variables, secret-reference patterns.
- **Infrastructure as code:** Bicep/ARM (and Terraform if declared) hygiene, parameterisation,
  module pinning (Azure Verified Modules), what-if/plan review, drift, state handling, tagging.
- **Landing zone and governance:** subscription/management-group structure, Azure Policy
  assignments, naming, tagging, cost controls, region/residency declarations.
- **Network and data protection:** private endpoints, public network access, TLS, storage account
  and database exposure, encryption/CMK declarations, backup and retention.
- **Deployment and CI/CD:** Azure Pipelines and GitHub-Actions-to-Azure deployment: environment
  separation, approvals/gates, service connections, no long-lived credentials, artifact provenance.
- **Operations:** diagnostic settings, Log Analytics/Monitor/alerting, Defender for Cloud posture
  declarations, SLO/health probes, incident and rollback runbooks, DR/RTO/RPO declarations.
- **Azure DevOps Advanced Security** findings handling (GHAzDO alerts): DEFERRED per Mike, on or before 2026-11-19 19:36 PST (2026-11-20T03:36Z) (open
  question 2).

## 3. Non-goals

- **No live tenant/subscription access in v1.** The evaluator reads code and ingested exports; it
  never authenticates to Azure, lists resources, or reads Key Vault. (A later, separately approved
  "live evidence producer" could ingest `az`/Resource Graph exports, mirroring UIUX's browser-evidence
  producer, plan section 15.)
- Does not create or modify any resource, vault, role, service principal, subscription or policy.
- Does not own universal invariants: secrets-never-in-artifacts, least privilege as a principle,
  source control, release integrity (EngineeringStandards). Azure rules *defer-to* those and add the
  Azure mechanism.
- Does not own application-level security design, SQL/data-model rules, or generic CI principles.
- Not a cost-optimisation, FinOps, or Well-Architected scoring tool; not a replacement for Defender
  for Cloud or Azure Policy — it checks that the repo's declarations and evidence are honest.
- Does not cover Microsoft 365, Power Platform or on-prem Windows administration.

## 4. Authoritative first-party sources (all UNVERIFIED until opened)

> Status note: this section is the pre-verification charter text. The source ledger in the evidence folder (hashed in `docs/evidence-index.md`) records which sources were later opened (tool-extracted, not human-reviewed) and governs; "unverified" below is superseded per source by the ledger.

| Source | Role |
| --- | --- |
| Microsoft Safe Secrets Standard (`learn.microsoft.com/en-us/security/zero-trust/sfi/safe-secrets-standard`), Azure Well-Architected security guidance (`.../azure/well-architected/security/`), Key Vault security guidance (`.../azure/key-vault/general/secure-key-vault`) — cited by Mike, not yet opened by me | Primary basis for the identity-first, secret-elimination milestone |
| Microsoft Learn — Azure Well-Architected Framework (security, reliability, operational excellence pillars) | Design principles; used as provenance, not copied |
| Microsoft Learn — Cloud Adoption Framework / Azure Landing Zones | Governance, subscription/management-group structure |
| Microsoft cloud security benchmark (MCSB) | Control catalog, identity/network/data/posture families |
| Azure Architecture Center | Reference patterns |
| Microsoft Entra documentation (workload identities, federated credentials, Conditional Access, PIM) | Identity controls |
| Azure RBAC documentation and built-in roles reference | Role scope and least privilege |
| Azure Key Vault documentation (security, best practices, RBAC guide) | Secrets/keys controls |
| Bicep and ARM documentation; Azure Verified Modules | IaC hygiene and module provenance |
| Azure Policy documentation and built-in definitions | Governance mapping |
| Azure DevOps and Azure Pipelines documentation (service connections, workload identity federation, environments, approvals); GitHub Advanced Security for Azure DevOps | Deployment controls |
| Azure Monitor, Defender for Cloud documentation | Operations/posture |
| Azure service retirement announcements | Freshness feed for rule review |
| Internal: EngineeringStandards 16, 28, 46, 49, 50 | Invariants referenced |

## 5. Proposed hierarchy

Layout per conventions §2. Proposed 30 standards:

| # | Standard | Group |
| --- | --- | --- |
| 01 | Boundary with EngineeringStandards, SoftwareTesting, platform packs | Foundations |
| 02 | Azure applicability and the declared estate (subscriptions, environments) | Foundations |
| 03 | Evidence surfaces: IaC static, ingested exports, attested | Foundations |
| 04 | Workload identity: managed identity and federation first | Identity |
| 05 | Service principals and app registrations (ownership, expiry, credentials) | Identity |
| 06 | RBAC least privilege, scope, break-glass | Identity |
| 07 | MFA, Conditional Access, PIM, privileged access review cadence, and break-glass accounts | Identity |
| 08 | Key Vault design: access model, purge protection, rotation | Secrets |
| 09 | Secret references in IaC and pipelines — never values | Secrets |
| 10 | Pipeline credentials and service connections | Secrets/CI |
| 11 | IaC structure, parameters, module pinning, tagging | IaC |
| 12 | Plan/what-if review and drift handling | IaC |
| 13 | State and parameter file safety | IaC |
| 14 | Management groups, subscriptions, landing-zone placement | Governance |
| 15 | Azure Policy assignments and exemptions | Governance |
| 16 | Network exposure: public access, private endpoints, NSGs | Network |
| 17 | Data protection: encryption, backup, retention, soft delete | Data |
| 18 | Environment separation (dev/test/staging/prod), including separate deployment identities per environment and Key Vault separation by application and environment | Deployment |
| 19 | Deployment approvals, gates, artifact provenance | Deployment |
| 20 | Rollback and recovery procedures | Deployment |
| 21 | Observability: diagnostic settings, logs, alerts | Operations |
| 22 | Defender for Cloud / posture declarations | Operations |
| 23 | Reliability: health, SLO, DR (RTO/RPO), zone/region declarations | Operations |
| 24 | Cost and quota guardrails (budgets, limits) | Operations |
| 25 | Azure Pipelines (v1): workload-identity-federated service connections, agents, variable and secret handling, approvals and checks, protected environments, artifacts, templates, deployment separation | Azure DevOps |
| 26 | (reserved) Azure DevOps Advanced Security alert handling - DEFERRED to a separately scoped feature | Azure DevOps |
| 27 | Service retirement and version currency (API versions, runtimes) | Currency |
| 28 | AI-agent operation on Azure: scoped identity, propose-vs-execute | AI |
| 29 | Policy, applicability, exceptions (pack standard) | Framework |
| 30 | Evidence, assurance, compliance output (pack standard) | Framework |

Rule-ID domains (proposed): `azid`, `azsecret`, `aziac`, `azgov`, `aznet`, `azdata`, `azdeploy`,
`azops`.

Verification references: Azure rules specify *what must hold*; how it is verified (what-if runs,
policy compliance export, restore tests) cites SoftwareTestingStandards.

Applicability: Bicep/ARM/Terraform-azurerm files, `azure-pipelines.yml`, `azd` config, or Azure SDK
usage found by the classifier. Declared `no-azure` is a declaration, not a finding.

## 6. Initial threat model

| ID | Failure | Detection posture |
| --- | --- | --- |
| T1 | Secret value in Bicep parameters, pipeline variable, or repo | Static scan `partial`; refs Eng `security.no-secrets-in-artifacts`; never records the value, only location + hash prefix policy |
| T2 | Long-lived service-principal secret in a service connection instead of federation | Pipeline/IaC static + attestation |
| T3 | Over-broad RBAC (Owner/Contributor at subscription, wildcard actions) | Static IaC check; live assignments only via ingested export |
| T4 | Key Vault without purge protection / public network access | Static IaC check |
| T5 | Public storage/database endpoints, missing TLS/private endpoint | Static IaC `partial` |
| T6 | Dev and prod share identity, vault, or pipeline stage | Environment-separation check |
| T7 | Unreviewed IaC apply (no what-if, no approval) | Pipeline-definition check + ingested run evidence |
| T8 | Drift between declared IaC and real tenant | Not detectable statically; marked `not-evaluated` unless export ingested |
| T9 | Policy exemptions that silently expire/persist | Exemption ledger with owner + expiry |
| T10 | Deprecated Azure APIs/runtimes/services reaching retirement | Version currency check vs recorded retirement feed |
| T11 | AI agent granted standing broad Azure rights | Agent-identity rules; defer-to Eng 02/03/16 |
| T12 | A green result read as "the Azure estate is secure" | Charter sentence; live-state surfaces always reported as not observed |

## 7. First backlog (draft labels; 15 items)

| Draft ID | Title | Notes |
| --- | --- | --- |
| AZE-B01 | Repo skeleton, vendored core provenance, rule-ID domains | Check grammar fit |
| AZE-B02 | Boundary standard with EngineeringStandards (secrets, least privilege, release integrity, CI) | Meta-test against shadowing |
| AZE-B03 | Open and record external sources (WAF, CAF/ALZ, MCSB, Entra, Key Vault, Bicep, Policy, Azure DevOps) | Resolves UNVERIFIED |
| AZE-B04 | Record v1 IaC scope: ARM/Bicep only; write the separate Terraform design brief (identity, state custody, provider pinning, plan evidence, drift, remote-state threat boundaries) as a deferred item | Decided on or before 2026-11-19 19:36 PST (2026-11-20T03:36Z) |
| AZE-B05 | Azure applicability classifier | INDETERMINATE semantics |
| AZE-B06 | Policy schema, template, declared-estate model | Environments, subscriptions as names only |
| AZE-B07 | Evidence ingestion contract for exports (role assignments, policy compliance, what-if output) | Mirror UIUX ADR 0002; no live access |
| AZE-B08 | Identity standards 04–07 and catalog slice | Highest value first |
| AZE-B09 | Secrets standards 08–10 and detectors (values never echoed in output) | Output-safety test |
| AZE-B10 | IaC standards 11–13 and ARM JSON ingestion (from `bicep build`) and detectors; no Bicep parser (decision AZ17) | Zero-dependency |
| AZE-B11 | Network/data/environment-separation standards 16–18 | |
| AZE-B12 | Pipeline/deployment standards 19-20 and 25 (Azure Pipelines in v1; Advanced Security deferred) | Decided on or before 2026-11-19 19:36 PST (2026-11-20T03:36Z) |
| AZE-B13 | Fixtures: compliant, secret-in-param, broad RBAC, no purge protection, shared prod/dev identity | |
| AZE-B14 | StandardsEnforcer adapter entry for this pack | Cross-repo |
| AZE-B15 | Adversarial fixtures proving each Azure rule class; real-project adoption recorded as a later milestone | Fixture-only by owner decision; no adoption evidence invented |

## 8. Applied decisions and open questions

Note on the fixture-only choice: the earlier survey statement that no real Azure workload exists under F:\Repos was incomplete; tracked Azure-relevant projects do exist there. Fixture-only v1 validation is therefore an owner decision, not a verified absence of candidates. "Qualifying" is undefined and any adopter trial must follow the read-only, commit-pinned-copy rule (decision-packet item T12, not this charter's threat T12) and cannot be claimed from fixtures.

Applied (Mike, on or before 2026-11-19 19:36 PST (2026-11-20T03:36Z)): Azure Pipelines in v1; Advanced Security deferred; ARM/Bicep first,
Terraform deferred; v1 validated by adversarial fixtures only.

1. Azure Government/sovereign clouds remain out of scope unless a consumer needs them.
2. The section 2 bullet naming Advanced Security is superseded: it is deferred.
