# ACCEPTANCE

V1 is releasable only when all of the following are true:

- [ ] Five organization templates render and can be switched.
- [ ] Five incident scenarios render and can be switched.
- [ ] Custom organization assumptions can be applied without mutating source templates.
- [ ] Eight controls can be toggled independently.
- [ ] Weak city baseline leaves stolen-credential case uncontained.
- [ ] Recommended baseline contains stolen credentials at the MFA boundary.
- [ ] Ransomware still models the initial compromised endpoint even under strong controls.
- [ ] Recommendations only include disabled controls that improve at least one modeled scenario.
- [ ] Recovery assumptions improve when relevant controls are enabled.
- [ ] Downloaded brief includes priorities, recovery, and truth boundary.
- [ ] Public UI explicitly says no real systems are scanned or attacked.
- [ ] Public UI does not claim audit, pentest, certification, or real-org security status.
- [ ] CI passes on the release commit.
- [ ] GitHub Pages deploys successfully.
- [ ] Live page returns HTTP 200 and contains the expected hero marker.
