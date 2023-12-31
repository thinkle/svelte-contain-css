<script>
  import Container from "$lib/layout/Container.svelte";
  import Card from "$lib/Card.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Input from "$lib/controls/Input.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Code from "$lib/misc/Code.svelte";
  let leftWidth = "2fr";
  let rightWidth = "1fr";
  let rerender = 0;
</script>

<Container maxWidth="90%">
  <h2>Split Pane</h2>
  <p>
    The <code>&lt;SplitPane&gt</code> component makes it simple to create divided
    content in resizable panes. Users can set the initial size by passing left and
    right widths as props.
  </p>
  <p>
    A min-size prop determines when the pane will "snap" to closed instead of
    shrunken.
  </p>
  <p>
    Finally, panes automatically stack when placed in a small enough component.
  </p>
  <FormItem>
    <span slot="label">leftWidth</span>
    <Input bind:value={leftWidth} />
  </FormItem>
  <FormItem>
    <span slot="label">rightWidth</span>
    <Input bind:value={rightWidth} />
  </FormItem>
  <FormItem>
    <Button on:click={() => rerender++}>Rerender Pane</Button>
  </FormItem>
  {#key rerender}
    <SplitPane {leftWidth} {rightWidth}>
      <div slot="left">
        These panes are rendered with:
        <Code
          code={`
<SplitPane leftWidth={${leftWidth}} rightWidth={${rightWidth}}>
  <div slot="left">...</div>
  <div slot="right">...</div>
</SplitPane>
            `}
        />
      </div>
      <div slot="right">
        Oh how amazing there is also content on the right.

        <Card>
          <div slot="header"><h3>A Card!</h3></div>
          Here is a card so we can we can see responsive behavior as the container
          changes.
        </Card>
      </div>
    </SplitPane>
  {/key}
  <h2>Responsive</h2>
  <p>
    Below are some nested split panes so you can see how they behave
    responsively.
  </p>
  <SplitPane border="1px solid blue">
    <div slot="left">Stretch to change pane on the right</div>
    <div slot="right">
      <SplitPane border="1px solid yellow">
        <div slot="left">Inner left side</div>
        <div slot="right">Inner right side</div>
      </SplitPane>
    </div>
  </SplitPane>
</Container>
