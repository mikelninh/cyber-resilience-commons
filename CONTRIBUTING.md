# Contributing

Cyber Resilience Commons is intended to become a reusable public-interest resource.

Useful contributions include:
- clearer plain-language security explanations;
- accessibility and mobile improvements;
- new synthetic organization templates;
- new synthetic incident scenarios;
- better deterministic tests;
- translations;
- tabletop-exercise and recovery-planning workflows;
- links to high-quality public guidance that improve defensive recommendations.

## Safety boundary
Do not submit features that probe, enumerate, exploit, or test third-party systems. Do not include sensitive operational information about a real organization. Real-world technical validation belongs only in systems the tester owns or is explicitly authorized to assess.

## Evidence boundary
Synthetic scenarios are planning models. Do not convert modeled outputs into claims that a named organization is vulnerable, secure, certified, or likely to suffer a particular loss.

## Development

```bash
npm test
python -m http.server 8000
```

Open `http://localhost:8000` for the static app.

For substantial changes, update the relevant `.ai-build/` records and add or revise golden cases.
