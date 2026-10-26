<script lang="ts">
  // Fixtures for tests/fields.spec.ts: a field must be findable on whatever
  // surface it lands on, with no theme at all.
  import "$lib/vars/defaults.css";
  import {
    Bar,
    Card,
    Container,
    Form,
    FormItem,
    Input,
    MenuList,
    Option,
    Select,
    Sidebar,
    Slider,
    TextArea,
    Tile,
  } from "$lib";
</script>

<div data-testid="page"><Input value="on the page" /></div>
<Container data-testid="container"><Input value="on a container" /></Container>
<Card data-testid="card"><Input value="on a card" /></Card>
<Tile data-testid="dark" bg="rgb(30, 34, 44)" fg="rgb(235, 235, 235)"><Input value="on a dark tile" /></Tile>
<Bar primary data-testid="bar"><Input value="on a primary bar" /></Bar>
<Container data-testid="select"><Select value="One"><Option value="One">One</Option><Option value="Two">Two</Option></Select></Container>

<!-- Knobs: a pinned fill and edge, an explicit shorthand, the underline preset. -->
<Container data-testid="pinned" style="--field-bg: rgb(255, 255, 255); --field-border-color: rgb(0, 0, 200);">
  <Input value="pinned" />
</Container>
<Container data-testid="shorthand" style="--input-border: 2px dashed rgb(200, 0, 0);">
  <Input value="shorthand" />
</Container>
<Container data-testid="well" style="--field-lighten: 0; --field-fill-amount: 6%;">
  <Input value="darker well" />
</Container>
<Container data-testid="radius" style="--border-radius: 12px; --field-square-radius: 0;">
  <Input value="square" /><TextArea value="square" />
  <Select value="One"><Option value="One">One</Option></Select>
</Container>
<Container data-testid="underline" style="--field-border-top: none; --field-border-inline: none;">
  <Input value="underline" />
</Container>

<!-- A textarea is a field; a slider under globalInputStyles is not. -->
<Container data-testid="textarea"><TextArea value="many lines" /></Container>
<Container data-testid="global"><Form globalInputStyles>
  <FormItem><input value="native text" /></FormItem>
  <FormItem><Slider value={40} /></FormItem>
  <FormItem><TextArea /></FormItem>
</Form></Container>

<!-- A MenuList takes the surface it sits on. -->
<div data-testid="sidebar" style="display: flex; height: 8rem; container-type: inline-size;">
  <Sidebar><MenuList><li><button>Item</button></li></MenuList></Sidebar>
</div>
