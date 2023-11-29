<script>
  import TabItem from "$lib/controls/TabItem.svelte";
  import TabBar from "$lib/layout/TabBar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";

  let active = "TabItem";
  let items = [
    { label: "TabItem", value: "TabItem" },
    { label: "TabBar", value: "TabBar" },
    { label: "Containers & Tabs", value: "containers" },
    { label: "Overrides", value: "vars" },
  ];
</script>

<Container>
  <TabBar
    {items}
    {active}
    on:change={(e) => {
      console.log(e);
      active = e.detail.value;
    }}
  ></TabBar>
  <Container>
    {#if active == "TabItem"}
      <h3>TabItem</h3>
      <p>TabItem is basically syntactic sugar for a special button.</p>
      <p>We provide an active= property to set it to active or not.</p>
      <p>
        TabItem then overrides some of the button variables with tab variables
        which have their own defaults, specifically:
      </p>
      <ul>
        <li>
          Button radius (defaults to rounded tops)
          <ul>
            <li>tab-border-bottom-right-radius</li>
            <li>tab-border-top-right-radius</li>
            <li>tab-border-bottom-left-radius</li>
            <li>tab-border-top-left-radius</li>
          </ul>
        </li>
        <li>
          Button margin (default to 0 so we snuggle against a bar).
          <br />tab-margin
        </li>
      </ul>
      <Code code={``} />
    {:else if active == "TabBar"}
      <h3>TabBar</h3>
      <p>
        We provide a custom TabBar component which is just syntactic sugar for a
        bar with justify set to flex-start and alignment set to flex-end for
        tabs. We also remove padding and borders for a "tab-like" look.
      </p>
      <p>
        TabBar also accepts an items prop, which can be either a list of strings
        of a list of objects with label and value props, and it will then emit a
        "change" event which can be listened for to get the currently active
        tab.
      </p>
      <Code code={`   
      <TabBar
        items={[{label: "Foo", value: "foo"}, {label: "Bar", value: "bar"}]}
        {active}
        on:change={(e) => {          
          active = e.detail.value;
        }}
        />
      `}/>

      <p>
        Or you can ignore the active and items props and just use TabBar as a
        dumb container letting you implement your own tab logic.
      </p>
      <Code code={`
      <TabBar>
        <TabItem>Foo</TabItem>
        <TabItem active>Bar</TabItem>
        <TabItem>Baz</TabItem>
      </TabBar>
      `}/>
    {:else if active == "containers"}
      I recommend nestling the tab bar and content inside container components.
    {:else if active == "vars"}
      Here's some example variables to mess with.
    {:else}
      ???
    {/if}
  </Container>
</Container>
