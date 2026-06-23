<script lang="ts">
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";

  // Your custom library components:

  import Progress from "$lib/misc/Progress.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Input from "$lib/controls/Input.svelte";
  import Stack from "$lib/layout/Stack.svelte";

  // Example CSS variable definitions for the Progress component
  import type { CSSVariable } from "./types";
  const progressVars: CSSVariable[] = [
    { name: "--progress-height", type: "length", placeholder: "Height of the progress bar" },
    { name: "--progress-bar-color", type: "color", placeholder: "Fill color of the bar" },
    { name: "--progress-track-bg", type: "color", placeholder: "Track background color" },
    { name: "--progress-track-stripe-bg", type: "color", placeholder: "Track stripe background color" },
    { name: "--progress-fg", type: "color", placeholder: "Text color (over empty)" },
    { name: "--progress-half-fg", type: "color", placeholder: "Text color (50-100%)" },
    { name: "--progress-outline-width", type: "length", placeholder: "Outline width for text contrast" },
    { name: "--progress-outline-color", type: "color", placeholder: "Outline color for text contrast" },
    { name: "--progress-half-outline-color", type: "color", placeholder: "Outline color (50-100%)" },
    { name: "--progress-text-shadow", type: "text", placeholder: "Text shadow for contrast" },
    { name: "--progress-half-text-shadow", type: "color", placeholder: "Text shadow color (50-100%)" },
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
      Our <code>&lt;Progress /&gt;</code> component uses a hidden native
      <code>&lt;progress&gt;</code> element for accessibility, while providing a
      fully styled track and bar for consistent, customizable visuals.
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
  >
    {#snippet inputArea()}
      <FormItem>
        {#snippet label()}State{/snippet}
        <Stack align="flex-start">
          <RadioButton value="uninitiated" bind:group={state}
            >Uninitiated</RadioButton
          >
          <RadioButton value="inprogress" bind:group={state}
            >In Progress</RadioButton
          >
          <RadioButton value="complete" bind:group={state}>Complete</RadioButton
          >
        </Stack>
      </FormItem>

      <FormItem>
        {#snippet label()}Value: {value} / {max}{/snippet}
        <Slider
          min={0}
          {max}
          bind:value
          disabled={indeterminate}
          width="12rem"
        />
      </FormItem>

      <FormItem>
        {#snippet label()}Max: {max}{/snippet}
        <Slider
          min={10}
          max={200}
          bind:value={max}
          disabled={indeterminate}
          width="12rem"
        />
      </FormItem>

      <FormItem>
        <Checkbox bind:checked={indeterminate}>Indeterminate</Checkbox>
      </FormItem>
      <FormItem>
        {#snippet label()}Slot Content{/snippet}
        <Input bind:value={slotContent} width="12rem" />
      </FormItem>
    {/snippet}
    <Progress {state} value={indeterminate ? "indeterminate" : value} {max}>
      {@html slotContent}
    </Progress>
  </DemoWithCode>
</CssVariableDemo>
