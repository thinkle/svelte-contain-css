<script lang="ts">
  // Page must preserve a consumer's sticky header/footer and their own
  // pseudo-elements. Replacing a snippet must still decorate a plain Bar.
  import Page from "$lib/layout/Page.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  let branded = $state(true);
</script>

<button onclick={() => (branded = !branded)}>Replace header and footer</button>
<Page>
  {#snippet header()}
    {#if branded}
      <div class="branded" data-testid="custom-header">Custom header</div>
    {:else}
      <Bar primary data-testid="plain-header">Plain header</Bar>
    {/if}
  {/snippet}
  <p>Page content</p>
  {#snippet footer()}
    {#if branded}
      <div class="branded" data-testid="custom-footer">Custom footer</div>
    {:else}
      <Bar data-testid="plain-footer">Plain footer</Bar>
    {/if}
  {/snippet}
</Page>

<style>
  .branded { position: sticky; top: 0; }
  .branded::before { content: "BRAND"; }
  .branded::after { content: "END"; }
</style>
