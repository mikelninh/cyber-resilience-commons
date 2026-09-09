# Cyber Resilience Commons

**A free, open-source resilience planning, dependency-mapping and tabletop exercise tool for cities, hospitals, schools, nonprofits and small organizations.**

Cyber Resilience Commons helps non-specialists answer three practical questions:

> If one account, device, vendor, or cloud session is compromised, how far could the incident spread — and what should we fix first?

> What identities, services, data, vendors and owners depend on one another — and where is accountability unclear?

> If that happened today, would our team know who decides, who contains it, what must keep running, and how we recover?

The project uses transparent, deterministic **synthetic scenarios** and browser-local planning data to model blast radius, compare defensive boundaries, map declared dependencies, rehearse team decisions, plan recovery, and produce actionable briefs.

## What you can do

### Resilience simulator
- Start from City, Hospital, School, NGO, or Small Business.
- Customize basic organization assumptions without sending them to a server.
- Rehearse stolen credentials, ransomware, vendor compromise, bulk exfiltration, and stolen SaaS/OAuth sessions.
- Turn defensive boundaries on/off and rerun the *same* scenario.
- See where the modeled path is contained and what impact occurs before containment.
- Get the highest-leverage missing boundaries across all scenarios.
- See a concrete suggestion for how each boundary could be proven in an owned or explicitly authorized environment.
- Download or print a resilience brief.

### Organization dependency map
- Map **Identity → Service → Data → Vendor → Owner** relationships without scanning infrastructure.
- Start from five reusable synthetic organization maps.
- Rename nodes, change criticality, add planning notes, add/remove nodes and relationships.
- Trace downstream declared dependencies from an assumed problem node.
- Surface critical nodes, accountable owners and ownership gaps.
- Save the map only in the current browser or download it as Markdown.
- Reuse the saved dependency context automatically in the tabletop drill.

### Team tabletop drill
- Run a 15–30 minute facilitated exercise in the browser.
- Assign practical roles: incident lead, IT/security, operations, communications, privacy/legal.
- Reveal the synthetic incident one inject at a time rather than reading ahead.
- Pull critical services, vendors and owners from the saved browser-local dependency map.
- Record who owns each decision and what the team does next.
- Keep the decision log browser-local.
- Download an after-action review with dependency context, lessons, proof questions, and improvement prompts.

## What it is

- A public-interest cyber resilience simulator and planning tool.
- A browser-local organizational dependency mapper.
- A lightweight team exercise for organizations without a large security program.
- A way to rehearse `MAP → ASSUME → CONTAIN → RECOVER → PROVE → SHARE`.
- A transparent set of reusable organization templates and incident scenarios.
- A practical bridge between security language and decisions leaders can understand.

## What it is not

- Not a penetration test.
- Not a vulnerability scanner against real organizations.
- Not an asset-discovery or infrastructure-probing tool.
- Not a certification or a claim that an organization is secure.
- Not based on confidential Berlin infrastructure information.

All included scenarios, impact values, organizations, dependency maps, and recovery times are synthetic planning assumptions unless a user explicitly customizes browser-local planning data. Real-world validation must only be performed in systems the tester owns or is explicitly authorized to assess.

## First reference scenario

The first template is a **synthetic city/public-administration environment**, motivated by recent ransomware and data-exfiltration incidents affecting public institutions. It is designed to be reusable by any municipality and does not represent Berlin's actual network.

## Run locally

```bash
npm test
python -m http.server 8000
```

Then open:
- `http://localhost:8000/` — resilience simulator
- `http://localhost:8000/map.html` — organization dependency map
- `http://localhost:8000/tabletop.html` — team tabletop drill

No install step or backend is required.

## Engineering standard

`01 SHAPE → 02 SPECIFY → 03 DELEGATE → 04 PROVE → 05 SHIP → 06 WATCH`

The release contract, autonomy boundary, decisions, evals, and runbook live in `.ai-build/`.

Evidence before claims. Humans retain judgement.

## Deployment status

The app includes deterministic CI plus a GitHub Pages workflow with tests-before-deploy and live smoke checks for the simulator, dependency map, and tabletop drill. GitHub Pages must be enabled once in repository settings before the first public deployment can succeed.

## License

MIT. Reuse, adapt, translate, and improve it. The goal is a civic commons: understandable, auditable and useful to organizations that cannot afford a large security team.
