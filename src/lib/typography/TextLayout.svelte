<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps, MarginStyleProps } from "$lib/types";
  import { elementProps } from "$lib/util";

  type Props = ContainProps<
    HTMLAttributes<HTMLDivElement>,
    {
      id?: string;
      children?: import("svelte").Snippet;
    },
    MarginStyleProps
  >;

  let { id = "", children, class: className, ...restProps }: Props = $props();

  const el = $derived(
    elementProps(restProps, "text-layout", ["marginBlock", "marginInline"]),
  );
</script>

<div {id} class={className} {...el}>
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  div {
    @include typography-container-props(body, text);
    @include typography-props(body, text);
    width: var(--text-width, var(--body-width, 100%));
    /* Not margin-props() (_box.scss): that defaults both axes to 0, but a
       TextLayout has always centred itself horizontally by default. Same
       var-with-fallbacks() shape as everywhere else, just inline defaults to
       auto instead of 0 -- marginBlock is new and does default to 0, same as
       every other component. */
    margin-inline: var-with-fallbacks(--margin-inline, text-layout, auto);
    margin-block: var-with-fallbacks(--margin-block, text-layout, 0);
    padding-inline: var(--text-padding, var(--padding));
  }

  div :global(a) {
    color: var(
      --body-link-fg,
      var(--text-link-fg, var(--link-fg, currentColor))
    );
    background-color: var(
      --body-link-bg,
      var(--text-link-bg, var(--link-bg, transparent))
    );
    text-decoration: var(
      --body-link-text-decoration,
      var(--text-link-text-decoration, underline)
    );
    text-decoration-thickness: var(
      --body-link-text-decoration-thickness,
      var(--text-link-text-decoration-thickness, auto)
    );
    text-underline-offset: var(
      --body-link-underline-offset,
      var(--text-link-underline-offset, 0.2em)
    );
    transition:
      color 120ms ease,
      background-color 120ms ease;
    @include focusable();
  }

  div :global(a:hover),
  div :global(a:focus-visible) {
    color: var(
      --body-link-hover-fg,
      var(
        --text-link-hover-fg,
        var(--link-hover-fg, var(--link-fg, currentColor))
      )
    );
    background-color: var(
      --body-link-hover-bg,
      var(
        --text-link-hover-bg,
        var(--link-hover-bg, var(--link-bg, transparent))
      )
    );
  }

  div :global(code) {
    @include typography-props(code);
    text-wrap: nowrap;
  }

  /* Everywhere else, heading styling is consumed once, globally, by the
     :where()-scoped rule in vars/typography-context.css -- zero specificity, so
     any real selector easily overrides it. TextLayout is the one exception:
     using <TextLayout> IS the explicit request for prose styling, so it
     restates the same properties here with real specificity (this rule gets
     Svelte's scoping class, same as any other `div` selector in this file),
     reading the SAME private vars it just set above via
     typography-container-props(body, text) -- no fallback chain recomputed,
     just consumed a second time by a selector that actually wins against
     incidental external CSS. */
  @each $level in h1, h2, h3, h4, h5, h6 {
    div :global(#{$level}) {
      box-sizing: border-box;
      max-width: var(--_heading-max-width);
      margin-inline: var(--_heading-margin-inline);
      margin-bottom: var(--_heading-margin-bottom);
      margin-top: var(--_heading-margin-top);
      color: var(--_#{$level}-color);
      background: var(--_#{$level}-background);
      padding: var(--_#{$level}-padding);
      border: var(--_#{$level}-border);
      border-width: var(--_#{$level}-border-width);
      border-style: var(--_#{$level}-border-style);
      border-color: var(--_#{$level}-border-color);
      border-radius: var(--_#{$level}-border-radius);
      box-shadow: var(--_#{$level}-box-shadow);
      font-family: var(--_#{$level}-font-family);
      text-transform: var(--_#{$level}-text-transform);
      text-decoration: var(--_#{$level}-text-decoration);
      font-size: var(--_#{$level}-font-size);
      font-weight: var(--_#{$level}-font-weight);
      line-height: var(--_#{$level}-line-height);
      letter-spacing: var(--_#{$level}-letter-spacing);
      text-indent: var(--_#{$level}-text-indent);
      font-variant: var(--_#{$level}-font-variant);
      text-align: var(--_#{$level}-text-align);
    }
  }

  div :global(h1:first-child),
  div :global(h2:first-child),
  div :global(h3:first-child),
  div :global(h4:first-child),
  div :global(h5:first-child),
  div :global(h6:first-child) {
    margin-top: var(--_heading-first-margin-top);
  }

  /* Same real-specificity restatement for the prose/paragraph groups, reading
     the vars typography-container-props(body, text) already set above. */
  div :global(p),
  div :global(blockquote),
  div :global(dl),
  div :global(ul),
  div :global(ol) {
    max-width: var(--_prose-max-width);
    margin-inline: var(--_prose-margin-inline);
    font-family: var(--_prose-font-family);
    line-height: var(--_prose-line-height);
    font-weight: var(--_prose-font-weight);
  }

  div :global(p) {
    font-family: var(--_paragraph-font-family);
    text-transform: var(--_paragraph-text-transform);
    text-decoration: var(--_paragraph-text-decoration);
    font-size: var(--_paragraph-font-size);
    font-weight: var(--_paragraph-font-weight);
    line-height: var(--_paragraph-line-height);
    letter-spacing: var(--_paragraph-letter-spacing);
    text-indent: var(--_paragraph-text-indent);
    font-variant: var(--_paragraph-font-variant);
    text-align: var(--_paragraph-text-align);
  }

  div :global(p:first-of-type),
  div :global(h1 + p),
  div :global(h2 + p),
  div :global(h3 + p),
  div :global(h4 + p),
  div :global(h5 + p),
  div :global(h6 + p) {
    font-family: var(--_first-paragraph-font-family);
    text-transform: var(--_first-paragraph-text-transform);
    text-decoration: var(--_first-paragraph-text-decoration);
    font-weight: var(--_first-paragraph-font-weight);
    letter-spacing: var(--_first-paragraph-letter-spacing);
    text-indent: var(--_first-paragraph-text-indent);
    font-variant: var(--_first-paragraph-font-variant);
    text-align: var(--_first-paragraph-text-align);
    font-size: var(--_first-paragraph-font-size);
    line-height: var(--_first-paragraph-line-height);
    margin-block-start: var(--_first-paragraph-margin-top);
  }

  div :global(p:first-of-type::first-line),
  div :global(h1 + p::first-line),
  div :global(h2 + p::first-line),
  div :global(h3 + p::first-line),
  div :global(h4 + p::first-line),
  div :global(h5 + p::first-line),
  div :global(h6 + p::first-line) {
    font-family: var(--_first-line-font-family);
    text-transform: var(--_first-line-text-transform);
    text-decoration: var(--_first-line-text-decoration);
    font-size: var(--_first-line-font-size);
    font-weight: var(--_first-line-font-weight);
    line-height: var(--_first-line-line-height);
    letter-spacing: var(--_first-line-letter-spacing);
    text-indent: var(--_first-line-text-indent);
    font-variant: var(--_first-line-font-variant);
    text-align: var(--_first-line-text-align);
  }

  div :global(p:first-of-type::first-letter),
  div :global(h1 + p::first-letter),
  div :global(h2 + p::first-letter),
  div :global(h3 + p::first-letter),
  div :global(h4 + p::first-letter),
  div :global(h5 + p::first-letter),
  div :global(h6 + p::first-letter) {
    font-family: var(--_first-letter-font-family);
    text-transform: var(--_first-letter-text-transform);
    text-decoration: var(--_first-letter-text-decoration);
    font-size: var(--_first-letter-font-size);
    font-weight: var(--_first-letter-font-weight);
    line-height: var(--_first-letter-line-height);
    letter-spacing: var(--_first-letter-letter-spacing);
    text-indent: var(--_first-letter-text-indent);
    font-variant: var(--_first-letter-font-variant);
    text-align: var(--_first-letter-text-align);
    --link-bg: var(--_first-letter-link-bg);
    --link-fg: var(--_first-letter-link-fg);
    background: var(--_first-letter-background);
    color: var(--_first-letter-color);
    float: var(--first-letter-float, none);
    margin-right: var(--first-letter-margin-right, 0);
    padding-top: var(--first-letter-padding-top, 0);
  }
</style>
