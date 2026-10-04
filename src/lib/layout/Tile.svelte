<script lang="ts">
  import type { Snippet } from "svelte";
  import type {
    HTMLAttributes,
    HTMLButtonAttributes,
    HTMLInputAttributes,
  } from "svelte/elements";
  import { splitProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    MARGIN_VARS,
    TYPOGRAPHY_CONTAINER_VARS,
    type StyleProps,
  } from "$lib/styleProps";
  import type { BaseStyleProps, MarginStyleProps } from "$lib/types";

  /* The shorthands this component's own CSS backs, one group per mixin
     it includes. The Props type is derived from this same array, so what
     the component accepts and what it emits cannot drift apart. */
  const TILE_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...MARGIN_VARS,
    ...TYPOGRAPHY_CONTAINER_VARS,
  ] as const;

  type BaseProps = BaseStyleProps &
    MarginStyleProps &
    StyleProps<typeof TILE_VARS> & {
    /** Distribution along the tile's own axis, which is vertical. */
    justify?: string | null;
    /** Cross-axis alignment, which is horizontal. Centred already. */
    align?: string | null;
    /**
     * Shorthand for centring the tile's contents. Sets both axes, unlike
     * `Stack`'s `center`, because a Tile already centres horizontally -- setting
     * only the cross axis here would be a no-op and `<Tile center>` would look
     * broken.
     */
    center?: boolean;
    children?: Snippet;
  };

  type StaticTileProps = BaseProps &
    HTMLAttributes<HTMLDivElement> & {
      interactive?: false;
      selectable?: false;
      checked?: never;
    };

  type InteractiveTileProps = BaseProps &
    HTMLButtonAttributes & {
      interactive: true;
      selectable?: false;
      checked?: never;
    };

  type SelectableTileProps = BaseProps &
    HTMLInputAttributes & {
      selectable: true;
      interactive?: false;
      checked?: boolean;
    };

  type Props = StaticTileProps | InteractiveTileProps | SelectableTileProps;
  type RenderProps = { selectable?: boolean; interactive?: boolean; children?: Snippet } & Record<string, unknown>;

  let { checked = $bindable(false), ...props }: Props = $props();

  /* Props to CSS variables, the way Stack, Card, Tag and the rest do it, so a
     Tile can be aimed with `<Tile center>` rather than only a raw variable. */
  const styleProps = $derived.by(() => {
    const {
      justify = null,
      align = null,
      center = false,
      bg = null,
      fg = null,
      padding = null,
      width = null,
      height = null,
      marginBlock = null,
      marginInline = null,
    } = props as BaseProps;
    return {
      bg,
      fg,
      padding,
      width,
      height,
      marginBlock,
      marginInline,
      justify: justify ?? (center ? "center" : null),
      align: align ?? (center ? "center" : null),
    };
  });

  /* splitProps consumes the style props and `--*`, and keeps `style` out of
     the attributes; the props that are Tile's own rather than the element's
     are peeled off here first. In the selectable case the variables land on
     the label that `.tile` styles while the attributes go to the checkbox,
     which is what a caller's `aria-*` and `data-*` are describing. */
  const el = $derived.by(() => {
    const {
      selectable: _selectable,
      interactive: _interactive,
      children: _children,
      center: _center,
      class: _class,
      ...rest
    } = props as RenderProps & BaseProps & { class?: unknown };
    return splitProps({ ...rest, ...styleProps }, "tile", [
      ...TILE_VARS,
      "width",
      "height",
      "justify",
      "align",
    ]);
  });

  const className = $derived((props as { class?: any }).class);
</script>

