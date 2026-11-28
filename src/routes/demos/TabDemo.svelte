<script lang="ts">
  import CssVariables from "./CssVariables.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import TabItem from "$lib/controls/TabItem.svelte";
  import TabBar from "$lib/layout/TabBar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import SlidingUnderlineDemo from "./SlidingUnderlineDemo.svelte";
  import type { CSSVariable } from "./types";
  let active = $state("TabItem");
  let tabItemExample = $state("states");
  let tabBarExample = $state("bar");
  let containerExample = $state("details");
  let docs = $state(["Brandy Balls", "Apple Pie", "Chili"]);
  let activeDoc = $state("Brandy Balls");
  function closeDoc(name: string) {
    const i = docs.indexOf(name);
    docs = docs.filter((d) => d !== name);
    if (activeDoc === name) activeDoc = docs[Math.min(i, docs.length - 1)] ?? "";
  }
  const items = [
    { label: "TabItem", value: "TabItem" },
    { label: "TabBar", value: "TabBar" },
    { label: "Sliding Underline", value: "underline" },
    { label: "Closable", value: "closable" },
    { label: "Containers & Tabs", value: "containers" },
    { label: "Customize", value: "vars" },
  ];
  let slidingUnderline = $state(false);
  let cssValues = $state<Record<string, string>>({});
  const { "--tab-indicator-color": indicatorColor, ...barOverrides } = $derived(cssValues);
  const tabBarStyle = $derived(
    Object.entries({
      ...(slidingUnderline ? { "--tab-indicator-height": "3px" } : {}),
      ...barOverrides,
    }).map(([name, value]) => `${name}: ${value};`).join(" "),
  );
  const cssVariables: CSSVariable[] = [
    {
      name: "--tab-bg",
      type: "color",
      placeholder: "e.g., #007bff",
    },
    {
      name: "--tab-fg",
      type: "color",
      placeholder: "e.g., #007bff",
    },
    {
      name: "--tab-active-bg",
      type: "color",
      placeholder: "e.g., #007bff",
    },
    {
      name: "--tab-active-fg",
      type: "color",
      placeholder: "e.g., #007bff",
    },
    {
      name: "--tab-border-radius",
      type: "length",
      placeholder: "0 for square corners",
    },
    {
      name: "--tab-border",
      type: "border",
      placeholder: "none or 1px solid currentColor",
    },
    {
      name: "--tab-active-border",
      type: "border",
      placeholder: "none or 1px solid currentColor",
    },
    {
      name: "--tab-border-bottom",
      type: "border",
      placeholder: "none or 1px solid var(--border-color)",
    },
    {
      name: "--tab-active-border-bottom",
      type: "border",
      placeholder: "none or 1px solid var(--border-color)",
    },
    {
      name: "--tab-bar-border-bottom",
      type: "border",
      placeholder: "none",
      defaultValue: "0",
      unit: "px",
    },
    {
      name: "--tab-indicator-height",
      type: "length",
      placeholder: "3px",
    },
    {
      name: "--tab-indicator-transition",
      type: "text",
      placeholder: "500ms ease-out",
    },
    {
      name: "--tab-indicator-color",
      type: "color",
      placeholder: "var(--primary-color)",
    },
    {
      name: "--tab-bar-height",
      type: "length",
      placeholder: "3em",
    },
    {
      name: "--tab-bar-gap",
      type: "length",
      placeholder: "var(--space-lg)",
    },

    {
      name: "--tab-bar-justify",
      type: "text",
      placeholder: "end",
      defaultValue: "start",
      unit: "",
    },
    {
      name: "--tab-bar-align",
      type: "text",
      placeholder: "stretch",
      defaultValue: "end",
      unit: "",
    },
    {
      name: "--tab-bar-fg",
      type: "color",
      placeholder: "e.g., #007bff",
    },
    {
      name: "--tab-bar-bg",
      type: "color",
      placeholder: "e.g., #007bff",
    },
  ];
</script>

