# EVALS

## Deterministic golden cases
1. Weak city + stolen credentials → uncontained and non-zero modeled data exposure.
2. Recommended baseline + stolen credentials → contained at MFA before modeled spread.
3. Recommended baseline + ransomware → initial foothold remains, spread stops at segmentation.
4. Recommendations never propose already-enabled controls and must improve at least one scenario.
5. Restore-tested backups reduce modeled recovery time.
6. Custom organization changes scale and labels without mutating the template.
7. Generated brief contains priorities, recovery assumptions, and explicit truth boundary.

## Product eval dimensions
- Comprehension: can a non-security user explain what the result means?
- Causality: is it obvious which boundary changed the outcome?
- Actionability: does every priority explain what to do and how to prove it?
- Safety: no real-target behavior or implied vulnerability claim.
- Honesty: modeled numbers are clearly synthetic assumptions, not empirical predictions.
- Accessibility: core simulator usable on desktop and mobile with keyboard-visible controls.

## Future empirical calibration
Do not add probability or loss claims until scenarios are calibrated against defensible external datasets and uncertainty is surfaced explicitly.
