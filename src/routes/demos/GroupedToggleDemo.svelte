<script lang="ts">
  import { base } from "$app/paths";
  import GroupedToggle from "$lib/controls/GroupedToggle.svelte";
  import GroupedToggleItem from "$lib/controls/GroupedToggleItem.svelte";
  import GroupedRadioItem from "$lib/controls/GroupedRadioItem.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import type { CSSVariable } from "./types";

  const groupedToggleVars: CSSVariable[] = [
    {
      name: "--grouped-toggle-radius",
      type: "length",
      placeholder: "e.g., 4px",
      defaultValue: "var(--border-radius)",
      unit: "",
    },
    {
      name: "--grouped-toggle-item-padding",
      type: "text",
      placeholder: "e.g., 0.35em 0.75em",
      defaultValue: "0.35em 0.75em",
      unit: "",
    },
    {
      name: "--grouped-toggle-item-checked-bg",
      type: "color",
      placeholder: "e.g., #2563eb",
      defaultValue: "var(--primary-bg)",
      unit: "",
    },
    {
      name: "--grouped-toggle-item-checked-fg",
      type: "color",
      placeholder: "e.g., #fff",
      defaultValue: "var(--primary-fg)",
      unit: "",
    },
  ];

  let layers = $state({ topo: true, trails: false, streets: false });
  let theme = $state("light");
  let toppings = $state({ cheese: true, pepperoni: true, olives: false });
</script>

<CssVariableDemo variables={groupedToggleVars}>
  <TextLayout>
    <h2>Grouped Toggle</h2>
    <p>A row of segmented toggles, rendered as one connected control.</p>
    <p>
      <code>GroupedToggleItem</code> is independent and multi-select (more than one can be checked
      at once -- built on checkbox/<code>aria-pressed</code> semantics).
    </p>
    <p>
      <code>GroupedRadioItem</code> is mutually exclusive (the ARIA radiogroup pattern, with
      roving-tabindex arrow-key navigation).
    </p>
    <p>
      Reach for the toggle flavour when several boolean modes genuinely coexist, i.e. picking
      layers to show on a map or toppings on a pizza.
    </p>
    <p>
      Use the radio flavour for a compact alternative to more standard
      <a href="{base}/component/RadioButton">radio buttons</a>.
    </p>
    <p>If there are just <em>two</em> items, consider <a href="{base}/component/Toggle">Toggle</a> instead.</p>
  </TextLayout>

  <DemoWithCode
    defaultTab="split"
    code={`<GroupedToggle>
  <GroupedToggleItem bind:checked={layers.topo}>Topo</GroupedToggleItem>
  <GroupedToggleItem bind:checked={layers.trails}>Trails</GroupedToggleItem>
  <GroupedToggleItem bind:checked={layers.streets}>Streets</GroupedToggleItem>
</GroupedToggle>`}
  >
    {#snippet header()}
      <h3>Multiple segments active at once</h3>
    {/snippet}
    <p>
      Use <code>GroupedToggleItem</code> to group multiple segments into one UI element where each
      item is an independent toggle that could be on or off.
    </p>
    <GroupedToggle>
      <GroupedToggleItem bind:checked={layers.topo}>Topo</GroupedToggleItem>
      <GroupedToggleItem bind:checked={layers.trails}>Trails</GroupedToggleItem>
      <GroupedToggleItem bind:checked={layers.streets}>Streets</GroupedToggleItem>
    </GroupedToggle>
    <p>
      Visible layers: {Object.entries(layers)
        .filter(([, on]) => on)
        .map(([layer]) => layer)
        .join(", ") || "none"}
    </p>
  </DemoWithCode>

  <DemoWithCode
    defaultTab="split"
    code={`<GroupedToggle>
  <GroupedToggleItem bind:checked={layers.topo}>Topo</GroupedToggleItem>
  <GroupedToggleItem bind:checked={layers.trails}>Trails</GroupedToggleItem>
  <GroupedToggleItem
    disabled
    disabledReason="Flood data isn't available for this region."
  >
    Flood risk
  </GroupedToggleItem>
</GroupedToggle>`}
  >
    {#snippet header()}
      <h3>Disabled segment explains itself</h3>
    {/snippet}
    <GroupedToggle>
      <GroupedToggleItem bind:checked={layers.topo}>Topo</GroupedToggleItem>
      <GroupedToggleItem bind:checked={layers.trails}>Trails</GroupedToggleItem>
      <GroupedToggleItem
        disabled
        disabledReason="Flood data isn't available for this region."
      >
        Flood risk
      </GroupedToggleItem>
    </GroupedToggle>
    <p>Hover or focus the disabled segment to see why, instead of it just doing nothing.</p>
  </DemoWithCode>

  <DemoWithCode
    defaultTab="split"
    code={`<GroupedToggle role="radiogroup">
  <GroupedRadioItem bind:group={theme} value="light">Light</GroupedRadioItem>
  <GroupedRadioItem bind:group={theme} value="dark">Dark</GroupedRadioItem>
  <GroupedRadioItem bind:group={theme} value="candy">Candy</GroupedRadioItem>
  <GroupedRadioItem bind:group={theme} value="earthtones">Earthtones</GroupedRadioItem>
</GroupedToggle>`}
  >
    {#snippet header()}
      <h3>Mutually exclusive (GroupedRadioItem)</h3>
    {/snippet}
    <p>
      Use <code>GroupedRadioItem</code> when you can only select one option at a time. Focus a
      segment and use the arrow keys to move between them.
    </p>
    <GroupedToggle role="radiogroup">
      <GroupedRadioItem bind:group={theme} value="light">Light</GroupedRadioItem>
      <GroupedRadioItem bind:group={theme} value="dark">Dark</GroupedRadioItem>
      <GroupedRadioItem bind:group={theme} value="candy">Candy</GroupedRadioItem>
      <GroupedRadioItem bind:group={theme} value="earthtones">Earthtones</GroupedRadioItem>
    </GroupedToggle>
  </DemoWithCode>

  <DemoWithCode
    defaultTab="split"
    code={`<GroupedToggle>
  <GroupedToggleItem bind:checked={toppings.cheese} checkedBg="#fde047" checkedFg="#713f12">
    Cheese
  </GroupedToggleItem>
  <GroupedToggleItem bind:checked={toppings.pepperoni} checkedBg="#b91c1c" checkedFg="#fff">
    Pepperoni
  </GroupedToggleItem>
  <GroupedToggleItem bind:checked={toppings.olives} checkedBg="#1c1917" checkedFg="#fff">
    Olives
  </GroupedToggleItem>
</GroupedToggle>`}
  >
    {#snippet header()}
      <h3>Per-segment checked colour</h3>
    {/snippet}
    <GroupedToggle>
      <GroupedToggleItem bind:checked={toppings.cheese} checkedBg="#fde047" checkedFg="#713f12">
        Cheese
      </GroupedToggleItem>
      <GroupedToggleItem bind:checked={toppings.pepperoni} checkedBg="#b91c1c" checkedFg="#fff">
        Pepperoni
      </GroupedToggleItem>
      <GroupedToggleItem bind:checked={toppings.olives} checkedBg="#1c1917" checkedFg="#fff">
        Olives
      </GroupedToggleItem>
    </GroupedToggle>
    <p>
      On the pizza: {Object.entries(toppings)
        .filter(([, on]) => on)
        .map(([topping]) => topping)
        .join(", ") || "just crust"}. Each segment's checked fill is independently overridable, so
      a consuming app can colour-code a row of modes consistently with wherever else it names them
      (a legend, a summary sentence, etc).
    </p>
  </DemoWithCode>
</CssVariableDemo>
