<script lang="ts">
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

  // Map layers: a textbook multi-select case -- several can be visible on
  // the map at once, which is the whole reason this isn't a radio group.
  let layers = $state({ topo: true, trails: false, streets: false });

  // Theme: a textbook single-select case -- exactly one is ever active,
  // which is what makes GroupedRadioItem (not GroupedToggleItem) the right
  // choice here. Two options wouldn't justify reaching for a radio group
  // over a plain Toggle; four does.
  let theme = $state("light");

  // Pizza toppings: another genuine multi-select case, used to show off
  // per-segment checked colour -- unlike a theme, a pizza can actually BE
  // cheese *and* pepperoni *and* olives at once, so GroupedToggleItem (not
  // GroupedRadioItem) is the right fit here too, and the colour-coding
  // reads as each topping's own identity rather than a contradiction.
  let toppings = $state({ cheese: true, pepperoni: true, olives: false });
</script>

<CssVariableDemo variables={groupedToggleVars}>
  <TextLayout>
    <h2>Grouped Toggle</h2>
    <p>
      A row of segmented toggles, rendered as one connected control. Two flavours share the row:
      <code>GroupedToggleItem</code> is independent and multi-select (more than one can be checked
      at once -- built on checkbox/<code>aria-pressed</code> semantics), and
      <code>GroupedRadioItem</code> is mutually exclusive (the ARIA radiogroup pattern, with
      roving-tabindex arrow-key navigation). Reach for the toggle flavour when several boolean
      modes genuinely coexist -- several map layers can be visible at once -- and the radio
      flavour for a compact, single-select alternative to <code>TabBar</code>/<code>TabItem</code>
      when there are enough options (three or more, say) that it earns a dedicated control rather
      than a plain <code>Toggle</code>.
    </p>
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
    <GroupedToggle role="radiogroup">
      <GroupedRadioItem bind:group={theme} value="light">Light</GroupedRadioItem>
      <GroupedRadioItem bind:group={theme} value="dark">Dark</GroupedRadioItem>
      <GroupedRadioItem bind:group={theme} value="candy">Candy</GroupedRadioItem>
      <GroupedRadioItem bind:group={theme} value="earthtones">Earthtones</GroupedRadioItem>
    </GroupedToggle>
    <p>
      Theme: {theme}. One <code>group</code> variable shared by every item in the row -- no manual
      comparison to write. Focus a segment and press Left/Right to move between them.
    </p>
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
        .join(", ") || "just cheese... wait, no cheese either? Plain crust it is"}.
      Each segment's checked fill is independently overridable, so a consuming app can colour-code
      a row of modes consistently with wherever else it names them (a legend, a summary sentence,
      etc) -- and unlike a theme, toppings can genuinely stack, which is why this is
      <code>GroupedToggleItem</code>, not <code>GroupedRadioItem</code>.
    </p>
  </DemoWithCode>
</CssVariableDemo>
