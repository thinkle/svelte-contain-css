<script lang="ts">
  const browser = typeof window !== "undefined";
  import type { SvelteComponent } from 'svelte';
  interface Props {
    code: string;
    inline?: boolean;
    language?: string;
  }

  let { code, inline = false, language = "html" }: Props = $props();
  let component : SvelteComponent | null = $state(null);
  if (browser) {
    import("./CodeInner.svelte").then(
      ({ default: CodeInner }) => {
        component = CodeInner;
      }
    );            
  }
</script>

{#if browser && component}
  {@const SvelteComponent_1 = component}
  <SvelteComponent_1 {language} {code} {inline}/>
{/if}


