<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
</script>

<Container>
  <TextLayout>
    <h2>Inline</h2>
    <p>
      <code>&lt;Inline&gt;</code> is the generic horizontal layout helper. Use it
      when you want a flex row with wrapping, gap, and optional split spacing
      without reaching for ad hoc inline styles.
    </p>
  </TextLayout>

  <h3>Simple grouping</h3>
  <Inline>
    <Tag success>Ready</Tag>
    <Tag info>Pilot</Tag>
    <Tag warning>Needs Review</Tag>
  </Inline>

  <Code
    code={`<Inline>
  <Tag success>Ready</Tag>
  <Tag info>Pilot</Tag>
  <Tag warning>Needs Review</Tag>
</Inline>`}
  />

  <h3>Inside a Bar</h3>
  <Bar>
    <Inline expand split>
      <Inline>
        <strong>Workspace</strong>
        <span>Launch plan</span>
      </Inline>
      <Inline justify="flex-end">
        <Button secondary>Share</Button>
        <Button primary>Publish</Button>
        <MiniButton aria-label="More actions">⋯</MiniButton>
      </Inline>
    </Inline>
  </Bar>

  <Code
    code={`<Bar>
  <Inline expand split>
    <Inline>
      <strong>Workspace</strong>
      <span>Launch plan</span>
    </Inline>
    <Inline justify="flex-end">
      <Button secondary>Share</Button>
      <Button primary>Publish</Button>
      <MiniButton aria-label="More actions">⋯</MiniButton>
    </Inline>
  </Inline>
</Bar>`}
  />
</Container>
