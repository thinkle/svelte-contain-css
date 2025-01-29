<script lang="ts">
  import CssWrapper from "./CssWrapper.svelte";
  import CssVariables from "./CssVariables.svelte";
  import TabItem from "$lib/controls/TabItem.svelte";
  import TabBar from "$lib/layout/TabBar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import type { CSSVariable } from "./types";
  let active = "TabItem";
  let items = [
    { label: "TabItem", value: "TabItem" },
    { label: "TabBar", value: "TabBar" },
    { label: "Containers & Tabs", value: "containers" },
    { label: "Customize", value: "vars" },
  ];
  let cssValues = {};
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
  ];
</script>

<Container border height="70vh">
  <CssWrapper variables={cssValues}>
    <TabBar
      {items}
      {active}
      sticky
      on:change={(e) => {
        active = e.detail.value;
      }}
    ></TabBar></CssWrapper
  >

  {#if active == "TabItem"}
    <h3>TabItem</h3>
    <p>TabItem is basically syntactic sugar for a special button.</p>
    <p>We provide an active= property to set it to active or not.</p>
    <p>
      TabItem then overrides some of the button variables with tab variables
      which have their own defaults, specifically:
    </p>
    <ul>
      <li>
        Button radius (defaults to rounded tops)
        <ul>
          <li>tab-border-bottom-right-radius</li>
          <li>tab-border-top-right-radius</li>
          <li>tab-border-bottom-left-radius</li>
          <li>tab-border-top-left-radius</li>
        </ul>
      </li>
      <li>
        Button margin (default to 0 so we snuggle against a bar).
        <br />tab-margin
      </li>
    </ul>
    <Code
      code={`<TabItem active>TabItem</TabItem>
<TabItem>TabBar</TabItem>
<TabItem>Containers & Tabs</TabItem>
<TabItem>Overrides</TabItem>      `}
    />
  {:else if active == "TabBar"}
    <h3>TabBar</h3>
    <p>
      We provide a custom TabBar component which at its base is just syntactic
      sugar for a bar with justify set to flex-start and alignment set to
      flex-end for tabs. We also remove padding and borders for a "tab-like"
      look.
    </p>
    <Code
      code={`
      <TabBar>
        <TabItem>Foo</TabItem>
        <TabItem active>Bar</TabItem>
        <TabItem>Baz</TabItem>
      </TabBar>
      `}
    />
    <h2>Providing tabs as a list...</h2>
    <p>
      TabBar also accepts an items prop, which can be either a list of strings
      of a list of objects with label and value props, and it will then emit a
      "change" event which can be listened for to get the currently active tab.
    </p>
    <Code
      code={`   
      <TabBar
        items={[{label: "Foo", value: "foo"}, {label: "Bar", value: "bar"}]}
        {active}
        on:change={(e) => {          
          active = e.detail.value;
        }}
        />
      `}
    />
  {:else if active == "containers"}
    <h3>Nesting Tabs in Containers</h3>
    <p>
      I recommend nestling the tab bar and content inside a
      <code>&lt;Container&gt;</code> components. Adding a border to the container
      and a fixed height will prevent the tabbed component from causing your page
      to reflow when the user changes tabs.
    </p>
    <p>This component has the following code:</p>
    <Code
      code={`<Container border height="70vh">
  <TabBar sticky .../>
  <div>
    <!-- Conditional logic 
      for displaying content
      -->
  </div>
</Container>`}
    />

    <p>
      Notice that I also have included the <code>sticky</code>
      flag, which makes the tab have an opaque background and stick to the top of
      its container
    </p>
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
