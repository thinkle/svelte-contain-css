<script context="module" lang="ts">
  let addedGlobalDiv: boolean;
</script>

<script lang="ts">
  import MenuList from "$lib/layout/MenuList.svelte";
  import { injectVars } from "$lib/util";
  import { portal } from "svelte-portal";
  import { onMount } from "svelte";
  onMount(() => {
    console.log("Mounted");
    if (!addedGlobalDiv) {
      let div = document.createElement("div");
      div.id = "dropdowns";
      document.body.appendChild(div);
      addedGlobalDiv = true;
    }
  });

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
  let rightDropdown: boolean = false;
  function triggerMenu() {
    open = !open;
    if (open) {
      let dropdownRect = dropdownContentElement.getBoundingClientRect();
      let buttonRect = buttonElement.getBoundingClientRect();
      if (buttonRect.left + dropdownRect.width > window.innerWidth) {
        rightDropdown = true;
      } else {
        rightDropdown = false;
      }
      setTimeout(() => window.addEventListener("click", closeMenu), 0);
    }
  }
  function closeMenu() {
    open = false;
    window.removeEventListener("click", closeMenu);
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
        closeMenu();
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault(); // Prevent default to stop scrolling the page
        navigateMenu(event.key);
        searchString = "";
      }
    }
    console.log("Got ", event.key, "in menu");
  }
  function maybeFocusMatch(searchString: string) {
    console.log("Maybe focus", searchString);
    let focusableItems = dropdownContentElement.querySelectorAll(
      "a,button,[tabindex]"
    );
    for (let element of focusableItems) {
      if (
        element.textContent &&
        element.textContent.toLowerCase().startsWith(searchString.toLowerCase())
      ) {
        console.log("Found", element);
        if (element.focus) {
          element.focus();
          return;
        }
      }
    }
  }
  function navigateMenu(direction: string) {
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

  let open = false;
</script>

<nav class="dropdown-menu" on:keydown={handleKeystroke}>
  <button bind:this={buttonElement} on:click={triggerMenu}>
    <slot name="label">Menu</slot>
  </button>
  <div
    use:portal={"#dropdowns"}
    class="dropdown-container"
    class:open
    class:right={rightDropdown}
    hidden
  >
    <div class="dropdown-content" bind:this={dropdownContentElement}>
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
  }

  .menu {
    @include color-props(menu, container);
    @include box-props(menu);
    @include typography-props(menu, container);
    @include clickable(menu, button, control);
  }
  .dropdown-container {
    overflow: hidden;
    position: fixed;
    opacity: 0;
    pointer-events: none;
    transition: var(--dropdown-transition, 150ms) opacity;
  }
  .dropdown-container.right {
    right: 0;
  }
  .dropdown-container.open {
    opacity: 1;
    pointer-events: all;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .dropdown-content {
    width: var(--dropdown-menu-width, 12em);
    @include box-shadow(dropdown-menu, dropdown);
  }
</style>
