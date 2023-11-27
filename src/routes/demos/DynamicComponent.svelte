<script>
  import { onMount } from "svelte";
  import "$lib/vars/defaults.css";
  export let component;
  let LoadedComponent;
  let error;

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
  <svelte:component this={LoadedComponent} />
{:else if error}
  <p>Failed to load the component: {error}</p>
{:else}
  Loading...
{/if}
