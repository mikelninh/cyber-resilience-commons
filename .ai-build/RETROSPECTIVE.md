# RETROSPECTIVE

## V1 observations
- The project became more useful once it stopped being a Berlin-only dashboard and became a reusable planning tool for cities, hospitals, schools, NGOs and small businesses.
- The strongest interaction is not a score; it is rerunning the same incident after changing one boundary and seeing where the path stops.
- Browser-local customization preserves privacy and makes the public version deployable with almost no infrastructure.
- Synthetic impact numbers are useful for comparison inside the model, but must never be presented as empirical breach predictions.

## Known gaps after V1
- Organization customization is intentionally shallow; there is not yet a real dependency/asset graph editor.
- Recovery assumptions are simple planning defaults, not measured RTO/RPO evidence.
- Scenarios cover five common patterns but not identity federation, cloud IAM, software supply chain, insider misuse, DDoS, or physical continuity.
- No collaborative exercise/facilitator mode yet.
- No evidence vault for real drills yet.

## Next hypothesis
The most useful next version may be a guided tabletop exercise that turns the model into a team drill: assign roles, reveal incident injects, record decisions, measure containment/recovery, and produce a concrete after-action plan.
