# AGENTS.md

## Mission
Build Cyber Resilience Commons as a free, understandable, evidence-oriented preparedness tool for public-interest organizations.

## Build OS
Use the six-stage loop for meaningful changes:
1. SHAPE — user, problem, risks, constraints.
2. SPECIFY — behavior, boundaries, acceptance criteria.
3. DELEGATE — implementation within explicit autonomy limits.
4. PROVE — deterministic tests, golden cases, safety markers.
5. SHIP — review, CI, deployment, live smoke test.
6. WATCH — regressions, truth-boundary drift, usability gaps.

## Non-negotiable safety boundary
- Never probe, scan, exploit, enumerate, or test real third-party infrastructure.
- Never represent synthetic scenario output as evidence about a named real organization.
- Runtime/security testing belongs only in systems the tester owns or is explicitly authorized to assess.
- Do not turn this project into exploit automation.
- Do not emit a generic “secure / insecure” score.

## Product standard
The primary user may be a school administrator, NGO lead, municipal manager, clinic operator, or small-business owner—not a security engineer. Prefer plain language, actionable priorities, and explicit uncertainty.

## Evidence standard
A control toggle is a planning assumption, not proof. The product should teach users how to turn each assumption into evidence in an owned or explicitly authorized environment.