{#if props.selectable}
  <label class={["tile", className]} style={el.style}>
    <div class="checkbox">
      <input
        type="checkbox"
        bind:checked
        {...el.attrs as HTMLInputAttributes}
      />
    </div>
    {@render props.children?.()}
  </label>
{:else if props.interactive}
  <button
    class={["tile", className]}
    style={el.style}
    {...el.attrs as HTMLButtonAttributes}
  >
    {@render props.children?.()}
  </button>
{:else}
  <div class={["tile", className]} style={el.style} {...el.attrs}>
    {@render props.children?.()}
  </div>
{/if}

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .tile {
    border: var(
      --tile-border,
      var(--border-width) var(--border-style) var(--border-color)
    );
    @include box-props-square-border(tile, surface);
    @include margin-props(tile, surface);
    @include color-props(tile, surface);
    @include typography-container-props(tile, surface);
    @include box-shadow(tile, surface);
    /* --_tile-width is resolved in the sizing block below. max-width also
       overrides the typography mixin's prose measure. */
    width: var(--_tile-width);
    max-width: var(--_tile-width);

    display: inline-flex;
    vertical-align: top;
    flex-direction: column;
    justify-content: var-with-fallbacks(--justify, tile, flex-start);
    align-items: var-with-fallbacks(--align, tile, center);
    container-type: inline-size;
    /* A Tile is a fixed-size object. Inline-size containment makes its
       min-content width zero, so as a flex item in any row that runs out of
       room (a RowContainer lane, a nowrap Inline) it would be squeezed to a
       sliver with its text spilling out. Hold the size; let the row wrap or
       scroll instead. */
    flex-shrink: 0;
  }

  button.tile,
  label.tile {
    @include clickable(tile);
  }
  button.tile {
    @include focusable();
  }
  label.tile {
    @include color-props(tile-selected);
    @include typography-props(tile-selected);
  }
  label.tile:has(:global(input:focus-visible)) {
    @include focus-ring();
  }
  /* Sizing.

     One width, declared once. There used to be two -- `--space-lg * 24`
     (192px) above and `200px` here -- and the narrower max-width quietly won,
     so tiles rendered 192px wide but 267px tall (200 * 4/3).

     The 3:4 shape is a *minimum* height rather than a fixed one, so a tile
     with more content than its shape holds grows to fit instead of spilling
     out. Set --tile-height to pin it (it sets the minimum too, or the shape
     would win over a shorter pinned height); --tile-aspect-ratio to change
     the shape.

     Not the `aspect-ratio` property: a percentage --tile-width (a tile
     filling a ColumnContainer rail) would then be 4/3 of the rail tall. As a
     calc, a percentage height against an auto-height parent resolves to
     nothing and the tile is as tall as its content, which is what those
     layouts have always relied on. */
  .tile {
    --_tile-width: var(--tile-width, calc(var(--space-lg, 8px) * 24));
    --_tile-min-height: var(
      --tile-height,
      calc(var(--_tile-width) / (var(--tile-aspect-ratio, 3 / 4)))
    );
    height: var(--tile-height, auto);
    min-height: var(--_tile-min-height);
  }
  /* Small tier (see $small-max): two tiles side by side on a phone instead of
     one 192px tile alone in a 360px row. 160px * 2 + a gap fits a 328px
     content box, i.e. a 360px phone with 16px gutters. */
  @include when-small {
    .tile {
      --_tile-width: var(
        --tile-width-small,
        var(--tile-width, calc(var(--space-lg, 8px) * 20))
      );
      height: var(--tile-height-small, var(--tile-height, auto));
      min-height: var(--tile-height-small, var(--_tile-min-height));
    }
  }

  /* Checkbox code */
  .tile {
    position: relative;
  }
  .checkbox {
    position: absolute;
    right: var-with-fallbacks(--padding, tile, surface, 4px);
    top: var-with-fallbacks(--padding, tile, surface, 4px);
    display: inline-flex;
    align-items: center;
    width: var-with-fallbacks(
      --size,
      tile-checkbox,
      checkbox,
      toggle,
      font,
      1em
    );
    height: var-with-fallbacks(
      --size,
      tile-checkbox,
      checkbox,
      toggle,
      font,
      1em
    );
    @include color-props(tile-checkbox, checkbox, toggle, secondary);
  }
  .checkbox input {
    @include visually-hidden();
  }

  label:has(:global(input:focus-visible)) {
    @include focus-ring();
  }

  .checkbox:has(:global(input:checked)) {
    @include color-props(
      tile-checkbox-checked,
      checkbox-checked,
      toggle-on,
      primary,
      checkbox
    );
  }
  .checkbox:has(:global(input:checked))::after {
    content: var(--tile-checkbox-check, var(--checkbox-check, "✓"));
    font-size: var-with-fallbacks(--size, checkbox, toggle, font, 1em);

    animation: checkbox-check var(--checkbox-transition) ease-in-out;
  }

  @keyframes checkbox-check {
    0% {
      width: 0;
      overflow: hidden;
    }
    100% {
      width: var-with-fallbacks(--size, checkbox, toggle, font, 1em);
    }
  }
</style>
