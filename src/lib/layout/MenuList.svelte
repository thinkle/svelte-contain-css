<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { MenuStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    children?: Snippet;
    striped?: boolean;
  } & MenuStyleProps &
    HTMLAttributes<HTMLUListElement>;

  let { children, striped = false, ...restProps }: Props = $props();

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
    ]),
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
    margin: 0;
    margin-inline: 0;
    padding-inline: 0;
    @include color-props(menu, ui, control);
    overflow: hidden;
    width: 100%;
  }

  .menu :global(li) {
    width: 100%;
    box-sizing: border-box;
  }

  // Ensure direct interactive children fill the full row width.
  .menu :global(li > a),
  .menu :global(li > button),
  .menu :global(li > input[type="submit"]),
  .menu :global(li > .button) {
    width: 100%;
    flex: 1 1 auto;
    box-sizing: border-box;
  }

  // Support row-level interactive list items (for menu headers/subsections).
  .menu :global(li.subheader),
  .menu :global(li.interactive),
  .menu :global(li[role="button"]),
  .menu :global(li[tabindex]:not([tabindex="-1"])) {
    @include clickable(menu-item);
    @include focusable();
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
      @include color-props(menu-item, menu, button, control);
      @include box-props-square(menu-item, button, control);
      margin: 0;
      @include focusable();
      @include clickable(menu-item);
    }

    li {
      @include clickable(menu-item);
    }
    /*
    // Make hover/active feedback visible across the whole row by default.
    & :global(li:hover > a:not(.active)),
    & :global(li:hover > button:not(.active)),
    & :global(li:hover > input[type="submit"]:not(.active)),
    & :global(li:hover > .button:not(.active)) {
      background: var(
        --menu-item-hover-bg,
        var(--menu-item-bg, var(--menu-bg, var(--bg, unset)))
      );
      color: var(
        --menu-item-hover-fg,
        var(--menu-item-fg, var(--menu-fg, var(--fg, inherit)))
      );
    }

    & :global(li:active > a:not(.active)),
    & :global(li:active > button:not(.active)),
    & :global(li:active > input[type="submit"]:not(.active)),
    & :global(li:active > .button:not(.active)) {
      background: var(
        --menu-item-active-bg,
        var(--menu-item-bg, var(--menu-bg, var(--bg, unset)))
      );
      color: var(
        --menu-item-active-fg,
        var(--menu-item-fg, var(--menu-fg, var(--fg, inherit)))
      );
    }

    & :global(.active) {
      @include color-props(
        menu-item-active,
        primary,
        menu-item,
        button,
        control,
        surface
      );
    } */
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
        surface
      );
    }
  }
</style>
