<script lang="ts">
  /*
    Fixtures for tests/sidebar-overlay.spec.ts.

    Two behaviors are under test:

    1. `overlay` -- the wide sidebar normally widens its aside when it opens,
       which reflows the page content. With `overlay` the panel floats above
       the content instead, at every width, so the content box never moves.

    2. `bind:expanded` -- the open/closed state used to be two private
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
</script>

<div style="--sidebar-transition: 0s;">
  <!-- Default (push) sidebar: opening it should narrow the page content. -->
  <section data-testid="push-section">
    <Page width="900px" height="320px">
      {#snippet sidebar()}
        <Sidebar data-testid="push-sidebar" bind:expanded={pushExpanded}>
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
          bind:expanded={overlayExpanded}
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
