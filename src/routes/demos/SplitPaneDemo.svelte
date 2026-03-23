<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Input from "$lib/controls/Input.svelte";
  import Card from "$lib/Card.svelte";
  import Container from "$lib/layout/Container.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let leftWidth = $state("2fr");
  let rightWidth = $state("1fr");
  let rerender = $state(0);
</script>

<Container maxWidth="90%">
  <TextLayout>
    <h2>Split Pane</h2>
    <p>
      <code>&lt;SplitPane&gt;</code> gives you resizable panes with slot-based left
      and right content.
    </p>
  </TextLayout>

  <DemoWithCode
    code={`<SplitPane leftWidth={leftWidth} rightWidth={rightWidth}>
  {#snippet left()}
    <div>...</div>
  {/snippet}
  {#snippet right()}
    <div>...</div>
  {/snippet}
</SplitPane>`}
  >
    {#snippet inputArea()}
      <FormItem>
        {#snippet label()}
          <span>leftWidth</span>
        {/snippet}
        <Input bind:value={leftWidth} />
      </FormItem>
      <FormItem>
        {#snippet label()}
          <span>rightWidth</span>
        {/snippet}
        <Input bind:value={rightWidth} />
      </FormItem>
      <Button onclick={() => rerender++}>Rerender Pane</Button>
    {/snippet}

    {#key rerender}
      <SplitPane {leftWidth} {rightWidth}>
        {#snippet left()}
          <div>
            These panes are rendered with the current widths.
          </div>
        {/snippet}
        {#snippet right()}
          <div>
            <Card>
              {#snippet header()}
                <div>
                  <h3>A Card</h3>
                </div>
              {/snippet}
              Here is a card so we can see responsive behavior as the container
              changes.
            </Card>
          </div>
        {/snippet}
      </SplitPane>
    {/key}
  </DemoWithCode>

  <DemoWithCode
    code={`<SplitPane border="1px solid blue">
  {#snippet left()}
    <div>Stretch to change pane on the right</div>
  {/snippet}
  {#snippet right()}
    <SplitPane border="1px solid yellow">
      {#snippet left()}
        <div>Inner left side</div>
      {/snippet}
      {#snippet right()}
        <div>Inner right side</div>
      {/snippet}
    </SplitPane>
  {/snippet}
</SplitPane>`}
  >
    {#snippet header()}
      <h2>Nested Panes</h2>
    {/snippet}
    <SplitPane border="1px solid blue">
      {#snippet left()}
        <div>Stretch to change pane on the right</div>
      {/snippet}
      {#snippet right()}
        <SplitPane border="1px solid yellow">
          {#snippet left()}
            <div>Inner left side</div>
          {/snippet}
          {#snippet right()}
            <div>Inner right side</div>
          {/snippet}
        </SplitPane>
      {/snippet}
    </SplitPane>
  </DemoWithCode>
</Container>
