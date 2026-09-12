<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { BaseStyleProps, ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";

  type Props = ContainProps<
    HTMLAttributes<HTMLUListElement>,
    {
      children?: Snippet;
      stackable?: boolean;
    },
    BaseStyleProps & {
      marginInline?: string | null;
      marginLeft?: string | null;
      marginRight?: string | null;
      minWidth?: string | null;
      maxWidth?: string | null;
      gap?: string | null;
      itemPadding?: string | null;
      itemMinHeight?: string | null;
      iconWidth?: string | null;
      iconSize?: string | null;
      iconBorderRadius?: string | null;
      actionWidth?: string | null;
      actionFlexDirection?: string | null;
      actionWrap?: string | null;
      actionCompactFlexDirection?: string | null;
      actionCompactWrap?: string | null;
      actionGap?: string | null;
      itemBorder?: string | null;
      selectedBg?: string | null;
      selectedFg?: string | null;
      selectedOutline?: string | null;
      selectedBorder?: string | null;
      selectionColor?: string | null;
    }
  >;

  let {
    children,
    stackable = false,
    class: className,
    ...restProps
  }: Props = $props();

  const el = $derived(
    elementProps(restProps, "data-list", [
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
    ]),
  );
</script>

<ul class={["data-list", className]} class:stackable {...el}>
  {@render children?.()}
</ul>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .data-list {
    @include color-props(data-list, surface);
    @include typography-props-bare(data-list, surface);
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
