<script lang="ts">
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
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

  function updateEventInfo(event: Event) {
    console.info("Check event: ", event);
  }
</script>

<CssVariableDemo variables={checkboxCSSVariables}>
  <TextLayout>
    <h2>Checkboxes</h2>
    <p>Customize the style of checkboxes with CSS variables.</p>

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
      onchange={(e) => {
        updateEventInfo(e);
        val3 = !val3;
      }}
      checked={val3}>Onion</Checkbox
    >
    <p>Note, we can customize the checked state if we want!</p>
    <Code
      code={`<Checkbox --checkbox-checked-bg="red" bind:checked={val}>Option</Checkbox>`}
    />

    <h3>Checkbox Groups with bind:group</h3>
    <p>
      You can bind <code>value</code> and <code>group</code> to get back an array
      of selected values. This works just like native checkbox groups in Svelte.
    </p>

    <Code
      code={`<script>
  let toppings = ['Lettuce', 'Tomato', 'Onion', 'Pickles', 'Cheese'];
  let selectedToppings = $state(['Tomato']); // Pre-select Tomato
</script>

{#each toppings as topping}
  <Checkbox bind:group={selectedToppings} value={topping}>
    {topping}
  </Checkbox>
{/each}

<p>Selected: {selectedToppings.join(', ')}</p>`}
      language="svelte"
    />

    <p><strong>Try it:</strong></p>
    {#each toppings as topping}
      <Checkbox bind:group={selectedToppings} value={topping}
        >{topping}</Checkbox
      >
    {/each}
    <p>Selected: {selectedToppings.join(", ")}</p>

    <h3>Single Checkbox with bind:checked</h3>
    <p>For a single boolean toggle, use <code>bind:checked</code>:</p>
    <Code
      code={`<script>
  let agreeToTerms = $state(false);
</script>

<Checkbox bind:checked={agreeToTerms}>
  I agree to the terms and conditions
</Checkbox>`}
      language="svelte"
    />
  </TextLayout>
</CssVariableDemo>
