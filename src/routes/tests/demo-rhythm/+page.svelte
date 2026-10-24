<script lang="ts">
  // Docs captions inherit start alignment, while the preview shows the
  // library's centered TextLayout default. Source stays live while visible.
  import "$lib/vars/defaults.css";
  import { Container, Slider, TextLayout } from "$lib";
  import DemoWithCode from "../../demos/DemoWithCode.svelte";
  let padding = $state(12);
</script>

<div style="--prose-margin-inline: 0;">
  <DemoWithCode defaultTab="source" markupSource={`<Container padding="${padding}px">
  <TextLayout --line-width="10rem"><p>Preview text</p></TextLayout>
</Container>`}>
    {#snippet header()}<h3>Changing the preview</h3>{/snippet}
    {#snippet blurb()}<p>Caption text stays aligned with the example.</p>{/snippet}
    {#snippet inputArea()}
      <Slider aria-label="Preview padding" bind:value={padding} min={8} max={32} />
    {/snippet}
    <Container padding="{padding}px">
      <TextLayout id="preview-text" --line-width="10rem"><p>Preview text</p></TextLayout>
    </Container>
  </DemoWithCode>
</div>
