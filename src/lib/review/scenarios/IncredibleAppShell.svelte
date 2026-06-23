<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Input from "$lib/controls/Input.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import DataList from "$lib/layout/DataList.svelte";
  import DataListItem from "$lib/layout/DataListItem.svelte";
  import Fieldset from "$lib/layout/Fieldset.svelte";
  import Form from "$lib/layout/Form.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let showSummary = $state(false);
  let loggedIn = $state(true);
  let search = $state("reefer");
  let sortBy = $state("berth");
  let showAssignedOnly = $state(true);
  let confidenceThreshold = $state(68);
  let statusMessage = $derived(
    loggedIn
      ? showSummary
        ? "Manifest filters are open for inspection."
        : "All containers are lashed, logged, and behaving like responsible rectangles."
      : "Signed out. The bridge should still hold together cleanly.",
  );

  const workItems = [
    {
      title: "Inspect reefer stack on bay 42",
      detail: "Cold chain · Temperature report updated 42 minutes ago",
      owner: "RF",
      cta: "Inspect",
    },
    {
      title: "Rebalance twist-lock notes for port rail",
      detail: "Deck crew · Spacing review completed yesterday",
      owner: "TL",
      cta: "Compare",
    },
    {
      title: "Confirm manifest names for nested cargo cards",
      detail: "Harbor ops · Needs input from the quay team",
      owner: "QC",
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
      <Stack class="brand">
        <div class="eyebrow">North Atlantic Harbor Desk</div>
        <h1>Harbor Containership Console</h1>
      </Stack>

      <Inline class="header-actions">
        <Button
          primary
          data-audit-action="open-menu"
          aria-expanded={showSummary}
          onclick={toggleState}
        >
          {showSummary ? "Hide" : "Filters"}
        </Button>

        <span class="session">
          Logged in as <span class="user">{loggedIn ? "Captain Box" : "Guest"}</span>
        </span>

        <MiniButton aria-label="Log out" title="Log out" onclick={logout}>
          ×
        </MiniButton>
      </Inline>
    </Bar>
  {/snippet}

  <TextLayout>
    <Stack class="hero-copy">
      <p class="kicker">Containership Operations</p>
      <h1>A bridge display for very opinionated cargo rectangles</h1>
      <p>
        The harbor team uses this console to track reefers, dry boxes, twist
        locks, and manifest oddities before the ship clears the breakwater. By
        dawn, every suspicious seal, late manifest, and chilled pallet should
        have a berth assignment, a watch officer, and a paper trail tidy enough
        to survive a salty breeze.
      </p>
      <p>{statusMessage}</p>
    </Stack>

    <Form layout="above" fullWidth globalInputStyles>
      <Fieldset>
        {#snippet legend()}
          Manifest Filters
        {/snippet}

        <FormItem>
          {#snippet label()}
            Search Cargo
          {/snippet}
          <Input
            bind:value={search}
            placeholder="Search containers, bays, or crews"
          />
        </FormItem>

        <FormItem>
          {#snippet label()}
            Sort By
          {/snippet}
          <Select bind:value={sortBy} data-audit-action="open-select">
            <option value="berth">Berth Order</option>
            <option value="temperature">Temperature Risk</option>
            <option value="bay">Bay Number</option>
          </Select>
        </FormItem>

        <FormItem>
          {#snippet label()}
            Watchlist
          {/snippet}
          <Checkbox bind:checked={showAssignedOnly}>
            Only show containers on my deck watch
          </Checkbox>
        </FormItem>

        <FormItem>
          {#snippet label()}
            Seaworthiness Threshold ({confidenceThreshold}%)
          {/snippet}
          <Slider bind:value={confidenceThreshold} min={0} max={100} step={1} />
        </FormItem>
      </Fieldset>
    </Form>

    {#if showSummary}
      <div data-audit-target="menu-open">
        <Form layout="above" fullWidth>
          <Fieldset>
            {#snippet legend()}
              Manifest Summary
            {/snippet}
            <FormItem>
              {#snippet label()}
                Active Filters
              {/snippet}
              <p>
                Query <strong>{search}</strong>, sorted by <strong>{sortBy}</strong>,
                watchlist only: <strong>{showAssignedOnly ? "yes" : "no"}</strong>,
                seaworthiness: <strong>{confidenceThreshold}%</strong>. The manifest
                clerk has underlined this in blue pencil, which is how serious
                container people express whimsy.
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
