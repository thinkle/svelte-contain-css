<script lang="ts">
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import TabBar from "$lib/layout/TabBar.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";

  const items = ["Overview", "Recipes", "Meal plan"];
  let underlineAll = $state(true);
  const variables = $derived({
    "--tab-indicator-height": "3px",
    "--tab-indicator-color": "var(--primary-color)",
    "--tab-bg": "transparent",
    "--tab-border": "none",
    "--tab-bar-border-bottom": "none",
    ...(underlineAll ? {
      "--tab-border-bottom": "1px solid var(--border-color)",
      "--tab-active-border-bottom": "var(--tab-border-bottom)",
    } : {}),
  });
</script>

<DemoWithCode
  defaultTab="split"
  language="svelte"
  scriptSource={'import { TabBar } from "contain-css-svelte";'}
  markupSource={`<TabBar
${Object.entries(variables).map(([name, value]) => `  ${name}="${value}"`).join("\n")}
  items={${JSON.stringify(items)}}
  active="Overview"
/>`}
>
  {#snippet header()}
    <h3>Sliding underline</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      A positive <code>--tab-indicator-height</code> turns on the slide.
      <code>--tab-bg="transparent"</code> keeps tabs flat at rest and lets the
      normal hover tint show. <code>--tab-border="none"</code> clears the tab outlines.
    </p>
    <p>
      <strong>Underline every tab</strong> adds a thin
      <code>--tab-border-bottom</code> and uses it for
      <code>--tab-active-border-bottom</code> too. The thicker indicator slides over both.
    </p>
  {/snippet}
  {#snippet inputArea()}
    <Checkbox bind:checked={underlineAll}>Underline every tab</Checkbox>
  {/snippet}

  <TabBar {...variables} {items} active="Overview" aria-label="Recipe tabs" />
</DemoWithCode>
