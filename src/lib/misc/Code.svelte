<script lang="ts">
  const browser = typeof window !== "undefined";
  import type { SvelteComponent } from 'svelte';
  export let code: string; 
  export let inline = false;
  export let language = "html";
  let component : SvelteComponent | null = null;
  if (browser) {
    import("./CodeInner.svelte").then(
      ({ default: CodeInner }) => {
        component = CodeInner;
      }
    );            
  }
</script>

{#if browser && component}
  <svelte:component this={component} {language} {code} {inline}/>
{/if}


