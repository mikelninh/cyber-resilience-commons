# DECISIONS

## ADR-001 — Synthetic-first public product
The public app never scans or attacks real systems. Synthetic modeling maximizes accessibility while keeping the public version safe and legally clean.

## ADR-002 — No single security score
A single score implies precision the model does not possess. Show containment path, modeled impact, missing boundaries, and priorities instead.

## ADR-003 — Deterministic model before probabilistic model
V1 uses deterministic scenario graphs so results are explainable and testable. Probability estimates require empirical calibration we do not yet have.

## ADR-004 — Browser-local by default
Customization stays local in the browser. This reduces privacy risk and makes the Commons easy to deploy anywhere.

## ADR-005 — Same incident before/after
Controls are evaluated by rerunning the same synthetic incident under changed assumptions. This makes causal differences legible.

## ADR-006 — Berlin is context, not target data
Public incidents can motivate scenarios, but no synthetic template is presented as a model of Berlin’s actual internal infrastructure or vulnerabilities.
