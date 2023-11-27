<script>
  export let primary = false;
  let iconSlotted = $$slots.icon;
</script>

<button on:click class:primary class:has-icon={iconSlotted}>
  <span class="content"><slot /></span>
  <span class:hidden={!iconSlotted} class="icon"><slot name="icon" /></span>
</button>

<style>
  :root {
    --button-radius: var(--border-radius);
    --button-bg: var(--secondary-bg);
    --button-fg: var(--secondary-fg);
    --button-font: var(--ui-font);
    --button-hover-transform: var(--hover-transform);
    --button-hover-filter: var(--hover-filter);
    --button-active-transform: var(--active-transform);
    --button-active-filter: var(--active-filter);
    --button-transition: var(--transition);
    --button-pad: var(--pad);
  }
  button.has-icon {
    display: flex;
    gap: var(--space);
  }
  button {
    padding: var(--button-pad);
    border-radius: var(--button-radius);
    background: var(--button-bg);
    color: var(--button-fg);
    transition:
      transform var(--button-transition),
      filter var(--button-transition);
    font-family: var(--button-font);
  }
  button.primary {
    background-color: var(--primary-bg);
    color: var(--primary-fg);
  }
  button:hover {
    filter: var(--button-hover-filter);
    transform: var(--button-hover-transform);
  }
  button:active {
    filter: var(--button-active-filter);
    transform: var(--button-active-transform);
  }
</style>
