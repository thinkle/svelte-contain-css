<script lang="ts">
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import type { CSSVariable } from "./types";
  
  // Your custom library components:
  import Progress from "$lib/misc/Progress.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Column from "$lib/layout/Column.svelte";
  
  // Example CSS variable definitions for the Progress component
  const progressVars: CSSVariable[] = [
    {
      name: "--progress-height",
      type: "length",
      placeholder: "e.g., 2rem",
      defaultValue: "2em",
      unit: "",
    },
    {
      name: "--progress-bar-color",
      type: "color",
      placeholder: "e.g., #2563eb",
      defaultValue: "var(--primary-bg)",
      unit: "",
    },
    {
      name: "--progress-track-bg",
      type: "color",
      placeholder: "e.g., #dfdfdf",
      defaultValue: "var(--secondary-bg)",
      unit: "",
    },
    {
      name: "--progress-track-stripe-bg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "color-mix(in srgb, var(--secondary-bg) 85%, var(--surface-bg) 15%)",
      unit: "",
    },
    {
      name: "--progress-fg",
      type: "color",
      placeholder: "e.g., #111",
      defaultValue: "var(--secondary-fg)",
      unit: "",
    },
    {
      name: "--progress-half-fg",
      type: "color",
      placeholder: "e.g., #fff",
      defaultValue: "var(--primary-fg)",
      unit: "",
    },
    {
      name: "--progress-outline-width",
      type: "length",
      placeholder: "e.g., 1px",
      defaultValue: "1px",
      unit: "",
    },
    {
      name: "--progress-outline-color",
      type: "color",
      placeholder: "e.g., #dfdfdf",
      defaultValue: "var(--progress-track-bg)",
      unit: "",
    },
    {
      name: "--progress-half-outline-color",
      type: "color",
      placeholder: "e.g., #2563eb",
      defaultValue: "var(--progress-bar-color)",
      unit: "",
    },
    {
      name: "--progress-text-shadow",
      type: "text",
      placeholder: "e.g., 1px 0 #fff, -1px 0 #fff",
      defaultValue: "1px 0 var(--progress-outline-color), -1px 0 var(--progress-outline-color), 0 -1px var(--progress-outline-color), 0 1px var(--progress-outline-color)",
      unit: "",
    },
    {
      name: "--progress-half-text-shadow",
      type: "text",
      placeholder: "e.g., 1px 0 #2563eb, -1px 0 #2563eb",
      defaultValue: "var(--progress-text-shadow)",
      unit: "",
    },
  ];
  
  let state: "uninitiated" | "inprogress" | "complete" = "inprogress";
  let value = 40;
  let max = 100;
  let indeterminate = false;
  
  
  let slotContent = `Something's <i>happening</i> here...`;
</script>
  
<CssVariableDemo variables={progressVars}>
  <TextLayout>
    <h2>Progress Demo</h2>
    <p>
      The legacy progress demo also benefits from the shared wrapper: controls stay
      above the panel, and the demo/source split is consistent with the newer branch.
    </p>
  </TextLayout>

  <DemoWithCode
    code={`<Progress
  state="${state}"
  value={${indeterminate ? '"indeterminate"' : value}}
  ${indeterminate ? "" : `max={${max}}`}
>
  ${slotContent}
</Progress>`}
    defaultTab="split"
  >
    <svelte:fragment slot="header">
      <h3>Interactive Progress</h3>
      <p>
        The component uses a hidden native <code>&lt;progress&gt;</code> element for
        accessibility while rendering a stylable visual track.
      </p>
    </svelte:fragment>

    <svelte:fragment slot="inputArea">
      <FormItem>
        <span slot="label">State</span>
        <Column --column-align="flex-start">
          <RadioButton value="uninitiated" bind:group={state}>Uninitiated</RadioButton>
          <RadioButton value="inprogress" bind:group={state}>In Progress</RadioButton>
          <RadioButton value="complete" bind:group={state}>Complete</RadioButton>
        </Column>
      </FormItem>

      <FormItem>
        <span slot="label">Value: {value} / {max}</span>
        <input
          type="range"
          min="0"
          max={max}
          bind:value
          disabled={indeterminate}
          style="width: 12rem;"
        />
      </FormItem>

      <FormItem>
        <span slot="label">Max: {max}</span>
        <input
          type="range"
          min="10"
          max="200"
          bind:value={max}
          disabled={indeterminate}
          style="width: 12rem;"
        />
      </FormItem>

      <FormItem>
        <Checkbox bind:checked={indeterminate}>Indeterminate</Checkbox>
      </FormItem>

      <FormItem>
        <span slot="label">Slot Content</span>
        <input
          type="text"
          bind:value={slotContent}
          style="width: 12rem;"
        />
      </FormItem>
    </svelte:fragment>

    <Progress
      state={state}
      value={indeterminate ? "indeterminate" : value}
      {max}
    >
      {@html slotContent}
    </Progress>
  </DemoWithCode>
</CssVariableDemo>
