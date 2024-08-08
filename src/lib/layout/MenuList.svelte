<script lang="ts">
  import { injectVars } from "$lib/util";
  export let fg: string | null = null;
  export let bg: string | null = null;
  export let itemPadding: string | null = null;
  export let itemWidth: string | null = null;
  export let itemHeight: string | null = null;
  export let itemFg: string | null = null;
  export let itemBg: string | null = null;
  export let itemEvenFg: string | null = null;
  export let itemEvenBg: string | null = null;
  export let itemActiveFg: string | null = null;
  export let itemActiveBg: string | null = null;
  let style = injectVars($$props, "menu", [
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
  ]);
</script>

<ul {style} class="menu">
  <slot />
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

  .menu :global(li) {
    @include clickable(menu-item);
    overflow: hidden;
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
      @include clickable(menu-item, button, control);
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

  /* & :global(li:nth-of-type(even)) > {
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
  } */
</style>
