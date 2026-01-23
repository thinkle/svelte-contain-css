<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { BaseStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    checked?: boolean | undefined;
    name?: string;
    value?: any;
    group?: any[];
    children?: Snippet;
  } & BaseStyleProps &
    Omit<HTMLInputAttributes, "value">;

  let {
    checked = $bindable<boolean | undefined>(undefined),
    name = "",
    value = undefined,
    group = $bindable<any[] | undefined>(undefined),
    children,
    ...restProps
  }: Props = $props();

  const style = $derived(
    injectVars(restProps, "checkbox", [
      "bg",
      "fg",
      "padding",
      "width",
      "height",
    ]),
  );

  const useGroup = $derived(group !== undefined && value !== undefined);

  // For group mode, compute checked state from group array
  const isChecked = $derived(
    useGroup ? (group?.includes(value) ?? false) : checked,
  );

  // Handle group changes manually since bind:group doesn't work well with $bindable
  function handleGroupChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!group) return;

    if (input.checked) {
      // Add value to group if not already present
      if (!group.includes(value)) {
        group = [...group, value];
      }
    } else {
      // Remove value from group
      group = group.filter((v: any) => v !== value);
    }
  }

  let ref: HTMLElement | null = $state(null);
</script>

<div class="label-sizing-box" {style}>
  <label class="checkbox-item">
    {#if useGroup}
      <input
        name={name || undefined}
        type="checkbox"
        {value}
        checked={isChecked}
        onchange={handleGroupChange}
        {...restProps}
      />
    {:else}
      <input
        name={name || (ref && ref.textContent) || undefined}
        type="checkbox"
        bind:checked
        {...restProps}
      />
    {/if}
    <span bind:this={ref}>{@render children?.()}</span>
  </label>
  <label class="invisible" aria-hidden="true">
    <input type="checkbox" checked={true} tabindex="-1" />
    <span>{@render children?.()}</span>
  </label>
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .label-sizing-box {
    position: relative;
    display: inline-block;
  }

  .label-sizing-box .checkbox-item {
    position: absolute;
    left: 0;
  }

  .label-sizing-box .invisible {
    position: static;
    pointer-events: none;
    visibility: hidden;
  }

  :root {
    /* Customize these variables for checkbox styling */
    --checkbox-check: "✓";
  }

  .offscreen,
  label {
    @include typography-props(checkbox, ui);
  }
  label {
    margin-left: var(--checkbox-padding, var(--padding));
  }

  .offscreen {
    visibility: visible;
    font-weight: var-with-fallbacks(
      --weight,
      checkbox-checked,
      checked,
      active
    );
    position: absolute;
  }

  label {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    gap: var(--checkbox-space, var(--toggle-space, var(--space-md)));

    @include clickable(checkbox, clickable);
  }

  label span {
    width: var(--label-width);
  }

  label:has(input:checked) {
    font-weight: var-with-fallbacks(
      --weight,
      checkbox-checked,
      checked,
      active
    );
  }

  input[type="checkbox"] {
    //display:
    @include visually-hidden();
  }

  label:has(input:focus-visible) {
    @include focus-ring();
  }

  label::before {
    transition: all var-with-fallbacks(--transition, checkbox, control);
    display: inline-grid;
    place-content: center;
    content: " ";
    width: var-with-fallbacks(--size, checkbox, font, 1em);
    height: var-with-fallbacks(--size, checkbox, font, 1em);
    @include color-props(checkbox, toggle, inactive, secondary);
    border: var-with-fallbacks(
      --border,
      checkbox,
      1px solid var(--border-color)
    );
    box-sizing: border-box;
    border-radius: var(--checkbox-radius, 0);
  }

  label:has(input:checked)::before {
    @include color-props(checkbox-checked, toggle-on, primary, checkbox);
    border: var-with-fallbacks(--border, checkbox-checked, toggle-on, checkbox);
    box-sizing: border-box;
  }

  label:has(input:checked)::after {
    content: var(--checkbox-check, "✓");
    font-size: var-with-fallbacks(--size, checkbox-check, 0.875em);
    color: var-with-fallbacks(
      --fg,
      checkbox-checked,
      toggle-on,
      primary,
      checkbox
    );
    position: absolute;
    left: var(--checkbox-left-offset, 0.125em);
    animation: checkbox-check var(--checkbox-transition) ease-in-out;
  }

  @keyframes checkbox-check {
    0% {
      width: 0;
      overflow: hidden;
    }
    100% {
      width: var-with-fallbacks(--size, checkbox, toggle, font, 1em);
    }
  }
</style>
