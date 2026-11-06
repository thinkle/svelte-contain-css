<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type {
    BaseStyleProps,
    ContainProps,
    MarginStyleProps,
  } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    MARGIN_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLAttributes<HTMLDivElement>,
    {
      fill?: boolean;
      stretch?: boolean;
      split?: boolean;
      /**
       * Stack into a column in the small tier (a container, or viewport, of
       * 600px or less): each child takes the full width, buttons included.
       * The row you lay out for a desktop -- two panels, a pair of form
       * actions -- becomes the column a phone wants, with no breakpoint of
       * your own. Tailwind's `flex flex-col sm:flex-row`, measured against
       * the container instead of the screen.
       */
      collapse?: boolean;
      justify?: string | null;
      align?: string | null;
      gap?: string | null;
      wrap?: string | null;
      children?: Snippet;
    },
    BaseStyleProps & MarginStyleProps &
      StyleProps<typeof INLINE_VARS>
  >;

  let {
    fill = false,
    stretch = false,
    split = false,
    collapse = false,
    justify = null,
    align = null,
    gap = null,
    wrap = null,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands inline's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const INLINE_VARS = [
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...MARGIN_VARS,
  ] as const;

  const el = $derived(
    elementProps({ justify, align, gap, wrap, ...restProps }, "inline", [
      ...INLINE_VARS,
      "bg",
      "fg",
      "width",
      "height",
      "gap",
      "justify",
      "align",
      "wrap",
    ]),
  );
</script>

<div
  class={["inline", className]}
  class:fill
  class:stretch
  class:split
  class:collapse
  {...el}
>
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .inline {
    @include box-props(inline);
    @include border-props-borderless(inline);
    /* A layout helper, not a surface: padding comes only from
       --inline-padding (or the `padding` prop), never from the theme's
       --padding. box-props falls back to --padding, which is inherited, so
       without this every Inline picked up the page's padding -- or
       whatever padding an enclosing Card set. */
    --_padding: var(--inline-padding, 0);
    @include margin-props(inline);
    display: flex;
    flex-direction: row;
    /* Wraps by default, like Bar: a row of tags or choices that can't wrap
       just pushes past its container the moment the container is narrow.
       Pass wrap="nowrap" (or --inline-wrap) for a row that must stay on one
       line -- and then give its children room to shrink. */
    flex-wrap: var(--inline-wrap, wrap);
    gap: var(--inline-gap, var(--gap));
    justify-content: var(--inline-justify, flex-start);
    align-items: var(--inline-align, center);
    box-sizing: border-box;
    max-width: 100%;
    min-width: 0;
  }

  .inline.fill {
    width: 100%;
  }

  .inline.stretch {
    align-self: stretch;
  }

  .inline.split {
    justify-content: var(--inline-split-justify, space-between);
  }
  /* `collapse`: a column in the small tier. Children stretch to the full
     width -- Button holds itself to its label's width through
     --button-width, so that is reset too: a stacked action on a phone is a
     full-width one. A Button given a width of its own keeps it (the prop
     sets the variable on the button, which outranks this). */
  @include when-small {
    .inline.collapse {
      flex-direction: column;
      align-items: stretch;
      flex-wrap: nowrap;
      --button-width: 100%;
      /* A full-width button reads as one when its label is centred. */
      --button-text-align: center;
    }
    .inline.collapse > :global(*) {
      min-width: 0;
    }
  }
</style>
