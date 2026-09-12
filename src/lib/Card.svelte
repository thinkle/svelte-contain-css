<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { CardStyleProps, ContainProps } from "$lib/types";
  import { elementProps } from "./util";

  type Props = ContainProps<
    HTMLAttributes<HTMLElement>,
    {
      header?: Snippet;
      footer?: Snippet;
      children?: Snippet;
      center?: boolean;
      fixedHeight?: boolean;
    },
    CardStyleProps
  >;

  let {
    header,
    footer,
    children,
    height,
    fixedHeight,
    center,
    class: className,
    ...restProps
  }: Props = $props();

  /* `height` is destructured (the $effect below reads it), so it has to be
     handed back explicitly -- rest props no longer carry it. */
  const el = $derived(
    elementProps({ height, ...restProps }, "card", [
      "bg",
      "fg",
      "padding",
      "width",
      "height",
      "marginBlock",
      "marginInline",
    ]),
  );

  const forceFixedHeight = (h: string | null | undefined) => {
    if (h && !fixedHeight) {
      fixedHeight = true;
    }
  };
  $effect(() => forceFixedHeight(height));

  let hasHeader = $derived(Boolean(header));
  let hasFooter = $derived(Boolean(footer));
</script>

<div class={["card", className]} class:center class:fixedHeight {...el}>
  <header class:hide={!hasHeader}>
    {#if header}{@render header()}{/if}
  </header>
  <section>
    {#if children}{@render children()}{/if}
  </section>
  <footer class:hide={!hasFooter}>
    {#if footer}{@render footer()}{/if}
  </footer>
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  /* ── Card shell ─────────────────────────────────────────── */
  .card {
    --w: var(--card-width);
    --h: var(--card-height);
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    container-type: inline-size;
    width: var(--w);
    /* Was a single `margin` shorthand (--card-margin, 16px on every side).
       Split into block/inline -- same default on each axis, so nothing
       visually changes for existing callers -- but now a caller who wants
       a header Card flush against the content below it, say, can set just
       one axis instead of fighting a 4-value margin shorthand. */
    /* The innermost fallback is the pre-marginBlock/marginInline escape
       hatch (a single --card-margin applied to both axes) rather than a bare
       16px, so anyone already setting --card-margin directly keeps working
       unchanged -- margin-block/margin-inline just give a newer, more
       specific override on top of it. */
    margin-block: var-with-fallbacks(--margin-block, card, var(--card-margin, 16px));
    margin-inline: var-with-fallbacks(--margin-inline, card, var(--card-margin, 16px));
    border-radius: var-with-fallbacks(--border-radius, card, surface, 0);
    border: var-with-fallbacks(
      --border,
      card,
      surface,
      var(--border-width) var(--border-style) var(--border-color)
    );
    @include color-props(card, surface);
    @include box-shadow(card, surface);
  }

  .card.center section {
    display: grid;
    place-content: center;
    text-align: center;
  }

  .card.fixedHeight {
    height: var(--h);
    container-type: size;
    @include custom-scrollbar(card, surface);
  }

  /* ── Card regions ───────────────────────────────────────── */
  section {
    padding: var(--padding);
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
    border-bottom: var(--card-header-border);
  }

  header {
    @include color-props(card-header, secondary);
    @include box-props-top(card-header, bar);
    display: flex;
    align-items: center;
    min-height: var-with-fallbacks(--height, card-header, bar, 2em);
  }

  header,
  footer {
    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6) {
      margin-block-start: 0 !important;
      margin-block-end: 0 !important;
      @include color-props(card-header, secondary);
    }
  }

  footer {
    @include color-props(card-footer, secondary);
    @include box-props-bottom(card-footer, bar);
    min-height: var-with-fallbacks(--height, card-footer, bar, 2em);
  }

  section {
    flex-grow: 1;
    line-height: var(--line-height);
    max-width: var(--line-width);
    width: 100%;
    box-sizing: border-box;
    @include color-props(card-content, surface);
    @include box-props(card-content);
    @include typography-container-props(card, surface);
  }

  /* ── Container queries ──────────────────────────────────── */
  /* NOTE: .card targets the *parent* container; children target the card itself */

  /* Parent context: small — adjust card sizing vars */
  @container (max-width: 600px) {
    .card {
      --w: var(--card-width-small);
      --h: var(--card-height-small);
      --sidebar-width: calc(var(--card-width-small) - var(--_padding) * 2);
    }
  }

  /* Card itself: narrow (≤ --card-width-small: 250px) — tighten typography and spacing */
  @container (max-width: 300px) {
    .card section {
      font-size: var(--card-font-size-small, calc(0.875 * var(--_font-size)));
    }
    .card header,
    .card section {
      padding: var(--card-padding-small, calc(0.75 * var(--_padding, 8px)));
    }
    .card header {
      height: var(--card-header-height-small, 2.5em);
    }
    .card footer {
      height: var(--card-footer-height-small, 2.5em);
      padding: var(
        --card-footer-padding-small,
        calc(0.75 * var(--_padding, 8px))
      );
    }
  }

  /* Card itself: wide (≥ --card-width-large: 600px) — expand typography and spacing */
  @container (min-width: 500px) {
    .card section {
      font-size: var(--card-font-size-large, calc(1.125 * var(--_font-size)));
    }
    .card header,
    .card section {
      padding: var(--card-padding-large, calc(1.25 * var(--_padding, 8px)));
    }
    .card header {
      height: var(--card-header-height-large, 3em);
    }
    .card footer {
      height: var(--card-footer-height-large, 3em);
      padding: var(
        --card-footer-padding-large,
        calc(1.25 * var(--_padding, 8px))
      );
    }
  }

  /* Parent context: large — expand card sizing vars */
  @container (min-width: 1921px) {
    .card {
      --w: var(--card-width-large);
      --h: var(--card-height-large);
    }
  }

  .hide {
    display: none;
  }
</style>
