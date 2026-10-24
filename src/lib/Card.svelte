<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { CardStyleProps, ContainProps } from "$lib/types";
  import { elementProps } from "./util";
  import {
    COLOR_VARS,
    TYPOGRAPHY_CONTAINER_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLAttributes<HTMLElement>,
    {
      header?: Snippet;
      footer?: Snippet;
      children?: Snippet;
      center?: boolean;
      fixedHeight?: boolean;
    },
    CardStyleProps &
      StyleProps<typeof CARD_VARS>
  >;

  let {
    header,
    footer,
    children,
    width,
    height,
    fixedHeight,
    center,
    class: className,
    ...restProps
  }: Props = $props();

  /* `width` and `height` are destructured (the $effect below reads
     height), so they have to be handed back explicitly -- rest props no
     longer carry them. */
  /* The shorthands card's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const CARD_VARS = [
    ...COLOR_VARS,
    ...TYPOGRAPHY_CONTAINER_VARS,
  ] as const;

  /* A width or height passed as a prop is the size this card *is*, in
     every tier: `<Card height="340px">` stays 340px in a narrow pane. The
     --card-width / --card-height variables are defaults the small and
     large tiers may swap out; the props also set these private pins,
     which every tier reads first. */
  const pins = $derived(
    (width ? `--_card-width: ${width};` : "") +
      (height ? `--_card-height: ${height};` : ""),
  );

  const el = $derived(
    elementProps(
      { width, height, ...restProps },
      "card",
      [
        ...CARD_VARS,
        "padding",
        "width",
        "height",
        "marginBlock",
        "marginInline",
      ],
      pins,
    ),
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
    --w: var(--_card-width, var(--card-width));
    --h: var(--_card-height, var(--card-height));
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    container-type: inline-size;
    width: var(--w);
    /* --card-width is the size a Card *wants*; it never gets to push past
       its container. `stretch` is "whatever the parent leaves after my
       margins", so a 250px card in a 200px pane just becomes a narrower
       card -- whose own container queries then take it from there. The
       prefixed lines cover browsers that only know the old keyword. */
    max-width: 100%;
    max-width: -moz-available;
    max-width: -webkit-fill-available;
    max-width: stretch;
    /* Was a single `margin` shorthand (--card-margin, 16px on every side).
       Split into block/inline -- same default on each axis, so nothing
       visually changes for existing callers -- but now a caller who wants
       a header Card flush against the content below it, say, can set just
       one axis instead of fighting a 4-value margin shorthand. */
    /* The innermost fallback is the pre-marginBlock/marginInline escape
       hatch (a single --card-margin applied to both axes) rather than a bare
       16px, so anyone already setting --card-margin directly keeps working
       unchanged -- margin-block/margin-inline just give a newer, more
       specific override on top of it. Under that, a Card placed straight in
       a TextLayout's flow is a figure and takes its figure spacing. */
    margin-block: var-with-fallbacks(
      --margin-block,
      card,
      var(--card-margin, var(--_figure-margin-block, 16px))
    );
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
    /* safe: a fixedHeight body that overflows scrolls from its top, rather
       than centring and pushing its first lines out of reach. */
    place-content: safe center;
    text-align: center;
  }

  /* A fixed-height card keeps its header and footer in view and scrolls
     only its body. */
  .card.fixedHeight {
    height: var(--h);
    container-type: size;
    overflow: hidden;
  }
  .card.fixedHeight section {
    min-height: 0;
    @include custom-scrollbar(card, surface);
  }

  /* ── Card regions ───────────────────────────────────────── */
  /* The size pins belong to this card alone: without this, a Card nested
     in one with a `width` would inherit that width as its own. */
  header,
  section,
  footer {
    --_card-width: initial;
    --_card-height: initial;
  }

  section {
    padding: var(--padding);
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
    border-bottom: var(--card-header-border);
  }

  header {
    @include color-props(card-header, secondary);
    @include box-props-top(card-header, bar);
    @include border-props-borderless(card-header, bar);
    display: flex;
    align-items: center;
    /* Header and footer never shrink: in a fixedHeight card that is too
       short, the body gives up the room and scrolls, rather than flexbox
       squeezing the bars down to their min-height and clipping their text. */
    flex-shrink: 0;
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
    @include border-props-borderless(card-footer, bar);
    /* Centred in its min-height like the header, but a column, so footer
       content that was several blocks stays stacked. */
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
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
    @include border-props-borderless(card-content);
    @include typography-container-props(card, surface);
  }

  /* ── Type that follows the card's width ─────────────────── */
  /* The same card reads larger as the one thing across a wide page than at the
     bottom of a 300px sidebar; see fluid-font-size() for the scale and its
     floors. Headings follow, since their default sizes are in em. The
     footer is a caption: it starts a step under the body
     (--card-footer-font-size, 0.875em) and slides from there, down to the
     caption floor. Turn it off with --card-font-size-slope: 0. */
  header {
    /* The card's own size: only the body has a --card-font-size of its
       own; a header or footer reading --_font-size would get whatever an
       ancestor left there. */
    @include fluid-font-size(card, 1em);
  }
  section {
    @include fluid-font-size(card, var(--_font-size, 1em));
  }
  footer {
    @include fluid-font-size(card, var(--card-footer-font-size, 0.875em), caption);
  }

  /* ── Container queries ──────────────────────────────────── */
  /* NOTE: .card targets the *parent* container; children target the card itself */

  /* Parent context: small (the shared small tier, $small-max).

     A narrow pane on a wide screen snaps the card down to its small size --
     the visible "this card responds to its container" step. Never `100%`
     here: the tier starts at 600px, where a 420px card still fits, so
     "fill" made a card *grow* as its container shrank past 600.

     A narrow viewport (a phone) fills instead: a 250px card adrift in a
     390px screen helps nobody. This comes after the container query so it
     wins on a phone, and it also covers a Card with no container ancestor.
     An explicit --card-width-small still wins in both. */
  @container (max-width: #{$small-max}) {
    .card {
      --w: var(--_card-width, var(--card-width-small, 250px));
      --h: var(--_card-height, var(--card-height-small));
      --sidebar-width: calc(var(--card-width-small, 250px) - var(--_padding) * 2);
    }
  }
  @media (max-width: #{$small-max}) {
    .card {
      --w: var(--_card-width, var(--card-width-small, 100%));
      --h: var(--_card-height, var(--card-height-small));
    }
  }

  /* Card itself: narrow (≤ --card-width-small: 250px) — tighten typography and spacing */
  @container (max-width: 300px) {
    .card section {
      /* A fixed size for the narrow tier, if you want one instead of the
         sliding scale above. */
      font-size: var(--card-font-size-small, var(--_fluid-font-size));
    }
    .card header,
    .card section {
      padding: var(--card-padding-small, calc(0.75 * var(--_padding, 8px)));
    }
    .card header {
      min-height: var(--card-header-height-small, 2.5em);
    }
    .card footer {
      min-height: var(--card-footer-height-small, 2.5em);
      padding: var(
        --card-footer-padding-small,
        calc(0.75 * var(--_padding, 8px))
      );
    }
  }

  /* Card itself: wide (≥ --card-width-large: 600px) — expand typography and spacing */
  @container (min-width: 500px) {
    .card section {
      /* A fixed size for the wide tier, if you want one instead of the
         sliding scale above. */
      font-size: var(--card-font-size-large, var(--_fluid-font-size));
    }
    .card header,
    .card section {
      padding: var(--card-padding-large, calc(1.25 * var(--_padding, 8px)));
    }
    .card header {
      min-height: var(--card-header-height-large, 3em);
    }
    .card footer {
      min-height: var(--card-footer-height-large, 3em);
      padding: var(
        --card-footer-padding-large,
        calc(1.25 * var(--_padding, 8px))
      );
    }
  }

  /* Parent context: large — expand card sizing vars */
  @container (min-width: 1921px) {
    .card {
      --w: var(--_card-width, var(--card-width-large));
      --h: var(--_card-height, var(--card-height-large));
    }
  }

  .hide {
    display: none;
  }
</style>
