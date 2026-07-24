<script lang="ts">
  import Slider from "$lib/controls/Slider.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import type { CSSVariable } from "./types";

  const scriptTag = "script";

  const sliderCSSVariables: CSSVariable[] = [
    {
      name: "--slider-width",
      type: "length",
      placeholder: "e.g., 16rem",
      defaultValue: "100%",
      unit: "rem",
    },
    {
      name: "--slider-height",
      type: "length",
      placeholder: "e.g., 1.75rem",
      defaultValue: "1.75rem",
      unit: "rem",
    },
    {
      name: "--slider-track-height",
      type: "length",
      placeholder: "e.g., 0.45rem",
      defaultValue: "0.45rem",
      unit: "rem",
    },
    {
      name: "--slider-track-bg",
      type: "color",
      placeholder: "e.g., #d0d7de",
      defaultValue: "theme default",
    },
    {
      name: "--slider-fill-bg",
      type: "color",
      placeholder: "e.g., var(--primary-bg)",
      defaultValue: "theme default",
    },
    {
      name: "--slider-thumb-size",
      type: "length",
      placeholder: "e.g., 1rem",
      defaultValue: "1rem",
      unit: "rem",
    },
    {
      name: "--slider-thumb-bg",
      type: "color",
      placeholder: "e.g., #fff",
      defaultValue: "theme default",
    },
    {
      name: "--slider-thumb-border",
      type: "text",
      placeholder: "e.g., 1px solid #0d6efd",
      defaultValue: "theme default",
    },
    {
      name: "--slider-thumb-radius",
      type: "length",
      placeholder: "e.g., 999px",
      defaultValue: "999px",
      unit: "px",
    },
  ];

  let volume = $state(38);
  let balance = $state(0);
  let density = $state(72);
</script>

<CssVariableDemo variables={sliderCSSVariables}>
  <TextLayout>
    <h2>Slider</h2>
    <p>
      <code>&lt;Slider /&gt;</code> wraps the native
      <code>&lt;input type="range"&gt;</code> and skins it with theme tokens.
      It stays bindable, keyboard-accessible, and easy to tune per theme.
    </p>
  </TextLayout>

  <DemoWithCode
    language="svelte"
    code={`<${scriptTag}>
  let volume = $state(38);
  let balance = $state(0);
  let density = $state(72);
</${scriptTag}>

<Stack>
  <FormItem>
    {#snippet label()}Volume ({volume}%){/snippet}
    <Slider bind:value={volume} min={0} max={100} step={1} width="16rem" />
  </FormItem>

  <FormItem>
    {#snippet label()}Balance ({balance}){/snippet}
    <Slider bind:value={balance} min={-50} max={50} step={1} width="16rem" />
  </FormItem>

  <FormItem>
    {#snippet label()}Density ({density}%){/snippet}
    <Slider bind:value={density} min={0} max={100} step={5} width="16rem" />
  </FormItem>

  <FormItem>
    {#snippet label()}Disabled{/snippet}
    <Slider value={60} min={0} max={100} disabled width="16rem" />
  </FormItem>
</Stack>`}
  >
    <Stack>
      <FormItem>
        {#snippet label()}Volume ({volume}%){/snippet}
        <Slider bind:value={volume} min={0} max={100} step={1} width="16rem" />
      </FormItem>

      <FormItem>
        {#snippet label()}Balance ({balance}){/snippet}
        <Slider bind:value={balance} min={-50} max={50} step={1} width="16rem" />
      </FormItem>

      <FormItem>
        {#snippet label()}Density ({density}%){/snippet}
        <Slider bind:value={density} min={0} max={100} step={5} width="16rem" />
      </FormItem>

      <FormItem>
        {#snippet label()}Disabled{/snippet}
        <Slider value={60} min={0} max={100} disabled width="16rem" />
      </FormItem>
    </Stack>
  </DemoWithCode>
</CssVariableDemo>
