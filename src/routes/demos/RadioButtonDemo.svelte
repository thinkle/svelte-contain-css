<script lang="ts">
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Code from "$lib/misc/Code.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import type { CSSVariable } from "./types";

  const radioCSSVariables: CSSVariable[] = [
    {
      name: "--radio-button-size",
      type: "length",
      placeholder: "e.g., 1rem",
      defaultValue: "var(--font-size)",
      unit: "rem",
    },
    {
      name: "--radio-button-bg",
      type: "color",
      placeholder: "e.g., #dddddd",
      defaultValue: "var(--inactive-bg)",
      unit: "",
    },
    {
      name: "--radio-button-fg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "var(--inactive-fg)",
      unit: "",
    },
    {
      name: "--radio-button-checked-bg",
      type: "color",
      placeholder: "e.g., #0044cc",
      defaultValue: "var(--primary-bg)",
      unit: "",
    },
    {
      name: "--radio-button-checked-fg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "var(--primary-fg)",
      unit: "",
    },
    {
      name: "--radio-button-border",
      type: "text",
      placeholder: "e.g., 1px solid #fff",
      defaultValue: "1px solid var(--white)",
      unit: "",
    },
    {
      name: "--radio-button-checked-border",
      type: "text",
      placeholder: "e.g., 1px solid #fff",
      defaultValue: "1px solid var(--white)",
      unit: "",
    },
    {
      name: "--radio-button-hover-filter",
      type: "text",
      placeholder: "e.g., brightness(1.2)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--radio-button-hover-transform",
      type: "text",
      placeholder: "e.g., scale(1.1)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--radio-button-active-filter",
      type: "text",
      placeholder: "e.g., brightness(0.8)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--radio-button-active-transform",
      type: "text",
      placeholder: "e.g., scale(0.9)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--radio-button-transition",
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
      name: "--radio-button-check",
      type: "text",
      placeholder: "e.g., ✓",
      defaultValue: "",
      unit: "",
    },
  ];

  let val = $state("lettuce");
</script>

<CssVariableDemo variables={radioCSSVariables}>
  <TextLayout>
    <h2>Radio Buttons</h2>
    <p>Customize radio button styling with CSS variables.</p>
  </TextLayout>

  <RadioButton value="lettuce" bind:group={val}>Lettuce</RadioButton>
  <RadioButton value="tomato" bind:group={val}>Tomato</RadioButton>
  <RadioButton value="onion" bind:group={val}>Onion</RadioButton>

  <p>Selected: {val}</p>

  <Code
    code={`<RadioButton value="lettuce" bind:group={val}>Lettuce</RadioButton>
<RadioButton value="tomato" bind:group={val}>Tomato</RadioButton>
<RadioButton value="onion" bind:group={val}>Onion</RadioButton>`}
  />
</CssVariableDemo>
