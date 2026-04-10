<script lang="ts">
  import { injectVars } from "$lib/util";

  export let stackable = false;
  /* svelte-ignore unused-export-let */
  export let bg: string | null = null;
  /* svelte-ignore unused-export-let */
  export let fg: string | null = null;
  /* svelte-ignore unused-export-let */
  export let padding: string | null = null;
  /* svelte-ignore unused-export-let */
  export let width: string | null = null;
  /* svelte-ignore unused-export-let */
  export let height: string | null = null;
  /* svelte-ignore unused-export-let */
  export let marginInline: string | null = null;
  /* svelte-ignore unused-export-let */
  export let marginLeft: string | null = null;
  /* svelte-ignore unused-export-let */
  export let marginRight: string | null = null;
  /* svelte-ignore unused-export-let */
  export let minWidth: string | null = null;
  /* svelte-ignore unused-export-let */
  export let maxWidth: string | null = null;
  /* svelte-ignore unused-export-let */
  export let gap: string | null = null;
  /* svelte-ignore unused-export-let */
  export let itemPadding: string | null = null;
  /* svelte-ignore unused-export-let */
  export let itemMinHeight: string | null = null;
  /* svelte-ignore unused-export-let */
  export let iconWidth: string | null = null;
  /* svelte-ignore unused-export-let */
  export let iconSize: string | null = null;
  /* svelte-ignore unused-export-let */
  export let iconBorderRadius: string | null = null;
  /* svelte-ignore unused-export-let */
  export let actionWidth: string | null = null;
  /* svelte-ignore unused-export-let */
  export let actionFlexDirection: string | null = null;
  /* svelte-ignore unused-export-let */
  export let actionWrap: string | null = null;
  /* svelte-ignore unused-export-let */
  export let actionCompactFlexDirection: string | null = null;
  /* svelte-ignore unused-export-let */
  export let actionCompactWrap: string | null = null;
  /* svelte-ignore unused-export-let */
  export let actionGap: string | null = null;
  /* svelte-ignore unused-export-let */
  export let itemBorder: string | null = null;
  /* svelte-ignore unused-export-let */
  export let selectedBg: string | null = null;
  /* svelte-ignore unused-export-let */
  export let selectedFg: string | null = null;
  /* svelte-ignore unused-export-let */
  export let selectedOutline: string | null = null;
  /* svelte-ignore unused-export-let */
  export let selectedBorder: string | null = null;
  /* svelte-ignore unused-export-let */
  export let selectionColor: string | null = null;

  $: style = injectVars($$props, "data-list", [
    "bg",
    "fg",
    "padding",
    "width",
    "marginInline",
    "marginLeft",
    "marginRight",
    "minWidth",
    "maxWidth",
    "height",
    "gap",
    "itemPadding",
    "itemMinHeight",
    "iconWidth",
    "iconSize",
    "iconBorderRadius",
    "actionWidth",
    "actionFlexDirection",
    "actionWrap",
    "actionCompactFlexDirection",
    "actionCompactWrap",
    "actionGap",
    "itemBorder",
    "selectedBg",
    "selectedFg",
    "selectedOutline",
    "selectedBorder",
    "selectionColor",
  ]);
</script>

<ul class="data-list" class:stackable {style} {...$$restProps}>
  <slot />
</ul>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .data-list {
    @include color-props(data-list, surface);
    @include box-props-square-border(data-list, surface);
    @include box-shadow(data-list, surface);
    list-style: none;
    padding: 0;
    margin: var-with-fallbacks(--margin, data-list, 0);
    margin-left: var-with-fallbacks(
      --margin-left,
      data-list,
      var(--data-list-margin-inline, auto)
    );
    margin-right: var-with-fallbacks(
      --margin-right,
      data-list,
      var(--data-list-margin-inline, auto)
    );
    width: var-with-fallbacks(--width, data-list, 100%);
    min-width: var-with-fallbacks(--min-width, data-list, 0);
    max-width: var-with-fallbacks(--max-width, data-list, none);
    overflow: hidden;
    container-type: inline-size;
  }

  .data-list :global(.data-list-item:last-child) {
    border-bottom: none;
  }
</style>
