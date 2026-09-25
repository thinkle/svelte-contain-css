<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Card from "$lib/Card.svelte";
  import SidebarContainer from "$lib/layout/SidebarContainer.svelte";
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
     rail for a sheet button. */
  let frameWidth = $state(760);
  let isCompact = $derived(frameWidth <= 512);

  // --- External control demo ------------------------------------------------
  /* `undefined` means "whatever this layout's default is" -- the wide rail
     starts open, the narrow sheet starts shut. The moment anything writes a
     boolean, both layouts follow it. */
  let navOpen = $state<boolean | undefined>(undefined);
  let navIsOpen = $derived(navOpen ?? true);

  // --- Customization demo ---------------------------------------------------
  /* The rail and the sheet read from different variables, so they can carry
     different glyphs -- which is the point: a chevron means "slide out from
     this edge", a menu glyph means "open a panel". */
  const glyphs: Record<string, { expand: string; collapse: string }> = {
    "Chevrons ›‹": { expand: "'\\203A'", collapse: "'\\2039'" },
    "Arrows →←": { expand: "'\\2192'", collapse: "'\\2190'" },
    "Menu ☰✕": { expand: "'\\2630'", collapse: "'\\2715'" },
    "Plus/minus": { expand: "'+'", collapse: "'\\2212'" },
  };
  const glyphNames = Object.keys(glyphs);

  let customOverlay = $state(false);
  let railGlyph = $state<string>("Chevrons ›‹");
  let sheetGlyph = $state<string>("Menu ☰✕");
  let railWidth = $state(14);
  let railColor = $state("#3b82f6");

  let customVars = $derived(
    `--grab-bar-width: ${railWidth}px;` +
      `--grab-bar-bg: ${railColor};` +
      `--grab-bar-hover-bg: color-mix(in srgb, ${railColor} 80%, black);` +
      `--grab-bar-fg: white;` +
      `--sidebar-icon-fg: white;` +
      `--grab-bar-expand: ${glyphs[railGlyph].expand};` +
      `--grab-bar-collapse: ${glyphs[railGlyph].collapse};` +
      `--sidebar-sheet-expand: ${glyphs[sheetGlyph].expand};` +
      `--sidebar-sheet-collapse: ${glyphs[sheetGlyph].collapse};`,
  );

  let customCode = $derived(`<Sidebar${customOverlay ? " overlay" : ""}
  --grab-bar-width="${railWidth}px"
  --grab-bar-bg="${railColor}"
  --grab-bar-fg="white"

  {/* the rail's own glyphs */}
  --grab-bar-expand="${glyphs[railGlyph].expand}"
  --grab-bar-collapse="${glyphs[railGlyph].collapse}"

  {/* the sheet button's glyphs -- separate on purpose */}
  --sidebar-sheet-expand="${glyphs[sheetGlyph].expand}"
  --sidebar-sheet-collapse="${glyphs[sheetGlyph].collapse}"
>
  <MenuList>...</MenuList>
</Sidebar>

<!-- Set --sidebar-expand / --sidebar-collapse instead to change both at
     once, or the *-image variants to use SVGs (that is how the Bootstrap
     and Material themes swap them). -->`);

  // --- Container demos ------------------------------------------------------
  let shellWidth = $state(900);

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
      <code>&lt;Sidebar&gt;</code> is the collapsible navigation panel you
      pass to <code>&lt;Page&gt;</code>'s <code>sidebar</code> snippet -- though
      it works in any container, see below. It ships with its own collapse
      affordance, so the simplest useful version takes no props at all: a grab
      bar down the edge when there is room, and a small round arrow button that
      opens a floating sheet when there is not.
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
          it exactly where it was.
        </p>
        <p>
          An overlay sidebar also swaps the grab bar for the sheet button, and
          starts shut -- a rail floating on top of your content is an odd thing
          to ask anyone to grab, and a panel that starts open over the content
          is worse. Narrow layouts always behave this way, so
          <code>overlay</code> only changes what happens on wide ones.
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
     Under 512px wide it becomes a sheet button. -->
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
          a split pane or a card and it adapts on its own. Drag the slider
          below 512px to watch the grab bar become a sheet button.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <label>
          Container width: {frameWidth}px &mdash;
          <strong>{isCompact ? "compact (sheet button)" : "wide (rail)"}</strong>
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
    <DemoWithCode height="420px" code={customCode}>
      {#snippet blurb()}
        <h3>Customising the rail and its icons</h3>
        <p>
          The rail and the sheet button are <em>separate</em> affordances with
          separate glyphs, and sensibly different defaults: the rail slides a
          panel out of the edge it sits on, so it gets a chevron
          (<code>›</code>/<code>‹</code>); the sheet is conjured by a floating
          button, so it gets the menu glyph (<code>☰</code>) and closes with an
          <code>✕</code>. Toggle overlay below to swap between them.
        </p>
        <p>
          Set <code>--grab-bar-expand</code>/<code>--grab-bar-collapse</code>
          for the rail and
          <code>--sidebar-sheet-expand</code>/<code
            >--sidebar-sheet-collapse</code
          >
          for the sheet. Both fall through to
          <code>--sidebar-expand</code>/<code>--sidebar-collapse</code>, so set
          those to change everything at once. Each has an
          <code>-image</code> twin taking a <code>url()</code> if you would
          rather ship SVGs -- that is how the Bootstrap and Material themes
          replace them.
        </p>
        <p>
          The rail responds to <code>--grab-bar-width</code>,
          <code>--grab-bar-bg</code>, <code>--grab-bar-fg</code> and their
          <code>-hover-</code>/<code>-active-</code> variants; the icons to
          <code>--sidebar-icon-fg</code>, <code>--sidebar-icon-width</code> and
          <code>--sidebar-icon-height</code>.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <Bar>
          <Checkbox bind:checked={customOverlay}>
            Overlay (use the sheet button)
          </Checkbox>
        </Bar>
        <MenuList>
          <li>
            <label>
              Rail glyphs
              <select bind:value={railGlyph} disabled={customOverlay}>
                {#each glyphNames as name}<option value={name}>{name}</option
                  >{/each}
              </select>
            </label>
          </li>
          <li>
            <label>
              Sheet glyphs
              <select bind:value={sheetGlyph} disabled={!customOverlay}>
                {#each glyphNames as name}<option value={name}>{name}</option
                  >{/each}
              </select>
            </label>
          </li>
          <li>
            <label>
              Rail width: {railWidth}px
              <Slider bind:value={railWidth} min={6} max={40} />
            </label>
          </li>
          <li>
            <label>
              Rail colour
              <input type="color" bind:value={railColor} />
            </label>
          </li>
        </MenuList>
      {/snippet}

      <Page
        --page-border="3px solid #eee"
        hideHeader
        hideFooter
        width="100%"
        height="340px"
      >
        {#snippet sidebar()}
          <Sidebar overlay={customOverlay} style={customVars}>
            <MenuList>
              <li>Dashboard</li>
              <li>Reports</li>
              <li>Settings</li>
            </MenuList>
          </Sidebar>
        {/snippet}
        <main>
          <Container>
            <p>Drag the rail wider, recolour it, or swap the glyph.</p>
          </Container>
        </main>
      </Page>
    </DemoWithCode>

    <DemoWithCode
      height="330px"
      code={`<!-- Any element can host a Sidebar. It needs three things,
     and <Page> is not one of them:
       1. container-type  -- or NEITHER responsive branch matches
                             and you get the rail AND the button
       2. a height        -- a collapsed sidebar has no content of
                             its own to hold it open
       3. display: flex   -- or the content sits BELOW it -->
<div style="container-type: inline-size;
            display: flex;
            height: 260px;">
  <Sidebar>
    <MenuList>...</MenuList>
  </Sidebar>
  <p>Content beside the sidebar</p>
</div>`}
    >
      {#snippet blurb()}
        <h3>A plain <code>&lt;div&gt;</code> can host one</h3>
        <p>
          <code>&lt;Sidebar&gt;</code> is not tied to
          <code>&lt;Page&gt;</code>. It is just a flex sibling that happens to
          collapse, and any element can host it -- provided it supplies
          <code>container-type</code>, a height, and
          <code>display: flex</code>.
        </p>
        <p>
          The <code>container-type</code> is the one that bites: without it
          neither of the sidebar's container queries matches, and you get the
          rail and the sheet button rendered at the same time.
        </p>
      {/snippet}

      <div
        style="container-type: inline-size; display: flex; height: 260px; border: 3px solid #eee;"
      >
        <Sidebar>
          <MenuList>
            <li>Dashboard</li>
            <li>Reports</li>
            <li>Settings</li>
          </MenuList>
        </Sidebar>
        <p style="padding: 0 1rem;">
          A bare div, three CSS declarations, no Page in sight.
        </p>
      </div>
    </DemoWithCode>

    <DemoWithCode
      height="400px"
      code={`<!-- A plain <Container> gives you container-type, but NOT
     display:flex -- so the content lands underneath -- and it
     sets overflow-x: hidden, which clips an overlay sheet. -->
<Container width="${shellWidth}px">
  <Sidebar>...</Sidebar>
  <p>This ends up BELOW the sidebar.</p>
</Container>

<!-- <SidebarContainer> is the same idea with the three
     requirements already met, and no page chrome. -->
<SidebarContainer width="${shellWidth}px" height="260px">
  <Sidebar>...</Sidebar>
  <p>This sits beside it.</p>
</SidebarContainer>`}
    >
      {#snippet blurb()}
        <h3>
          <code>&lt;Container&gt;</code> vs <code>&lt;SidebarContainer&gt;</code>
        </h3>
        <p>
          A reasonable first guess is
          <code>&lt;Container&gt;&lt;Sidebar /&gt;content&lt;/Container&gt;</code
          >, and it does not work: <code>Container</code> is a block, so the
          content does <em>not</em> know to leave room -- it simply stacks
          underneath. <code>Container</code> also sets
          <code>overflow-x: hidden</code>, which clips an overlay sheet out of
          existence.
        </p>
        <p>
          <code>&lt;SidebarContainer&gt;</code> is the minimum fix: a flex row
          with a container context, a height, and no clipping. No header, no
          footer, none of <code>Page</code>'s other machinery. Drag the width
          to watch both respond.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <label>
          Width: {shellWidth}px
          <Slider bind:value={shellWidth} min={320} max={1000} />
        </label>
      {/snippet}

      <div style="display: grid; gap: 1rem;">
        <div>
          <strong>Plain <code>Container</code> — content falls below</strong>
          <div style="width: {shellWidth}px; max-width: 100%;">
            <Container height="185px" --container-border="3px solid #fdd">
              <Sidebar>
                <MenuList>
                  <li>Dashboard</li>
                </MenuList>
              </Sidebar>
              <p>I stacked underneath the sidebar.</p>
            </Container>
          </div>
        </div>
        <div>
          <strong><code>SidebarContainer</code> — content sits beside</strong>
          <div style="width: {shellWidth}px; max-width: 100%;">
            <SidebarContainer
              height="150px"
              style="border: 3px solid #dfd; box-sizing: border-box;"
            >
              <Sidebar>
                <MenuList>
                  <li>Dashboard</li>
                  <li>Reports</li>
                </MenuList>
              </Sidebar>
              <p style="padding: 0 1rem;">I sit beside it, as you would hope.</p>
            </SidebarContainer>
          </div>
        </div>
      </div>
    </DemoWithCode>

    <DemoWithCode
      height="360px"
      code={`<Card>
  <div style="display: flex; height: 100%">
    <Sidebar>...</Sidebar>
    <p>Card content</p>
  </div>
</Card>`}
    >
      {#snippet blurb()}
        <h3>Inside a Card</h3>
        <p>
          Because it measures its container rather than the window, a sidebar
          in a narrow card is in sheet mode even on a wide screen. The card
          below is the default 420px, so it never shows a rail no matter how
          big your display is -- which is container queries doing exactly what
          you would want.
        </p>
      {/snippet}

      <Card fixedHeight height="280px">
        {#snippet header()}
          <div>A Card with a Sidebar</div>
        {/snippet}
        <div style="display: flex; height: 100%">
          <Sidebar>
            <MenuList>
              <li>Dashboard</li>
              <li>Reports</li>
              <li>Settings</li>
            </MenuList>
          </Sidebar>
          <p>
            The sidebar measures this card, not the window, so it uses the
            sheet affordance no matter how wide your screen is.
          </p>
        </div>
      </Card>
    </DemoWithCode>
  </CssVariableDemo>
</Container>
