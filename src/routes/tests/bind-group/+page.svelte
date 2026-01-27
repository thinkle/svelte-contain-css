<script lang="ts">
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Page from "$lib/layout/Page.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  // Checkbox group state - array of selected values
  let selectedFruits = $state<string[]>([]);

  // RadioButton group state - single selected value
  let selectedColor = $state<string>("");

  // Pre-selected checkbox group
  let presetFruits = $state<string[]>(["apple", "cherry"]);

  // For programmatic testing - use slice() before sort() to avoid mutation
  let checkboxOutput = $derived(JSON.stringify(selectedFruits.slice().sort()));
  let radioOutput = $derived(selectedColor);
  let presetOutput = $derived(JSON.stringify(presetFruits.slice().sort()));
</script>

<Page>
  <TextLayout>
    <h2>bind:group Test</h2>

    <section data-testid="checkbox-group">
      <h3>Checkbox Group (multi-select)</h3>
      <p>Select your favorite fruits:</p>

      <div class="options">
        <Checkbox value="apple" bind:group={selectedFruits}>Apple</Checkbox>
        <Checkbox value="banana" bind:group={selectedFruits}>Banana</Checkbox>
        <Checkbox value="cherry" bind:group={selectedFruits}>Cherry</Checkbox>
        <Checkbox value="date" bind:group={selectedFruits}>Date</Checkbox>
      </div>

      <p>
        Selected: <code data-testid="checkbox-output">{checkboxOutput}</code>
      </p>
    </section>

    <section data-testid="radio-group">
      <h3>RadioButton Group (single-select)</h3>
      <p>Select your favorite color:</p>

      <div class="options">
        <RadioButton value="red" bind:group={selectedColor}>Red</RadioButton>
        <RadioButton value="green" bind:group={selectedColor}>Green</RadioButton>
        <RadioButton value="blue" bind:group={selectedColor}>Blue</RadioButton>
        <RadioButton value="yellow" bind:group={selectedColor}>Yellow</RadioButton>
      </div>

      <p>
        Selected: <code data-testid="radio-output">{radioOutput}</code>
      </p>
    </section>

    <section data-testid="preset-values">
      <h3>Pre-selected Values</h3>
      <p>These should start with values already selected:</p>

      <div class="options" data-testid="preset-checkbox-group">
        <Checkbox value="apple" bind:group={presetFruits}>Apple</Checkbox>
        <Checkbox value="banana" bind:group={presetFruits}>Banana</Checkbox>
        <Checkbox value="cherry" bind:group={presetFruits}>Cherry</Checkbox>
      </div>
      <code data-testid="preset-checkbox-output">{presetOutput}</code>
    </section>
  </TextLayout>
</Page>

<style>
  .options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  section {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid var(--border-color, #ccc);
    border-radius: 0.5rem;
  }
</style>
