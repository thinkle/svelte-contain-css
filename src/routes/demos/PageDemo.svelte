<script>
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Container from "$lib/layout/Container.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TypographyDemo from "./TypographyDemo.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  let hasHeader = true;
  let hasFooter = true;
  let side = "left";
  const headerCode = `
    <Bar slot="header">...</Bar>`;
  const footerCode = `
    <Bar slot="footer" marginBottom="0">...</Bar>`;
  const sidebarCode = `
    <Sidebar slot="sidebar">...</Sidebar>`;
  $: code = `
  <Page${side == "right" ? " right" : ""}>${hasHeader ? headerCode : ""}${
    hasFooter ? footerCode : ""
  }${
    side != "none"
      ? `
    <Sidebar slot="sidebar" ${
      (side == "right" && 'right"') || ""
    }>...</Sidebar>`
      : ""
  }
    <div>Page content here</div>
  </Page>
  `;
</script>

<Container>
  <TextLayout>
    <h2>Page</h2>
    <p>
      The <code>&lt;Page&gt;</code> component providers a simple full screen layout,
      designed to be used with header/footer/sidebar or not.
    </p>
    <p>
      The page defaults to full width and 100vh, but can take width and height
      properties to constrain it, as in the embedded demo page below.
    </p>
  </TextLayout>
  <Page
    --page-border="3px solid #eee"
    right={side === "right"}
    hideHeader={!hasHeader}
    hideFooter={!hasFooter}
    hideSidebar={side == "none"}
    width="100%"
    height="800px"
  >
    <Bar slot="header">
      <div>Header</div>
      <div>Header</div>
      <div>Header</div>
    </Bar>

    <Bar slot="footer" marginBottom="0">
      <div>Footer</div>
      <div>Footer</div>
      <div>Footer</div>
    </Bar>

    <Sidebar slot="sidebar" right={side == "right"}>
      <div>Sidebar</div>
      <div>Sidebar</div>
      <div>Sidebar</div>
    </Sidebar>

    <main>
      <Container>
        <div>
          <h3>Slot Options</h3>
          <MenuList>
            <li><Checkbox bind:checked={hasHeader}>Header</Checkbox></li>
            <li><Checkbox bind:checked={hasFooter}>Footer</Checkbox></li>
            <li>
              <div>
                <RadioButton bind:group={side} value="left"
                  >Left Sidebar</RadioButton
                >
              </div>
              <div>
                <RadioButton bind:group={side} value="right"
                  >Right Sidebar</RadioButton
                >
              </div>
              <div>
                <RadioButton bind:group={side} value="none"
                  >No Sidebar</RadioButton
                >
              </div>
            </li>
          </MenuList>
        </div>
        <Code {code} />
      </Container>
    </main>
  </Page>
</Container>
