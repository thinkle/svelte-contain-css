<script lang="ts">
  import type { Snippet } from "svelte";
  import { Text, Container, Stack, Inline, Button, Slider, Tag } from "$lib";
  import DemoWithCode from "./DemoWithCode.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let dark: boolean = $state(false);
  let amount: number = $state(50);
  const bg = $derived(dark ? "#18212f" : "#ffffff");
  const fg = $derived(dark ? "#eef2f8" : "#202b3c");
  const nestedBg = $derived(dark ? "#ffffff" : "#18212f");
  const nestedFg = $derived(dark ? "#202b3c" : "#eef2f8");
</script>

{#snippet surface(children: Snippet)}
  <Container {bg} {fg} padding="1.5rem" margin="0">
    {@render children()}
  </Container>
{/snippet}

<TextLayout>
  <h1>&lt;Text&gt; with a little meaning.</h1>
  <p>
    Keep the <Text bold success>surface</Text>. Change the <Text bold danger
      >tone</Text
    >.
  </p>
</TextLayout>

<Inline wrap="wrap" gap="1rem">
  <Button onclick={() => (dark = !dark)} aria-pressed={dark}>
    {dark ? "Switch to light" : "Switch to dark"}
  </Button>
  <Text muted
    >Change the baseline background and foreground of every preview.</Text
  >
</Inline>
<div>
  <DemoWithCode
    code={`<p>Ordinary text. <Text muted>Supporting details.</Text></p>`}
  >
    {#snippet heading()}<h2>Supporting details</h2>{/snippet}
    {#snippet blurb()}<p>
        Muted text steps back without introducing a new surface.
      </p>{/snippet}
    {#snippet children()}
      {#snippet content()}
        <p>Ordinary text. <Text muted>Supporting details.</Text></p>
      {/snippet}
      {@render surface(content)}
    {/snippet}
  </DemoWithCode>
</div>
<div>
  <DemoWithCode
    code={`<Text primary>Primary</Text>
<Text secondary>Secondary</Text>
<Text info>3 new notes</Text>
<Text success>All changes saved</Text>
<Text warning>Review suggested</Text>
<Text danger>One item needs attention</Text>
<Text bold danger>Bolder Danger</Text>
<Text italic success>Italic Success</Text>
`}
  >
    {#snippet heading()}<h2>A tone for each message</h2>{/snippet}
    {#snippet blurb()}<p>
        Choose a semantic flag; the text adapts to its surrounding surface.
      </p>
      <p>
        (We also support <code>bold</code> and <code>italic</code> flags for convenience)
      </p>
    {/snippet}
    {#snippet children()}
      {#snippet content()}
        <Inline wrap="wrap" gap="1.5rem">
          <Text primary>Primary</Text>
          <Text secondary>Secondary</Text>
          <Text info>3 new notes</Text>
          <Text success>All changes saved</Text>
          <Text warning>Review suggested</Text>
          <Text danger>One item needs attention</Text>
          <Text bold danger>Bolder Danger</Text>
          <Text italic success>Italic Success</Text>
        </Inline>
      {/snippet}
      {@render surface(content)}
    {/snippet}
  </DemoWithCode>
</div>
<div>
  <DemoWithCode
    code={`<Tag info>Info tag</Tag>
<Text info bold>Info text</Text>`}
  >
    {#snippet heading()}<h2>Text or a tag?</h2>{/snippet}
    {#snippet blurb()}<p>
        Tag paints its own surface. Text belongs to the surface around it.
      </p>{/snippet}
    {#snippet children()}
      {#snippet content()}
        <Inline wrap="wrap" gap="1rem"
          ><Tag info>Info tag</Tag><Text info bold>Info text</Text></Inline
        >
      {/snippet}
      {@render surface(content)}
    {/snippet}
  </DemoWithCode>
</div>
<div>
  <DemoWithCode
    code={`<Text color="#c6093b" amount="${amount}%">A custom raspberry accent.</Text>
<Text danger amount="${amount}%">The same amount works with danger.</Text>
<Text muted amount="${amount}%">Muted uses the same amount control.</Text>`}
  >
    {#snippet heading()}<h2>Dial in the tint</h2>{/snippet}
    {#snippet blurb()}<p>
        Choose how much target color to mix in. Source shows your selected
        amount as a fixed value.
      </p>{/snippet}
    {#snippet inputArea()}
      <label for="text-tint">Target color amount: {amount}%</label>
      <Slider id="text-tint" bind:value={amount} min={0} max={100} />
      <Text muted
        >0% keeps the foreground · 50% blends equally · 100% uses the target</Text
      >
    {/snippet}
    {#snippet children()}
      {#snippet content()}
        <Stack gap="1rem">
          <Text color="#c6093b" amount={`${amount}%`}
            >A custom raspberry accent.</Text
          >
          <Text danger amount={`${amount}%`}
            >The same amount works with danger.</Text
          >
          <Text muted amount={`${amount}%`}
            >Muted uses the same amount control.</Text
          >
        </Stack>
      {/snippet}
      {@render surface(content)}
    {/snippet}
  </DemoWithCode>
</div>
<div>
  <DemoWithCode
    code={`<Container bg="${bg}" fg="${fg}">
  <Text info>On the outer surface.</Text>
  <Container bg="${nestedBg}" fg="${nestedFg}">
    <Text info>On the nested surface.</Text>
    <Text muted>Quieter details follow along.</Text>
  </Container>
</Container>`}
  >
    {#snippet heading()}<h2>A different surface, nested inside</h2>{/snippet}
    {#snippet blurb()}<p>
        Each surface computes its own text tones. These explicit colors follow
        the light/dark switch.
      </p>{/snippet}
    {#snippet children()}
      {#snippet content()}
        <Text info><b>info</b> On the outer surface.</Text> (Vanilla text for comparison.)
        <Container bg={nestedBg} fg={nestedFg} padding="1.5rem" maxWidth="100%">
          <p><Text info><b>info</b> On the nested surface.</Text></p>
          <p>
            <Text muted><b>muted</b> Quieter details follow along.</Text>
          </p>
          <p>(Vanilla text for comparison.)</p>
        </Container>
      {/snippet}
      {@render surface(content)}
    {/snippet}
  </DemoWithCode>
</div>
<div>
  <DemoWithCode
    code={`<span style="color: var(--info-text-fg)">Additional context.</span>
<span style="color: var(--muted-text-fg)">Supporting details.</span>`}
  >
    {#snippet heading()}<h2>The CSS shortcuts</h2>{/snippet}
    {#snippet blurb()}<p>
        Every tone exposes --slug-text-fg, including --muted-text-fg. Prefer
        Text for everyday markup.
      </p>{/snippet}
    {#snippet children()}
      {#snippet content()}
        <Stack gap="1rem">
          <span style="color: var(--info-text-fg)">Additional context.</span>
          <span style="color: var(--muted-text-fg)">Supporting details.</span>
        </Stack>
      {/snippet}
      {@render surface(content)}
    {/snippet}
  </DemoWithCode>
</div>
<TextLayout>
  <p>
    Semantic and custom colors default to 50%; muted defaults to 20% background.
    Stronger tints can reduce contrast. Check the surfaces you use.
  </p>
</TextLayout>
