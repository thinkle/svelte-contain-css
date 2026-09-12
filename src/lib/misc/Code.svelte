<script lang="ts">
  const browser = typeof window !== "undefined";
  import type { Component } from "svelte";

  interface Props {
    code: string;
    inline?: boolean;
    language?: string;
  }

  /* No attribute pass-through, deliberately: this renders CodeInner (loaded
     lazily in the browser) and no element of its own. */
  let { code, inline = false, language = "html" }: Props = $props();
  let component: Component<Props> | null = $state(null);

  if (browser) {
    import("./CodeInner.svelte").then(
      ({ default: CodeInner }) => {
        component = CodeInner;
      },
    );
  }
</script>

{#if browser && component}
  {@const SvelteComponent_1 = component}
  <SvelteComponent_1 {language} {code} {inline} />
{/if}
