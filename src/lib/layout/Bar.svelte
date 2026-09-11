<script module lang="ts">
  let warnedDeprecatedMargin = false;
</script>

<script lang="ts">
  import { BROWSER, DEV } from "esm-env";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { BarStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    children?: Snippet;
    primary?: boolean;
    secondary?: boolean;
  } & BarStyleProps &
    HTMLAttributes<HTMLElement>;

  const { children, primary, secondary, marginTop, marginBottom, ...restProps }: Props =
    $props();

  $effect(() => {
    if (BROWSER && DEV && (marginTop != null || marginBottom != null) && !warnedDeprecatedMargin) {
      warnedDeprecatedMargin = true;
      console.warn(
        '[ContainCSS] Bar\'s marginTop/marginBottom props are deprecated. Use marginBlock instead -- e.g. marginBlock="0 1em" is the same as marginTop="0" marginBottom="1em" (the old default).',
      );
    }
  });

  /* marginTop/marginBottom become their own CSS vars here (not composed into
     one string in JS) so the CSS fallback chain below can pick them up
     however they arrive -- as these props, OR as someone setting
     --bar-margin-top/--bar-margin-bottom directly as raw CSS custom
     properties, which JS never sees at all. Composing in JS would only ever
     have covered the prop path. */
  const cssKeys = [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
    "justify",
    "align",
    "marginBlock",
    "marginInline",
    "marginTop",
    "marginBottom",
  ];

  const style = $derived(
    injectVars({ ...restProps, marginTop, marginBottom }, "bar", cssKeys),
  );
  const extraStyle = $derived(
    primary
      ? "--bar-bg: var(--primary-bg); --bar-fg: var(--primary-fg);"
      : secondary
        ? "--bar-bg: var(--secondary-bg); --bar-fg: var(--secondary-fg);"
        : "",
  );
</script>

<div class="bar" style="{style}{extraStyle}">
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .bar {
    display: flex;
    container-type: inline-size;
    flex-wrap: var(--bar-wrap, wrap);
    align-items: var(--bar-align, center);
    justify-content: var(--bar-justify, space-between);
    padding: var-with-fallbacks(--padding, bar, 8px);
    border-bottom: var(
      --bar-border-bottom,
      var-with-fallbacks(--border-width, bar, 1px)
        var-with-fallbacks(--border-style, bar, 1px)
        var-with-fallbacks(--border-color, bar, 1px)
    );
    border-top: var(
      --bar-border-top,
      var-with-fallbacks(--border-width, bar, 1px)
        var-with-fallbacks(--border-style, bar, 1px)
        var-with-fallbacks(--border-color, bar, 1px)
    );
    /* --bar-margin-block wins outright if set (by the marginBlock prop, or by
       anyone setting that CSS var directly). Otherwise composed from
       --bar-margin-top/--bar-margin-bottom -- the deprecated props, or,
       again, someone's raw CSS var -- each independently defaulting to the
       old built-in look (flush on top, 1em clear below). */
    margin-block: var(
      --bar-margin-block,
      var(--bar-margin-top, 0) var(--bar-margin-bottom, 1em)
    );
    margin-inline: var(--bar-margin-inline, 0);
    min-height: var(--bar-min-height, var(--bar-height, 3em));
    height: var(--bar-height, auto);
    max-height: var(--bar-max-height);
    @include color-props(bar, surface);
    @include typography-props-bare(bar, surface);
    gap: var-with-fallbacks(--gap, bar, 8px);
    overflow: var(--bar-overflow, visible);

    /* Reset form label width in horizontal context */
    --form-label-width: auto;
  }

  .bar :global(h1),
  .bar :global(h2),
  .bar :global(h3),
  .bar :global(h4),
  .bar :global(h5),
  .bar :global(h6) {
    margin-block-start: 0 !important;
    margin-block-end: 0 !important;
    @include color-props(bar, surface);
  }
</style>
