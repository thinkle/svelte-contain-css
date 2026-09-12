<script lang="ts">
  /*
    Fixture for tests/attribute-passthrough.spec.ts.

    Every component that takes attributes renders here with the same set:
    a `class`, a `style`, a `data-testid`, an `id` and an `aria-label`, plus a
    style prop where it has one. The spec then asserts the pass-through
    contract generically -- it reads what to check off the `data-probe`
    wrappers rather than hardcoding a list, so a component added here is
    covered without touching the spec.

    data-probe      component name, and the suffix of its data-testid
    data-root-class the library class its root must still carry
    data-split      set when attributes land on a different element than the
                    class and style do (wrapper + control components)
  */
  import {
    Accordion, Bar, Button, ButtonLink, Card, Checkbox, CircleButton,
    Column, ColumnContainer, Columns, Container, DataList, DataListItem,
    DropdownMenu, Fieldset, Form, FormItem, GridLayout, GridRow, Hero,
    Inline, Input, MenuList, MiniButton, Option, Page, Progress, RadioButton,
    Row, RowContainer, Select, Slider, SplitPane, Stack, TabBar, TabItem,
    Table, Tag, Text, TextLayout, Tile, Toggle, Tooltip,
  } from "$lib";

  // A declaration no component sets itself, so finding it proves the caller's
  // style survived; and a variable-backed prop to prove vars survived with it.
  const STYLE = "outline-color: rgb(1, 2, 3);";
</script>

<div data-probe="Tag" data-root-class="tag">
  <Tag data-testid="probe-Tag" id="id-Tag" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Tag</Tag>
</div>
<div data-probe="Button" data-root-class="">
  <Button data-testid="probe-Button" id="id-Button" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Button</Button>
</div>
<div data-probe="CircleButton" data-root-class="">
  <CircleButton data-testid="probe-CircleButton" id="id-CircleButton" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">x</CircleButton>
</div>
<div data-probe="MiniButton" data-root-class="">
  <MiniButton data-testid="probe-MiniButton" id="id-MiniButton" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">x</MiniButton>
</div>
<div data-probe="ButtonLink" data-root-class="">
  <ButtonLink data-testid="probe-ButtonLink" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">link</ButtonLink>
</div>
<div data-probe="Input" data-root-class="">
  <Input data-testid="probe-Input" id="id-Input" aria-label="probe" class="probe-class" style={STYLE} />
</div>
<div data-probe="Slider" data-root-class="slider">
  <Slider data-testid="probe-Slider" id="id-Slider" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)" />
</div>
<div data-probe="Select" data-root-class="">
  <Select data-testid="probe-Select" id="id-Select" aria-label="probe" class="probe-class" style={STYLE}>
    <Option value="a" data-testid="probe-Option" id="id-Option" class="probe-class" style={STYLE}>A</Option>
  </Select>
</div>
<div data-probe="Checkbox" data-root-class="label-sizing-box" data-split="true">
  <Checkbox data-testid="probe-Checkbox" id="id-Checkbox" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Check</Checkbox>
</div>
<div data-probe="Toggle" data-root-class="toggle" data-split="true">
  <Toggle data-testid="probe-Toggle" id="id-Toggle" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Toggle</Toggle>
</div>
<div data-probe="RadioButton" data-root-class="label-sizing-box" data-split="true">
  <RadioButton data-testid="probe-RadioButton" id="id-RadioButton" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Radio</RadioButton>
</div>
<div data-probe="TabItem" data-root-class="">
  <TabItem data-testid="probe-TabItem" id="id-TabItem" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Tab</TabItem>
</div>
<div data-probe="TabBar" data-root-class="tabs">
  <TabBar data-testid="probe-TabBar" id="id-TabBar" aria-label="probe" class="probe-class" style={STYLE} items={["a"]} />
</div>
<div data-probe="Card" data-root-class="card">
  <Card data-testid="probe-Card" id="id-Card" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Card</Card>
</div>
<div data-probe="Container" data-root-class="">
  <Container data-testid="probe-Container" id="id-Container" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Container</Container>
</div>
<div data-probe="Bar" data-root-class="bar">
  <Bar data-testid="probe-Bar" id="id-Bar" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Bar</Bar>
</div>
<div data-probe="Stack" data-root-class="stack">
  <Stack data-testid="probe-Stack" id="id-Stack" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Stack</Stack>
</div>
<div data-probe="Inline" data-root-class="inline">
  <Inline data-testid="probe-Inline" id="id-Inline" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Inline</Inline>
