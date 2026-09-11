<script module lang="ts">
  var idPostfix = 1;

  /**
   * How the type-ahead search buffer is compared against each item's text.
   *  - "prefix"    : item text must start with the query (default, classic
   *                  <select> behavior)
   *  - "word"      : any whitespace-delimited word in the item must start with
   *                  the query -- typing "Boo" matches "Foo Boo Baz"
   *  - "substring" : query may appear anywhere in the item text
   */
  export type MatchMode = "prefix" | "word" | "substring";
  /**
   * What a type-ahead match does:
   *  - "focus"  : move focus to the first matching item (default)
   *  - "filter" : hide non-matching items so the list shrinks as you type;
   *               focus follows the first remaining match
   */
  export type TypeaheadMode = "focus" | "filter";
</script>

<script lang="ts">
  import { cssProperties } from "$lib/cssprops";
  import MenuList from "$lib/layout/MenuList.svelte";
  import { injectVars } from "$lib/util";
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import type { DropdownMenuStyleProps } from "$lib/types";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = {
    label?: Snippet;
    children?: Snippet;
    triggerAuditAction?: string | null;
    matchMode?: MatchMode;
    typeaheadMode?: TypeaheadMode;
  } & DropdownMenuStyleProps &
    HTMLAttributes<HTMLDivElement>;

  let {
    label,
    children,
    triggerAuditAction = null,
    matchMode = "prefix",
    typeaheadMode = "focus",
    ...props
  }: Props = $props();
  idPostfix++;
  let id = "contain-dropdown-menu-" + idPostfix;
  let buttonElement: HTMLButtonElement | undefined = $state();
  let dropdownContentElement: HTMLDivElement | undefined = $state();
  let isOpen = $state(false);

  // Style injection
  const style = $derived(
    injectVars(props, "menu", [
      "bg",
      "fg",
      "padding",
      "width",
      "height",
      "triggerBg",
      "triggerFg",
      "triggerPadding",
    ]),
  );
  let dropdownTop: number = $state(0);
  let dropdownLeft: number = $state(0);
  let dropdownMaxHeight: number = $state(0);

  function computePosition() {
    if (!buttonElement || !dropdownContentElement) return;
    let dropdownRect = dropdownContentElement.getBoundingClientRect();
    let buttonRect = buttonElement.getBoundingClientRect();
    // Fix me -- we need to figure out where the dropdown goes in fixed
    // positioning relative to the viewport
    dropdownTop = buttonRect.bottom;
    dropdownLeft = buttonRect.left;
    if (dropdownLeft + dropdownRect.width > window.innerWidth) {
      dropdownLeft = window.innerWidth - dropdownRect.width;
    }
    if (dropdownTop + dropdownRect.height > window.innerHeight) {
      dropdownTop = Math.max(0, window.innerHeight - dropdownRect.height);
    }
    dropdownMaxHeight = window.innerHeight - dropdownTop;
  }

  function triggerMenu(_e: Event) {
    if (!isOpen) {
      injectVariablesIntoDropdown();
      computePosition();
    }
  }
  function dismissPopover(_e: Event) {
    if (!popoverDiv) return;
    popoverDiv.hidePopover();
  }

  function handleToggle(event: ToggleEvent) {
    isOpen = event.newState === "open";
    if (!isOpen) clearSearch();
  }

  let searchString = $state("");
  let clearTimer: ReturnType<typeof setTimeout> | undefined;
  function clearSearch() {
    clearTimeout(clearTimer);
    clearTimer = undefined;
    searchString = "";
    clearFilter();
  }

  const timeoutAfterMS = 2500; // 2.5 seconds seems more humane

  function scheduleSearchClear() {
    // In filter mode the buffer is a live filter, not a transient jump target --
    // auto-clearing it mid-scroll would make the list flicker back to full
    // length. It persists until Escape, close, or Backspace to empty.
    if (typeaheadMode === "filter") return;
    clearTimeout(clearTimer);
    clearTimer = setTimeout(clearSearch, timeoutAfterMS);
  }
  function handleKeystroke(event: KeyboardEvent) {
    if (event.key == "Backspace" && searchString) {
      searchString = searchString.slice(0, -1);
      applySearch();
      scheduleSearchClear();
    } else if (event.key.length == 1) {
      if (searchString || event.key != " ") {
        searchString += event.key;
        applySearch();
        scheduleSearchClear();
      }
    } else if (event.key === "Escape") {
      clearSearch();
      popoverDiv?.hidePopover();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault(); // Prevent default to stop scrolling the page
      // In filter mode the buffer stays live so arrow keys (and Tab) cycle
      // through the *filtered* rows -- type a few letters, then arrow down to
      // the one you saw. In focus mode a navigation key ends the type-ahead.
      if (typeaheadMode !== "filter") clearSearch();
      navigateMenu(event.key);
    } else if (typeaheadMode !== "filter") {
      // Tab, Enter, Home/End, etc. -- end a focus-mode type-ahead session.
      // Filter mode keeps the filter until Escape, close, or Backspace-to-empty.
      clearSearch();
    }
  }

  /** Route the current buffer to whichever behavior this menu is configured for. */
  function applySearch() {
    if (typeaheadMode === "filter") {
      applyFilter(searchString);
    }
    if (!searchString) return;
    const matched = maybeFocusMatch(searchString);
    // In filter mode a filtered-out item may have been holding focus; if nothing
    // matched, park focus on the trigger so keystrokes still reach this <nav>
    // (Backspace to recover, Escape to close).
    if (!matched && typeaheadMode === "filter") buttonElement?.focus();
  }

  /** Does `text` satisfy `query` under the active {@link matchMode}? */
  function textMatches(text: string, query: string): boolean {
    if (!query) return true;
    const haystack = text.toLowerCase();
    const needle = query.toLowerCase();
    if (matchMode === "substring") return haystack.includes(needle);
    if (matchMode === "word")
      return haystack.split(/\s+/).some((word) => word.startsWith(needle));
    return haystack.startsWith(needle); // "prefix"
  }

  function getFocusableItems(visibleOnly = false): HTMLElement[] {
    if (!dropdownContentElement) return [];
    let items = Array.from(
      dropdownContentElement.querySelectorAll<HTMLElement>(
        "button, a, [tabindex]:not([tabindex='-1'])",
      ),
    );
    if (visibleOnly) items = items.filter((el) => el.closest("[hidden]") === null);
    return items;
  }

  /** The row we hide/show for a given item -- its wrapping <li>, or the item. */
  function itemRow(el: HTMLElement): HTMLElement {
    return (el.closest("li") as HTMLElement | null) ?? el;
  }

  function applyFilter(query: string) {
    if (!dropdownContentElement) return;
    if (!query) {
      clearFilter();
      return;
    }
    for (const el of getFocusableItems()) {
      const row = itemRow(el);
      if (textMatches(el.textContent ?? "", query)) {
        if (row.dataset.typeaheadFiltered) {
          delete row.dataset.typeaheadFiltered;
          row.hidden = false;
        }
      } else if (!row.hidden) {
        row.hidden = true;
        row.dataset.typeaheadFiltered = "true";
      }
    }
    // The popover just changed height; keep it anchored under the trigger.
    computePosition();
  }

  /** Undo {@link applyFilter}, leaving any consumer-set `hidden` rows alone. */
  function clearFilter() {
    if (!dropdownContentElement) return;
    const hiddenRows = dropdownContentElement.querySelectorAll<HTMLElement>(
      "[data-typeahead-filtered]",
    );
    for (const row of hiddenRows) {
      delete row.dataset.typeaheadFiltered;
      row.hidden = false;
    }
    if (hiddenRows.length) computePosition();
  }

  function maybeFocusMatch(searchString: string): boolean {
    for (const element of getFocusableItems(true)) {
      if (element.textContent && textMatches(element.textContent, searchString)) {
        if (element.focus) {
          element.focus();
          return true;
        }
      }
    }
    return false;
  }
  function navigateMenu(direction: string) {
    if (!popoverDiv?.matches(":popover-open") && buttonElement) {
      buttonElement.click();
      return;
    }
    if (!dropdownContentElement) return;
    const focusableItems = getFocusableItems(true);
    let currentIndex = focusableItems.findIndex(
      (item) => item === document.activeElement,
    );

    if (direction === "ArrowDown") {
      currentIndex = (currentIndex + 1) % focusableItems.length;
    } else if (direction === "ArrowUp") {
      currentIndex =
        (currentIndex - 1 + focusableItems.length) % focusableItems.length;
    }

    (focusableItems[currentIndex] as HTMLElement)?.focus();
  }

  let cssVariableContext = $state("");
  function injectVariablesIntoDropdown() {
    if (!buttonElement) return;
    cssVariableContext = "";
    let buttonStyle = getComputedStyle(buttonElement);
    for (let prop of cssProperties) {
      if (buttonStyle.getPropertyValue(prop).trim()) {
        cssVariableContext += `${prop}: ${buttonStyle
          .getPropertyValue(prop)
          .trim()};`;
      }
    }
    // Set dropdown menu width to match button width
    cssVariableContext += `--dropdown-menu-min-width: ${buttonStyle.width};`;
  }
  let popoverDiv: HTMLDivElement | undefined = $state();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<nav class="dropdown-menu" class:open={isOpen} onkeydown={handleKeystroke}>
  <button
    bind:this={buttonElement}
    onclick={triggerMenu}
    popovertarget={id}
    type="button"
    data-audit-action={triggerAuditAction}
    aria-haspopup="menu"
    aria-expanded={isOpen ? "true" : "false"}
    aria-controls={id}
  >
    {#if label}{@render label()}{:else}Menu{/if}
  </button>
  <div
    {id}
    bind:this={popoverDiv}
    class="dropdown-container"
    role="menu"
    popover
    ontoggle={handleToggle}
    style:top="{dropdownTop}px"
    style:left="{dropdownLeft}px"
    style:max-height="{dropdownMaxHeight}px"
  >
    {#if searchString}
      <div class="search-hint-wrapper">
        <div class="search-hint" aria-hidden="true">{searchString}</div>
      </div>
    {/if}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="dropdown-content"
      bind:this={dropdownContentElement}
      style={cssVariableContext}
      onclick={dismissPopover}
    >
      <MenuList>
        {@render children?.()}
      </MenuList>
    </div>
  </div>
</nav>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  button {
    @include color-props(menu-trigger, menu, button, surface);
    @include box-props-square(menu-trigger, menu, button, surface);
    @include clickable(menu-trigger, menu, button, control);
    @include focusable();
    position: relative;
  }

  .dropdown-content :global(.menu) {
    @include color-props(menu, surface);
    @include typography-props(menu, surface);
    @include clickable(menu, button, control);
    @include focusable();
  }
  .dropdown-menu {
    @include typography-props(menu, surface);
  }
  .dropdown-container {
    box-sizing: border-box;
    opacity: 0;
    pointer-events: none;
    transition: var(--dropdown-transition, 150ms) opacity;
    @include custom-scrollbar(dropdown-menu, menu);
    overflow-x: hidden;
  }

  .dropdown-container:popover-open {
    opacity: 1;
    pointer-events: all;
    position: fixed;
    inset: unset;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .dropdown-content {
    // Ensure menu is at least trigger width, but allow wider requested widths
    width: max(
      var(--dropdown-menu-min-width, 12em),
      var(--dropdown-menu-width, 12em)
    );
    min-width: var(--dropdown-menu-min-width, 12em);
    @include color-props(dropdown-menu, menu, surface);
    @include box-shadow(dropdown-menu, dropdown);
    @include box-props-square-border(dropdown-menu, menu, surface);
    padding: 0;
    overflow: hidden;
  }

  // Transient echo of the type-ahead search buffer. Anchored to the popover
  // container (position: fixed when open) so it overlays the list rather
  // than pushing it down, and sits outside .dropdown-content's clip.
  // Styled as a compact chip, matching Tag.svelte's conventions. Purely
  // visual -- focus is already moved to the matched item for AT users.
  .search-hint-wrapper {
    position: sticky;
    top: 0;
    right: 0;
    height: 0;
  }

  .search-hint {
    z-index: 2;
    position: absolute;
    right: 0;
    pointer-events: none;
    width: fit-content;
    max-width: calc(100% - 2 * var(--search-hint-offset, 4px));
    @include color-props(search-hint, tag, secondary);
    @include typography-props-bare(search-hint, tag);
    @include box-props(search-hint, tag);
    font-size: var(--search-hint-font-size, var(--font-size-tiny, 0.75em));
    padding: var(--search-hint-padding, 0.2em 0.55em);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: var(--search-hint-radius, var(--border-radius, 4px));
    @include box-shadow(search-hint, dropdown);
    opacity: var(--search-hint-opacity, 0.95);
  }

  // Support wrap mode control via --dropdown-wrap-mode CSS variable
  // When --dropdown-wrap-mode: nowrap is set on a parent, text won't wrap
  .dropdown-content :global(button),
  .dropdown-content :global(a) {
    white-space: var(--dropdown-wrap-mode, wrap);
    min-width: 0;
  }

  // Apply ellipsis only in nowrap mode - when white-space is nowrap,
  // the container's overflow: hidden will force ellipsis
  .dropdown-content :global([style*="--dropdown-wrap-mode: nowrap"] button),
  .dropdown-content :global([style*="--dropdown-wrap-mode: nowrap"] a) {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  // Also handle nested spans inside buttons that might contain text
  .dropdown-content :global(button span),
  .dropdown-content :global(a span) {
    white-space: var(--dropdown-wrap-mode, wrap);
    min-width: 0;
  }
  nav {
    position: relative;
  }

  [popover] {
    visibility: hidden;
    display: block;
    opacity: 0;
    transition:
      transform,
      opacity 300ms ease-in-out;
  }

  [popover]:popover-open {
    opacity: 1;
    visibility: visible;
    opacity: 1;
    padding: 0;
    border: none;
  }
</style>
