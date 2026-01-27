<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Select from "$lib/controls/Select.svelte";
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Page from "$lib/layout/Page.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let selectValue1 = $state("short");
  let selectValue2 = $state("narrow");
  let selectValue3 = $state("lorem");
  let dropdownMode = $state("wrap");

  // Options with varying content lengths
  const shortOptions = [
    { value: "short", label: "Hi" },
    { value: "ok", label: "OK" },
    { value: "no", label: "No" },
  ];

  const wideOptions = [
    {
      value: "narrow",
      label: "Narrow start",
    },
    {
      value: "wrap-mode",
      label: "This is a very long option that should wrap by default",
    },
    { value: "another-long", label: "Another extremely long menu item here" },
    {
      value: "super-long",
      label: "This is an absolutely tremendous amount of text",
    },
  ];

  const loremOptions = [
    {
      value: "lorem1",
      label: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    },
    {
      value: "lorem2",
      label: "Sed do eiusmod tempor incididunt ut labore et dolore",
    },
    {
      value: "lorem3",
      label: "Ut enim ad minim veniam, quis nostrud exercitation",
    },
    {
      value: "lorem4",
      label: "Duis aute irure dolor in reprehenderit in voluptate",
    },
  ];
</script>

<Page>
  {#snippet header()}
    <Bar>
      <h2>Dropdown Wrapping Tests</h2>
    </Bar>
  {/snippet}

  <TextLayout>
    <h2>Dropdown Menu Text Wrapping Tests</h2>
    <p>
      These tests demonstrate how dropdowns handle content wider than their
      triggers, and how we can control wrapping behavior with CSS variables.
    </p>

    <!-- Test 1: Narrow Trigger, Short Options -->
    <section data-testid="test-narrow-trigger">
      <h3>Test 1: Narrow Trigger with Short Options</h3>
      <p>
        This should work fine - the dropdown expands to fit the content without
        wrapping.
      </p>
      <div
        style="max-width: 80px; border: 1px solid var(--primary-fg); padding: 1em;"
      >
        <FormItem>
          {#snippet label()}Pick:{/snippet}
          <Select bind:value={selectValue1}>
            {#each shortOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </Select>
        </FormItem>
      </div>
    </section>

    <!-- Test 2: Narrow Trigger, Wide Options (Default Wrap) -->
    <section data-testid="test-default-wrap">
      <h3>Test 2: Narrow Trigger with Wide Options (Default Wrapping)</h3>
      <p>
        These options are wider than the trigger. Currently they will wrap to
        fit the window. We want to test if we can make them stay on one line
        with ellipsis.
      </p>
      <div
        style="max-width: 100px; border: 1px solid var(--primary-fg); padding: 1em;"
      >
        <FormItem>
          {#snippet label()}Long:{/snippet}
          <Select bind:value={selectValue2}>
            {#each wideOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </Select>
        </FormItem>
      </div>
    </section>

    <!-- Test 3: Narrow Trigger, Lorem Options (Max-Content Mode) -->
    <section data-testid="test-max-content">
      <h3>
        Test 3: Narrow Trigger with Lorem Options (Max-Content / No Wrap Mode)
      </h3>
      <p>
        Same as Test 2, but with a CSS variable to prevent wrapping and use
        ellipsis instead.
      </p>
      <div
        style="max-width: 100px; border: 1px solid var(--primary-fg); padding: 1em; --dropdown-wrap-mode: nowrap;"
      >
        <FormItem>
          {#snippet label()}Lorem:{/snippet}
          <Select bind:value={selectValue3}>
            {#each loremOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </Select>
        </FormItem>
      </div>
    </section>

    <!-- Test 4: Custom Dropdown with Wrap Mode Toggle -->
    <section data-testid="test-wrap-mode-toggle">
      <h3>Test 4: Custom Dropdown with Wrap Mode Control</h3>
      <p>
        Toggle between wrap and nowrap modes to see the difference in how long
        text is handled.
      </p>

      <div style="margin-bottom: 2em;">
        <label>
          Wrap Mode:
          <select bind:value={dropdownMode}>
            <option value="wrap">Wrap (Default)</option>
            <option value="nowrap">No Wrap (Ellipsis)</option>
          </select>
        </label>
      </div>

      <div
        style="max-width: 120px; border: 1px solid var(--primary-fg); padding: 1em; --dropdown-wrap-mode: {dropdownMode};"
      >
        <DropdownMenu>
          {#snippet label()}Menu{/snippet}
          <li data-testid="item-1">
            <button type="button">This is a very long menu item</button>
          </li>
          <li data-testid="item-2">
            <button type="button">Another extremely long option here</button>
          </li>
          <li data-testid="item-3">
            <button type="button"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit</button
            >
          </li>
        </DropdownMenu>
      </div>
    </section>

    <!-- Test 5: Extremely Long Single Line -->
    <section data-testid="test-extreme-length">
      <h3>Test 5: Extremely Long Content (Edge Case)</h3>
      <p>
        What happens with truly extreme content? With nowrap mode, it should use
        ellipsis. With wrap mode, it should wrap to viewport.
      </p>

      <div style="margin-bottom: 2em;">
        <label>
          Extreme Wrap Mode:
          <select bind:value={dropdownMode}>
            <option value="wrap">Wrap (Default)</option>
            <option value="nowrap">No Wrap (Ellipsis)</option>
          </select>
        </label>
      </div>

      <div
        style="max-width: 150px; border: 1px solid var(--primary-fg); padding: 1em; --dropdown-wrap-mode: {dropdownMode};"
      >
        <DropdownMenu>
          {#snippet label()}Ex{/snippet}
          <li>
            <button type="button">
              The quick brown fox jumps over the lazy dog and continues to
              discuss the meaning of life, the universe, and everything with
              great enthusiasm and passion
            </button>
          </li>
          <li>
            <button type="button">
              Abracadabra this is an incredibly long string that keeps going and
              going and going without any natural stopping points whatsoever
            </button>
          </li>
        </DropdownMenu>
      </div>
    </section>

    <section data-testid="visual-notes">
      <h3>Visual Notes</h3>
      <ul>
        <li>Each section has a bordered container showing the trigger width</li>
        <li>
          Look at the dropdown popover to see if content wraps or uses ellipsis
        </li>
        <li>
          The <code>--dropdown-wrap-mode</code> CSS variable controls the behavior
        </li>
        <li>
          <code>nowrap</code> should use <code>white-space: nowrap</code> and
          <code>text-overflow: ellipsis</code>
        </li>
        <li>
          <code>wrap</code> (default) allows natural wrapping and expands as needed
        </li>
      </ul>
    </section>
  </TextLayout>
</Page>

<style>
  section {
    margin-bottom: 3em;
    padding-bottom: 2em;
    border-bottom: 1px solid var(--primary-fg, #ccc);
  }

  code {
    background-color: var(--secondary-bg, #f5f5f5);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: monospace;
  }

  ul {
    margin-left: 1.5em;
  }
</style>
