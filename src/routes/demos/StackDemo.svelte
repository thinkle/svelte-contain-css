<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Card from "$lib/Card.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Container from "$lib/layout/Container.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import SidebarContainer from "$lib/layout/SidebarContainer.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";

  let stretchEnabled = $state(true);
  let stackMode = $state<"default" | "split" | "center" | "end">("split");

  const stackJustify = $derived(
    stackMode === "center" ? "center" : stackMode === "end" ? "flex-end" : null,
  );
  const stackModeLabel = $derived(
    stackMode === "split"
      ? "split"
      : stackMode === "center"
        ? 'justify="center"'
        : stackMode === "end"
          ? 'justify="flex-end"'
          : "default flow",
  );
  const stretchAttr = $derived(stretchEnabled ? "\n    stretch" : "");
  const modeAttr = $derived(
    stackMode === "split"
      ? "\n    split"
      : stackMode === "center"
        ? '\n    justify="center"'
        : stackMode === "end"
          ? '\n    justify="flex-end"'
          : "",
  );

  type MarginBlockMode = "both" | "top" | "bottom";
  let marginBlockMode = $state<MarginBlockMode>("top");
  const marginBlockValue = $derived(
    marginBlockMode === "both"
      ? "var(--gap-lg)"
      : marginBlockMode === "top"
        ? "var(--gap-lg) 0"
        : "0 var(--gap-lg)",
  );
</script>

<TextLayout>
  <h2>Stack</h2>
  <p>
    <code>&lt;Stack&gt;</code> is the generic vertical layout helper. Use it for
    sections, form groupings, and card internals where a simple vertical rhythm container
    is clearer than custom flex CSS.
  </p>
