# RUNBOOK

## Local verification
```bash
npm test
```

The app is static. For a local browser preview, serve the repository directory with any static HTTP server; ES modules may not work correctly via `file://`.

## Release
1. Open a PR to `main`.
2. Require `verify` workflow success.
3. Review truth-boundary copy and changed scenario assumptions.
4. Merge.
5. `Deploy public app` runs on `main`.
6. Deployment itself runs tests before upload.
7. Live smoke test must return HTTP 200 and find the hero marker.

## Incident / rollback
If the public app breaks or violates the truth boundary:
1. Revert the offending commit on `main`.
2. Confirm `verify` passes.
3. Confirm Pages redeploy succeeds.
4. Confirm live smoke test passes.

## Safety review triggers
Manually review any change that:
- adds a network request,
- accepts repository/host/IP input,
- adds backend storage or analytics,
- changes a scenario from synthetic to real-world data,
- introduces probabilistic risk or loss estimates,
- modifies the public safety/truth-boundary text.
