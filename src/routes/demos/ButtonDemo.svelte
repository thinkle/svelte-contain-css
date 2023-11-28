<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import CssVariables from "./CssVariables.svelte";
  import CssWrapper from "./CssWrapper.svelte";

  const buttonCSSVariables = [
    {
      name: "--button-radius",
      type: "length",
      placeholder: "e.g., 4px",
      defaultValue: "var(--border-radius)",
      unit: "px",
    },
    {
      name: "--button-bg",
      type: "color",
      placeholder: "e.g., #007bff",
      defaultValue: "var(--secondary-bg)",
      unit: "",
    },
    {
      name: "--button-fg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "var(--secondary-fg)",
      unit: "",
    },
    {
      name: "--button-font",
      type: "text",
      placeholder: "e.g., Arial",
      defaultValue: "var(--ui-font)",
      unit: "",
    },
    {
      name: "--button-hover-transform",
      type: "text",
      placeholder: "e.g., scale(1.1)",
      defaultValue: "var(--hover-transform)",
      unit: "",
    },
    {
      name: "--button-hover-filter",
      type: "text",
      placeholder: "e.g., brightness(1.2)",
      defaultValue: "var(--hover-filter)",
      unit: "",
    },
    {
      name: "--button-active-transform",
      type: "text",
      placeholder: "e.g., scale(0.9)",
      defaultValue: "var(--active-transform)",
      unit: "",
    },
    {
      name: "--button-active-filter",
      type: "text",
      placeholder: "e.g., brightness(0.8)",
      defaultValue: "var(--active-filter)",
      unit: "",
    },
    {
      name: "--button-transition",
      type: "text",
      placeholder: "e.g., all 0.3s",
      defaultValue: "var(--transition)",
      unit: "",
    },
    {
      name: "--button-pad",
      type: "text",
      placeholder: "16px 8px 8px 16px",
      defaultValue: "var(--padding)",
      unit: "",
    },
  ];
  let cssValues = {};
</script>

<Container border>
  <h2>Buttons</h2>
  <p>Our buttons are easily stylable with colors, padding,</p>
  <CssVariables
    variables={buttonCSSVariables}
    onSetVariables={(variables) => {
      cssValues = variables;
    }}
  />
  <CssWrapper variables={cssValues}>
    <Button>Standard Button</Button>
    <Button>
      Icon Button
      <div slot="icon">▶</div>
    </Button>
    <Button primary={true}>Primary Button</Button>
  </CssWrapper>

  <Code
    code={`
    <Button>Standard Button</Button>
    <Button --button-bg="transparent">Transparent Button</Button>
    <Button>
      Icon Button
      <div slot="icon">▶</div>
    </Button>
    <Button primary={true}>Primary Button</Button>
    `}
  />
</Container>
