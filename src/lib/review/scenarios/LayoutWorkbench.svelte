<script lang="ts">
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Inline from "$lib/layout/Inline.svelte";
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
      title: "Aisle Containment",
      metric: "87%",
      detail: "Core storage categories remain aligned with spring reset targets.",
    },
    {
      title: "Drawer Dividers",
      metric: "12",
      detail: "Twelve modular drawer programs are under assortment review.",
    },
    {
      title: "Elfa Experiments",
      metric: "4",
      detail: "Four shelving pilots are active across closet and pantry segments.",
    },
    {
      title: "Label Maker Load",
      metric: "19",
      detail: "Nineteen signage updates are queued for category managers.",
    },
  ];

  let hideSidebar = $state(false);
  let selectedTile = $state("closet wall");
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
        <h1>Container Store Report</h1>
      </div>

      <Inline>
        <Button
          data-audit-action="toggle-sidebar"
          aria-expanded={!hideSidebar}
          onclick={toggleSidebar}
        >
          {hideSidebar ? "Show Aisles" : "Hide Aisles"}
        </Button>
        <MiniButton aria-label="Notifications">3</MiniButton>
      </Inline>
    </Bar>
  {/snippet}

  {#snippet sidebar()}
    <Sidebar left>
      <MenuList striped>
        <li><button class="active">Overview</button></li>
        <li><button>Closets</button></li>
        <li><button>Pantries</button></li>
        <li><button>Bins</button></li>
        <li><button>Receipts</button></li>
      </MenuList>
    </Sidebar>
  {/snippet}

  <TextLayout>
    <h1>Container Store field report</h1>
    <p>
      The Container Store continues to position organization as a premium retail
      service, not merely a collection of bins. Store teams report steady demand
      for closet systems, pantry canisters, drawer programs, and labeled
      back-of-house workflows that make small spaces feel professionally
      governed.
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
        <p><Button>Inspect</Button></p>
      </Card>
    {/each}
  </GridLayout>

  <TextLayout><h2>Interactive report sections</h2></TextLayout>
  <GridLayout tile>
    <Tile
      interactive
      data-audit-action="select-tile"
      onclick={() => inspectTile("closet wall")}
    >
      <h3>Closet wall</h3>
      <p>
        Review shelving attach rates, installation capacity, and the mix of
        drawers, rods, and upper storage in the current Elfa program.
      </p>
    </Tile>

    <Tile interactive onclick={() => inspectTile("pantry aisle")}>
      <h3>Pantry aisle</h3>
      <p>
        Compare clear canisters, turntables, risers, and private-label
        replenishment against seasonal meal-prep traffic.
      </p>
    </Tile>

    <Tile interactive onclick={() => inspectTile("desk drawer")}>
      <h3>Desk drawer</h3>
      <p>
        Review office trays, cable boxes, desktop files, and small-item storage
        as hybrid work demand settles into a steadier pattern.
      </p>
    </Tile>

    <Tile selectable>
      <h3>Pin this aisle</h3>
      <p>
        Keep this section in the weekly merchant packet for follow-up on margin,
        attachment, and staff training.
      </p>
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
            The <strong>{selectedTile}</strong> section is now in focus. The next
            review should compare traffic, basket size, and installation
            availability before making changes to the regional plan.
          </p>
        </Card>
      </div>
    </TextLayout>
  {/if}
</Page>
