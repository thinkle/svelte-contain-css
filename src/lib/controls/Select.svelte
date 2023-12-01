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
    <span class="select-dropdown" slot="label"
      >{#if activeOption}{@html activeOption.html}{:else}-{/if}
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
  .select-dropdown {
    @include box-props-square(select, menu, control, container);
    @include color-props(select, input, secondary, menu, control, container);
    @include border-props(select, menu, control, container);
    width: var(--select-width, var(--dropdown-menu-width, 12em));
    display: inline-block;
  }
  .select-dropdown::after {
    content: "↓";
    padding-left: var(--gap);
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
