# Cyber Resilience Commons

**A free, open-source resilience planning tool for cities, hospitals, schools, nonprofits and small organizations.**

Cyber Resilience Commons helps non-specialists answer a practical question:

> If one account, device, vendor, or cloud session is compromised, how far could the incident spread — and what should we fix first?

The project uses transparent, deterministic **synthetic scenarios** to model blast radius, compare defensive boundaries, plan recovery drills, and produce an actionable resilience brief.

## What you can do in v1

- Start from City, Hospital, School, NGO, or Small Business.
- Customize basic organization assumptions without sending them to a server.
- Rehearse stolen credentials, ransomware, vendor compromise, bulk exfiltration, and stolen SaaS/OAuth sessions.
- Turn defensive boundaries on/off and rerun the *same* scenario.
- See where the modeled path is contained and what impact occurs before containment.
- Get the highest-leverage missing boundaries across all scenarios.
- See a concrete suggestion for how each boundary could be proven in an owned or explicitly authorized environment.
- Download or print a resilience brief.

## What it is

- A public-interest cyber resilience simulator and planning tool.
- A way to rehearse `MAP → ASSUME → CONTAIN → RECOVER → PROVE → SHARE`.
- A transparent set of reusable organization templates and incident scenarios.
- A practical bridge between security language and decisions leaders can understand.

## What it is not

- Not a penetration test.
- Not a vulnerability scanner against real organizations.
- Not a certification or a claim that an organization is secure.
- Not based on confidential Berlin infrastructure information.

All included scenarios, impact values, organizations, and recovery times are synthetic planning assumptions. Real-world validation must only be performed in systems the tester owns or is explicitly authorized to assess.

## First reference scenario

The first template is a **synthetic city/public-administration environment**, motivated by recent ransomware and data-exfiltration incidents affecting public institutions. It is designed to be reusable by any municipality and does not represent Berlin's actual network.

## Run locally

```bash
npm test
python -m http.server 8000
```

Then open `http://localhost:8000`.

No install step or backend is required for v1.

## Engineering standard

`01 SHAPE → 02 SPECIFY → 03 DELEGATE → 04 PROVE → 05 SHIP → 06 WATCH`

The release contract, autonomy boundary, decisions, evals, and runbook live in `.ai-build/`.

Evidence before claims. Humans retain judgement.

## License

MIT. Reuse, adapt, translate, and improve it. The goal is a civic commons: understandable, auditable and useful to organizations that cannot afford a large security team.
