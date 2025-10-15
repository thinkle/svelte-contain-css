<script lang="ts">
  import { injectVars } from "./util";
  import type { Snippet } from "svelte";

  let {
    header,
    footer,
    children,
    height = "",
    fixedHeight,
    center,
    ...restProps
  }: {
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
    center?: boolean;
    height?: string;
    fixedHeight?: boolean;
    [key: string]: any;
  } = $props();

  let cssVars = injectVars({ height, ...restProps }, "card", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
  ]);

  const forceFixedHeight = (h: string) => {
    if (h && !fixedHeight) {
      fixedHeight = true;
    }
  };
  $effect(() => forceFixedHeight(height));

  let hasHeader = $derived(Boolean(header));
  let hasFooter = $derived(Boolean(footer));
</script>

<div class="card" class:center class:fixedHeight style={cssVars}>
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
  @import "$lib/sass/_mixins.scss";
  .card {
    --w: var(--card-width);
    --h: var(--card-height);
    @include box-shadow(card, container);
    @include color-props(card, container);
    border-radius: var-with-fallbacks(--border-radius, card, container, 0);
    border: var-with-fallbacks(
      --border,
      card,
      container,
      var(--border-width) var(--border-style) var(--border-color)
    );
    display: flex;
    flex-direction: column;
    margin: var-with-fallbacks(--margin, card, 16px);
  }
  .card section {
    flex-grow: 1;
    @include typography-container-props(card, container);
  }
  @container (max-width: 600px) {
    .card {
      --w: var(--card-width-small);
      --h: var(--card-height-small);
      --sidebar-width: calc(var(--card-width-small) - var(--padding) * 2);
    }
  }
  @container (min-width: 1921px) {
    .card {
      --w: var(--card-width-large);
      --h: var(--card-height-large);
    }
  }

  .card.center {
    display: grid;
    place-content: center;
  }
  .card {
    overflow-x: hidden;
    container-type: inline-size;
    width: var(--w);
  }
  .card section {
    line-height: var(--line-height);
    max-width: var(--line-width);
    width: calc(100% - var-with-fallbacks(--padding, card, container));
  }

  .card.fixedHeight {
    height: var(--h);
    container-type: size;
    @include custom-scrollbar(card, container);
  }

  header,
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
    height: var-with-fallbacks(--height, card-header, bar, 2em);
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
    height: var-with-fallbacks(--height, card-header, bar, 2em);
  }
  .hide {
    display: none;
  }
</style>
