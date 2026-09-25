<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Card from "$lib/Card.svelte";
  import SidebarContainer from "$lib/layout/SidebarContainer.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Option from "$lib/controls/Option.svelte";
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
  /* `undefined` means "whatever this layout's default is" -- a rail starts
     open, a sheet starts shut. The moment anything writes a boolean, both
     layouts follow it. */
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

  // --- Icon / rail customization -------------------------------------------
  /* The rail and the sheet read from different variables, which is the point:
     a chevron means "slide out from this edge", a menu glyph means "open a
     panel". */
  const glyphs: Record<string, { expand: string; collapse: string }> = {
    "Chevrons": { expand: "'\\203A'", collapse: "'\\2039'" },
    "Arrows": { expand: "'\\2192'", collapse: "'\\2190'" },
    "Menu / close": { expand: "'\\2630'", collapse: "'\\2715'" },
    "Plus / minus": { expand: "'+'", collapse: "'\\2212'" },
  };
  const glyphNames = Object.keys(glyphs);

  const railColors: Record<string, string> = {
    Blue: "#3b82f6",
    Slate: "#475569",
    Teal: "#0d9488",
    Plum: "#7e22ce",
  };

  let customOverlay = $state(false);
  let railGlyph = $state<string>("Chevrons");
  let sheetGlyph = $state<string>("Menu / close");
  let railWidth = $state(14);
  let railColorName = $state<string>("Blue");
  let railColor = $derived(railColors[railColorName]);

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
  --sidebar-icon-fg="white"

  --grab-bar-expand="${glyphs[railGlyph].expand}"
  --grab-bar-collapse="${glyphs[railGlyph].collapse}"

  --sidebar-sheet-expand="${glyphs[sheetGlyph].expand}"
  --sidebar-sheet-collapse="${glyphs[sheetGlyph].collapse}"
>
  <MenuList>...</MenuList>
</Sidebar>

<!-- Set --sidebar-expand / --sidebar-collapse instead to change both the
     rail and the sheet at once, or the *-image variants to use SVGs (that
     is how the Bootstrap and Material themes swap them). -->`);

  // --- SidebarContainer demo ------------------------------------------------
  let scSide = $state("left");
  let scWidth = $state(760);
  let scHeight = $state(260);
  let scGap = $state(0);
  let scOverlay = $state(false);

  let scCode = $derived(`<SidebarContainer${scSide === "right" ? " right" : ""}
  width="${scWidth}px"
  height="${scHeight}px"${scGap ? `\n  gap="${scGap}px"` : ""}
>
  <Sidebar${scSide === "right" ? " right" : ""}${scOverlay ? " overlay" : ""}>
    <MenuList>...</MenuList>
  </Sidebar>
  <main>Content, laid out beside the sidebar</main>
