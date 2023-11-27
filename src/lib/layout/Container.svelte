<script lang="ts">
  export let border: boolean = false;
</script>

<section class:border>
  <slot />
</section>

<style>
  :root {
    --container-max-width: 900px;
    --container-border: none;
    --container-margin: var(--gap);
  }
  section {
    margin: auto;
    max-width: var(--container-max-width);
    box-sizing: border-box;
    padding: var(--pad);
    background-color: var(--body-bg);
    color: var(--body-fg);
    border: var(--container-border);
    margin-top: var(--container-margin);
    margin-bottom: var(--container-margin);
    container-type: inline-size;
  }
  .border {
    border: var(--border-width) var(--border-style) var(--border-color);
  }
</style>
