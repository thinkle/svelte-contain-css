<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import { onMount, tick } from "svelte";

  type Props = {
    value?: any;
    children?: import("svelte").Snippet;
    "data-audit-action"?: string | null;
  } & HTMLSelectAttributes;

  let {
    value = $bindable(),
    children,
    "data-audit-action": dropdownAuditAction = null,
    ...restProps
  }: Props = $props();
  let selectElement: HTMLSelectElement | undefined = $state();
  let observer: MutationObserver;
  let resizeObserver: ResizeObserver;
  let targetWidth = $state("");
  let optionButtons: HTMLLIElement[] = $state([]);

  onMount(() => {
    tick().then(() => updateOptions());

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
    targetWidth = maxWidth ? maxWidth + "px" : "100%"; // || 150; // Fallback width if measurement fails
  }

  function setValue(idx: number) {
    if (!selectElement) return;
    selectElement.selectedIndex = idx;
    selectElement.dispatchEvent(new Event("change", { bubbles: true }));
    activeOption = options[idx];
  }

  async function updateOption(value: any) {
    await tick();
    if (selectElement) {
      activeOption = options[selectElement.selectedIndex];
    }
  }

  $effect(() => {
    updateOption(value);
  });
</script>

<select bind:value bind:this={selectElement} {...restProps}>
  {@render children?.()}
</select>
<div class="dropdown-wrapper" style:--target-width={targetWidth}>
  <DropdownMenu triggerAuditAction={dropdownAuditAction}>
    {#snippet label()}
      <span
        class="select-dropdown"
        style:--fg="var(--select-fg, var(--control-fg, var(--fg)))"
      >
        <span class="select-dropdown-label">
          {#if activeOption}{@html activeOption.html}{:else}-{/if}
        </span>
      </span>
    {/snippet}
    {#each options as option, index}
      <li
        bind:this={optionButtons[index]}
        style:--fg="var(--menu-fg, var(--control-fg, var(--fg)))"
      >
        <button
          type="button"
          role="menuitemradio"
          aria-checked={value == option.value}
          onclick={() => setValue(index)}
        >
          <span>{@html option.html}</span>
        </button>
      </li>
    {/each}
  </DropdownMenu>
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  select,
  .dropdown-wrapper > :global(.dropdown-menu > button) {
    @include box-props-square-border(select, input, menu, control, surface);
    @include color-props(select, input, menu, control, surface);
    width: var(
      --select-width,
      var(--target-width, var(--dropdown-menu-width, min(12em, 100vw)))
    );
    text-overflow: ellipsis;
    @include typography-props(select, input, ui);
    @include focusable();
  }
  button {
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
    @include color-props(select, input, menu, control, surface);
    --menu-item-justify: var(--select-menu-item-justify, flex-start);
  }
  .dropdown-menu :global(.dropdown-menu) > :global(button) {
    background-color: inherit;
    color: inherit;
  }
  .select-dropdown {
    position: relative;
  }
  .select-dropdown::after {
    content: var(--select-arrow, "▾");
    color: var(--select-arrow-fg, currentColor);
    background-image: var(--select-arrow-image, none);
    background-position: center;
    background-repeat: no-repeat;
    background-size: var(--select-arrow-width, 1rem) var(--select-arrow-height, 1rem);
    font-size: var(--select-arrow-font-size, 1em);
    line-height: 1;
    margin-left: auto;
    transform: var(
      --select-arrow-closed-transform,
      var(--select-arrow-transform, translateY(-50%) rotate(0deg))
    );
    transition: var(
      --select-arrow-transition,
      transform 180ms ease, color 180ms ease
    );
    transform-origin: center;
    display: inline-grid;
    width: var(--select-dropdown-arrow-width, var(--select-arrow-width, 1em));
    height: var(--select-dropdown-arrow-height, var(--select-arrow-height, 1em));
    place-content: center;
    position: absolute;
    right: var(--select-arrow-right-offset, calc(-0.5 * var(--padding)));
    top: 50%;
  }

  .select-dropdown-label {
    padding-right: var(
      --select-label-padding-right,
      calc(var(--select-dropdown-arrow-width, var(--select-arrow-width, 1em)) + 0.75rem)
    );
  }

  :global(.dropdown-menu.open) .select-dropdown::after {
    transform: var(
      --select-arrow-open-transform,
      var(--select-arrow-transform, translateY(-50%) scaleY(-1))
    );
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
