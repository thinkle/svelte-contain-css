<script lang="ts">
  /*
    Fixtures for tests/sidebar-overlay.spec.ts.

    Two behaviors are under test:

    1. `overlay` -- the wide sidebar normally widens its aside when it opens,
       which reflows the page content. With `overlay` the panel floats above
       the content instead, at every width, so the content box never moves.

    2. `bind:open` -- the open/closed state used to be two private
       variables. It is now one bindable prop, so a caller's button and the
       sidebar's own rail toggle have to drive the same value in both
       directions.

    Transitions are switched off (`--sidebar-transition: 0s`) so geometry can
    be measured immediately after a click.
  */
  import Page from "$lib/layout/Page.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import SidebarContainer from "$lib/layout/SidebarContainer.svelte";
  import Button from "$lib/controls/Button.svelte";

  let pushExpanded = $state<boolean | undefined>(undefined);
  let overlayExpanded = $state<boolean | undefined>(undefined);
  let stickyRightOpen = $state<boolean | undefined>(undefined);
  let stickyLeftOpen = $state<boolean | undefined>(undefined);
  let unstuckOpen = $state<boolean | undefined>(undefined);
</script>

<div style="--sidebar-transition: 0s;">
  <!-- Default (push) sidebar: opening it should narrow the page content. -->
  <section data-testid="push-section">
    <Page width="900px" height="320px">
      {#snippet sidebar()}
        <Sidebar data-testid="push-sidebar" bind:open={pushExpanded}>
          <div>Push sidebar</div>
        </Sidebar>
      {/snippet}
      <div data-testid="push-page-content">Page content</div>
    </Page>
    <Button
      data-testid="push-external-toggle"
      onclick={() => (pushExpanded = !(pushExpanded ?? true))}
    >
      Toggle push
    </Button>
    <span data-testid="push-readout">{String(pushExpanded)}</span>
  </section>

  <!-- Overlay sidebar: opening it should leave the page content alone and
       float the panel on top of it. -->
  <section data-testid="overlay-section">
    <Page width="900px" height="320px">
      {#snippet sidebar()}
        <Sidebar
          overlay
          data-testid="overlay-sidebar"
          bind:open={overlayExpanded}
        >
          <div>Overlay sidebar</div>
        </Sidebar>
      {/snippet}
      <div data-testid="overlay-page-content">Page content</div>
    </Page>
    <Button
      data-testid="overlay-external-toggle"
      onclick={() => (overlayExpanded = !(overlayExpanded ?? true))}
    >
      Toggle overlay
    </Button>
    <span data-testid="overlay-readout">{String(overlayExpanded)}</span>
  </section>

  <!-- Right-hand overlay sidebar, to check the mirrored geometry. -->
  <section data-testid="overlay-right-section">
    <Page right width="900px" height="320px">
      {#snippet sidebar()}
        <Sidebar right overlay data-testid="overlay-right-sidebar">
          <div>Right overlay sidebar</div>
        </Sidebar>
      {/snippet}
      <div data-testid="overlay-right-page-content">Page content</div>
    </Page>
  </section>
</div>

<!-- Icons: the rail and the sheet must not share a glyph by default. -->
<section data-testid="icons-section" style="width: 800px; container-type: inline-size; display: flex; height: 160px;">
  <Sidebar data-testid="icons-rail-sidebar">
    <p>nav</p>
  </Sidebar>
  <p>wide host, so this one shows the rail</p>
</section>
<section data-testid="icons-sheet-section" style="width: 400px; container-type: inline-size; display: flex; height: 160px;">
  <Sidebar data-testid="icons-sheet-sidebar">
    <p>nav</p>
  </Sidebar>
  <p>narrow host, so this one shows the sheet button</p>
</section>

<!-- SidebarContainer: content beside, not below. -->
<SidebarContainer data-testid="sc" height="160px" style="width: 800px;">
  <Sidebar data-testid="sc-sidebar"><p>nav</p></Sidebar>
  <p data-testid="sc-content">beside</p>
</SidebarContainer>

<!-- `sticky`: a sheet beside content far taller than the viewport. Without
     it the open sheet is as tall as the row; with it the sheet sticks near
     the viewport top and scrolls its own list. `--sidebar-transition: 0s` so
     geometry can be read straight after a click. -->
<section
  data-testid="sticky-section"
  style="--sidebar-transition: 0s; margin-top: 120px; width: 900px; container-type: inline-size; display: flex;"
>
  <div data-testid="sticky-tall-content" style="flex: 1; height: 3000px;">
    Tall content
  </div>
  <Sidebar
    right
    overlay
    sticky
    data-testid="sticky-right-sidebar"
    bind:open={stickyRightOpen}
  >
    <ul data-testid="sticky-right-list">
      {#each { length: 80 } as _, i}
        <li>Column {i + 1}</li>
      {/each}
    </ul>
  </Sidebar>
</section>

<section
  data-testid="sticky-left-section"
  style="--sidebar-transition: 0s; width: 900px; container-type: inline-size; display: flex;"
>
  <Sidebar overlay sticky data-testid="sticky-left-sidebar" bind:open={stickyLeftOpen}>
    <p>Short left sheet</p>
  </Sidebar>
  <div style="flex: 1; height: 3000px;">Tall content</div>
</section>

<!-- The control: same shape, no `sticky`. -->
<section
  data-testid="unstuck-section"
  style="--sidebar-transition: 0s; width: 900px; container-type: inline-size; display: flex;"
>
  <div style="flex: 1; height: 1500px;">Tall content</div>
  <Sidebar right overlay data-testid="unstuck-sidebar" bind:open={unstuckOpen}>
    <p>Stretches to the row</p>
  </Sidebar>
</section>

<!-- A shut sticky sheet must not hold a short row open to its own height. -->
<section
  data-testid="sticky-short-section"
  style="width: 900px; container-type: inline-size; display: flex;"
>
  <div data-testid="sticky-short-content" style="flex: 1; height: 60px;">Short</div>
  <Sidebar right overlay sticky data-testid="sticky-short-sidebar">
    <ul>
      {#each { length: 40 } as _, i}
        <li>Item {i + 1}</li>
      {/each}
    </ul>
  </Sidebar>
</section>

<!-- sheetButton: the toggle's shape. Default "tab" squares the corners on
     the side it attaches to; "button" rounds all four. -->
<section
  data-testid="sheet-button-section"
  style="--sidebar-transition: 0s; width: 900px; container-type: inline-size; display: flex; height: 200px; --circle-button-radius: 10px;"
>
  <div style="flex: 1;">content</div>
  <Sidebar right overlay data-testid="sheet-button-tab">
    <p>tab</p>
  </Sidebar>
  <Sidebar right overlay sheetButton="button" data-testid="sheet-button-button">
    <p>button</p>
  </Sidebar>
  <Sidebar
    right
    overlay
    data-testid="sheet-button-per-state"
    style="--sidebar-sheet-expand-edge-radius: 10px;"
  >
    <p>round when shut, tab when open</p>
  </Sidebar>
</section>
