<script lang="ts">
  import type { Snippet } from "svelte";
  import { injectVars } from "$lib/util";

  let {
    children,
    striped,
    ...restProps
  }: { children?: Snippet; striped: boolean } & Record<string, unknown> =
    $props();

  const style = $derived(
    injectVars(restProps, "menu", [
      "fg",
      "bg",
      "itemPadding",
      "itemWidth",
      "itemHeight",
      "itemFg",
      "itemBg",
      "itemEvenFg",
      "itemEvenBg",
      "itemActiveFg",
      "itemActiveBg",
    ])
  );
</script>

<ul {style} class="menu" {...restProps} class:striped>
  {@render children?.()}
</ul>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  .menu {
    list-style: none;
    /* @include padding-props(menu, container); */
    padding: 0;
    @include color-props(menu, container);
    margin-block-start: 0;
    margin-block-end: 0;
    overflow: hidden;
  }

  .menu :global(li:has(> a)),
  .menu :global(li:has(> button)) {
    @include clickable(menu-item);
  }

  .menu {
    @include global-buttons {
      display: flex;
      justify-content: var(--menu-item-justify, center);
      align-items: var(--menu-item-align, center);
      width: var(--menu-item-width, 100%);
      height: var(--menu-item-height);
      text-decoration: none;
      @include typography-props(menu-item, button, ui, control);
      @include color-props(menu-item, button, control);
      @include box-props-square(menu-item, button, control);
      @include focusable();
      /* @include clickable(menu-item); */
    }

    & :global(.active) {
      @include color-props(
        menu-item-active,
        primary,
        menu-item,
        button,
        control,
        container
      );
    }
  }
  .menu.striped {
    & :global(li:nth-of-type(even)) > {
      @include global-buttons {
        @include color-props(
          menu-item-even,
          stripe,
          menu-item,
          button,
          control
        );
      }
    }

    & :global(li:nth-of-type(even)) :global(.active),
    :global(li:nth-of-type(odd)) :global(.active) {
      @include color-props(
        menu-item-active,
        primary,
        menu-item,
        button,
        control,
        container
      );
    }
  }
</style>
