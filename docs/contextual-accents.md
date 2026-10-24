# Links and paragraph accents

Default links tint the inherited text color 10% toward `--link-color`, falling
back to `--primary-color`. This keeps a primary-colored bar from painting its
links in the same color as its background. Links retain their underline.
Bootstrap sets `--link-text-amount: 0%`: its
white-on-primary pair is already at the contrast threshold, so links keep the
full foreground there.

- `--link-color` chooses the tint target; `--link-hover-color` chooses the hover/focus
  target. Bundled themes use these for their link hues.
- `--link-text-amount` chooses its share, ahead of `--text-amount` and the 10% default.
- `--link-fg` chooses an exact foreground, bypassing the tint. Existing component
  overrides such as `--bar-link-fg`, `--surface-link-fg`, and `--container-link-fg`
  keep their existing precedence.

The mix uses `currentColor` in the link's `color` declaration, where it means
the inherited foreground. It follows nested surfaces, heading foregrounds,
and plain wrappers that set `color`, without adding another tone block to
each surface. A tint is not an automatic contrast algorithm; explicit targets
and amounts remain the theme author's choice.

Fancy Paragraphs uses the same approach for first letters, with
`--first-letter-text-amount` ahead of `--text-amount` and a 10% default.
Exact `--first-letter-fg` and component-prefixed first-letter foregrounds still
win. A root alias to a resolved surface tone freezes too early; a paragraph-local
alias arrives too late for context variables already computed on its container.
An unresolved `currentColor` mix reaches the actual first letter correctly.

Use paragraphs for prose. Eyebrows, kickers, dates/read times, live status
messages, and groups of controls need their own markup, so paragraph treatments
apply to actual paragraphs rather than incidental layout wrappers.

Canyon's filled primary background is slightly darker clay (`#a54e30`, previously
`#b85c38`) to support its cream foreground and accented links. Its brighter
`--primary-color` tint target is unchanged. The old cream/clay pair itself was
below 4.5:1, even before tinting a link.
