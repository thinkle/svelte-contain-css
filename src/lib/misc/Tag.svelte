<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps, TagStyleProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLAttributes<HTMLSpanElement>,
    {
      children?: Snippet;
      primary?: boolean;
      warning?: boolean;
      danger?: boolean;
      success?: boolean;
      info?: boolean;
      onclose?: (() => void) | null;
      /**
       * Accessible name for the close button.
       *
       * The default describes the *widget* ("close a tag"), which is rarely
       * what the action means to a user. A tag is a filter chip in one app and
       * a removable label in another, so say what pressing it does here:
       * `closeLabel="Remove Fiction"`, `closeLabel="Stop searching by author"`.
       * Including the tag's own text is what makes a list of close buttons
       * distinguishable to a screen reader.
       */
      closeLabel?: string;
    },
    TagStyleProps &
      StyleProps<typeof TAG_VARS>
  >;

  let {
    children,
    primary,
    warning,
    danger,
    success,
    info,
    onclose = null,
    closeLabel = "Remove",
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands tag's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const TAG_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "tag", TAG_VARS),
  );
</script>

<span
  class={["tag", className]}
  class:closable={!!onclose}
  class:primary
  class:warning
  class:danger
  class:success
  class:info
  {...el}
>
  {@render children?.()}{#if onclose}<button
      class="close-button"
      aria-label={closeLabel}
      onclick={onclose}><span aria-hidden="true">&times;</span></button
    >{/if}
</span>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .tag {
    display: inline-block;
    align-self: flex-start;
    vertical-align: middle;
    @include color-props(tag, secondary);
    @include typography-props-bare(tag);
    @include box-props(tag);
    font-size: var(--tag-font-size, var(--font-size-tiny, 0.75rem));
    padding: var(--tag-padding, 0.2em 0.55em);
    margin-inline-start: var(--space);
    margin-inline-end: var(--space);
  }
  /* A closable tag lays its label and button out in flow rather than absolutely
     positioning the button over the top-right corner. The old approach needed a
     literal &nbsp; in the markup to stop the button covering the last character,
     which still overlapped once a tag wrapped to two lines and put the button's
     hit area outside the padding. As a flex item the button reserves its own
     space at any length, and the gap scales with the tag's font-size. */
  .tag.closable {
    display: inline-flex;
    align-items: center;
    gap: var(--tag-close-button-gap, 0.35em);
  }
  .tag .close-button {
    background: transparent;
    color: inherit;
    box-shadow: none;
    border: none;
    padding: 0;
    margin: 0;
    /* Square, so the focus ring and pointer target read as a button rather
       than tracking the width of the glyph. */
    inline-size: var(--tag-close-button-size, 1.25em);
    block-size: var(--tag-close-button-size, 1.25em);
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--tag-close-button-border-radius, 50%);
    font-size: inherit;
    line-height: 1;
    flex: none;
    @include clickable-cursor(tag-close-button, button);
    @include clickable-affordance-transition(tag-close-button, button);
  }

  /* The affordance is a scrim mixed from the tag's own FOREGROUND, not from
     `clickable()`'s fill.

     clickable() derives its hover fill from --_background-color, which this
     button inherits from the tag. On a red tag that produced 90% red + 10%
     white -- a muddy circle a shade off the tag it sits on, reading as a
     rendering artifact rather than a control. Mixing from currentColor
     instead inverts correctly against any tag colour: a light scrim on a
     saturated tag, a dark one on the default pale tag, with no per-variant
     rules. */
  .tag .close-button::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: transparent;
    transition: background-color
      var(--tag-close-button-transition, var(--transition, 150ms));
  }
  .tag .close-button:hover::before {
    background-color: var(
      --tag-close-button-hover-bg,
      color-mix(in oklab, transparent, currentColor 18%)
    );
  }
  .tag .close-button:active::before {
    background-color: var(
      --tag-close-button-active-bg,
      color-mix(in oklab, transparent, currentColor 30%)
    );
  }

  /* WCAG 2.5.8 wants a 24x24 CSS px target. The glyph is sized in `em` so it
     stays proportional to a tag that is deliberately tiny (0.75rem), which
     left a 15x15 target. This expands the POINTER target without changing
     the visual size or the tag's height. */
  .tag .close-button::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    inline-size: max(100%, var(--tag-close-button-target-size, 24px));
    block-size: max(100%, var(--tag-close-button-target-size, 24px));
  }

  /* focus-ring()'s 3px spread shadow plus its 2px offset is sized for a button
     standing on a page; on a 15px control inside a 26px tag it ballooned well
     outside the tag.

     The room available is exactly the tag's padding-block (0.2em, ~2.4px at
     the default tag font-size) -- the button is as tall as the tag's line box,
     so there is nothing else to grow into. Hence a 2px ring at no offset: it
     reads clearly, hugs the circle, and clears the tag's edge. The scrim stays
     lit under focus so keyboard focus reads the same as pointer hover (the
     `focusable-as-hover` idea, with this component's own fill). */
  .tag .close-button:focus-visible {
    outline: var(--tag-close-button-focus-color, var(--focus-color, currentColor))
      solid var(--tag-close-button-focus-width, 2px);
    outline-offset: var(--tag-close-button-focus-offset, 0px);
    box-shadow: none;
  }
  .tag .close-button:focus-visible::before {
    background-color: var(
      --tag-close-button-hover-bg,
      color-mix(in oklab, transparent, currentColor 18%)
    );
  }
  .tag:first-child {
    margin-inline-start: 0;
  }
  .tag:last-child {
    margin-inline-end: 0;
  }
  /* Trailing `tag` keeps the variants' chains reaching a bare `tag` fallback
     (like the default .tag rule already does), so --tag-bg-mix-* / --tag-fg-mix-*
     dull or remap EVERY variant at once, not just the default. It also adds a
     --tag-bg / --tag-fg layer below the variant's own --danger-bg etc.; those
     variant tokens are always set and win first, so colors are unchanged at
     0% mix (asserted in tests/color-mix.spec.ts). */
  .tag.primary {
    @include color-props(tag-primary, primary, tag);
  }
  .tag.warning {
    @include color-props(tag-warning, warning, tag);
  }
  .tag.danger {
    @include color-props(tag-danger, danger, tag);
  }
  .tag.success {
    @include color-props(tag-success, success, tag);
  }
  .tag.info {
    @include color-props(tag-info, info, tag);
  }
</style>
