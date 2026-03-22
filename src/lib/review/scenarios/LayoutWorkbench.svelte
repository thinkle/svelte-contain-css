<script lang="ts">
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  type WorkspaceCard = {
    title: string;
    metric: string;
    detail: string;
  };

  const cards: WorkspaceCard[] = [
    {
      title: "Launch Readiness",
      metric: "87%",
      detail: "Three blockers remain before release cutoff.",
    },
    {
      title: "Open Approvals",
      metric: "12",
      detail: "Legal and security still need sign-off.",
    },
    {
      title: "Active Experiments",
      metric: "4",
      detail: "Two pricing variants are outperforming control.",
    },
    {
      title: "Support Load",
      metric: "19",
      detail: "Queue volume is down 8% week over week.",
    },
  ];

  let hideSidebar = $state(false);
  let selectedTile = $state("pipeline");
  let tileSelected = $state(false);

  function toggleSidebar() {
    hideSidebar = !hideSidebar;
  }

  function inspectTile(tile: string) {
    selectedTile = tile;
    tileSelected = true;
  }
</script>

<Page data-audit-target="page" {hideSidebar}>
  {#snippet header()}
    <Bar primary>
      <div>
        <h1>Layout Workbench</h1>
      </div>

      <div>
        <Button
          data-audit-action="toggle-sidebar"
          aria-expanded={!hideSidebar}
          onclick={toggleSidebar}
        >
          {hideSidebar ? "Show Sidebar" : "Hide Sidebar"}
        </Button>
        <MiniButton aria-label="Notifications">3</MiniButton>
      </div>
    </Bar>
  {/snippet}

  {#snippet sidebar()}
    <Sidebar left>
      <MenuList striped>
        <li><button class="active">Overview</button></li>
        <li><button>Launches</button></li>
        <li><button>Approvals</button></li>
        <li><button>Insights</button></li>
        <li><button>Settings</button></li>
      </MenuList>
    </Sidebar>
  {/snippet}

  <TextLayout>
    <h1>Sidebar and card layout workbench</h1>
    <p>
      This scenario exercises page chrome, a collapsible sidebar, summary cards,
      and interactive tiles in the same route.
    </p>
  </TextLayout>
  <GridLayout card>
    {#each cards as card}
      <Card>
        {#snippet header()}
          <h3>{card.title}</h3>
        {/snippet}

        <h2>{card.metric}</h2>
        <p>{card.detail}</p>
        <p><Button>Review</Button></p>
      </Card>
    {/each}
  </GridLayout>

  <TextLayout><h2>Interactive tiles</h2></TextLayout>
  <GridLayout tile>
    <Tile
      interactive
      data-audit-action="select-tile"
      onclick={() => inspectTile("pipeline")}
    >
      <h3>Pipeline</h3>
      <p>Inspect work across launch stages.</p>
    </Tile>

    <Tile interactive onclick={() => inspectTile("customers")}>
      <h3>Customers</h3>
      <p>See which accounts need a follow-up this week.</p>
    </Tile>

    <Tile interactive onclick={() => inspectTile("experiments")}>
      <h3>Experiments</h3>
      <p>Review rollout status and watch for regressions.</p>
    </Tile>

    <Tile selectable>
      <h3>Pin this workspace</h3>
      <p>Keep this board in the default sidebar view.</p>
    </Tile>
  </GridLayout>

  {#if tileSelected}
    <TextLayout>
      <div data-audit-target="tile-selected">
        <Card>
          {#snippet header()}
            <h3>Selection detail</h3>
          {/snippet}

          <p>
            The <strong>{selectedTile}</strong> workspace is now in focus. This gives
            the review harness a second state for tiles without adding custom layout
            chrome.
          </p>
        </Card>
      </div>
    </TextLayout>
  {/if}
</Page>
