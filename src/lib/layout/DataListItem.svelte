<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    start?: Snippet;
    end?: Snippet;
    children?: Snippet;
    interactive?: boolean;
    selectable?: boolean;
    checked?: boolean;
    tabindex?: number;
    onclick?: ((event: MouseEvent) => void) | null;
    onkeydown?: ((event: KeyboardEvent) => void) | null;
    gap?: string | null;
    rowGap?: string | null;
    mainGap?: string | null;
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
    actionAlign?: string | null;
    actionJustify?: string | null;
    actionMobileJustify?: string | null;
    itemBorder?: string | null;
    selectedBg?: string | null;
    selectedFg?: string | null;
    selectedOutline?: string | null;
    selectedBorder?: string | null;
    selectionColor?: string | null;
  } & BaseStyleProps &
    HTMLAttributes<HTMLLIElement>;

  let {
    start,
    end,
    children,
    interactive = false,
    selectable = false,
    checked = $bindable(false),
    tabindex = undefined,
    onclick = null,
    onkeydown = null,
    ...restProps
  }: Props = $props();

  const style = $derived(
    injectVars(restProps, "data-list-item", [
      "bg",
      "fg",
      "padding",
      "width",
      "height",
      "gap",
      "rowGap",
      "mainGap",
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
      "actionAlign",
      "actionJustify",
      "actionMobileJustify",
      "itemBorder",
      "selectedBg",
      "selectedFg",
      "selectedOutline",
      "selectedBorder",
      "selectionColor",
    ]),
  );

  const hasStart = $derived(Boolean(start));
  const hasCustomEnd = $derived(Boolean(end));
  const hasDefaultSelector = $derived(selectable && !hasCustomEnd);
  const hasEnd = $derived(hasCustomEnd || hasDefaultSelector);
  const isInteractive = $derived(interactive || selectable);
  const rowTabIndex = $derived(tabindex ?? (isInteractive ? 0 : undefined));
  const rowRole = $derived(selectable ? "checkbox" : interactive ? "button" : undefined);

  function isNestedControlTarget(
    target: EventTarget | null,
    currentTarget: EventTarget | null,
  ): boolean {
    if (!(target instanceof Element)) return false;
    const nearestControl = target.closest(
      "button, a, input, select, textarea, summary, [role='button'], [role='link'], [role='checkbox'], [role='menuitem']",
    );
    return Boolean(nearestControl && nearestControl !== currentTarget);
  }

  function handleClick(event: MouseEvent) {
    const bubblingFromNestedControl =
      event.target !== event.currentTarget &&
      isNestedControlTarget(event.target, event.currentTarget);

    if (bubblingFromNestedControl) {
      return;
    }

    if (selectable) {
      checked = !checked;
    }
    onclick?.(event);
  }

  function handleKeydown(event: KeyboardEvent) {
    const bubblingFromNestedControl =
      event.target !== event.currentTarget &&
      isNestedControlTarget(event.target, event.currentTarget);
    const isActivationKey = event.key === " " || event.key === "Enter";

    if (selectable) {
      if (!bubblingFromNestedControl && isActivationKey) {
        event.preventDefault();
        checked = !checked;
      }
    }

    if (interactive && !selectable && !bubblingFromNestedControl && isActivationKey) {
      event.preventDefault();
      (event.currentTarget as HTMLElement).click();
    }

    onkeydown?.(event);
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<li
  class="data-list-item"
  class:hasStart
  class:hasEnd
  class:isInteractive
  class:selectable
  class:checked={selectable && checked}
  {style}
  tabindex={rowTabIndex}
  role={rowRole}
  aria-checked={selectable ? checked : undefined}
  onclick={handleClick}
  onkeydown={handleKeydown}
  {...restProps}
>
  {#if hasStart}
    <div class="start">
      {@render start?.()}
    </div>
  {/if}

  <div class="main">
    {@render children?.()}
  </div>

  {#if hasEnd}
    <div class="end">
      {#if hasCustomEnd}
        {@render end?.()}
      {:else if hasDefaultSelector}
        <Checkbox
          bind:checked
          padding="0"
          tabindex="-1"
          aria-label={checked ? "Unselect row" : "Select row"}
        />
      {/if}
    </div>
  {/if}
</li>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  $icon-track-width: var-with-fallbacks(
    --icon-width,
    data-list-item,
    data-list,
    var-with-fallbacks(--icon-size, data-list-item, data-list, 2.5rem)
  );

  .data-list-item {
    @include color-props(data-list-item, data-list, surface);
    @include typography-container-props(data-list-item, data-list, surface);
    display: grid;
    grid-template-columns: $icon-track-width minmax(0, 1fr)
      var-with-fallbacks(--action-width, data-list-item, data-list, auto);
    grid-template-areas: "start main end";
    column-gap: var-with-fallbacks(--gap, data-list-item, data-list, var(--space));
    row-gap: var-with-fallbacks(
      --row-gap,
      data-list-item,
      data-list,
      calc(var(--space) / 2)
    );
    align-items: var-with-fallbacks(--align, data-list-item, data-list, center);
    padding: var-with-fallbacks(
      --item-padding,
      data-list-item,
      data-list,
      var(--padding)
    );
    min-height: var-with-fallbacks(
      --item-min-height,
      data-list-item,
      data-list,
      4.5rem
    );
    border-bottom: var-with-fallbacks(
      --item-border,
      data-list-item,
      data-list,
      1px solid var(--border-color, rgba(127, 127, 127, 0.4))
    );
    box-sizing: border-box;
    width: 100%;
    max-width: none;
    position: relative;
  }

  .data-list-item:not(.hasStart) {
    grid-template-columns: minmax(0, 1fr) var-with-fallbacks(
        --action-width,
        data-list-item,
        data-list,
        auto
      );
    grid-template-areas: "main end";
  }

  .data-list-item:not(.hasEnd) {
    grid-template-columns: $icon-track-width minmax(0, 1fr);
    grid-template-areas: "start main";
  }

  .data-list-item:not(.hasStart):not(.hasEnd) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "main";
  }

  .start {
    grid-area: start;
    display: flex;
    align-items: center;
    justify-content: var-with-fallbacks(
      --icon-justify,
      data-list-item,
      data-list,
      center
    );
  }

  .start :global(img) {
    width: var-with-fallbacks(--icon-size, data-list-item, data-list, 2.5rem);
    height: var-with-fallbacks(--icon-size, data-list-item, data-list, 2.5rem);
    object-fit: cover;
    border-radius: var-with-fallbacks(
      --icon-border-radius,
      data-list-item,
      data-list,
      var-with-fallbacks(
        --icon-radius,
        data-list-item,
        data-list,
        0.375rem
      )
    );
  }

  .main :global(h4),
  .main :global(h5) {
    font-size: var-with-fallbacks(
      --heading-font-size,
      data-list-item,
      data-list,
      var-with-fallbacks(
        --title-font-size,
        data-list-item,
        data-list,
        var(--data-list-heading-font-size, var(--font-size, 1rem))
      )
    );
    font-weight: var-with-fallbacks(
      --heading-font-weight,
      data-list-item,
      data-list,
      var-with-fallbacks(--title-font-weight, data-list-item, data-list, 600)
    );
    line-height: var-with-fallbacks(
      --heading-line-height,
      data-list-item,
      data-list,
      var-with-fallbacks(--title-line-height, data-list-item, data-list, 1.25)
    );
  }

  .main :global(p),
  .main :global(p:first-of-type),
  .main :global(h1 + p),
  .main :global(h2 + p),
  .main :global(h3 + p),
  .main :global(h4 + p),
  .main :global(h5 + p),
  .main :global(h6 + p) {
    font-size: var-with-fallbacks(
      --paragraph-font-size,
      data-list-item,
      data-list,
      var-with-fallbacks(
        --body-font-size,
        data-list-item,
        data-list,
        var(--font-size-small, 0.9rem)
      )
    );
    line-height: var-with-fallbacks(
      --paragraph-line-height,
      data-list-item,
      data-list,
      var-with-fallbacks(--body-line-height, data-list-item, data-list, 1.35)
    );
    opacity: var-with-fallbacks(--body-opacity, data-list-item, data-list, 0.9);
  }

  .main {
    grid-area: main;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var-with-fallbacks(--main-gap, data-list-item, data-list, 0.25em);
  }

  .main :global(h1),
  .main :global(h2),
  .main :global(h3),
  .main :global(h4),
  .main :global(h5),
  .main :global(h6),
  .main :global(p) {
    margin: 0;
    max-width: none;
    margin-left: 0;
    margin-right: 0;
  }

  .end {
    grid-area: end;
    display: flex;
    flex-direction: var-with-fallbacks(
      --action-flex-direction,
      data-list-item,
      data-list,
      row
    );
    flex-wrap: var-with-fallbacks(--action-wrap, data-list-item, data-list, nowrap);
    align-items: var-with-fallbacks(
      --action-align,
      data-list-item,
      data-list,
      center
    );
    justify-content: var-with-fallbacks(
      --action-justify,
      data-list-item,
      data-list,
      flex-end
    );
    gap: var-with-fallbacks(--action-gap, data-list-item, data-list, var(--space));
    min-width: 0;
  }

  .end :global(button),
  .end :global(.button),
  .end :global(a) {
    margin: var(--data-list-action-control-margin, 0);
  }

  .data-list-item.isInteractive {
    @include clickable(data-list-item);
  }

  .data-list-item.isInteractive:focus-visible::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    @include focus-ring();
    outline-offset: var(--data-list-item-focus-outline-offset, -2px);
    box-shadow: var(
      --data-list-item-focus-ring-box-shadow,
      inset 0 0 0 2px var(--focus-shadow-color, rgba(100, 150, 250, 0.5))
    );
  }

  .data-list-item.selectable.checked {
    background: var-with-fallbacks(
      --selected-bg,
      data-list-item,
      data-list,
      color-mix(in srgb, var(--primary-bg) 15%, transparent)
    );
    color: var-with-fallbacks(
      --selected-fg,
      data-list-item,
      data-list,
      var-with-fallbacks(--fg, data-list-item, data-list, inherit)
    );
    --fg: var-with-fallbacks(
      --selected-fg,
      data-list-item,
      data-list,
      var-with-fallbacks(--fg, data-list-item, data-list, inherit)
    );
    --link-fg: var-with-fallbacks(
      --selected-link-fg,
      data-list-item,
      data-list,
      var-with-fallbacks(
        --selected-fg,
        data-list-item,
        data-list,
        var-with-fallbacks(--link-fg, data-list-item, data-list, inherit)
      )
    );
    --data-list-item-selected-accent: var-with-fallbacks(
      --selection-color,
      data-list-item,
      data-list,
      var(--primary-bg)
    );
  }

  .data-list-item.selectable.checked::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    border: var(
      --data-list-item-selected-border,
      var(
        --data-list-selected-border,
        var(
          --data-list-item-selected-outline,
          var(--data-list-selected-outline, none)
        )
      )
    );
    pointer-events: none;
  }

  .data-list-item.selectable.checked + .data-list-item.selectable.checked::after {
    border-top-width: 0;
  }

  @container (max-width: 640px) {
    .data-list-item {
      font-size: var(--data-list-item-font-size-small, calc(0.9 * var(--_font-size)));
    }
    :global(.data-list.stackable) .data-list-item.hasStart.hasEnd {
      grid-template-columns: $icon-track-width minmax(0, 1fr);
      grid-template-areas:
        "start main"
        "end end";
    }

    :global(.data-list.stackable) .data-list-item.hasStart.hasEnd .end {
      flex-direction: var-with-fallbacks(
        --action-compact-flex-direction,
        data-list-item,
        data-list,
        row
      );
      flex-wrap: var-with-fallbacks(
        --action-compact-wrap,
        data-list-item,
        data-list,
        wrap
      );
      justify-content: var-with-fallbacks(
        --action-mobile-justify,
        data-list-item,
        data-list,
        flex-start
      );
      padding-inline-start: calc(
        $icon-track-width +
          var-with-fallbacks(--gap, data-list-item, data-list, var(--space))
      );
    }

    :global(.data-list.stackable) .data-list-item:not(.hasStart).hasEnd {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas:
        "main"
        "end";
    }
  }
</style>
