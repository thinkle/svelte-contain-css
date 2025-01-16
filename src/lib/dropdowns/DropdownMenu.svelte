<script context="module" lang="ts">
  var idPostfix = 1;
</script>

<script lang="ts">
  import { cssProperties } from "$lib/cssprops";
  import MenuList from "$lib/layout/MenuList.svelte";
  import { injectVars } from "$lib/util";

  import { onMount } from "svelte";
  idPostfix++;
  let id = "contain-dropdown-menu-" + idPostfix;
  let buttonElement: HTMLButtonElement;
  let dropdownContentElement: HTMLDivElement;

  // Style injection
  let style = injectVars($$props, "menu", [
    "bg",
    "fg",
    "padding",
    "width",
    "height",
  ]);
  let dropdownTop: number;
  let dropdownLeft: number;
  let dropdownMaxHeight: number;

  function computePosition() {
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

  function triggerMenu(e) {    
    let isOpen = popoverDiv.matches(":popover-open");    
    if (!isOpen) {    
      injectVariablesIntoDropdown();
      computePosition();
    }
  }
  function dismissPopover(e) {    
    popoverDiv.hidePopover();
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
        popoverDiv.hidePopover();
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault(); // Prevent default to stop scrolling the page
        navigateMenu(event.key);
        searchString = "";
      }
    }
  }
  function maybeFocusMatch(searchString: string) {    
    let focusableItems = dropdownContentElement.querySelectorAll(
      "a,button,[tabindex]"
    );
    for (let element of focusableItems) {
      if (
        element.textContent &&
        element.textContent.toLowerCase().startsWith(searchString.toLowerCase())
      ) {        
        if (element.focus) {
          element.focus();
          return;
        }
      }
    }
  }
  function navigateMenu(direction: string) {
    if (!popoverDiv.matches(":popover-open")) {
      buttonElement.click();
      return;
    }
    const focusableItems = Array.from(
      dropdownContentElement.querySelectorAll(
        "button, a, [tabindex]:not([tabindex='-1'])"
      )
    );
    let currentIndex = focusableItems.findIndex(
      (item) => item === document.activeElement
    );

    if (direction === "ArrowDown") {
      currentIndex = (currentIndex + 1) % focusableItems.length;
    } else if (direction === "ArrowUp") {
      currentIndex =
        (currentIndex - 1 + focusableItems.length) % focusableItems.length;
    }

    focusableItems[currentIndex]?.focus();
  }

  let cssVariableContext = "";
  function injectVariablesIntoDropdown() {
    cssVariableContext = "";
    let buttonStyle = getComputedStyle(buttonElement);
    for (let prop of cssProperties) {
      if (buttonStyle.getPropertyValue(prop).trim()) {
        cssVariableContext += `${prop}: ${buttonStyle
          .getPropertyValue(prop)
          .trim()};`;
      }
    }
  }
  let popoverDiv: HTMLDivElement;
</script>

<nav class="dropdown-menu" on:keydown={handleKeystroke}>
  <button bind:this={buttonElement} on:click={triggerMenu} popovertarget={id}>
    <slot name="label">Menu</slot>
  </button>
  <div
    {id}
    bind:this={popoverDiv}
    class="dropdown-container"
    popover
    style:top="{dropdownTop}px"
    style:left="{dropdownLeft}px"
    style:max-height="{dropdownMaxHeight}px"
  >
    <div
      class="dropdown-content"
      bind:this={dropdownContentElement}
      style={cssVariableContext}
      on:click={dismissPopover}
    >
      <MenuList>
        <slot />
      </MenuList>
    </div>
  </div>
</nav>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  button {
    @include color-props(menu, button, container);
    @include box-props-square(menu, button, container);
    @include clickable(menu, button, control);
    position: relative;
  }

  .menu {
    @include color-props(menu, container);
    @include box-props(menu);
    @include typography-props(menu, container);
    @include clickable(menu, button, control);
  }
  .dropdown-menu {
    @include typography-props(menu, container);
  }
  .dropdown-container {
    box-sizing: border-box;
    opacity: 0;
    pointer-events: none;
    transition: var(--dropdown-transition, 150ms) opacity;
    @include custom-scrollbar(dropdown-menu, menu);
  }

  .dropdown-container:popover-open {
    opacity: 1;
    pointer-events: all;
    position: fixed;
    inset: unset;
  }
  .dropdown-content {
    width: var(--dropdown-menu-width, 12em);
    @include box-shadow(dropdown-menu, dropdown);
    @include box-props-square-border(dropdown-menu, menu, container);
    padding: 0;
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
