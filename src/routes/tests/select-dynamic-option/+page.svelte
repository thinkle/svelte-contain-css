<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Option from "$lib/controls/Option.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Page from "$lib/layout/Page.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let value = $state("b");
  let secondLabel = $state("C Block");
</script>

<Page>
  <TextLayout>
    <h2>Select with an Option rewritten in place (Regression)</h2>
    <p>
      Renaming an option changes its content without adding or removing any
      option. The styled dropdown used to keep the snapshot it took on mount,
      so it went on showing the old label.
    </p>

    <div data-testid="dynamic-select">
      <Select bind:value>
        <Option value="a"><b>A Block</b> Science</Option>
        <Option value="b"><b>{secondLabel}</b> Science</Option>
      </Select>
    </div>

    <Button
      data-testid="rename"
      onclick={() => (secondLabel = "D Block")}
    >
      Rename to D Block
    </Button>
  </TextLayout>
</Page>
