<script>
  export let primary;
  let iconSlotted = $$slots.icon;
</script>

<button on:click class:primary>
  <span class="content"><slot /></span>
  <span class:hidden={!iconSlotted} class="icon"><slot name="icon" /></span>
</button>

<style>
  button {
    padding: var(--pad);
    border-radius: var(--border-radius);
    background: var(--button-bg);
    color: var(--button-fg);
    transform: var(--button-transform);
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
