<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import Checkbox from "$lib/controls/Checkbox.svelte";
  interface Props {
    interactive?: boolean; // Prop to make the tile clickable or not
    selectable?: boolean;
    checked?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    interactive = false,
    selectable = false,
    checked = $bindable(false),
    children
  }: Props = $props();
</script>

{#if selectable}
  <label class="tile">
    <div class="checkbox">
      <input type="checkbox" bind:checked oninput={bubble('input')} onchange={bubble('change')} onclick={bubble('click')} />
    </div>
    {@render children?.()}
  </label>
{:else if interactive}
  <button class="tile" onclick={bubble('click')} onblur={bubble('blur')} onfocus={bubble('focus')} ondblclick={bubble('dblclick')}>
    {@render children?.()}
  </button>
{:else}
  <div class="tile">
    {@render children?.()}
  </div>
{/if}

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .tile {
    border: var(
      --tile-border,
      var(--border-width) var(--border-style) var(--border-color)
    );
    @include box-props-square-border(tile, container);
    @include color-props(tile);
    @include typography-container-props(tile);
    @include box-shadow(tile, container);
    width: var(--tile-width, calc(var(--space-lg) * 24));
    /* Override typography max-width */
    max-width: var(--tile-width, calc(var(--space-lg) * 24));

    display: inline-flex;
    flex-direction: column;
    justify-content: var-with-fallbacks(--justify, tile, flex-start);
    align-items: var-with-fallbacks(--align, tile, center);
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
    height: calc(var(--tile-width, 200px) * $aspect);
  }

  /* Checkbox code */
  .tile {
    position: relative;
  }
  .checkbox {
    position: absolute;
    right: var-with-fallbacks(--padding, tile, container, 4px);
    top: var-with-fallbacks(--padding, tile, container, 4px);
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
