<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps, TagStyleProps } from "$lib/types";
  import { elementProps } from "$lib/util";
  import {
    COLOR_VARS,
    PADDING_VARS,
    RADIUS_VARS,
    TYPOGRAPHY_VARS,
    type StyleProps,
  } from "$lib/styleProps";

  type Props = ContainProps<
    HTMLAttributes<HTMLSpanElement>,
    {
      children?: Snippet;
      primary?: boolean;
      warning?: boolean;
      danger?: boolean;
      success?: boolean;
      info?: boolean;
      onclose?: (() => void) | null;
      /**
       * Accessible name for the close button.
       *
       * The default describes the *widget* ("close a tag"), which is rarely
       * what the action means to a user. A tag is a filter chip in one app and
       * a removable label in another, so say what pressing it does here:
       * `closeLabel="Remove Fiction"`, `closeLabel="Stop searching by author"`.
       * Including the tag's own text is what makes a list of close buttons
       * distinguishable to a screen reader.
       */
      closeLabel?: string;
    },
    TagStyleProps &
      StyleProps<typeof TAG_VARS>
  >;

  let {
    children,
    primary,
    warning,
    danger,
    success,
    info,
    onclose = null,
    closeLabel = "Remove",
    class: className,
    ...restProps
  }: Props = $props();

  /* The shorthands tag's own CSS backs, one group per mixin it
     includes. The Props type is derived from this same array, so what the
     component accepts and what it emits cannot drift apart. */
  const TAG_VARS = [
    ...COLOR_VARS,
    ...PADDING_VARS,
    ...RADIUS_VARS,
    ...TYPOGRAPHY_VARS,
  ] as const;

  const el = $derived(
    elementProps(restProps, "tag", TAG_VARS),
  );
</script>

<span
  class={["tag", className]}
  class:closable={!!onclose}
  class:primary
  class:warning
  class:danger
  class:success
  class:info
  {...el}
>
  {@render children?.()}
  {#if onclose}
    <button class="close-button" aria-label={closeLabel} onclick={onclose}>
      <span aria-hidden="true">&times;</span>
    </button>
  {/if}
</span>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .tag {
    display: inline-block;
    align-self: flex-start;
    vertical-align: middle;
    @include color-props(tag, secondary);
    @include typography-props-bare(tag);
    @include box-props(tag);
    font-size: var(--tag-font-size, var(--font-size-tiny, 0.75rem));
    padding: var(--tag-padding, 0.2em 0.55em);
    margin-inline-start: var(--space);
    margin-inline-end: var(--space);
  }
  /* A closable tag lays its label and button out in flow rather than absolutely
     positioning the button over the top-right corner. The old approach needed a
     literal &nbsp; in the markup to stop the button covering the last character,
     which still overlapped once a tag wrapped to two lines and put the button's
     hit area outside the padding. As a flex item the button reserves its own
     space at any length, and the gap scales with the tag's font-size. */
  .tag.closable {
    display: inline-flex;
    align-items: center;
    gap: var(--tag-close-button-gap, 0.35em);
  }
  .tag .close-button {
    background: transparent;
    color: inherit;
    box-shadow: none;
    border: none;
    padding: 0;
    /* Square, so the focus ring and pointer target read as a button rather
       than tracking the width of the glyph. */
    inline-size: 1.25em;
    block-size: 1.25em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--tag-close-button-border-radius, 50%);
    font-size: inherit;
    line-height: 1;
    flex: none;
    @include clickable(tag-close-button, button);
    @include focusable();
  }
  .tag:first-child {
    margin-inline-start: 0;
  }
  .tag:last-child {
    margin-inline-end: 0;
  }
  /* Trailing `tag` keeps the variants' chains reaching a bare `tag` fallback
     (like the default .tag rule already does), so --tag-bg-mix-* / --tag-fg-mix-*
     dull or remap EVERY variant at once, not just the default. It also adds a
     --tag-bg / --tag-fg layer below the variant's own --danger-bg etc.; those
     variant tokens are always set and win first, so colors are unchanged at
     0% mix (asserted in tests/color-mix.spec.ts). */
  .tag.primary {
    @include color-props(tag-primary, primary, tag);
  }
  .tag.warning {
    @include color-props(tag-warning, warning, tag);
  }
  .tag.danger {
    @include color-props(tag-danger, danger, tag);
  }
  .tag.success {
    @include color-props(tag-success, success, tag);
  }
  .tag.info {
    @include color-props(tag-info, info, tag);
  }
</style>
