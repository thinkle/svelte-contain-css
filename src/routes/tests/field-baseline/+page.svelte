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
  </TextLayout>
</Page>
