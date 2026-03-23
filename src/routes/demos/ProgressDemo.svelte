<script lang="ts">
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";

  // Your custom library components:

  import Progress from "$lib/misc/Progress.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Stack from "$lib/layout/Stack.svelte";

  // Example CSS variable definitions for the Progress component
  const progressVars = [
    { name: "--progress-height", label: "Height of the progress bar" },
    { name: "--progress-bar-color", label: "Fill color of the bar" },
    { name: "--progress-track-bg", label: "Track background color" },
    { name: "--progress-track-stripe-bg", label: "Track background color" },
    { name: "--progress-fg", label: "Text color (over empty)" },
    { name: "--progress-half-fg", label: "Text color (over bar)" },
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
    <Progress {state} value={indeterminate ? "indeterminate" : value} {max}>
      {@html slotContent}
    </Progress>
    <p>
      Our <code>&lt;Progress /&gt;</code> component uses a hidden native
      <code>&lt;progress&gt;</code> element for accessibility, while providing a
      fully styled track and bar for consistent, customizable visuals.
    </p>
  </TextLayout>

  <!-- Use FormItem for each control -->

  <!-- 1) State selection (buttons) -->
  <FormItem>
    {#snippet label()}State{/snippet}
    <Stack align="flex-start">
      <RadioButton value="uninitiated" bind:group={state}
        >Uninitiated</RadioButton
      >
      <RadioButton value="inprogress" bind:group={state}
        >In Progress</RadioButton
      >
      <RadioButton value="complete" bind:group={state}>Complete</RadioButton>
    </Stack>
  </FormItem>

  <!-- 2) Value slider -->
  <FormItem>
    {#snippet label()}Value: {value} / {max}{/snippet}
    <Slider min={0} {max} bind:value disabled={indeterminate} width="12rem" />
  </FormItem>

  <!-- 3) Max slider -->
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

  <!-- 4) Indeterminate checkbox -->
  <FormItem>
    <Checkbox bind:checked={indeterminate}>Indeterminate</Checkbox>
  </FormItem>
  <FormItem>
    {#snippet label()}Slot Content{/snippet}
    <input type="text" bind:value={slotContent} style="width: 12rem;" />
  </FormItem>

  <!-- Code snippet -->
  <Code
    code={`
  <Progress
    state="${state}"
    ${!indeterminate ? `value={${value}}` : ""}
    ${!indeterminate ? `max={${max}}` : ""}
  >
    ${slotContent}    
  </Progress>
  `}
    language="html"
  />
</CssVariableDemo>
