<script lang="ts">
  export let code: string;
  import Prism from "svelte-prism";
  import "prismjs/themes/prism.css";
  export let inline;
  export let width;
  export let height;
</script>

<div class="code" class:inline>
  <Prism language="html" source={code} />
</div>

<style>
  div {
    width: var(--code-width, 100%);
    height: var(--code-height, auto);
  }
  div > pre {
    width: var(--code-width, 100%);
    overflow-x: auto;
  }
</style>
