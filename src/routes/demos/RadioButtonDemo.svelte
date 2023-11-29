<script lang="ts">
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import CssVariables from "./CssVariables.svelte";
  import CssWrapper from "./CssWrapper.svelte";

  const radioCSSVariables = [
    {
      name: "--radio-size",
      type: "length",
      placeholder: "e.g., 1rem",
      defaultValue: "var(--font-size)",
      unit: "rem",
    },
    {
      name: "--radio-bg",
      type: "color",
      placeholder: "e.g., #dddddd",
      defaultValue: "var(--inactive-bg)",
      unit: "",
    },
    {
      name: "--radio-fg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "var(--inactive-fg)",
      unit: "",
    },
    {
      name: "--radio-checked-bg",
      type: "color",
      placeholder: "e.g., #0044cc",
      defaultValue: "var(--primary-bg)",
      unit: "",
    },
    {
      name: "--radio-checked-fg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "var(--primary-fg)",
      unit: "",
    },
    {
      name: "--radio-border",
      type: "text",
      placeholder: "e.g., 1px solid #fff",
      defaultValue: "1px solid var(--white)",
      unit: "",
    },
    {
      name: "--radio-checked-border",
      type: "text",
      placeholder: "e.g., 1px solid #fff",
      defaultValue: "1px solid var(--white)",
      unit: "",
    },
    {
      name: "--radio-hover-filter",
      type: "text",
      placeholder: "e.g., brightness(1.2)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--radio-hover-transform",
      type: "text",
      placeholder: "e.g., scale(1.1)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--radio-active-filter",
      type: "text",
      placeholder: "e.g., brightness(0.8)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--radio-active-transform",
      type: "text",
      placeholder: "e.g., scale(0.9)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--radio-transition",
      type: "text",
      placeholder: "e.g., all 0.3s ease",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--checked-weight",
      type: "text",
      placeholder: "e.g., bold",
      defaultValue: "var(--bold)",
      unit: "",
    },
    {
      name: "--radio-check",
      type: "text",
      placeholder: "e.g., ✓",
      defaultValue: "",
      unit: "",
    },
  ];

  let cssValues = {};
  let val = false;
  let val2 = true;
  let val3 = false;
</script>

<Container border>
  <h2>radioes</h2>
  <CssWrapper variables={cssValues}>
    <RadioButton value="lettuce" bind:group={val}>Lettuce</RadioButton>
    <RadioButton value="tomato" bind:group={val}>Tomato</RadioButton>
    <RadioButton value="onion" bind:group={val}>Onion</RadioButton>
  </CssWrapper>
  <Code
    code={`<radio --radio-checked-bg="red" bind:checked={val}>Option</radio>`}
  />
  <h3>radio CSS Variables</h3>
  <p>Customize the style of our radioes</p>
  <CssVariables
    variables={radioCSSVariables}
    onSetVariables={(variables) => {
      cssValues = variables;
    }}
  />
</Container>
