<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import type { ContainProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLTextareaAttributes,
    {
      value?: string;
      placeholder?: string;
    },
    StyleProps<typeof TEXTAREA_VARS>
  >;

  let {
    value = $bindable(""),
    placeholder = "",
    class: className,
    ...restProps
  }: Props = $props();

  const TEXTAREA_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(elementProps(restProps, "textarea", TEXTAREA_VARS));

  /* CSS grows the box (field-sizing: content) where it can; elsewhere, size
     it to its content on every change. min-height and max-height still
     clamp it either way. */
  let textarea: HTMLTextAreaElement | undefined = $state();
  $effect(() => {
    value;
    if (!textarea || CSS.supports("field-sizing", "content")) return;
    const style = getComputedStyle(textarea);
    const borders =
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + borders}px`;
  });
</script>

<textarea
  bind:this={textarea}
  rows={1}
  bind:value
  {placeholder}
  class={className}
  {...el}
></textarea>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  /* The same field as Input, many lines tall: geometry walks
     textarea -> input -> field -> control, so a theme that styles Input
     styles this too. */
  textarea {
    @include typography-props(textarea, input, ui);
    @include field-box-props(textarea, input, field, control);
    @include field-border-props(textarea, input, field, control);
    @include color-props(textarea, input, field, $family: false);
    /* Wide by default: a textarea is for more than a word. */
    width: var(--textarea-width, 100%);
    max-width: 100%;
    box-sizing: border-box;
    /* Grows with what is typed, from --textarea-min-height (about three
       lines; underline fields start at one) to --textarea-max-height, then
       scrolls. Browsers without field-sizing get the autogrow in the script. */
    field-sizing: content;
    min-height: var(--textarea-min-height, 4lh);
    max-height: var(--textarea-max-height, 20lh);
    resize: var(--textarea-resize, vertical);
    @include focusable();
  }
  @media (pointer: coarse) {
    textarea {
      font-size: max(var(--font-size-min-input, 16px), var(--_font-size, 1em));
    }
  }
</style>