</SidebarContainer>`);
</script>

<Container>
  <TextLayout>
    <h2>Sidebar</h2>
    <p>
      <code>&lt;Sidebar&gt;</code> is the collapsible navigation panel you pass
      to <code>&lt;Page&gt;</code>'s <code>sidebar</code> snippet -- though it
      works in any container, see below. It ships with its own collapse
      affordance, so the simplest useful version takes no props at all: a grab
      bar down the edge when there is room, and a small round button that opens
      a floating sheet when there is not.
    </p>
  </TextLayout>

  <CssVariableDemo variables={sidebarVars}>
    <DemoWithCode height="420px" code={modeCode}>
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
        <FormItem>
          {#snippet label()}Placement{/snippet}
          <Select bind:value={side}>
            <Option value="left">Left</Option>
            <Option value="right">Right</Option>
          </Select>
        </FormItem>
        <FormItem>
          {#snippet label()}Overlay the content{/snippet}
          <Checkbox bind:checked={overlay} />
        </FormItem>
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
        <h3>Responsive behavior</h3>
        <p>
          The sidebar uses container queries, so it reacts to the width of the
          element it lives in rather than the browser window -- drop one inside
          a split pane or a card and it adapts on its own. Drag the slider below
          512px to watch the grab bar become a sheet button.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <FormItem>
          {#snippet label()}Container width{/snippet}
          <Slider bind:value={frameWidth} min={320} max={900} />
          {#snippet after()}
            {frameWidth}px &mdash;
            <strong>{isCompact ? "sheet button" : "rail"}</strong>
          {/snippet}
        </FormItem>
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
            <Sidebar
              expandLabel="Show navigation"
              collapseLabel="Hide navigation"
            >
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
          Leave it <code>undefined</code> to keep the per-layout defaults (a
          rail starts open, a sheet starts shut). Write a boolean and that
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
        <h3>Customizing the rail and its icons</h3>
        <p>
          The rail and the sheet button are <em>separate</em> affordances with
          separate glyphs, and sensibly different defaults: the rail slides a
          panel out of the edge it sits on, so it gets a chevron
          (<code>&rsaquo;</code>/<code>&lsaquo;</code>); the sheet is conjured
          by a floating button, so it gets the menu glyph and closes with an x.
          Toggle overlay to swap between them.
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
          rather ship SVGs.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <FormItem>
          {#snippet label()}Overlay (use the sheet button){/snippet}
          <Checkbox bind:checked={customOverlay} />
        </FormItem>
        <FormItem>
          {#snippet label()}Rail glyphs{/snippet}
          <Select bind:value={railGlyph} disabled={customOverlay}>
            {#each glyphNames as name}
              <Option value={name}>{name}</Option>
            {/each}
          </Select>
        </FormItem>
        <FormItem>
          {#snippet label()}Sheet glyphs{/snippet}
          <Select bind:value={sheetGlyph} disabled={!customOverlay}>
            {#each glyphNames as name}
              <Option value={name}>{name}</Option>
            {/each}
          </Select>
        </FormItem>
        <FormItem>
          {#snippet label()}Rail width{/snippet}
          <Slider bind:value={railWidth} min={6} max={40} />
          {#snippet after()}{railWidth}px{/snippet}
        </FormItem>
        <FormItem>
          {#snippet label()}Rail color{/snippet}
          <Select bind:value={railColorName}>
            {#each Object.keys(railColors) as name}
              <Option value={name}>{name}</Option>
            {/each}
          </Select>
        </FormItem>
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
            <p>Swap the glyphs, widen the rail, recolor it.</p>
          </Container>
        </main>
      </Page>
    </DemoWithCode>

    <DemoWithCode height="440px" code={scCode}>
      {#snippet blurb()}
        <h3>A sidebar anywhere: <code>&lt;SidebarContainer&gt;</code></h3>
        <p>
          <code>&lt;Sidebar&gt;</code> is not tied to <code>&lt;Page&gt;</code>.
          It needs exactly three things from its host: a
          <strong>container-query context</strong> (so its responsive branches
          can match), a <strong>height</strong> (a collapsed sidebar has no
          in-flow content of its own to hold it open), and a
          <strong>flex parent</strong> (so the content lands beside it rather
          than below).
        </p>
        <p>
          <code>&lt;SidebarContainer&gt;</code> is exactly those three and
          nothing else -- no header, no footer, none of <code>Page</code>'s
          other machinery. It takes <code>width</code>, <code>height</code>,
          <code>gap</code>, <code>padding</code>,
          <code>bg</code>/<code>fg</code>, and <code>right</code> to put the
          sidebar after the content.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <FormItem>
          {#snippet label()}Placement{/snippet}
          <Select bind:value={scSide}>
            <Option value="left">Left</Option>
            <Option value="right">Right</Option>
          </Select>
        </FormItem>
        <FormItem>
          {#snippet label()}Overlay{/snippet}
          <Checkbox bind:checked={scOverlay} />
        </FormItem>
        <FormItem>
          {#snippet label()}Width{/snippet}
          <Slider bind:value={scWidth} min={320} max={900} />
          {#snippet after()}{scWidth}px{/snippet}
        </FormItem>
        <FormItem>
          {#snippet label()}Height{/snippet}
          <Slider bind:value={scHeight} min={160} max={340} />
          {#snippet after()}{scHeight}px{/snippet}
        </FormItem>
        <FormItem>
          {#snippet label()}Gap{/snippet}
          <Slider bind:value={scGap} min={0} max={48} />
          {#snippet after()}{scGap}px{/snippet}
        </FormItem>
      {/snippet}

      <SidebarContainer
        right={scSide === "right"}
        width="{scWidth}px"
        height="{scHeight}px"
        gap="{scGap}px"
        style="border: 3px solid #eee; box-sizing: border-box; max-width: 100%;"
      >
        <Sidebar right={scSide === "right"} overlay={scOverlay}>
          <MenuList>
            <li>Dashboard</li>
            <li>Reports</li>
            <li>Settings</li>
          </MenuList>
        </Sidebar>
        <main style="padding: 0 1rem;">
          <p>
            Content, laid out beside the sidebar -- no <code>Page</code> in
            sight.
          </p>
        </main>
      </SidebarContainer>
    </DemoWithCode>

    <DemoWithCode
      height="330px"
      code={`<!-- Or supply the three requirements yourself, on any element -->
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
        <h3>Rolling your own host</h3>
        <p>
          Nothing is special about <code>SidebarContainer</code> -- it is those
          three declarations and no more. Any element works if you supply them.
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
          Because it measures its container rather than the window, a sidebar in
          a narrow card is in sheet mode even on a wide screen. The card below
          is the default 420px, so it never shows a rail no matter how big your
          display is -- which is container queries doing exactly what you would
          want.
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
            The sidebar measures this card, not the window, so it uses the sheet
            affordance no matter how wide your screen is.
          </p>
        </div>
      </Card>
    </DemoWithCode>
  </CssVariableDemo>
</Container>
