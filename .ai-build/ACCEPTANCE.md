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

- [ ] Five existing synthetic scenarios can be selected for a team exercise.
- [ ] Suggested incident-response roles are visible before the drill begins.
- [ ] Starting the drill reveals only the first inject.
- [ ] Each advance reveals exactly one additional inject.
- [ ] Blank decisions are not added to the decision log.
- [ ] Recorded decisions preserve role and inject number.
- [ ] Team notes remain browser-local; no network submission is introduced.
- [ ] Drill completion exposes a downloadable after-action review.
- [ ] After-action review contains recorded decisions, facilitator reflections, proof prompts, and truth boundary.
- [ ] Main simulator links clearly to the team drill.
- [ ] Tabletop deterministic tests pass.
- [ ] Tabletop public safety markers pass in CI.
