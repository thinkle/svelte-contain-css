<script lang="ts">
  import { injectVars } from "$lib/util";

  export let primary = false;
  export let warning = false;
  export let danger = false;
  export let success = false;
  export let info = false;
  export let onclose: (() => void) | null = null;

  $: style = injectVars($$props, "tag", [
    "bg",
    "fg",
    "padding",
    "borderRadius",
    "fontSize",
  ]);
</script>

<span
  {style}
  class="tag"
  class:closable={!!onclose}
  {...$$restProps}
  class:primary
  class:warning
  class:danger
  class:success
  class:info
>
  <slot />
  {#if onclose}
    &nbsp;
    <button class="close-button" aria-label="Close tag" on:click={onclose}>
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
