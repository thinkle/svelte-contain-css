<script lang="ts">
  import "$lib/vars/defaults.css";
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

{@render children()}
