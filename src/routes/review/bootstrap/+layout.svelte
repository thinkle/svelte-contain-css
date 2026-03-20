<script lang="ts">
  import "$lib/vars/defaults.css";
  import "$lib/vars/themes/bootstrap.css";

  let { children } = $props();
</script>

{@render children?.()}
