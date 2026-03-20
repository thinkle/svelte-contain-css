# Review Harness

This harness is for focused agent iteration, not broad demo-site crawling.

Current proof of concept:

- Route: `/review/[theme]/app/[scenario]`
- Scenario: `/review/light/app/incredible-app-shell`
- Capture script: `npm run capture:review`

## Output

The capture script writes readable artifacts directly to:

```text
artifacts/app/<scenario>/<theme>/
```

For the proof of concept that means:

```text
artifacts/app/incredible-app-shell/light/page.png
artifacts/app/incredible-app-shell/light/menu-open.png
artifacts/app/incredible-app-shell/light/manifest.json
```

## Conventions

Review routes can declare stable targets and actions:

- `data-audit-target="page"`: baseline screenshot target
- `data-audit-target="<name>"`: named screenshot target after interaction
- `data-audit-action="<name>"`: an element Playwright should click once

Current behavior:

1. Visit the review route.
2. Capture `page.png` from `data-audit-target="page"`.
3. Reload the route and click each `data-audit-action` independently.
4. Capture any newly visible named targets.
5. If an action does not reveal a named target, capture a viewport screenshot named after the action.

## Usage

Default run:

```bash
npm run capture:review
```

Specific theme or scenario:

```bash
npm run capture:review -- --theme=dark --scenario=incredible-app-shell
```

Custom base URL:

```bash
npm run capture:review -- --base-url=http://127.0.0.1:4173/svelte-contain-css
```

## Why This Exists

The existing component demos are good for exploration, but noisy for automated review because they include variable editors, code samples, and extra UI chrome.

This harness is meant to support a tighter loop:

1. Build a dedicated review route for a component or app scenario.
2. Capture a small, named artifact set.
3. Let an agent inspect those specific screenshots and iterate.

The next logical extension is a parallel route family for:

```text
/review/[theme]/component/[component]
```
