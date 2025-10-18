<script lang="ts">
  import { injectVars } from "$lib/util";

  let {
    children,
    primary,
    warning,
    onclose = null,
    ...restProps
  }: {
    children?: import("svelte").Snippet;
    primary?: boolean;
    warning?: boolean;
    onclose?: (() => void) | null;
  } & Record<string, unknown> = $props();
  let style = $derived(
    injectVars(restProps, "tag", [
      "bg",
      "fg",
      "padding",
      "borderRadius",
      "fontSize",
    ])
  );
</script>

<span
  {style}
  class="tag"
  class:closable={!!onclose}
  {...restProps}
  class:primary
  class:warning
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
    @include color-props(tag, secondary);
    @include typography-props-bare(tag, small);
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
</style>
