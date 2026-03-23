<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import CssVariables from "./CssVariables.svelte";
  import type { CSSVariable } from "./types";
  import CssWrapper from "./CssWrapper.svelte";
  let barBG = "var(--material-color-light-blue-900)";
  let barFG = "var(--material-color-light-blue-100)";
  const cssVariables: CSSVariable[] = [
    {
      name: "--bar-height",
      type: "length",
      group: "Size",
      placeholder: "e.g., 2rem",
      defaultValue: "",
      unit: "rem",
    },
    {
      name: "--bar-bg",
      type: "color",
      group: "Color",
      placeholder: "e.g., #ff00ff",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--bar-fg",
      type: "color",
      group: "Color",
      placeholder: "e.g., #000000",
      defaultValue: "",
      unit: "",
    },

    {
      name: "--bar-justify",
      type: "picklist",
      defaultValue: "",
      group: "Layout",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
    {
      name: "--bar-align",
      type: "picklist",
      group: "Layout",
      defaultValue: "",
      options: ["stretch", "flex-start", "flex-end", "center", "baseline"],
    },
    {
      name: "--bar-gap",
      type: "length",
      group: "Layout",
      defaultValue: "var(--gap)",
      placeholder: "calc(var(--gap)*2)",
    },
    {
      name: "--bar-padding",
      type: "length",
      group: "Spacing",
      placeholder: "e.g., 1rem",
      defaultValue: "",
      unit: "rem",
    },
    {
      name: "--bar-border-bottom",
      type: "text",
      group: "Borders",
      placeholder: "e.g., 1px solid #000",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--bar-border-top",
      type: "text",
      group: "Borders",
      placeholder: "e.g., 1px solid #000",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--bar-margin-bottom",
      type: "length",
      group: "Spacing",
      placeholder: "e.g., 0.5rem",
      defaultValue: "",
      unit: "rem",
    },
    {
      name: "--bar-min-height",
      type: "length",
      group: "Size",
      placeholder: "e.g., 3rem",
      defaultValue: "",
      unit: "rem",
    },
    {
      name: "--bar-max-height",
      type: "length",
      group: "Size",
      placeholder: "e.g., 6rem",
      defaultValue: "",
      unit: "rem",
    },
  ];
  let cssValues = $state({});
</script>

<TextLayout>
  <h2>Bar</h2>
  <p>
    Bar is a horizontal container for headers, toolbars, nav rows, and footers.
    It lays out its direct children in a single row and handles the common
    "content on the left, actions on the right" pattern out of the box.
  </p>
  <p>
    If you want to group several related items on one side of the Bar, use
    <code>&lt;Inline&gt;</code> inside it as a convenience helper.
  </p>
</TextLayout>
<Container --container-border="1px solid #ccc">
  <DemoWithCode
    code={`<Bar --bar-bg="${barBG}" --bar-fg="${barFG}">
  <h3>My App</h3>
  <Button secondary>Action</Button>
</Bar>
<div>More content after the bar...</div>`}
  >
    {#snippet header()}
      <h3>Basic Bar</h3>
    {/snippet}
    <Bar --bar-bg={barBG} --bar-fg={barFG}>
      <h3>My App</h3>
      <Button secondary>Action</Button>
    </Bar>
    <div>More content after the bar...</div>
  </DemoWithCode>

  <DemoWithCode
    code={`<Bar>
  <h1>My App</h1>
  <Inline>
    <Button secondary>Share</Button>
    <Button primary>Publish</Button>
    <Button>More</Button>
  </Inline>
</Bar>`}
  >
    {#snippet header()}
      <h3>Grouped Actions</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        Use <code>&lt;Inline&gt;</code> when several related controls should stay grouped
        on one side of the bar.
      </p>
    {/snippet}
    <Bar>
      <h1>My App</h1>
      <Inline>
        <Button secondary>Share</Button>
        <Button primary>Publish</Button>
        <Button>More</Button>
      </Inline>
    </Bar>
  </DemoWithCode>
</Container>
<Container>
  <CssWrapper variables={cssValues}>
    <Bar>
      <h3>CSS Variables for Bar</h3>
      <em>Try it Out!</em>
    </Bar>
  </CssWrapper>
  <p>Try tweaking the variables for the Bar below</p>
  <CssVariables
    variables={cssVariables}
    onSetVariables={(values) => {
      cssValues = values;
    }}
  />
</Container>
