<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import type { MatchMode, TypeaheadMode } from "$lib/dropdowns/DropdownMenu.svelte";
  import { onMount, tick } from "svelte";

  type Props = ContainProps<
    HTMLSelectAttributes,
    {
      value?: any;
      children?: import("svelte").Snippet;
      "data-audit-action"?: string | null;
      /** See {@link MatchMode} on DropdownMenu -- how type-ahead text is compared. */
      matchMode?: MatchMode;
      /** See {@link TypeaheadMode} on DropdownMenu -- focus a match or filter the list. */
      typeaheadMode?: TypeaheadMode;
    },
    StyleProps<typeof SELECT_VARS>
  >;

  let {
    value = $bindable(),
    children,
    "data-audit-action": dropdownAuditAction = null,
    matchMode = "prefix",
    typeaheadMode = "focus",
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands this component's own CSS backs, one group per mixin
     it includes. The Props type is derived from this same array, so what
     the component accepts and what it emits cannot drift apart. */
  const SELECT_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(elementProps(restProps, "select", SELECT_VARS));
  let selectElement: HTMLSelectElement | undefined = $state();
  let observer: MutationObserver;
  let resizeObserver: ResizeObserver;
  let targetWidth = $state("");
  let optionButtons: (HTMLLIElement | null)[] = $state([]);
  // The subset of optionButtons the resize observer is currently watching, so
  // the $effect below can tell "nothing changed" from "rewire".
  let observedButtons: HTMLLIElement[] = [];

  onMount(() => {
    tick().then(() => updateOptions());

    /*
      Watch the options for any change, not just being added or removed. An
      <Option> whose content is rewritten in place -- a label being renamed --
      updates its own data-html without touching the child list, and a
      childList-only observer never hears about it, so the dropdown kept
      rendering the snapshot it took on mount.

      Coalesced into one pass per microtask: a single re-render can produce a
      burst of mutations, and updateOptions() measures layout.
    */
    observer = new MutationObserver(() => scheduleUpdateOptions());
    if (selectElement) {
      observer.observe(selectElement, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["data-html", "value", "label", "selected"],
      });
    }

    resizeObserver = new ResizeObserver(() => updateTargetWidth());

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  });

  /*
    optionButtons is populated by `bind:this` inside the {#each options}
    block below, so it only ever reflects the CURRENT option list once Svelte
    has reconciled the DOM -- which happens asynchronously relative to the
    updateOptions() call that rebuilt `options`. Re-deriving the observed set
    here, every time that binding changes, is what keeps the ResizeObserver
    in sync in both directions: a button added once the list grows longer
    gets observed, and one removed when the list shrinks is dropped instead
    of lingering as a stale (and eventually null) target.

    Guarded by reference comparison so an unrelated re-render that leaves the
    same buttons in place doesn't thrash disconnect()/observe() every time.
  */
  $effect(() => {
    if (!resizeObserver) return;
    const current = optionButtons.filter((button): button is HTMLLIElement =>
      Boolean(button),
    );
    const unchanged =
      current.length === observedButtons.length &&
      current.every((button, i) => button === observedButtons[i]);
    if (unchanged) return;
    resizeObserver.disconnect();
    current.forEach((button) => resizeObserver!.observe(button));
    observedButtons = current;
  });

  let options: { value: string; html: string }[] = $state([]);
  let activeOption: { value: string; html: string } | null = $state(null);
  let updateQueued = false;

  function scheduleUpdateOptions() {
    if (updateQueued) return;
    updateQueued = true;
    queueMicrotask(() => {
      updateQueued = false;
      updateOptions();
    });
  }

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
    /*
      optionButtons is bound by index from the {#each options} block below,
      so when the option list shrinks, the array's tail is left holding
      targets for <li>s that no longer render. (Svelte nulls each removed
      binding's own slot as it tears the element down, but that happens once
      the DOM catches up with this reassignment, not synchronously here --
      so truncate now rather than leave the old length around in the
      meantime.) Trimming it here, before the {#each} re-renders, keeps it
      from ever describing more options than currently exist.
    */
    if (optionButtons.length > options.length) {
      optionButtons.length = options.length;
    }
    activeOption = options[selectElement.selectedIndex];
    updateTargetWidth();
  }

  function updateTargetWidth() {
    let maxWidth = 0;
    for (let button of optionButtons) {
      // A stale or not-yet-bound slot (see updateOptions() above) -- skip it
      // rather than crash on a null bind:this target.
      if (!button) continue;
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

<select bind:value bind:this={selectElement} class={className} {...el}>
  {@render children?.()}
</select>
<div class="dropdown-wrapper" style:--target-width={targetWidth}>
  <DropdownMenu
    triggerAuditAction={dropdownAuditAction}
    {matchMode}
    {typeaheadMode}
  >
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
    /* The measured width fits the longest option; the container may be
       narrower than that. Truncate (below) rather than overflow. */
    max-width: 100%;
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
