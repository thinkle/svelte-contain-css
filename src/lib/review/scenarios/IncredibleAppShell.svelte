<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Input from "$lib/controls/Input.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import DataList from "$lib/layout/DataList.svelte";
  import DataListItem from "$lib/layout/DataListItem.svelte";
  import Fieldset from "$lib/layout/Fieldset.svelte";
  import Form from "$lib/layout/Form.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Page from "$lib/layout/Page.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let showSummary = $state(false);
  let loggedIn = $state(true);
  let search = $state("migration");
  let sortBy = $state("recent");
  let showAssignedOnly = $state(true);
  let statusMessage = $derived(
    loggedIn
      ? showSummary
        ? "Advanced filters are visible."
        : "Everything looks normal."
      : "Signed out. Header should still hold together cleanly.",
  );

  const workItems = [
    {
      title: "Rewrite onboarding email copy",
      detail: "Marketing · Edited 42 minutes ago",
      owner: "TS",
      cta: "Review",
    },
    {
      title: "Resolve design QA pass for navbar spacing",
      detail: "Design Systems · Edited yesterday",
      owner: "AL",
      cta: "Compare",
    },
    {
      title: "Confirm analytics event names for account settings",
      detail: "Platform · Needs input from data team",
      owner: "RJ",
      cta: "Open",
    },
  ];

  function toggleState() {
    showSummary = !showSummary;
  }

  function logout() {
    loggedIn = false;
    showSummary = false;
  }
</script>

<Page data-audit-target="page">
  {#snippet header()}
    <Bar secondary>
      <div class="brand">
        <div class="eyebrow">Contain CSS Review Harness</div>
        <h1>My Incredible App</h1>
      </div>

      <div class="header-actions">
        <Button
          primary
          data-audit-action="open-menu"
          aria-expanded={showSummary}
          onclick={toggleState}
        >
          {showSummary ? "Hide" : "Filters"}
        </Button>

        <span class="session">
          Logged in as <span class="user"
            >{loggedIn ? "Joe Schmoe" : "Guest"}</span
          >
        </span>

        <MiniButton aria-label="Log out" title="Log out" onclick={logout}>
          ×
        </MiniButton>
      </div>
    </Bar>
  {/snippet}

  <TextLayout>
    <div class="hero-copy">
      <p class="kicker">Proof Of Concept</p>
      <h1>This is an incredible page</h1>
      <p>
        This route is intentionally opinionated: it shows a realistic app shell,
        a set of form controls, and a data list using the library components
        directly.
      </p>
      <p>{statusMessage}</p>
    </div>

    <Form layout="above" fullWidth globalInputStyles>
      <Fieldset>
        {#snippet legend()}
          Filters
        {/snippet}

        <FormItem>
          {#snippet label()}
            Search
          {/snippet}
          <Input bind:value={search} placeholder="Search work items" />
        </FormItem>

        <FormItem>
          {#snippet label()}
            Sort By
          {/snippet}
          <Select bind:value={sortBy} data-audit-action="open-select">
            <option value="recent">Recently Updated</option>
            <option value="priority">Priority</option>
            <option value="owner">Owner</option>
          </Select>
        </FormItem>

        <FormItem>
          {#snippet label()}
            Assigned
          {/snippet}
          <Checkbox bind:checked={showAssignedOnly}>Only show my items</Checkbox>
        </FormItem>
      </Fieldset>
    </Form>

    {#if showSummary}
      <div data-audit-target="menu-open">
        <Form layout="above" fullWidth>
          <Fieldset>
            {#snippet legend()}
              Summary
            {/snippet}
            <FormItem>
              {#snippet label()}
                Active Filters
              {/snippet}
              <p>
                Query <strong>{search}</strong>, sorted by <strong>{sortBy}</strong>,
                assigned only: <strong>{showAssignedOnly ? "yes" : "no"}</strong>.
              </p>
            </FormItem>
          </Fieldset>
        </Form>
      </div>
    {/if}

    <DataList>
      {#each workItems as item}
        <DataListItem>
          {#snippet start()}
            <span>{item.owner}</span>
          {/snippet}
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
          {#snippet end()}
            <Button>{item.cta}</Button>
          {/snippet}
        </DataListItem>
      {/each}
    </DataList>
  </TextLayout>
</Page>

<style lang="scss">
</style>
