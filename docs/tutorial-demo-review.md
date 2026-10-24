# Tutorial typography and demo rhythm

## What landed

The earlier sweep was not lost. `830dcdb` ("Examples own their captions;
TextLayout's marginInline places its text") is already an ancestor of `svelte5`.
It restored example-owned captions, let prose-placement variables govern heading
placement, and applied `--prose-margin-inline: 0` to standalone component pages.

Its rollout was incomplete: the dynamically selected demos on the main tutorial
page did not receive that policy. Several demos also still used headings as
containers for explanatory paragraphs, put titles inside blurbs, or left
example captions outside DemoWithCode entirely.

Dedicated `/tests/...` fixtures intentionally demonstrate library defaults.
TextLayout still centers its reading measure by default; changing that globally
would have changed consumer applications rather than fixing the tutorial.

## This sweep

- Scope start-aligned prose to the main tutorial content, matching standalone
  component pages. Preserve the header/hero layout and reset the policy inside
  live preview panels, as DemoWithCode already did.
- Separate example headings from explanatory blurbs across 17 demo modules.
  Move GridLayout and ColorMix example captions into their example blocks and
  add concise titles to previously unnamed examples. General introductions
  remain page-level prose.
- Present each Dialog and Tooltip concept in its own DemoWithCode, so the same
  title/caption/controls/preview/source rhythm applies to overlays too. Keep all
  three dialog behaviors, tooltip positioning, rich content, small targets,
  wrapper/text targets, host-style isolation, and disabled-action examples.
- Use TextLayout's figure spacing when available; otherwise use `--gap-xl`
  between standalone examples. Previously those standalone blocks could touch.
  Explicit `marginBlock` and `--demo-with-code-margin-block` still win.
- Make the tooltip confirmation state reactive and place its checkbox in the
  inputArea snippet. It now updates the action and source while Source is open.

These are intentional documentation presentation and demo-interaction changes.
There are no changes to exported library components or their default typography.

## Verification

Regression tests compare the main tutorial with standalone documentation, keep
headings and blurbs in their intended regions, exercise Demo/Source/Side by Side,
verify source updates while visible, preserve default preview centering, and
check narrow-page spacing/overflow. Existing TextLayout breakout/spacing tests
remain unchanged. The component audit also covers Card, DataList, Dialog,
DropdownMenu, GridLayout and Tooltip at mobile, tablet and desktop widths,
including modal and menu states. Light/dark and narrow layouts were reviewed in
the browser.
