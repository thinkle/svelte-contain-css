<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";

  let useFill = $state(true);
  const fillAttr = $derived(useFill ? " fill" : "");
</script>

<TextLayout>
  <h2>Inline</h2>
  <p>
    <code>&lt;Inline&gt;</code> is the generic horizontal layout helper. Use it when
    you want a flex row with wrapping, gap, and optional split spacing without reaching
    for ad hoc inline styles.
  </p>
  <p>
    <code>fill</code> makes an Inline span the available row width.
    <code>stretch</code> makes it stretch across the parent cross-axis.
  </p>
</TextLayout>

<DemoWithCode
  defaultTab="split"
  code={`<Inline>
  <Tag success>Ready</Tag>
  <Tag info>Pilot</Tag>
  <Tag warning>Needs Review</Tag>
</Inline>`}
>
  {#snippet header()}
    <h3>Simple grouping</h3>
  {/snippet}
  <Inline>
    <Tag success>Ready</Tag>
    <Tag info>Pilot</Tag>
    <Tag warning>Needs Review</Tag>
  </Inline>
</DemoWithCode>

<DemoWithCode
  defaultTab="split"
  code={`<Bar>
  <strong>Workspace</strong>
  <Inline>
    <Button secondary>Share</Button>
    <Button primary>Publish</Button>
    <MiniButton aria-label="More actions">⋯</MiniButton>
  </Inline>
</Bar>`}
>
  {#snippet header()}
    <h3>Inside a Bar</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      <code>&lt;Bar&gt;</code> already handles the left/right distribution. Use
      <code>&lt;Inline&gt;</code> inside it only when a side needs grouped items.
    </p>
  {/snippet}
  <Bar>
    <strong>Workspace</strong>
    <Inline>
      <Button secondary>Share</Button>
      <Button primary>Publish</Button>
      <MiniButton aria-label="More actions">⋯</MiniButton>
    </Inline>
  </Bar>
</DemoWithCode>

<DemoWithCode
  code={`<div class="inline-preview">
  <Inline${fillAttr} split>
    <Tag info>Draft</Tag>
    <Button primary>Publish</Button>
  </Inline>
</div>`}
>
  {#snippet header()}
    <h3>Using fill</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      In normal document flow, a block-level flex container already spans the
      available width. This framed example uses a flex parent that allows the
      child to shrink, so toggling <code>fill</code> shows the real difference.
    </p>
  {/snippet}
  {#snippet inputArea()}
    <Checkbox bind:checked={useFill}>fill</Checkbox>
  {/snippet}
  <div class="inline-preview">
    <Inline fill={useFill} split>
      <Tag info>Draft</Tag>
      <Button primary>Publish</Button>
    </Inline>
  </div>
</DemoWithCode>

<style>
  .inline-preview {
    display: flex;
    align-items: flex-start;
    padding: var(--padding);
    border: 1px dashed color-mix(in srgb, var(--fg) 20%, transparent);
    border-radius: var(--border-radius);
    min-height: 5rem;
  }
</style>
