<script lang="ts">
  import { run, createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import { onMount, tick } from "svelte";

  interface Props {
    value: any;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { value = $bindable(), children, ...rest }: Props = $props();
  let selectElement: HTMLSelectElement = $state();
  let observer: MutationObserver;
  let resizeObserver: ResizeObserver;
  let targetWidth = $state(0);
  let optionButtons: HTMLButtonElement[] = $state([]);

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
    if (selectElement) {
      observer.observe(selectElement, { childList: true });
    }

    // Observe size changes in option buttons
    resizeObserver = new ResizeObserver(() => updateTargetWidth());
    optionButtons.forEach((button) => resizeObserver.observe(button));

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  });

  let options: { value: string; html: string }[] = $state([]);
  let activeOption: { value: string; html: string } | null = $state(null);

  function updateOptions() {
    if (!selectElement) {
      return;
    }
    options = [];
    let optionEls = selectElement.querySelectorAll("option");
    for (let optionEl of optionEls) {
      const richHtml = optionEl.dataset.html ?? optionEl.innerHTML;
      options.push({
        value: optionEl.value,
        html: richHtml.trim(),
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

  run(() => {
    updateOption(value);
  });
</script>

<select bind:value onchange={bubble('change')} bind:this={selectElement} {...rest}>
  {@render children?.()}
</select>
<div class="dropdown-wrapper" style:--target-width="{targetWidth}px">
  <DropdownMenu>
    {#snippet label()}
        <span class="select-dropdown" >
        <span class="select-dropdown-label">
          {#if activeOption}{@html activeOption.html}{:else}-{/if}
        </span>
      </span>
      {/snippet}
    {#each options as option, index}
      <li bind:this={optionButtons[index]}>
        <button onclick={() => setValue(index)}>
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
    @include focusable();
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
