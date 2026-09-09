# Verification

## Automated gates
- `npm test` must pass.
- Golden cases must remain deterministic.
- Generated briefs must preserve the synthetic/authorized-use truth boundary.
- Static site files must be deployable without a backend.

## Release smoke
After deployment, the public page must return HTTP 200 and contain the marker:

`See how far an incident can spread — before it happens.`

## Human review
Before calling a release public-ready, review from three perspectives:
1. **General user:** Can a non-security specialist understand the next action?
2. **Security practitioner:** Are assumptions and boundaries explicit enough to avoid misleading claims?
3. **UI/UX:** Is the decision flow readable on desktop and mobile without requiring explanation?

## Definition of done for v1
- Five organization templates.
- Five incident scenarios.
- Eight defensive boundaries.
- Before/after comparison.
- Prioritized recommendations.
- Concrete proof suggestion per recommended control.
- Recovery assumptions.
- Custom organization planning assumptions.
- Downloadable/printable brief.
- CI green.
- Public URL live and smoke-tested.
