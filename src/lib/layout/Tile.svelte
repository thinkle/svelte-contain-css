<script lang="ts">
  import Checkbox from "$lib/controls/Checkbox.svelte";
  export let interactive = false; // Prop to make the tile clickable or not
  export let selectable = false;
  export let checked = false;
</script>

{#if selectable}
  <label class="tile">
    <div class="checkbox"><input type="checkbox" bind:checked /></div>
    <slot />
  </label>
{:else if interactive}
  <button class="tile" on:click on:blur on:focus on:dblclick>
    <slot />
  </button>
{:else}
  <div class="tile">
    <slot />
  </div>
{/if}

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .tile,
  .tile label,
  .tile button {
    border: var(
      --tile-border,
      var(--border-width) var(--border-style) var(--border-color)
    );
    @include box-props-square-border(tile);
    @include color-props(tile);
    @include typography-container-props(tile);
    width: var(--tile-width, calc(var(--space-lg) * 24));
    min-height: var(--tile-height, calc(var(--space-lg) * 36));
    display: inline-flex;
    flex-direction: column;
    justify-content: var-with-fallbacks(--justify, tile, flex-start);
    align-items: var-with-fallbacks(--align, tile, center);
    // Add other specific styles for the tile
  }
  @include responsive-content(null, 1200px) {
    .tile,
    .tile label,
    .tile button {
      width: var(--tile-width-large, calc(var(--space-lg) * 32));
      min-height: var(--tile-height-large, calc(var(--space-lg) * 48));
    }
  }

  /* Smaller comes after so it "wins" if 
  we have a responsive container query vs. 
  a responsive media query */
  @include responsive-content(601px) {
    .tile,
    .tile label,
    .tile button {
      width: var(--tile-width-small, calc(var(--space-lg) * 16));
      min-height: var(--tile-small, calc(var(--space-lg) * 24));
    }
  }
  button.tile,
  label.tile {
    @include clickable(tile);
  }
  label.tile {
    @include color-props(tile-selected);
    @include typography-props(tile-selected);
  }
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
    display: none;
  }

  .checkbox:has(input:checked) {
    @include color-props(
      tile-checkbox-checked,
      checkbox-checked,
      toggle-on,
      primary,
      checkbox
    );
  }
  .checkbox:has(input:checked)::after {
    content: var(--tile-checkbox-check, var(--checkbox-check));
    font-size: var-with-fallbacks(--size, checkbox, toggle, font, 1em);
    color: var-with-fallbacks(--fg, checkbox-checked, toggle-on, checkbox);
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
