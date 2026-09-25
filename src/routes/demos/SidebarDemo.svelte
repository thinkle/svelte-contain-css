<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Card from "$lib/Card.svelte";
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
  const iconSets: Record<string, { expand: string; collapse: string }> = {
    Arrows: { expand: "'\\203A'", collapse: "'\\2039'" },
    Chevrons: { expand: "'\\276F'", collapse: "'\\276E'" },
    Hamburger: { expand: "'\\2630'", collapse: "'\\2715'" },
    Plus: { expand: "'+'", collapse: "'\\2212'" },
  };
  let iconSet = $state<string>("Arrows");
  let railWidth = $state(14);
  let railColor = $state("#3b82f6");

  let customVars = $derived(
    `--grab-bar-width: ${railWidth}px;` +
      `--grab-bar-bg: ${railColor};` +
      `--grab-bar-hover-bg: color-mix(in srgb, ${railColor} 80%, black);` +
      `--sidebar-icon-fg: white;` +
      `--sidebar-expand: ${iconSets[iconSet].expand};` +
      `--sidebar-collapse: ${iconSets[iconSet].collapse};`,
  );

  let customCode = $derived(`<Sidebar
  --grab-bar-width="${railWidth}px"
  --grab-bar-bg="${railColor}"
  --grab-bar-hover-bg="color-mix(in srgb, ${railColor} 80%, black)"
  --sidebar-icon-fg="white"
  --sidebar-expand="${iconSets[iconSet].expand}"
  --sidebar-collapse="${iconSets[iconSet].collapse}"
>
  <MenuList>...</MenuList>
</Sidebar>

<!-- Icons can be images instead of characters: -->
<Sidebar --sidebar-expand-image="url(chevron.svg)" />`);

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
          The grab bar and its arrows are driven entirely by CSS variables, so
          you can restyle them per instance without touching the component.
          <code>--sidebar-expand</code> and <code>--sidebar-collapse</code> set
          the glyph (any CSS <code>content</code> string), and
          <code>--sidebar-expand-image</code> /
          <code>--sidebar-collapse-image</code> take a
          <code>url()</code> if you would rather ship SVGs -- that is how the
          Bootstrap and Material themes replace them.
        </p>
        <p>
          The rail itself responds to <code>--grab-bar-width</code>,
          <code>--grab-bar-bg</code>, <code>--grab-bar-fg</code> and their
          <code>-hover-</code> and <code>-active-</code> variants; the icon to
          <code>--sidebar-icon-fg</code>, <code>--sidebar-icon-width</code> and
          <code>--sidebar-icon-height</code>.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <MenuList>
          {#each Object.keys(iconSets) as name}
            <li>
              <RadioButton bind:group={iconSet} value={name}>{name}</RadioButton>
            </li>
          {/each}
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
          <Sidebar style={customVars}>
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
      height="360px"
      code={`<!-- No <Page> needed. The sidebar needs three things from
     whatever it sits in:
       1. a container-query context  (Container, Card and Page all
          provide one; a bare <div> does NOT)
       2. a height to fill
       3. to be a flex/grid sibling of the content, if you want the
          in-flow "push" behaviour rather than overlay -->
<Card>
  <div style="display: flex; height: 100%">
    <Sidebar>
      <MenuList>...</MenuList>
    </Sidebar>
    <p>Card content</p>
  </div>
</Card>`}
    >
      {#snippet blurb()}
        <h3>Outside a Page</h3>
        <p>
          <code>&lt;Sidebar&gt;</code> is not tied to <code>&lt;Page&gt;</code>.
          It works in any element that gives it a
          <em>container-query context</em> and a height --
          <code>Container</code>, <code>Card</code> and <code>Page</code> all
          do. A bare <code>&lt;div&gt;</code> does not, and without one neither
          responsive branch matches: you get the rail and the sheet button at
          once.
        </p>
        <p>
          Because it responds to its container rather than the window, a
          sidebar in a narrow card is in sheet mode even on a wide screen --
          the card below is only 420px wide, so it never shows a rail.
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
