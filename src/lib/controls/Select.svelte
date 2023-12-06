<script lang="ts">
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import { onMount, tick } from "svelte";

  export let value: any;
  let selectElement: HTMLSelectElement;
  let observer: MutationObserver;
  onMount(async () => {
    await tick(); // Ensure slot content is rendered
    updateOptions();

    // Observe changes in the select element
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          updateOptions();
        }
      });
    });

    observer.observe(selectElement, { childList: true });
    return () => observer.disconnect();
  });
  let options: { value: string; html: string }[] = [];
  let activeOption: { value: string; html: string } | null = null;

  function updateOptions() {
    if (!selectElement) {
      return;
    }
    options = [];
    let optionEls = selectElement.querySelectorAll("option");
    let newOptions = [];
    for (let optionEl of optionEls) {
      options.push({
        value: optionEl.value,
        html: optionEl.innerHTML,
      });
    }
    activeOption = options[selectElement.selectedIndex];
  }

  function setValue(idx: number) {
    console.log("Button to set", idx);
    selectElement.selectedIndex = idx;
    selectElement.dispatchEvent(new Event("change"));
    activeOption = options[idx];
  }
</script>

<select bind:value on:change bind:this={selectElement}>
  <slot />
</select>
<div class="dropdown-wrapper">
  <DropdownMenu>
    <span class="select-dropdown" slot="label">
      <span>
        {#if activeOption}{@html activeOption.html}{:else}-{/if}
      </span>
    </span>
    {#each options as option, index}
      <li>
        <button on:click={() => setValue(index)}>{@html option.html} </button>
      </li>
    {/each}
  </DropdownMenu>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  select,
  .dropdown-wrapper {
    @include box-props-square-border(select, input, menu, control, container);
    @include color-props(select, input, menu, control, container);
    width: var(--select-width, var(--dropdown-menu-width, 12em));
  }
  .select-dropdown {
    display: inline-flex;
    width: var(--select-width, var(--dropdown-menu-width, 12em));
    box-sizing: border-box;
  }
  .dropdown-wrapper {
    @include color-props(select, input, menu, control, container);
  }
  .dropdown-menu :global(.dropdown-menu) > :global(button) {
    background-color: inherit;
    color: inherit;
  }
  .select-dropdown {
    position: relative;
  }
  .select-dropdown::after {
    content: var(--select-arrow, "⌄"); /* ↓ */
    margin-left: auto;
    transform: scaleX(1.5) translateY(-50%);
    display: inline-grid;
    width: 1em;
    place-content: center;
    position: absolute;
    right: var(--padding);
    top: 50%;
  }
  :global(.open) .select-dropdown::after {
    transform: rotate(180deg) scaleX(1.5);
  }

  select {
    display: none;
  }
  .dropdown-wrapper {
    display: contents;
  }

  @include responsive-content($max-width: 600px) {
    select {
      display: inline-block;
    }
    .dropdown-wrapper {
      display: none;
    }
  }
</style>
