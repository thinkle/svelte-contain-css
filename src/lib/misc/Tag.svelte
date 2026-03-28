<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { TagStyleProps } from "$lib/types";
  import { injectVars } from "$lib/util";

  type Props = {
    children?: import("svelte").Snippet;
    primary?: boolean;
    warning?: boolean;
    danger?: boolean;
    success?: boolean;
    info?: boolean;
    onclose?: (() => void) | null;
  } & TagStyleProps &
    HTMLAttributes<HTMLSpanElement>;

  let {
    children,
    primary,
    warning,
    danger,
    success,
    info,
    onclose = null,
    ...restProps
  }: Props = $props();

  let style = $derived(
    injectVars(restProps, "tag", [
      "bg",
      "fg",
      "padding",
      "borderRadius",
      "fontSize",
    ]),
  );
</script>

<span
  {style}
  class="tag"
  class:closable={!!onclose}
  {...restProps}
  class:primary
  class:warning
  class:danger
  class:success
  class:info
>
  {@render children?.()}
  {#if onclose}
    &nbsp;
    <button class="close-button" aria-label="Close tag" onclick={onclose}>
      &times;
    </button>
  {/if}
</span>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  .tag {
    display: inline-block;
    --tag-font-size: var(--font-size-small, 0.75rem);
    --tag-padding: 0.2em 0.55em;
    @include color-props(tag, secondary);
    @include typography-props-bare(tag);
    @include box-props(tag);
    margin-inline-start: var(--space);
    margin-inline-end: var(--space);
  }
  .tag.closable {
    position: relative;
  }
  .tag button {
    background: transparent;
    color: inherit;
    box-shadow: none;
    border: none;
    position: absolute;
    top: 0;
    right: 0;
    @include clickable(tag-close-button, button);
    @include focusable();
  }
  .tag:first-child {
    margin-inline-start: 0;
  }
  .tag:last-child {
    margin-inline-end: 0;
  }
  .tag.primary {
    @include color-props(tag-primary, primary);
  }
  .tag.warning {
    @include color-props(tag-warning, warning);
  }
  .tag.danger {
    @include color-props(tag-danger, danger);
  }
  .tag.success {
    @include color-props(tag-success, success);
  }
  .tag.info {
    @include color-props(tag-info, info);
  }
</style>
