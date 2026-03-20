# Component Audit Workflow

This repo now has a Playwright-based audit harness for systematic component review.

Run the full audit:

```bash
npm run audit:components
```

Limit the run to a subset of demos:

```bash
COMPONENT_AUDIT_FILTER=DataList npm run audit:components
```

What it does:

- Discovers demo routes from `src/routes/demos/*Demo.svelte`
- Visits `/svelte-contain-css/component/<Name>` for each discovered demo
- Captures full-page screenshots at mobile, tablet, and desktop widths
- Captures named interactive states for components that have audit hooks today
- Writes artifacts to a stable folder instead of relying only on Playwright attachments
- Attaches an accessibility tree snapshot for each captured state
- Records console errors, page errors, and critical request failures
- Replaces remote `loremflickr.com` images with deterministic SVG placeholders so screenshots are stable

Where to look after a run:

- Stable artifact root: `/tmp/contain-css-component-audit`
- Per-component summary manifests: `/tmp/contain-css-component-audit/<component>/summary.json`
- Playwright HTML report: `/tmp/contain-css-playwright-report/index.html`

How to use this with an agent review loop:

1. Run the audit to generate the report.
2. Open a component folder and use `summary.json` as the index for that component's screenshots and ARIA captures.
3. Review failures first because they usually indicate broken demos or runtime regressions.
4. For passing demos, inspect screenshot artifacts component-by-component and log issues in a rubric:
   - visual hierarchy
   - spacing consistency
   - mobile/container behavior
   - keyboard/focus affordances
   - theme coverage
   - missing states or edge cases
5. Turn repeated findings into targeted regression tests instead of keeping them as subjective review notes.

This is intentionally not a strict visual regression suite yet. It is a deterministic artifact generator for broad review, which is a better fit for the current state of the repo.
