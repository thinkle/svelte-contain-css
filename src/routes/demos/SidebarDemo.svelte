<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import { sidebarVars } from "./cssVariableDefs";

  // --- Modes demo -----------------------------------------------------------
  let side = $state("left");
  let overlay = $state(false);

  let modeCode = $derived(`<Page${side === "right" ? " right" : ""}>
  {#snippet sidebar()}
    <Sidebar${side === "right" ? " right" : ""}${overlay ? " overlay" : ""}>
      <MenuList>...</MenuList>
    </Sidebar>
  {/snippet}
  <main>Page content</main>
</Page>`);

  // --- Responsive demo ------------------------------------------------------
  /* The sidebar is container-query driven, so what matters is the width of the
     element it sits in -- not the browser window. Below 512px it swaps the
     rail for a hamburger sheet. */
  let frameWidth = $state(760);
  let isCompact = $derived(frameWidth <= 512);

  // --- External control demo ------------------------------------------------
  /* `undefined` means "whatever this layout's default is" -- the wide rail
     starts open, the narrow sheet starts shut. The moment anything writes a
     boolean, both layouts follow it. */
  let navOpen = $state<boolean | undefined>(undefined);
  let navIsOpen = $derived(navOpen ?? true);

  const controlCode = `<script lang="ts">
  // undefined = let each layout use its own default
  let navOpen = $state<boolean | undefined>(undefined);
<\/script>

<Button onclick={() => (navOpen = !(navOpen ?? true))}>
  Toggle navigation
</Button>

<Page>
  {#snippet sidebar()}
    <Sidebar bind:expanded={navOpen}>
      <MenuList>...</MenuList>
    </Sidebar>
  {/snippet}
  <main>Page content</main>
</Page>`;
</script>

<Container>
  <TextLayout>
    <h2>Sidebar</h2>
    <p>
      <code>&lt;Sidebar&gt;</code> is the collapsible navigation panel you pass
      to <code>&lt;Page&gt;</code>'s
      <code>sidebar</code> snippet. It ships with its own collapse affordance --
      a grab bar on wide layouts, a hamburger button on narrow ones -- so the
      simplest useful version takes no props at all.
    </p>
  </TextLayout>

  <CssVariableDemo variables={sidebarVars}>
    <DemoWithCode
      height="420px"
      code={modeCode}
    >
      {#snippet blurb()}
        <h3>Placement and overlay</h3>
        <p>
          By default the sidebar sits <em>in flow</em>: expanding it makes the
          page content narrower. Add <code>overlay</code> and the panel floats
          above the content instead, at every width, leaving the layout beneath
          it exactly where it was. Only the thin grab bar keeps its place.
        </p>
        <p>
          Narrow layouts always overlay, so <code>overlay</code> only changes
          what happens on wide ones.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <MenuList>
          <li>
            <RadioButton bind:group={side} value="left">Left</RadioButton>
          </li>
          <li>
            <RadioButton bind:group={side} value="right">Right</RadioButton>
          </li>
          <li>
            <Checkbox bind:checked={overlay}>Overlay the content</Checkbox>
          </li>
        </MenuList>
      {/snippet}

      <Page
        --page-border="3px solid #eee"
        right={side === "right"}
        hideHeader
        hideFooter
        width="100%"
        height="380px"
      >
        {#snippet sidebar()}
          <Sidebar right={side === "right"} {overlay}>
            <MenuList>
              <li>Dashboard</li>
              <li>Reports</li>
              <li>Settings</li>
            </MenuList>
          </Sidebar>
        {/snippet}
        <main>
          <Container>
            <p>
              Watch this paragraph. With <code>overlay</code> off it shifts as
              the sidebar opens and closes; with it on, it never moves.
            </p>
          </Container>
        </main>
      </Page>
    </DemoWithCode>

    <DemoWithCode
      height="460px"
      code={`<!-- The sidebar responds to ITS CONTAINER, not the viewport.
     Under 512px wide it becomes a hamburger sheet. -->
<div style="width: ${frameWidth}px">
  <Page>
    {#snippet sidebar()}
      <Sidebar>...</Sidebar>
    {/snippet}
    <main>Page content</main>
  </Page>
</div>`}
    >
      {#snippet blurb()}
        <h3>Responsive behaviour</h3>
        <p>
          The sidebar uses container queries, so it reacts to the width of the
          element it lives in rather than the browser window -- drop one inside
          a split pane or a card and it adapts on its own. Drag the slider past
          512px to watch the grab bar become a hamburger.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <label>
          Container width: {frameWidth}px &mdash;
          <strong>{isCompact ? "compact (hamburger)" : "wide (rail)"}</strong>
          <Slider bind:value={frameWidth} min={320} max={900} />
        </label>
      {/snippet}

      <div style="width: {frameWidth}px; max-width: 100%;">
        <Page
          --page-border="3px solid #eee"
          hideHeader
          hideFooter
          width="100%"
          height="380px"
        >
          {#snippet sidebar()}
            <Sidebar expandLabel="Show navigation" collapseLabel="Hide navigation">
              <MenuList>
                <li>Dashboard</li>
                <li>Reports</li>
                <li>Settings</li>
              </MenuList>
            </Sidebar>
          {/snippet}
          <main>
            <Container>
              <p>Content area.</p>
            </Container>
          </main>
        </Page>
      </div>
    </DemoWithCode>

    <DemoWithCode height="440px" code={controlCode}>
      {#snippet blurb()}
        <h3>Driving it from outside</h3>
        <p>
          <code>expanded</code> is bindable, so your own button can open and
          close the sidebar. It is one piece of state shared with the sidebar's
          built-in toggles -- click the grab bar and the value below changes
          too, so the two never disagree.
        </p>
        <p>
          Leave it <code>undefined</code> to keep the per-layout defaults (the wide
          rail starts open, the narrow sheet starts shut). Write a boolean and that
          boolean wins in both layouts.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <Bar>
          <Button primary onclick={() => (navOpen = !navIsOpen)}>
            {navIsOpen ? "Collapse" : "Expand"} sidebar
          </Button>
          <Button onclick={() => (navOpen = undefined)}>Reset to default</Button>
          <code>expanded = {String(navOpen)}</code>
        </Bar>
      {/snippet}

      <Page
        --page-border="3px solid #eee"
        hideHeader
        hideFooter
        width="100%"
        height="360px"
      >
        {#snippet sidebar()}
          <Sidebar bind:expanded={navOpen}>
            <MenuList>
              <li>Dashboard</li>
              <li>Reports</li>
              <li>Settings</li>
            </MenuList>
          </Sidebar>
        {/snippet}
        <main>
          <Container>
            <p>
              The button above and the sidebar's own grab bar are the same
              switch.
            </p>
          </Container>
        </main>
      </Page>
    </DemoWithCode>
  </CssVariableDemo>
</Container>
