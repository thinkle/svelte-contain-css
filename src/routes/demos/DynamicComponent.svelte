<script lang="ts">
  import { onMount } from "svelte";
  import "$lib/vars/defaults.css";
  let { component } = $props();
  let LoadedComponent = $state();
  let error = $state();

  onMount(async () => {
    try {
      const importedComponent = await import(`./${component}Demo.svelte`);
      LoadedComponent = importedComponent.default;
    } catch (err) {
      error = err;
      console.error("Failed to load the component:", error);
    }
  });
</script>

{#if LoadedComponent}
  <LoadedComponent />
{:else if error}
  <p>Failed to load the component: {error}</p>
{:else}
  Loading...
{/if}
