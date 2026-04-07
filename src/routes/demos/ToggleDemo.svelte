<script lang="ts">
  import Toggle from "$lib/controls/Toggle.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import type { CSSVariable } from "./types";

  const toggleVars: CSSVariable[] = [
    {
      name: "--toggle-width",
      type: "length",
      placeholder: "e.g., 2.75em",
      defaultValue: "2.75em",
      unit: "",
    },
    {
      name: "--toggle-height",
      type: "length",
      placeholder: "e.g., 1.5em",
      defaultValue: "1.5em",
      unit: "",
    },
    {
      name: "--toggle-bg",
      type: "color",
      placeholder: "e.g., #4a5568",
      defaultValue: "var(--inactive-bg)",
      unit: "",
    },
    {
      name: "--toggle-fg",
      type: "color",
      placeholder: "e.g., #fff",
      defaultValue: "var(--inactive-fg)",
      unit: "",
    },
    {
      name: "--toggle-on-bg",
      type: "color",
      placeholder: "e.g., #2563eb",
      defaultValue: "var(--primary-bg)",
      unit: "",
    },
    {
      name: "--toggle-on-fg",
      type: "color",
      placeholder: "e.g., #fff",
      defaultValue: "var(--primary-fg)",
      unit: "",
    },
    {
      name: "--toggle-thumb-bg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "var(--surface-bg)",
      unit: "",
    },
    {
      name: "--toggle-space",
      type: "length",
      placeholder: "e.g., 0.5rem",
      defaultValue: "var(--space-md)",
      unit: "",
    },
  ];

  let notifications = $state(true);
  let wifi = $state(false);
</script>

<CssVariableDemo variables={toggleVars}>
  <TextLayout>
    <h2>Toggle</h2>
    <p>
      Toggle is built on a native checkbox, with snippet slots for
      <code>offLabel</code> and <code>onLabel</code>.
    </p>
  </TextLayout>

  <DemoWithCode
    defaultTab="split"
    code={`<Toggle bind:checked={notifications}>
  {#snippet onLabel()}Notifications{/snippet}
</Toggle>`}
  >
    {#snippet header()}
      <h3>Single Label</h3>
    {/snippet}
    <Toggle bind:checked={notifications}>
      {#snippet onLabel()}Notifications{/snippet}
    </Toggle>
  </DemoWithCode>

  <DemoWithCode
    defaultTab="split"
    code={`<Toggle bind:checked={wifi}>
  {#snippet offLabel()}Off{/snippet}
  {#snippet onLabel()}Wi-Fi{/snippet}
</Toggle>`}
  >
    {#snippet header()}
      <h3>Dual Labels</h3>
    {/snippet}
    <Toggle bind:checked={wifi}>
      {#snippet offLabel()}Off{/snippet}
      {#snippet onLabel()}Wi-Fi{/snippet}
    </Toggle>
  </DemoWithCode>
</CssVariableDemo>
