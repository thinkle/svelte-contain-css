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
      defaultValue: "var(--surface-bg, var(--secondary-fg))",
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

  let notifications = true;
  let wifi = false;
</script>

<CssVariableDemo variables={toggleVars}>
  <TextLayout>
    <h2>Toggle</h2>
    <p>
      Toggle wraps a native checkbox so you get checkbox semantics with a switch-style
      presentation.
    </p>
  </TextLayout>

  <DemoWithCode
    code={`<Toggle bind:checked={notifications}>
  <span slot="onLabel">Notifications</span>
</Toggle>`}
    defaultTab="split"
  >
    <svelte:fragment slot="header">
      <h3>Single Label</h3>
    </svelte:fragment>

    <Toggle bind:checked={notifications}>
      <span slot="onLabel">Notifications</span>
    </Toggle>
    <p>Current value: {notifications ? "on" : "off"}</p>
  </DemoWithCode>

  <DemoWithCode
    code={`<Toggle bind:checked={wifi}>
  <span slot="offLabel">Off</span>
  <span slot="onLabel">Wi-Fi</span>
</Toggle>`}
    defaultTab="split"
  >
    <svelte:fragment slot="header">
      <h3>Dual Labels</h3>
    </svelte:fragment>

    <Toggle bind:checked={wifi}>
      <span slot="offLabel">Off</span>
      <span slot="onLabel">Wi-Fi</span>
    </Toggle>
    <p>Current value: {wifi ? "Wi-Fi on" : "Wi-Fi off"}</p>
  </DemoWithCode>
</CssVariableDemo>
