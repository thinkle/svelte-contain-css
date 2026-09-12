<script lang="ts">
  import Container from "$lib/layout/Container.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import Card from "$lib/Card.svelte";
  import Code from "$lib/misc/Code.svelte";

  let maxWidth = $state(320);
  let fixedWidth = $state(460);

  type MarginMode = "default" | "zero" | "top-only";
  let marginMode = $state<MarginMode>("default");
  const marginBlockValue = $derived(
    marginMode === "default"
      ? undefined
      : marginMode === "zero"
        ? "0"
        : "var(--gap-lg) 0",
  );
  const marginBlockAttr = $derived(
    marginBlockValue === undefined ? "" : ` marginBlock="${marginBlockValue}"`,
  );

  type MarginInlineMode = "default" | "zero" | "start" | "end";
  let marginInlineMode = $state<MarginInlineMode>("default");
  const marginInlineValue = $derived(
    marginInlineMode === "default"
      ? undefined
      : marginInlineMode === "zero"
        ? "0"
        : marginInlineMode === "start"
          ? "0 auto"
          : "auto 0",
  );
  const marginInlineAttr = $derived(
    marginInlineValue === undefined
      ? ""
      : ` marginInline="${marginInlineValue}"`,
  );
</script>

<Container maxWidth="100%">
  <h2>Container</h2>
  <p>
    <code>&lt;Container&gt;</code> is the workhorse section wrapper: full width
    of its parent, capped at <code>--container-max-width</code> (900px default),
    centered, with its own surface color and padding. Nest several down a page to
    separate sections.
  </p>
  <p>
    Containers automatically give basic typography styles to nested HTML text
    content (<code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>, etc.)
  </p>
  <p>
    Containers also provide a container width for any container queries within
    them, so things like Cards can respond to a container.
  </p>
  <p>
    Containers also support simple props like padding, bg/fg for colors, etc.
  </p>
  <Container
    padding="32px"
    bg="var(--danger-bg)"
    fg="var(--danger-fg)"
    maxWidth="400px"
    height="auto"
  >
    <p>This is a danger-themed container.</p>
    <code
      >&lt;Container padding="32px" bg="var(--danger-bg)" fg="var(--danger-fg)"
      maxWidth="400px"&gt;&lt;/Container&gt;</code
    >
  </Container>
  <Container
    padding="4px"
    maxWidth="600px"
    --font-size="var(--font-size-tiny)"
    height="auto"
    bg="var(--info-bg)"
    fg="var(--info-fg)"
  >
    <p>This is a small container.</p>
    <code>
      &lt;Container padding="4px" maxWidth="400px"
      --font-size="var(--font-size-tiny)"&gt;<br />
      ...<br />
      &lt;/Container&gt;
    </code>
  </Container>

  <DemoWithCode
    code={`<Container>
  <h3>Section title</h3>
  <p>Full width of its parent, its own surface color, padding included.</p>
</Container>`}
  >
    {#snippet header()}
      <h3>Basic Container</h3>
    {/snippet}
    <Container>
      <h3>Section title</h3>
      <p>Full width of its parent, its own surface color, padding included.</p>
    </Container>
  </DemoWithCode>

  <DemoWithCode
    code={`<Container maxWidth="${maxWidth}px">
  <Inline wrap="wrap">
    <Tag success>Ready</Tag>
    <Tag info>Pilot</Tag>
    <Tag warning>Needs Review</Tag>
    <Tag danger>Blocked</Tag>
    <Tag>Draft</Tag>
  </Inline>
</Container>`}
  >
    {#snippet header()}
      <h3>maxWidth caps the section, not the content's freedom to reflow</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        <strong
          >Size a Container with <code>maxWidth</code>, not a fixed width.</strong
        >
        It's the prop you almost always want: the Container still shrinks to fit
        a phone or a sidebar, it just won't grow past the cap. Drag the slider —
        everything below the Container (here, a wrapping row of tags) reflows in
        response, the way any ordinary content would in a narrower box.
      </p>
    {/snippet}
    {#snippet inputArea()}
      <label>
        maxWidth: {maxWidth}px
        <Slider bind:value={maxWidth} min={160} max={700} />
      </label>
    {/snippet}
    <Container maxWidth="{maxWidth}px">
      <Inline wrap="wrap">
        <Tag success>Ready</Tag>
        <Tag info>Pilot</Tag>
        <Tag warning>Needs Review</Tag>
        <Tag danger>Blocked</Tag>
        <Tag>Draft</Tag>
      </Inline>
    </Container>
  </DemoWithCode>

  <DemoWithCode
    code={`<Container --container-width="${fixedWidth}px" maxWidth="100%">
  <h2>This is a fixed-width Container</h2>
  <Card>
    {#snippet header()}
      <h3>I'm a Card</h3>
    {/snippet}
    <p>The Card's own container-query breakpoints respond to this width, not
       the viewport.</p>
  </Card>
</Container>`}
  >
    {#snippet header()}
      <h3>--container-width sets the container-query context</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        Drag the slider and watch the Card's own breakpoints fire at this
        fixed pixel value, regardless of the viewport. Paired with
        <code>maxWidth="100%"</code>, it still shrinks fine on a narrow
        parent — it only becomes a real overflow risk without that cap.
      </p>
    {/snippet}
    {#snippet inputArea()}
      <label>
        --container-width: {fixedWidth}px
        <Slider bind:value={fixedWidth} min={300} max={1200} />
      </label>
    {/snippet}
    <Container --container-width="{fixedWidth}px" maxWidth="100%">
      <h2>This is a fixed-width Container</h2>
      <Card fixedHeight>
        {#snippet header()}
          <h3>I'm a Card</h3>
        {/snippet}
        <p>
          Cards use container queries to respond to how much room this Container
          gives it — not the viewport.
        </p>
      </Card>
    </Container>
  </DemoWithCode>

  <DemoWithCode
    code={`<Container border maxWidth="360px"${marginBlockAttr}${marginInlineAttr}>
  <h3>The moving Container</h3>
</Container>`}
  >
    {#snippet header()}
      <h3>marginBlock / marginInline</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        Unlike Stack and Inline (margin-free by default), Container has always
        kept a <code>--gap</code>'s worth of vertical rhythm above and below it,
        and centered itself horizontally — that's <code>marginBlock</code>
        defaulting to <code>var(--gap)</code> and <code>marginInline</code> to
        <code>auto</code>. Override either independently. The green boxes are
        fixed reference points; watch the bordered Container move between them.
        (Capped at <code>maxWidth="360px"</code> here so there's slack on the
        sides for <code>marginInline</code> to actually push against — a full-width
        Container has nowhere to move horizontally.)
      </p>
    {/snippet}
    {#snippet inputArea()}
      <Stack gap="var(--gap-sm)">
        <Inline>
          <strong>marginBlock:</strong>
          <RadioButton bind:group={marginMode} value="default"
            >default (var(--gap))</RadioButton
          >
          <RadioButton bind:group={marginMode} value="zero">"0"</RadioButton>
          <RadioButton bind:group={marginMode} value="top-only"
            >"var(--gap-lg) 0"</RadioButton
          >
        </Inline>
        <Inline>
          <strong>marginInline:</strong>
          <RadioButton bind:group={marginInlineMode} value="default"
            >default (auto, centered)</RadioButton
          >
          <RadioButton bind:group={marginInlineMode} value="zero"
            >"0" (flush start)</RadioButton
          >
          <RadioButton bind:group={marginInlineMode} value="start"
            >"0 auto" (pinned start)</RadioButton
          >
          <RadioButton bind:group={marginInlineMode} value="end"
            >"auto 0" (pinned end)</RadioButton
          >
        </Inline>
      </Stack>
    {/snippet}
    <Stack gap="0">
      <div
        style="background-color:var(--success-bg); color:var(--success-fg); padding: 0.5rem; text-align: center;"
      >
        A thing above
      </div>
      <Container
        border
        maxWidth="360px"
        --container-border="3px solid blue"
        marginBlock={marginBlockValue}
        marginInline={marginInlineValue}
      >
        <h3>The moving Container</h3>
      </Container>
      <div
        style="background-color:var(--success-bg); color:var(--success-fg); padding: 0.5rem; text-align: center;"
      >
        A thing below
      </div>
    </Stack>
  </DemoWithCode>

  <DemoWithCode
    code={`<Container height="160px" maxWidth="24rem">
  <h3>Scrolls instead of growing</h3>
  <p>One paragraph of several that push this Container past its fixed height...</p>
  <p>...so instead of the section growing to fit, the overflow scrolls...</p>
  <p>...inside the Container's own box, at a height the page layout can rely on.</p>
</Container>`}
  >
    {#snippet header()}
      <h3>Fixed Height Containers</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        Set a fixed <code>height</code> and a Container scrolls its own content instead
        of growing to fit it — useful for a section of the page that needs a predictable
        size (a sidebar panel, a fixed-height card list) regardless of how much content
        ends up inside.
      </p>
    {/snippet}
    <Container height="160px" maxWidth="24rem">
      <h3>Scrolls instead of growing</h3>
      <p>
        One paragraph of several that push this Container past its fixed
        height...
      </p>
      <p>
        ...so instead of the section growing to fit, the overflow scrolls...
      </p>
      <p>
        ...inside the Container's own box, at a height the page layout can rely
        on.
      </p>
    </Container>
  </DemoWithCode>
</Container>