</div>
<div data-probe="Columns" data-root-class="columns">
  <Columns data-testid="probe-Columns" id="id-Columns" aria-label="probe" class="probe-class" style={STYLE}>Columns</Columns>
</div>
<div data-probe="ColumnContainer" data-root-class="column-container">
  <ColumnContainer data-testid="probe-ColumnContainer" id="id-ColumnContainer" aria-label="probe" class="probe-class" style={STYLE}>Col</ColumnContainer>
</div>
<div data-probe="Column" data-root-class="column-container">
  <Column data-testid="probe-Column" id="id-Column" aria-label="probe" class="probe-class" style={STYLE}>Col</Column>
</div>
<div data-probe="RowContainer" data-root-class="row-container">
  <RowContainer data-testid="probe-RowContainer" id="id-RowContainer" aria-label="probe" class="probe-class" style={STYLE}>Row</RowContainer>
</div>
<div data-probe="Row" data-root-class="row-container">
  <Row data-testid="probe-Row" id="id-Row" aria-label="probe" class="probe-class" style={STYLE}>Row</Row>
</div>
<div data-probe="GridLayout" data-root-class="grid-layout">
  <GridLayout data-testid="probe-GridLayout" id="id-GridLayout" aria-label="probe" class="probe-class" style={STYLE}>Grid</GridLayout>
</div>
<div data-probe="GridRow" data-root-class="grid-row">
  <GridRow data-testid="probe-GridRow" id="id-GridRow" aria-label="probe" class="probe-class" style={STYLE}>GridRow</GridRow>
</div>
<div data-probe="Hero" data-root-class="hero">
  <Hero data-testid="probe-Hero" id="id-Hero" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Hero</Hero>
</div>
<div data-probe="MenuList" data-root-class="menu">
  <MenuList data-testid="probe-MenuList" id="id-MenuList" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)"><li>a</li></MenuList>
</div>
<div data-probe="DataList" data-root-class="data-list">
  <DataList data-testid="probe-DataList" id="id-DataList" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">
    <DataListItem data-testid="probe-DataListItem" id="id-DataListItem" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Item</DataListItem>
  </DataList>
</div>
<div data-probe="Tile" data-root-class="tile">
  <Tile data-testid="probe-Tile" id="id-Tile" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Tile</Tile>
</div>
<div data-probe="Accordion" data-root-class="accordion-wrapper">
  <Accordion data-testid="probe-Accordion" id="id-Accordion" aria-label="probe" class="probe-class" style={STYLE}><details><summary>s</summary>b</details></Accordion>
</div>
<div data-probe="SplitPane" data-root-class="split-pane">
  <SplitPane data-testid="probe-SplitPane" id="id-SplitPane" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)" />
</div>
<div data-probe="Form" data-root-class="">
  <Form data-testid="probe-Form" id="id-Form" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">
    <FormItem data-testid="probe-FormItem" id="id-FormItem" class="probe-class" style={STYLE}>x</FormItem>
  </Form>
</div>
<div data-probe="Fieldset" data-root-class="">
  <Fieldset data-testid="probe-Fieldset" id="id-Fieldset" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Fields</Fieldset>
</div>
<div data-probe="Text" data-root-class="">
  <Text data-testid="probe-Text" id="id-Text" aria-label="probe" class="probe-class" style={STYLE}>Text</Text>
</div>
<div data-probe="TextLayout" data-root-class="">
  <TextLayout data-testid="probe-TextLayout" class="probe-class" style={STYLE}>Layout</TextLayout>
</div>
<div data-probe="Progress" data-root-class="progress-container">
  <Progress data-testid="probe-Progress" id="id-Progress" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)" value={50} />
</div>
<div data-probe="Tooltip" data-root-class="tooltip-wrapper">
  <Tooltip data-testid="probe-Tooltip" id="id-Tooltip" aria-label="probe" class="probe-class" style={STYLE} tooltipText="t">hover</Tooltip>
</div>
<div data-probe="DropdownMenu" data-root-class="dropdown-menu">
  <DropdownMenu data-testid="probe-DropdownMenu" id="id-DropdownMenu" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">
    <li>item</li>
  </DropdownMenu>
</div>
<div data-probe="Page" data-root-class="page">
  <Page data-testid="probe-Page" id="id-Page" aria-label="probe" class="probe-class" style={STYLE} bg="rgb(4, 5, 6)">Page</Page>
</div>
