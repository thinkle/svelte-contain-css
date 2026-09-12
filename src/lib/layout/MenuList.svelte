<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps, MenuStyleProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import { COLOR_VARS, type StyleProps } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLAttributes<HTMLUListElement>,
    {
      children?: Snippet;
      striped?: boolean;
    },
    MenuStyleProps &
      StyleProps<typeof MENU_LIST_VARS>
  >;

  let {
    children,
    striped = false,
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands menu's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  /* COLOR only. `.menu`'s padding-props include is commented out and the
     rule hardcodes `padding: 0`, so a --menu-padding would go nowhere -- the
     shorthand is offered where the mixin is live, not where it is written. */
  const MENU_LIST_VARS = [...COLOR_VARS] as const;

  const el = $derived(
    elementProps(restProps, "menu", [
      ...MENU_LIST_VARS,
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

<ul class={["menu", className]} class:striped {...el}>
  {@render children?.()}
</ul>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
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
    @include clickable(menu-item);
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
  .menu :global(li > .subheader),
  .menu :global(li.subheader),
  .menu :global(li.interactive),
  .menu :global(li[role="button"]),
  .menu :global(li[tabindex]:not([tabindex="-1"])) {
    @include clickable(menu-item);
    @include focusable-as-hover(menu-item);
  }

  .menu :global(li > .subheader) {
    padding: var(--padding);
    font-weight: bold;
  }

  .menu {
    @include global-buttons {
      display: flex;
      justify-content: var(--menu-item-justify, start);
      align-items: var(--menu-item-align, center);
      width: var(--menu-item-width, 100%);
      height: var(--menu-item-height);
      text-decoration: none;
      @include typography-props(menu-item, button, ui, control);
      @include color-props(menu-item, menu, button, control);
      @include box-props-square(menu-item, button, control);
      margin: 0;
      @include focusable-as-hover(menu-item);
      @include clickable(menu-item);
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
        surface
      );
    }
  }
</style>
