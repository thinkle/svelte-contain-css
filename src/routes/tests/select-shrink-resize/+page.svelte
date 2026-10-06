<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Option from "$lib/controls/Option.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Page from "$lib/layout/Page.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let value = $state("a");
  let optionValues = $state(["a", "b", "c", "d"]);
</script>

<Page>
  <TextLayout>
    <h2>Select whose option list shrinks (Regression)</h2>
    <p>
      Select measures every option's width through a `bind:this` array that is
      populated by index from the rendered option list. Removing options used
      to leave that array describing more options than actually exist, so the
      very next update -- another shrink, a rename, anything -- crashed
      reading the stale, already-removed entries.
    </p>

    <div data-testid="shrink-select">
      <Select bind:value>
        {#each optionValues as v}
          <Option value={v}>{v.toUpperCase()} Block</Option>
        {/each}
      </Select>
    </div>

    <Button
      data-testid="shrink"
      onclick={() => (optionValues = optionValues.slice(0, 2))}
    >
      Remove options C and D
    </Button>
    <Button
      data-testid="shrink-more"
      onclick={() => (optionValues = optionValues.slice(0, 1))}
    >
      Remove option B too
    </Button>
  </TextLayout>
</Page>
