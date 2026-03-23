<script lang="ts">
  import CssWrapper from "./CssWrapper.svelte";
  import CssVariables from "./CssVariables.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import TabItem from "$lib/controls/TabItem.svelte";
  import TabBar from "$lib/layout/TabBar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import type { CSSVariable } from "./types";
  let active = $state("TabItem");
  let tabItemExample = $state("states");
  let tabBarExample = $state("bar");
  let containerExample = $state("details");
  let items = [
    { label: "TabItem", value: "TabItem" },
    { label: "TabBar", value: "TabBar" },
    { label: "Containers & Tabs", value: "containers" },
    { label: "Customize", value: "vars" },
  ];
  let cssValues = $state({});
  let cssVariables: CSSVariable[] = [
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
      placeholder: "4px 4px 0 0",
      defaultValue: "8px",
      unit: "px",
    },
    {
      name: "--tab-bar-border-bottom",
      type: "border",
      placeholder: "none",
      defaultValue: "0",
      unit: "px",
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
  <CssWrapper variables={cssValues}>
    <TabBar
      {items}
      {active}
      sticky
      onchange={(value) => {
        active = value;
      }}
    ></TabBar></CssWrapper
  >

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
  <div class:hide={active !== "vars"}>
    <h3>Adjust variables to customize tabs</h3>
    <CssVariables
      variables={cssVariables}
      onSetVariables={(v) => {
        cssValues = v;
      }}
    />
  </div>
</Container>

<style>
  .hide {
    display: none;
  }
</style>
