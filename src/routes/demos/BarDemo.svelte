<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
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
    The bar component is a simple flex container that can be used for menu bars,
    nav bars, footers, headers and more.
  </p>
  <p>
    By default, the bar automatically spaces items out, but you can adjust that
    behavior either by adding left or right margins to children or by changing
    the CSS variables that control the justification on the flex container.
  </p>
</TextLayout>
<Container --container-border="1px solid #ccc">
  <h3>Example</h3>
  <Bar --bar-bg={barBG} --bar-fg={barFG}>
    <div>Left</div>
    <div>Center</div>
    <div>Right</div>
  </Bar>
  <div>More content after the bar...</div>
  <h3>Code</h3>
  <Code
    code={`
  <Bar 
    --bar-bg="${barBG}" 
    --bar-fg="${barFG}"
    >
    <div>Left</div>
    <div>Center</div>
    <div>Right</div>
  </Bar>
  <div>More content after the bar...</div>
  `}
  />
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