<Container border height="70vh">
  <TabBar sticky wrap aria-label="Tabs tutorial" style={tabBarStyle || undefined}>
    {#each items as { label, value } (value)}
      <TabItem
        active={active === value}
        onclick={() => (active = value)}
        style={indicatorColor ? `--tab-indicator-color: ${indicatorColor};` : undefined}
      >
        {label}
      </TabItem>
    {/each}
  </TabBar>

  {#if active == "TabItem"}
    <DemoWithCode
      defaultTab="split"
      code={`<TabBar>
  <TabItem>Overview</TabItem>
  <TabItem active>States</TabItem>
  <TabItem>Layout</TabItem>
  <TabItem>Tokens</TabItem>
</TabBar>`}
    >
      {#snippet header()}
        <h3>TabItem</h3>
      {/snippet}
      {#snippet blurb()}
        <p>
          <code>&lt;TabItem&gt;</code> is the tab-flavored button primitive. Use
          <code>active</code> to mark the selected tab.
        </p>
        <p>
          It inherits button behavior but swaps in tab-specific variables for
          radius, spacing, and active styling.
        </p>
      {/snippet}
      <TabBar
        items={[
          { label: "Overview", value: "overview" },
          { label: "States", value: "states" },
          { label: "Layout", value: "layout" },
          { label: "Tokens", value: "tokens" },
        ]}
        active={tabItemExample}
        onchange={(value) => {
          tabItemExample =
            typeof value === "string" ? value : (value?.value ?? "states");
        }}
      />
    </DemoWithCode>
  {:else if active == "TabBar"}
    <DemoWithCode
      defaultTab="split"
      code={`<TabBar>
  <TabItem>Foo</TabItem>
  <TabItem active>Bar</TabItem>
  <TabItem>Baz</TabItem>
</TabBar>`}
    >
      {#snippet header()}
        <h3>TabBar</h3>
      {/snippet}
      {#snippet blurb()}
        <p>
          <code>&lt;TabBar&gt;</code> is the container for tab controls. It provides
          the aligned row, tab spacing, and optional sticky behavior.
        </p>
        <p>
          Tabs stay on one row: when there are more than fit, the strip scrolls
          sideways so the active tab stays attached to its panel. Add
          <code>wrap</code> to let them flow onto a second row instead.
        </p>
      {/snippet}
      <TabBar>
        <TabItem>Foo</TabItem>
        <TabItem active>Bar</TabItem>
        <TabItem>Baz</TabItem>
      </TabBar>
    </DemoWithCode>

    <DemoWithCode
      defaultTab="split"
      code={`<TabBar
  items={[{ label: "Foo", value: "foo" }, { label: "Bar", value: "bar" }]}
  active={active}
  onchange={(value) => {
    active = value;
  }}
/>`}
    >
      {#snippet header()}
        <h3>Providing tabs as a list</h3>
      {/snippet}
      {#snippet blurb()}
        <p>
          You can also pass an <code>items</code> list and listen for
          <code>onchange</code> to drive the active tab from state.
        </p>
      {/snippet}
      <TabBar
        items={[
          { label: "Foo", value: "foo" },
          { label: "Bar", value: "bar" },
          { label: "Baz", value: "baz" },
        ]}
        active={tabBarExample}
        onchange={(value) => {
          tabBarExample =
            typeof value === "string" ? value : (value?.value ?? "bar");
        }}
      />
    </DemoWithCode>
  {:else if active == "underline"}
    <SlidingUnderlineDemo />
  {:else if active == "closable"}
    <DemoWithCode
      defaultTab="split"
      code={`<TabBar>
  {#each docs as doc}
    <TabItem
      active={doc === activeDoc}
      onclick={() => (activeDoc = doc)}
      onclose={() => closeDoc(doc)}
      closeLabel={\`Close \${doc}\`}
    >
      {doc}
    </TabItem>
  {/each}
</TabBar>`}
    >
      {#snippet header()}
        <h3>Closable tabs</h3>
      {/snippet}
      {#snippet blurb()}
        <p>
          Give a <code>TabItem</code> an <code>onclose</code> callback and it
          shows a close button, like a browser tab. Delete on the focused tab
          and a middle-click close it too. Name what closes in
          <code>closeLabel</code> (default "Close tab"). Style with
          <code>--tab-close-button-size</code>, <code>-gap</code> and
          <code>-border-radius</code>.
        </p>
      {/snippet}
      <TabBar>
        {#each docs as doc (doc)}
          <TabItem
            active={doc === activeDoc}
            onclick={() => (activeDoc = doc)}
            onclose={() => closeDoc(doc)}
            closeLabel={`Close ${doc}`}
          >
            {doc}
          </TabItem>
        {/each}
      </TabBar>
    </DemoWithCode>
  {:else if active == "containers"}
    <DemoWithCode
      defaultTab="demo"
      code={`<Container border height="24rem">
  <TabBar sticky ... />
  <div>
    <!-- conditional content -->
  </div>
</Container>`}
    >
      {#snippet header()}
        <h3>Nesting tabs in containers</h3>
      {/snippet}
      {#snippet blurb()}
        <p>
          Put the tab bar and its content inside a bordered container with a
          fixed height to avoid page reflow when tabs switch.
        </p>
        <p>
          <code>sticky</code> keeps the tab row visible and gives it an opaque background
          while the content scrolls.
        </p>
      {/snippet}
      <Container border height="24rem">
        <TabBar
          items={[
            { label: "Overview", value: "overview" },
            { label: "Details", value: "details" },
            { label: "Settings", value: "settings" },
          ]}
          active={containerExample}
          sticky
          onchange={(value) => {
            containerExample =
              typeof value === "string" ? value : (value?.value ?? "details");
          }}
        />
        <Container>
          {#if containerExample === "overview"}
            <p>Overview content stays inside the fixed-height container.</p>
          {:else if containerExample === "details"}
            <p>
              Details content can be longer without shifting the whole page.
            </p>
          {:else}
            <p>Settings content works the same way.</p>
          {/if}
        </Container>
      </Container>
    </DemoWithCode>
  {/if}
  <div hidden={active !== "vars"}>
    <h3>Customize the tutorial tabs</h3>
    <p>
      These controls style the tabs above. Set <code>--tab-border-radius</code> to
      <code>0</code> for square corners. Set <code>--tab-border</code> and
      <code>--tab-active-border</code> to <code>none</code> to remove tab outlines.
      Use the bottom-border variables to set or remove the rules under the
      individual tabs and the whole strip.
    </p>
    <Checkbox bind:checked={slidingUnderline}>Sliding underline</Checkbox>
    <CssVariables
      variables={cssVariables}
      onSetVariables={(values) => (cssValues = { ...values })}
    />
  </div>
</Container>
