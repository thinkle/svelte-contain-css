<script lang="ts">
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import type { CSSVariable } from "./types";

  const checkboxCSSVariables: CSSVariable[] = [
    {
      name: "--checkbox-size",
      type: "length",
      placeholder: "e.g., 1rem",
      defaultValue: "var(--font-size)",
      unit: "rem",
    },
    {
      name: "--checkbox-bg",
      type: "color",
      placeholder: "e.g., #dddddd",
      defaultValue: "var(--inactive-bg)",
      unit: "",
    },
    {
      name: "--checkbox-fg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "var(--inactive-fg)",
      unit: "",
    },
    {
      name: "--checkbox-checked-bg",
      type: "color",
      placeholder: "e.g., #0044cc",
      defaultValue: "var(--primary-bg)",
      unit: "",
    },
    {
      name: "--checkbox-checked-fg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "var(--primary-fg)",
      unit: "",
    },
    {
      name: "--checkbox-border",
      type: "text",
      placeholder: "e.g., 1px solid #fff",
      defaultValue: "1px solid var(--white)",
      unit: "",
    },
    {
      name: "--checkbox-checked-border",
      type: "text",
      placeholder: "e.g., 1px solid #fff",
      defaultValue: "1px solid var(--white)",
      unit: "",
    },
    {
      name: "--checkbox-hover-filter",
      type: "text",
      placeholder: "e.g., brightness(1.2)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--checkbox-hover-transform",
      type: "text",
      placeholder: "e.g., scale(1.1)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--checkbox-active-filter",
      type: "text",
      placeholder: "e.g., brightness(0.8)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--checkbox-active-transform",
      type: "text",
      placeholder: "e.g., scale(0.9)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--checkbox-transition",
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
      name: "--checkbox-check",
      type: "text",
      placeholder: "e.g., ✓",
      defaultValue: "",
      unit: "",
    },
  ];

  let val = $state(false);
  let val2 = $state(true);
  let val3 = $state(false);

  let toppings = [
    "Lettuce",
    "Tomato",
    "Onion",
    "Pickles",
    "Cheese",
    "Bacon",
    "Avocado",
    "Mushrooms",
    "Jalapenos",
    "Peppers",
    "Olives",
    "Spinach",
    "Cucumber",
    "Carrots",
    "Sprouts",
    "Egg",
  ];
  let selectedToppings = $state(["Bacon", "Lettuce", "Tomato"]);
  let agreeToTerms = $state(false);

  function updateEventInfo(event: Event) {
    console.info("Check event: ", event);
  }
</script>

<CssVariableDemo variables={checkboxCSSVariables}>
  <TextLayout>
    <h2>Checkboxes</h2>
    <p>Customize the style of checkboxes with CSS variables.</p>
  </TextLayout>

  <DemoWithCode
    defaultTab="split"
    code={`<Checkbox bind:checked={val}>Lettuce</Checkbox>
<Checkbox --checkbox-checked-bg="red" bind:checked={val2}>Tomato</Checkbox>
<Checkbox bind:checked={val3}>Onion</Checkbox>`}
  >
    {#snippet header()}
      <h3>Single checkboxes</h3>
    {/snippet}
    {#snippet blurb()}
      <p>Use <code>bind:checked</code> for boolean toggles.</p>
    {/snippet}
    <Checkbox
      onblur={updateEventInfo}
      onclick={updateEventInfo}
      onchange={updateEventInfo}
      bind:checked={val}>Lettuce</Checkbox
    >
    <Checkbox
      --checkbox-checked-bg="red"
      onblur={updateEventInfo}
      onclick={updateEventInfo}
      onchange={updateEventInfo}
      bind:checked={val2}>Tomato</Checkbox
    >
    <Checkbox
      onblur={updateEventInfo}
      onclick={updateEventInfo}
      onchange={(e: Event) => {
        updateEventInfo(e);
        val3 = !val3;
      }}
      checked={val3}>Onion</Checkbox
    >
  </DemoWithCode>

  <DemoWithCode
    language="svelte"
    code={`<script>
  let selectedToppings = $state(["Bacon", "Lettuce", "Tomato"]);
</script>

{#each toppings as topping}
  <Checkbox bind:group={selectedToppings} value={topping}>
    {topping}
  </Checkbox>
{/each}

<p>Selected: {selectedToppings.join(", ")}</p>`}
  >
    {#snippet header()}
      <h3>Checkbox groups</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        Bind <code>group</code> and <code>value</code> to collect an array of
        selected items.
      </p>
    {/snippet}
    {#each toppings as topping}
      <Checkbox bind:group={selectedToppings} value={topping}>{topping}</Checkbox>
    {/each}
    <p>Selected: {selectedToppings.join(", ")}</p>
  </DemoWithCode>

  <DemoWithCode
    defaultTab="split"
    language="svelte"
    code={`<script>
  let agreeToTerms = $state(false);
</script>

<Checkbox bind:checked={agreeToTerms}>
  I agree to the terms and conditions
</Checkbox>`}
  >
    {#snippet header()}
      <h3>Boolean toggle</h3>
    {/snippet}
    <Checkbox bind:checked={agreeToTerms}>
      I agree to the terms and conditions
    </Checkbox>
  </DemoWithCode>
</CssVariableDemo>
