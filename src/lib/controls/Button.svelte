<script>
  export let primary = false;
  export let warning = false;
  let iconSlotted = $$slots.icon;
</script>

<button on:click class:primary class:warning class:has-icon={iconSlotted}>
  <span class="content"><slot /></span>
  <span class:hidden={!iconSlotted} class="icon"><slot name="icon" /></span>
</button>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  button.has-icon {
    display: flex;
    gap: var(--space);
  }
  button {
    @include box-props(button, control, secondary);
    @include color-props(button, control, secondary);
    /* padding: var(--button-pad);
    border-radius: var(--button-radius);
    background: var(--button-bg);
    color: var(--button-fg); */
    /* transition:
      transform var(--button-transition),
      filter var(--button-transition); */
    font-family: var(--button-font);
    @include clickable(button, clickable);
    margin: var-with-fallbacks(--margin, button, control, var(--space));
  }
  button.primary {
    @include color-props(primary, button, control);
  }
  button.warning {
    @include color-props(warning, button, control);
  }
</style>
