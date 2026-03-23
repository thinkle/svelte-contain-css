<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Card from "$lib/Card.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
</script>

<Container>
  <TextLayout>
    <h2>Stack</h2>
    <p>
      <code>&lt;Stack&gt;</code> is the generic vertical layout helper. Use it
      for sections, form groupings, and card internals where a simple vertical
      rhythm container is clearer than custom flex CSS.
    </p>
  </TextLayout>

  <Card>
    <Stack>
      <h3>Release Notes</h3>
      <p>
        Stack keeps related content in a vertical rhythm without inventing a
        card-specific wrapper every time.
      </p>
      <Inline>
        <Button secondary>Preview</Button>
        <Button primary>Publish</Button>
      </Inline>
    </Stack>
  </Card>

  <Code
    code={`<Stack>
  <h3>Release Notes</h3>
  <p>Stack keeps related content in vertical rhythm.</p>
  <Inline>
    <Button secondary>Preview</Button>
    <Button primary>Publish</Button>
  </Inline>
</Stack>`}
  />
</Container>
