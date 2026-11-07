<script module lang="ts">
  import { surfaceVars } from "$lib/surfaceVars";

  export type SurfaceTier =
    | "background"
    | "surface"
    | "surface-raised"
    | "surface-sunken"
    | "surface-overlay"
    | "inverse";

  /* Every role transport variable surfaceVars() can write for this
     component, set to `initial` when this Surface has no role of its own.
     They inherit, so without this a Surface nested in a `colorRole="primary"`
     Surface would read its parent's role and paint primary too. */
  const ROLE_RESET =
    surfaceVars("none", "paint")
      .split(";")
      .map((d) => d.split(":")[0].trim())
      .filter(Boolean)
      .map((name) => `${name}: initial`)
      .join("; ") + ";";
</script>

<!-- Generic over the element it renders, so `as="details"` accepts `open`,
     `as="dialog"` its attributes, and so on -- and a typo still fails. -->
<script lang="ts" generics="E extends keyof SvelteHTMLElements = 'div'">
  import type { Snippet } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import { COLOR_VARS, type StyleProps } from "$lib/styleProps";

  /* Colors only: the one mixin this component includes is color-props. No
     padding, margin, border, overflow or container-type -- see the style
     block for why each of those would break what Surface is for. */
  const SURFACE_VARS = [...COLOR_VARS] as const;

  type Props = ContainProps<
    SvelteHTMLElements[E],
    {
      /** The neutral tier this element paints. Default `surface`. */
      tier?: SurfaceTier;
      /** A role (`primary`, `info`...) or one your app defines with its own
          `--<role>-bg` / `--<role>-fg`. Wins over `tier`. Named so it can't
          be confused with the ARIA `role` attribute, which still forwards. */
      colorRole?: string | null;
      /** The element to render. Default `div`. */
      as?: E;
      children?: Snippet;
    },
    StyleProps<typeof SURFACE_VARS>
  >;

  let {
    tier = "surface",
    colorRole = null,
    as = "div" as E,
    bg,
    fg,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* A Surface's colors are its own, never an ancestor Surface's: reset the
     component-level pair and the role transport unless this one sets them.
     (A consumer's own `style="--paint-bg: …"` still wins: it comes last.) */
  const ownVars = $derived(
    [
      bg == null ? "--paint-bg: initial;" : "",
      fg == null ? "--paint-fg: initial;" : "",
      colorRole ? surfaceVars(colorRole, "paint") : ROLE_RESET,
    ].join(" "),
  );

  const el = $derived(
    elementProps({ bg, fg, ...restProps }, "paint", SURFACE_VARS, ownVars),
  );
</script>

<svelte:element this={as} class={["paint", `tier-${tier}`, className]} {...el}>
  {@render children?.()}
</svelte:element>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  /* The component prefix is `paint`, not `surface`: `surface` is a family
     name, and color-props() would read it as the compiled tier rather than
     as this component's own `--paint-bg` / `--paint-fg`.

     Deliberately absent, because each one breaks a descendant:
     - overflow (Card's overflow-x: hidden, Container's overflow: auto) makes
       this element the scroll container of every `position: sticky`
       descendant, so a sticky Table head stops sticking to the page;
     - container-type adds size containment, which changes intrinsic sizing
       and lets container queries inside resolve against this box;
     - padding, margin, border change the box the consumer already laid out.
     A Surface must be swappable for the plain div it replaces. */
  @each $tier in background, surface, surface-raised, surface-sunken,
    surface-overlay, inverse
  {
    .paint.tier-#{$tier} {
      @include color-props(paint, $tier);
      /* Headings inside resolve this surface's pins, not those of the
         typography container around it. */
      @include heading-color-rebase;
    }
  }
</style>
