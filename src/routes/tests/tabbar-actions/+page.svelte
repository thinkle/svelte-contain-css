<script lang="ts">
  /* Fixtures for tests/tabbar-actions.spec.ts. */
  import TabBar from "$lib/layout/TabBar.svelte";
  import TabItem from "$lib/controls/TabItem.svelte";
  import Button from "$lib/controls/Button.svelte";
  import "$lib/vars/defaults.css";
</script>

<div data-testid="plain">
  <TabBar>
    <TabItem active>One</TabItem>
    <TabItem>Two</TabItem>
  </TabBar>
</div>

<div data-testid="with-actions">
  <TabBar>
    <TabItem active>My Assignments</TabItem>
    <TabItem>My Plans</TabItem>
    {#snippet actions()}
      <Button>Refresh</Button>
      <Button>Log Quick Intervention</Button>
      <Button>New Intervention Plan</Button>
    {/snippet}
  </TabBar>
</div>
