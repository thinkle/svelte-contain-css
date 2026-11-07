<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { BaseStyleProps, ContainProps } from "$lib/types";
  import { splitProps } from "$lib/util";
  import {
    COLOR_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLInputAttributes,
    {
      checked?: boolean | undefined;
      name?: string;
      value?: any;
      group?: any[];
      /**
       * Outline the whole label, so the text reads as part of the control:
       * a bordered, padded option that takes the accent edge and a faint
       * tint when checked. Style it with --checkbox-boxed-border,
       * --checkbox-boxed-padding-block,
       * --checkbox-boxed-padding-inline, --checkbox-boxed-radius, and
       * --checkbox-boxed-checked-border-color / --checkbox-boxed-checked-bg.
       */
      boxed?: boolean;
      children?: Snippet;
    },
    BaseStyleProps &
      StyleProps<typeof CHECKBOX_VARS>
  ,
    "value" | "type"
  >;

  let {
    checked = $bindable<boolean | undefined>(undefined),
    name = "",
    value = undefined,
    group = $bindable<any[] | undefined>(undefined),
    boxed = false,
    children,
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands checkbox's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const CHECKBOX_VARS = [
    ...COLOR_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(
    splitProps(restProps, "checkbox", [
      ...CHECKBOX_VARS,
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

<div class={["label-sizing-box", className]} class:boxed style={el.style}>
  <label class="checkbox-item">
    {#if useGroup}
      <input
        name={name || undefined}
        type="checkbox"
        {value}
        checked={isChecked}
        onchange={handleGroupChange}
        {...el.attrs}
      />
    {:else}
      <input
        name={name || (ref && ref.textContent) || undefined}
        type="checkbox"
        bind:checked
        {...el.attrs}
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
  @use "$lib/sass/_mixins.scss" as *;

  .label-sizing-box {
    position: relative;
    display: inline-block;
    /* An inline-block wraps as a whole first, so short labels in a row just
       flow onto the next line; only a label longer than the whole row wraps
       its own text (the invisible sizer and the real label wrap alike). */
    max-width: 100%;
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
    @include clickable-cursor(checkbox, clickable);
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
    @include clickable-affordance-transition(
      checkbox,
      clickable,
      control,
      180ms ease
    );
    display: inline-grid;
    place-content: center;
    content: " ";
    /* Fixed-size flex item: without this, a narrow container (long label
       text with nowhere to wrap) shrinks the box itself instead of only
       wrapping the text, turning the square into a rectangle. */
    flex-shrink: 0;
    width: var-with-fallbacks(--size, checkbox, font, 1em);
    height: var-with-fallbacks(--size, checkbox, font, 1em);
    @include color-props(checkbox, toggle, inactive);
    border: var-with-fallbacks(
      --border,
      checkbox,
      1px solid var(--border-color)
    );
    box-sizing: border-box;
    border-radius: var(--checkbox-radius, 0);
  }

  /* The :has(:checked) variants are needed because the checked rule below
     outranks a bare label:hover::before and would swallow the hover; the mix
     still reads the checked colors through --_background-color. */
  label:hover::before,
  label:has(input:checked):hover::before {
    @include clickable-hover-affordance(checkbox, clickable);
  }

  label:active::before,
  label:has(input:checked):active::before {
    @include clickable-active-affordance(checkbox, clickable);
  }

  label:has(input:checked)::before {
    @include color-props(checkbox-checked, toggle-on, primary, checkbox);
    border: var-with-fallbacks(--border, checkbox-checked, toggle-on, checkbox);
    box-sizing: border-box;
  }

  label:has(input:disabled) {
    cursor: not-allowed;
    opacity: var(--checkbox-disabled-opacity, 0.6);
    filter: grayscale(0.2);
  }

  label:has(input:disabled):hover::before,
  label:has(input:disabled):active::before {
    filter: none;
    box-shadow: none;
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
  /* Rows of options are easier to hit on a touch screen when each is a little
     taller. --touch-row-size (36px), not the full --touch-target-size: a
     list of options at 44px a row spreads out more than it helps, and
     36px clears WCAG's 24px minimum with room to spare. The label is the
     whole hit area, so it is the label that grows; it already centres its
     content. 0 turns it off. */
  @media (pointer: coarse) {
    label {
      min-height: var(--touch-row-size, 36px);
    }
  }

  /* `boxed`: the label is the visible control. Both labels -- the real one
     and the invisible sizer under it -- take the same padding and border,
     so the box is sized to the label at its checked weight. */
  .boxed {
    margin-block: var(--checkbox-boxed-margin-block, 0.2em);
  }
  .boxed label {
    padding: var(--checkbox-boxed-padding-block, 0.5em)
      var(--checkbox-boxed-padding-inline, 0.75em);
    /* The box's own padding is the inset now; the unboxed label's left
       margin would push the whole box in. */
    margin-left: 0;
    border: var(--checkbox-boxed-border, 1px solid var(--border-color));
    border-radius: var(
      --checkbox-boxed-radius,
      var(--square-radius, var(--border-radius, 0.375rem))
    );
    box-sizing: border-box;
  }
  .boxed label.checkbox-item:has(input:checked) {
    border-color: var(--checkbox-boxed-checked-border-color, var(--primary-bg));
    background: var(
      --checkbox-boxed-checked-bg,
      color-mix(in oklab, var(--primary-bg) 8%, transparent)
    );
  }
  /* The check mark is placed from the label's padding edge, so in a boxed
     label it moves in by the same padding as the box it marks. */
  .boxed label:has(input:checked)::after {
    left: calc(
      var(--checkbox-boxed-padding-inline, 0.75em) +
        var(--checkbox-left-offset, 0.125em)
    );
  }
</style>
