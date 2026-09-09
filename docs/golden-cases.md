# Golden Cases

## GC-01 — Stolen password is stopped by phishing-resistant MFA
Given the synthetic city template with the recommended baseline, the stolen-credentials scenario must stop at the first boundary and produce zero modeled data exposure.

## GC-02 — Ransomware begins after one endpoint is already lost
Given the recommended baseline, the ransomware scenario must still show the first compromised endpoint as impacted, then stop lateral spread at segmentation. The simulator must not pretend prevention is perfect.

## GC-03 — Weak baseline produces useful priorities
Given the default synthetic city controls, the recommendation engine must return disabled controls that measurably change at least one modeled scenario.

## GC-04 — Restore-tested backups change recovery assumptions
Turning protected backups on must improve the modeled critical-service restore time relative to a configuration without protected backups.

## GC-05 — Organization customization does not alter canonical templates
Changing the organization name, identity count, critical service, or sensitive-data label must create a derived planning template without mutating the source template.

## GC-06 — Exported brief preserves the truth boundary
Every generated resilience brief must state that the output is synthetic and that real validation is limited to owned or explicitly authorized systems.
