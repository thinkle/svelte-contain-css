<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Input from "$lib/controls/Input.svelte";
  import Option from "$lib/controls/Option.svelte";
  import Select from "$lib/controls/Select.svelte";
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Page from "$lib/layout/Page.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let value = $state("any");
  let term = $state("FY");
  const fieldReset = {
    "--input-margin-top": "0",
    "--input-margin-bottom": "0",
    "--select-margin-top": "0",
    "--menu-margin-top": "0",
  };
  const variants = [
    { id: "normal", font: "Arial, sans-serif", size: "16px", line: "normal", padding: "8px" },
    { id: "airy", font: "Arial, sans-serif", size: "20px", line: "1.5", padding: "12px" },
    { id: "updraft", font: "Arial, sans-serif", size: "20px", line: "1.8", padding: "8px" },
    { id: "large", font: "Georgia, serif", size: "24px", line: "1.2", padding: "8px 12px" },
    { id: "dense", font: "Arial, sans-serif", size: "14px", line: "1.2", padding: "4px 8px" },
  ];
</script>

<Page>
  <TextLayout>
    <h2>Fields on a shared baseline (Regression)</h2>
    <p>
      A filter bar is usually an <code>Inline align="baseline"</code> of an
      Input, a Select and some text. The Select's trigger used to report its
      baseline at the bottom of its label instead of at the text, because the
      label clips with <code>overflow: hidden</code>, so the Select rode a
      few pixels above the Input beside it.
    </p>

    <Inline align="baseline" data-testid="row">
      <Input placeholder="Search students…" data-testid="input" />
      <Select bind:value data-testid="select">
        <Option value="any">Any status</Option>
        <Option value="hold">Hold</Option>
      </Select>
      <DropdownMenu>
        {#snippet label()}Actions{/snippet}
        <li><button type="button">Copy</button></li>
      </DropdownMenu>
      <Button>Check now</Button>
      <span data-testid="text">76 of 76 students</span>
    </Inline>

    <h3>A trigger narrower than its label still truncates</h3>
    <div style="width: 7em" data-testid="narrow">
      <DropdownMenu>
        {#snippet label()}A label far too long for its box{/snippet}
        <li><button type="button">Copy</button></li>
      </DropdownMenu>
    </div>

    <h3>Section-filter shape: a short term beside a search field</h3>
    <p>Keep baseline alignment: font and field-padding changes must not lift the Select.</p>
    {#each variants as variant}
      <div style="--ui-font-family: {variant.font}; --ui-font-size: {variant.size}; --ui-line-height: {variant.line}; --input-padding: {variant.padding}; --select-padding: {variant.padding}; --input-width: 240px; --select-width: 200px;">
        <Inline align="baseline" justify="space-between" padding="0" gap="8px" {...fieldReset} data-testid="filter-{variant.id}">
          <strong>View students</strong>
          <Select bind:value={term} aria-label="Term {variant.id}">
            <option value="All">All Terms</option>
            <option value="FY">FY</option>
            <option value="S1">S1</option>
          </Select>
          <Input placeholder="Search sections or rosters..." />
        </Inline>
      </div>
    {/each}

    <div style="--select-width: 140px; width: 140px" data-testid="narrow-select">
      <Select value="long" aria-label="Long selected term">
        <option value="long">A very long selected term that must truncate before the arrow</option>
      </Select>
    </div>
  </TextLayout>
</Page>
