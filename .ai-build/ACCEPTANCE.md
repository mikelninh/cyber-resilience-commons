# ACCEPTANCE

## Public simulator v1

- [x] Five organization templates render and can be switched.
- [x] Five incident scenarios render and can be switched.
- [x] Custom organization assumptions can be applied without mutating source templates.
- [x] Eight controls can be toggled independently.
- [x] Weak city baseline leaves stolen-credential case uncontained.
- [x] Recommended baseline contains stolen credentials at the MFA boundary.
- [x] Ransomware still models the initial compromised endpoint even under strong controls.
- [x] Recommendations only include disabled controls that improve at least one modeled scenario.
- [x] Recovery assumptions improve when relevant controls are enabled.
- [x] Downloaded brief includes priorities, recovery, and truth boundary.
- [x] Public UI explicitly says no real systems are scanned or attacked.
- [x] Public UI does not claim audit, pentest, certification, or real-org security status.
- [x] Deterministic CI passes on `main`.
- [ ] GitHub Pages first-time enablement completed by repository owner.
- [ ] GitHub Pages deployment succeeds after enablement.
- [ ] Live page returns HTTP 200 and contains the expected hero marker.

## Guided tabletop drill v0.2

- [x] Five existing synthetic scenarios can be selected for a team exercise.
- [x] Suggested incident-response roles are visible before the drill begins.
- [x] Starting the drill reveals only the first inject.
- [x] Each advance reveals exactly one additional inject.
- [x] Blank decisions are not added to the decision log.
- [x] Recorded decisions preserve role and inject number.
- [x] Team notes remain browser-local; no network submission is introduced.
- [x] Drill completion exposes a downloadable after-action review.
- [x] After-action review contains recorded decisions, facilitator reflections, proof prompts, and truth boundary.
- [x] Main simulator links clearly to the team drill.
- [x] Tabletop deterministic tests pass.
- [x] Tabletop public safety markers pass in CI.

## Organization dependency map v0.3

- [x] Five synthetic organization maps cover identity, service, data, vendor and owner nodes.
- [x] Nodes can be added, edited and removed without leaving dangling relationships.
- [x] Relationships can be added and removed with explicit semantics.
- [x] Criticality and planning notes can be edited without sending data to a server.
- [x] Maps can be saved browser-locally, reset to template and downloaded as Markdown.
- [x] Dependency traces traverse declared operational/access relationships but not owner-accountability links.
- [x] Traces surface reached critical nodes, accountable owners and critical ownership gaps.
- [x] The public UI explicitly says it does not scan, discover or probe infrastructure.
- [x] Saved dependency context is reused in tabletop prompts and after-action reports.
- [x] Dependency-map deterministic golden cases pass locally.
- [ ] Pull-request CI passes with simulator, tabletop and dependency-map tests.
- [ ] Pages deployment smoke-checks simulator, dependency map and tabletop with HTTP 200/content markers.
