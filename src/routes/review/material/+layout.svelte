<script lang="ts">
  import "$lib/vars/defaults.css";
  import "$lib/vars/themes/material.css";

  let { children } = $props();
</script>

{@render children?.()}
