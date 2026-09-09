# ARCHITECTURE

## Runtime
Static browser application. No backend is required for v1.

## Modules
- `data.js` — synthetic organization templates, control catalog, scenario graph.
- `simulator.js` — deterministic simulation, comparison, recommendations, customization, brief generation.
- `app.js` — browser state and rendering.
- `index.html` / `styles.css` — public interface.
- `test.mjs` — deterministic golden-case assertions.

## Core model
Each incident is an ordered set of synthetic steps. A step may declare a `blockedBy` control and a modeled impact delta. The simulator stops the path when an enabled control matches that boundary.

This intentionally models *causal containment*, not probabilistic risk. It asks: “given these assumptions, where does the path stop?”

## Data handling
All user customization remains in browser memory. V1 has no analytics, account system, database, or network submission endpoint.

## Future extension boundary
Real-environment validation must be a separate, explicit authorized mode. It must never silently evolve from the public synthetic simulator into internet scanning or exploitation.
