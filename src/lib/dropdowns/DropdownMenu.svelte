<script module lang="ts">
  var idPostfix = 1;
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
  } & DropdownMenuStyleProps &
    HTMLAttributes<HTMLDivElement>;

  let {
    label,
    children,
    triggerAuditAction = null,
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
  }

  let searchString = "";
  let lastPress;
  function handleKeystroke(event: KeyboardEvent) {
    if (event.key == "Backspace" && searchString) {
      searchString = searchString.slice(0, -1);
    } else if (event.key.length == 1) {
      if (searchString || event.key != " ") {
        searchString += event.key;
        maybeFocusMatch(searchString);
      }
    } else {
      searchString = "";
      if (event.key === "Escape") {
        popoverDiv?.hidePopover();
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault(); // Prevent default to stop scrolling the page
        navigateMenu(event.key);
        searchString = "";
      }
    }
  }
  function maybeFocusMatch(searchString: string) {
    if (!dropdownContentElement) return;
    let focusableItems = dropdownContentElement.querySelectorAll(
      "a,button,[tabindex]",
    );
    for (let element of focusableItems) {
      if (
        element.textContent &&
        element.textContent.toLowerCase().startsWith(searchString.toLowerCase())
      ) {
        if ((element as HTMLElement).focus) {
          (element as HTMLElement).focus();
          return;
        }
      }
    }
  }
  function navigateMenu(direction: string) {
    if (!popoverDiv?.matches(":popover-open") && buttonElement) {
      buttonElement.click();
      return;
    }
    if (!dropdownContentElement) return;
    const focusableItems = Array.from(
      dropdownContentElement.querySelectorAll(
        "button, a, [tabindex]:not([tabindex='-1'])",
      ),
    );
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
