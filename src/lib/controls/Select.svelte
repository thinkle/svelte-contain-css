<script lang="ts">
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import { onMount, tick } from "svelte";

  export let value: any;
  let selectElement: HTMLSelectElement;
  let observer: MutationObserver;
  let resizeObserver: ResizeObserver;
  let targetWidth = 0;
  let optionButtons: HTMLButtonElement[] = [];

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

    // Observe size changes in option buttons
    resizeObserver = new ResizeObserver(() => updateTargetWidth());
    optionButtons.forEach(button => resizeObserver.observe(button));

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  });

  let options: { value: string; html: string }[] = [];
  let activeOption: { value: string; html: string } | null = null;

  function updateOptions() {
    if (!selectElement) {
      return;
    }
    options = [];
    let optionEls = selectElement.querySelectorAll("option");
    for (let optionEl of optionEls) {
      options.push({
        value: optionEl.value,
        html: optionEl.innerHTML,
      });
    }
    activeOption = options[selectElement.selectedIndex];
    updateTargetWidth();
  }

  function updateTargetWidth() {
    let maxWidth = 0;
    for (let button of optionButtons) {
      if (button.offsetWidth > maxWidth) {
        maxWidth = button.offsetWidth;
      }
    }
    targetWidth = maxWidth || 150; // Fallback width if measurement fails
  }

  function setValue(idx: number) {
    selectElement.selectedIndex = idx;
    selectElement.dispatchEvent(new Event("change"));
    activeOption = options[idx];
  }

  async function updateOption(value: any) {
    await tick();
    if (selectElement) {
      activeOption = options[selectElement.selectedIndex];
    }
  }

  $: updateOption(value);
</script>

<select bind:value on:change bind:this={selectElement} {...$$restProps}>
  <slot />
</select>
<div class="dropdown-wrapper" style:--target-width="{targetWidth}px">
  <DropdownMenu>
    <span class="select-dropdown" slot="label">
      <span class="select-dropdown-label">
        {#if activeOption}{@html activeOption.html}{:else}-{/if}
      </span>
    </span>
    {#each options as option, index}
      <li bind:this={optionButtons[index]}>
        <button on:click={() => setValue(index)}>
          <span>{@html option.html}</span>
        </button>
      </li>
    {/each}
  </DropdownMenu>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  select,
  .dropdown-wrapper > :global(.dropdown-menu > button) {
    @include box-props-square-border(select, input, menu, control, container);
    @include color-props(select, input, menu, control, container);
    width: var(
      --select-width,
      var(--target-width, var(--dropdown-menu-width, min(12em, 100vw)))
    );
    text-overflow: ellipsis;
    @include typography-props(select, input, ui);
    
  }
  .select-dropdown-label {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .select-dropdown {
    display: inline-flex;
    width: 100%;
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
    content: var(--select-arrow, "⌄");
    margin-left: auto;
    transform: var(--select-arrow-transform, scaleX(1.5) translateY(-70%));
    display: inline-grid;
    width: var(--select-dropdown-arrow-width, 1em);
    place-content: center;
    position: absolute;
    right: var(--select-arrow-right-offset, calc(-0.5 * var(--padding)));
    top: 50%;
  }

  .select-dropdown-label {
    padding-right: var(--select-dropdown-arrow-width, 1em);
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
