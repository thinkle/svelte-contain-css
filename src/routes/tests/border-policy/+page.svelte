<script lang="ts">
  // A global border used to outline every nested layout helper. Explicit
  // component borders must still work, and corner geometry is independent.
  import "$lib/vars/defaults.css";
  import { Inline, Stack, Button, ButtonLink, Input, Container, Tile, Card, Fieldset } from "$lib";
</script>

<div id="theme">
  <Stack data-testid="stack">
    <Inline data-testid="inline"><span>Layout content</span></Inline>
    <Button data-testid="button">Button</Button>
    <ButtonLink data-testid="button-link" href="#">Link</ButtonLink>
    <Input data-testid="input" aria-label="Input" />
    <Container data-testid="container">Surface</Container>
    <Container border data-testid="bordered-container">Bordered surface</Container>
    <Fieldset data-testid="fieldset">Fields</Fieldset>
    <Tile data-testid="tile">Tile</Tile>
    <Card><Inline data-testid="nested-inline">Inside a card</Inline></Card>
  </Stack>
</div>
