<script lang="ts">
  import type { Snippet } from "svelte";
  import type {
    HTMLAttributes,
    HTMLButtonAttributes,
    HTMLInputAttributes,
  } from "svelte/elements";
  import { injectVars } from "$lib/util";
  import type { BaseStyleProps } from "$lib/types";

  type BaseProps = BaseStyleProps & {
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
    } = props as BaseProps;
    return {
      bg,
      fg,
      padding,
      width,
      height,
      justify: justify ?? (center ? "center" : null),
      align: align ?? (center ? "center" : null),
    };
  });

  const style = $derived(
    injectVars(styleProps, "tile", [
      "bg",
      "fg",
      "padding",
      "width",
      "height",
      "justify",
      "align",
    ]) + ((props as { style?: string }).style ?? ""),
  );

  /** Everything that is ours rather than the element's. */
  function stripOwnProps(value: RenderProps) {
    const {
      selectable: _selectable,
      interactive: _interactive,
      children: _children,
      justify: _justify,
      align: _align,
      center: _center,
      bg: _bg,
      fg: _fg,
      padding: _padding,
      width: _width,
      height: _height,
      style: _style,
      ...rest
    } = value as RenderProps & BaseProps & { style?: string };
    return rest;
  }

  function getSelectableInputProps(value: RenderProps): HTMLInputAttributes {
    return stripOwnProps(value) as HTMLInputAttributes;
  }

  function getInteractiveButtonProps(value: RenderProps): HTMLButtonAttributes {
    return stripOwnProps(value) as HTMLButtonAttributes;
  }
</script>

{#if props.selectable}
  <label class="tile" {style}>
    <div class="checkbox">
      <input type="checkbox" bind:checked {...getSelectableInputProps(props)} />
    </div>
    {@render props.children?.()}
  </label>
{:else if props.interactive}
  <button class="tile" {style} {...getInteractiveButtonProps(props)}>
    {@render props.children?.()}
  </button>
{:else}
  <div class="tile" {style} {...stripOwnProps(props as RenderProps)}>
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
    @include color-props(tile, surface);
    @include typography-container-props(tile, surface);
    @include box-shadow(tile, surface);
    width: var(--tile-width, calc(var(--space-lg) * 24));
    /* Override typography max-width */
    max-width: var(--tile-width, calc(var(--space-lg) * 24));

    display: inline-flex;
    vertical-align: top;
    flex-direction: column;
    justify-content: var-with-fallbacks(--justify, tile, flex-start);
    align-items: var-with-fallbacks(--align, tile, center);
    container-type: inline-size;
    // Add other specific styles for the tile
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
  $aspect: 1.333;
  /* Sizing code */

  .tile {
    width: var(--tile-width, 200px);
    height: var(--tile-height, calc(var(--tile-width, 200px) * $aspect));
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
