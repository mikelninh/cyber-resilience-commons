# Architecture

## Runtime
Static browser application. No backend is required for v1.

## Components
- `data.js` — transparent organization templates, controls, and incident scenarios.
- `simulator.js` — deterministic simulation, comparison, recommendations, recovery assumptions, customization, and brief generation.
- `app.js` — browser interaction and rendering.
- `index.html` / `styles.css` — public interface.
- `test.mjs` — deterministic contract tests.

## Data flow
`template + scenario + controls → simulate() → path statuses + modeled metrics → recommendations() / recoveryPlan() → human-readable plan`

## Safety architecture
The application contains no network scanning, credential collection, exploit execution, target discovery, or remote-action capability. All incident paths are synthetic data structures evaluated locally.

## Future direction
Real organizations may later attach their own authorized evidence and recovery drill results. Such evidence must remain clearly separate from synthetic model output.