</TextLayout>
<DemoWithCode
  code={`<Card width="240px" height="340px">
  <Stack fill split>
    <Stack gap="var(--space-sm)">
      <h3>Top</h3>
      <p>Pinned to the top of the card.</p>
    </Stack>
    <p>In the middle.</p>
    <Stack gap="var(--space-sm)">
      <Inline><Tag>One</Tag><Tag>Two</Tag></Inline>
      <Button primary>At the bottom</Button>
    </Stack>
  </Stack>
</Card>`}
>
  {#snippet header()}
    <h3>A Stack in a card</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      <code>fill</code> makes the Stack as tall as the card and
      <code>split</code> spreads its children from top to bottom. The Stacks
      inside space their own children with one <code>gap</code>.
    </p>
  {/snippet}
  <Card width="240px" height="340px">
    <Stack fill split>
      <Stack gap="var(--space-sm)">
        <h3>Top</h3>
        <p>Pinned to the top of the card.</p>
      </Stack>
      <p>In the middle.</p>
      <Stack gap="var(--space-sm)">
        <Inline><Tag>One</Tag><Tag>Two</Tag></Inline>
        <Button primary>At the bottom</Button>
      </Stack>
    </Stack>
  </Card>
</DemoWithCode>
<TextLayout>
  <p>
    It has no surface, border, margin or padding of its own -- only the gap. Give
    it padding with the <code>padding</code> prop or
    <code>--stack-padding</code> when you want some; it no longer picks up the
    theme's <code>--padding</code>.
  </p>
  <p>
    Stack removes direct-child block margins so its gap defines the spacing. If
    you want prose-style margins, use <code>&lt;TextLayout&gt;</code>.
  </p>
</TextLayout>
<TextLayout>
  <p>
    It is not a replacement for normal document flow. Headings and paragraphs
    already stack, with spacing that suits text; put them in a
    <code>&lt;TextLayout&gt;</code> (or just let them flow). Reach for Stack when
    you are arranging <em>pieces of UI</em> in a column -- especially when the
    column has a height to fill.
  </p>
</TextLayout>
<DemoWithCode
  code={`<SidebarContainer height="440px">
  <Sidebar>
    <Stack fill split padding="var(--space-md)">
      <MenuList>
        <li><button>Dashboard</button></li>
        <li><button>Reports</button></li>
        <li><button>Settings</button></li>
      </MenuList>
      <Stack gap="var(--space-sm)">
        <Tag info>Free plan</Tag>
        <Button primary width="100%">Upgrade</Button>
        <Button>Sign out</Button>
      </Stack>
    </Stack>
  </Sidebar>
  <main>...</main>
</SidebarContainer>`}
>
  {#snippet header()}
    <h3>Top and bottom of a sidebar</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      The classic job for a Stack: navigation pinned to the top of a panel,
      account actions pinned to the bottom. <code>fill</code> makes the outer
      Stack as tall as the sidebar and <code>split</code> pushes its two children
      apart; the inner Stack spaces the bottom group with one <code>gap</code>.
    </p>
    <p>
      Buttons keep the width of their label inside a Stack, as they would
      anywhere else. Ask for a full-width one with <code>width="100%"</code>.
    </p>
  {/snippet}
  <SidebarContainer height="440px">
    <Sidebar>
      <Stack fill split padding="var(--space-md)">
        <MenuList>
          <li><button>Dashboard</button></li>
          <li><button>Reports</button></li>
          <li><button>Settings</button></li>
        </MenuList>
        <Stack gap="var(--space-sm)">
          <Tag info>Free plan</Tag>
          <Button primary width="100%">Upgrade</Button>
          <Button>Sign out</Button>
        </Stack>
      </Stack>
    </Sidebar>
    <main style="padding: 0 1rem;">
      <p>The page content sits here, beside the sidebar.</p>
    </main>
  </SidebarContainer>
</DemoWithCode>
<TextLayout>
  <h2>Fill, Stretch, and Split</h2>
  <p>
    <code>fill</code> means <code>height: 100%</code>.
    <code>stretch</code> makes the Stack stretch across the parent cross-axis.
    <code>split</code> uses <code>space-between</code> on the Stack itself.
  </p>
</TextLayout>
<DemoWithCode
  code={`<Inline wrap="nowrap">
  <img
    src="https://picsum.photos/id/593/320/400"
    alt="Placeholder preview"
    width="320"
    height="400"
    style="width: min(320px, 40%); height: auto"
  />
  <Stack${stretchAttr}${modeAttr}
    bg="var(--material-color-pink-50)"
    fg="black"
    heading-fg="var(--material-color-pink-700)"
    padding="16px"
    gap="16px"
  >
    <h3>Campaign Brief</h3>
    <p>One Stack, one shared container, one tall image beside it.</p>
    <p>Mode: ${stackModeLabel}</p>        
    <Button primary>Publish</Button>  
  </Stack>
</Inline>`}
>
  {#snippet header()}
    <h3><code>&lt;Stack stretch&gt;</code></h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      You can use "stretch" to make a stack fill its parent's cross-axis (when
      your stack is inside a horizontal flex container).
    </p>
    <p>
      In the demo, the image establishes a 400px-tall shared container. The
      <code>stretch</code> flag makes the Stack match that height, then switch
      between the default flow, <code>split</code>, and explicit
      <code>justify</code> modes.
    </p>
  {/snippet}
  {#snippet inputArea()}
    <Inline>
      <Checkbox bind:checked={stretchEnabled}>stretch</Checkbox>
      <strong>mode:</strong>
      <RadioButton bind:group={stackMode} value="default">default</RadioButton>
      <RadioButton bind:group={stackMode} value="split">split</RadioButton>
      <RadioButton bind:group={stackMode} value="center">center</RadioButton>
      <RadioButton bind:group={stackMode} value="end">end</RadioButton>
    </Inline>
  {/snippet}
  <!-- nowrap keeps the Stack beside the image (wrapping would put it below
       and there'd be nothing to stretch against); the image gives up width
       instead, so the pair fits a phone. -->
  <Inline wrap="nowrap">
    <img
      src="https://picsum.photos/id/593/320/400"
      alt="Placeholder preview"
      width="320"
      height="400"
      style="width: min(320px, 40%); height: auto"
    />
    <Stack
      stretch={stretchEnabled}
      split={stackMode === "split"}
      justify={stackJustify}
      bg="var(--material-color-pink-50)"
      fg="black"
      --heading-fg="var(--material-color-pink-700)"
      padding="16px"
      gap="16px"
    >
      <h3>Campaign Brief</h3>
      <p>One Stack, one shared container, one tall image beside it.</p>
      <p>Mode: {stackModeLabel}</p>
      <Button primary>Publish</Button>
    </Stack>
  </Inline>
</DemoWithCode>

<DemoWithCode
  code={`<Card fixedHeight> 
  <Stack fill split>
    <h3>Release Notes</h3>
    <p>The card supplies the surface.</p>
    <Inline>
      <Button secondary>Preview</Button>
      <Button primary>Publish</Button>
    </Inline>
  </Stack>
</Card>`}
>
  {#snippet header()}
    <h3>Using fill inside a fixed-height container</h3>
  {/snippet}
  <Card fixedHeight>
    <Stack fill split>
      <h3>Release Notes</h3>
      <p>The card supplies the surface.</p>
      <Inline>
        <Button secondary>Preview</Button>
        <Button primary>Publish</Button>
      </Inline>
    </Stack>
  </Card>
</DemoWithCode>

<DemoWithCode
  code={`<Stack marginBlock="${marginBlockValue}" center --stack-border="3px solid blue">
  <h3>The moving Stack</h3>
  <p>marginBlock: "${marginBlockValue}"</p>
</Stack>`}
>
  {#snippet header()}
    <h3>marginBlock / marginInline</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      Stack has no margin by default -- spacing between a Stack and its siblings
      comes from wherever it lives (a parent's <code>gap</code>, most often).
      When it does need its own space, <code>marginBlock</code> and
      <code>marginInline</code> take one value (both sides equal) or two (start,
      end independently). The green boxes above and below are fixed reference
      points; watch the bordered Stack move between them as you change the value.
    </p>
  {/snippet}
  {#snippet inputArea()}
    <Inline>
      <strong>marginBlock:</strong>
      <RadioButton bind:group={marginBlockMode} value="both">"var(--gap-lg)"</RadioButton>
      <RadioButton bind:group={marginBlockMode} value="top">"var(--gap-lg) 0"</RadioButton>
      <RadioButton bind:group={marginBlockMode} value="bottom">"0 var(--gap-lg)"</RadioButton>
    </Inline>
  {/snippet}
  <Stack
    justify="center"
    style="background-color:var(--success-bg); color:var(--success-fg); height: 100px;"
    center
    >A thing above
  </Stack>
  <Stack
    --stack-border="3px solid blue"
    marginBlock={marginBlockValue}
    center
  >
    <h3>The moving Stack</h3>
    <p>marginBlock: "{marginBlockValue}"</p>
  </Stack>
  <Stack
    justify="center"
    style="background-color:var(--success-bg); color:var(--success-fg); height: 100px;"
    center
    >A thing below
  </Stack>
</DemoWithCode>
