<script lang="ts">
  import Card from "$lib/Card.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Slider from "$lib/controls/Slider.svelte";

  let fixedHeight = $state(true);
  let cardWidth = $state(420);
  let cardHeight = $state(300);
  let responsiveType = $state(true);
  const typeVars = $derived(
    responsiveType ? "" : `\n  --card-font-size-slope="0"`,
  );
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import { cardVars } from "./cssVariableDefs";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Stack from "$lib/layout/Stack.svelte";
</script>

{#snippet infoCard()}
  <Card width="100%" --card-width-small="100%">
    {#snippet header()}
      <h3>Fall registration is open</h3>
    {/snippet}
    <p>
      Sign up by November 15 to keep your spot. Returning families can renew
      from the account page.
    </p>
    {#snippet footer()}
      <span>Updated October 21</span>
    {/snippet}
  </Card>
{/snippet}

<Container>
  <CssVariableDemo variables={cardVars}>
    <DemoWithCode
      height="400px"
      defaultTab="split"
      code={`
<Card fixedHeight center>
  I am a card.
</Card>`}
    >
      {#snippet blurb()}
        <h2>Cards</h2>
        <p>
          Cards usually come with some box-shadow, coloring, and so forth, and
          have responsive sizing out of the box.
        </p>
        <p>
          Cards will resize in response to their containers and can be used in a
          variety of layouts.
        </p>
      {/snippet}
      <Card fixedHeight center>I am a Card.</Card>
    </DemoWithCode>

    <DemoWithCode
      code={`<Card>
  {#snippet header()}
    <div>Card Header</div>
  {/snippet}
  <div>Card content here...</div>
  {#snippet footer()}
    <div>Card Footer</div>
  {/snippet}
</Card>`}
    >
      {#snippet blurb()}
        <p>
          Cards have optional header and footer sections that are visually
          separated from the content area. Use them to group metadata, actions,
          or related content.
        </p>
      {/snippet}
      <Card center>
        {#snippet header()}
          <div>Card Header</div>
        {/snippet}
        <h2>Card content here...</h2>
        <div>
          <img src="https://picsum.photos/400/200" alt="Random landscape" />
        </div>
        <p>Add as much content as you want</p>
        {#snippet footer()}
          <div>Card Footer</div>
        {/snippet}
      </Card>
    </DemoWithCode>

    <DemoWithCode
      code={`<SplitPane leftWidth="7em" rightWidth="2fr">
  {#snippet left()}
    <div>Resize.</div>
  {/snippet}
  {#snippet right()}
    <Card fixedHeight={${fixedHeight}} --text-align="center">
      <h1>Wow, so simple</h1>
      <p>Simplest possible card</p>
    </Card>
    <Card fixedHeight={${fixedHeight}}>
      {#snippet header()}
        <div>Card Header</div>
      {/snippet}
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque et mi orci.
      </div>
      {#snippet footer()}
        <div>Card foot</div>
      {/snippet}
    </Card>
  {/snippet}
</SplitPane>`}
    >
      {#snippet blurb()}
        <p>
          Toggle fixed-height mode and drag the divider: once the right pane is
          600px or narrower, the cards snap from 420px down to 250px (on a phone
          they fill the width instead).
        </p>
      {/snippet}
      {#snippet inputArea()}
        <Checkbox bind:checked={fixedHeight}>Fixed Height</Checkbox>
      {/snippet}
      <SplitPane leftWidth="7em" rightWidth="2fr">
        {#snippet left()}
          <div>Resize.</div>
        {/snippet}
        {#snippet right()}
          <div>
            <Card {fixedHeight} --text-align="center">
              <h1>Wow, so simple</h1>
              <p>Simplest possible card</p>
            </Card>
            <Card {fixedHeight}>
              {#snippet header()}
                <div>Card Header</div>
              {/snippet}
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque et mi orci.
              </div>
              {#snippet footer()}
                <div>Card foot</div>
              {/snippet}
            </Card>
          </div>
        {/snippet}
      </SplitPane>
    </DemoWithCode>
    <DemoWithCode
      code={`<Card center width="${cardWidth}px" height="${cardHeight}px"${typeVars}>
  {#snippet header()}
    <div>Card Header</div>
  {/snippet}
  <div>Resize the slider to see responsive typography and spacing kick in.</div>
  <div>${cardWidth}×${cardHeight}</div>
  {#snippet footer()}
    <div>Card Footer</div>
  {/snippet}
</Card>`}
    >
      {#snippet blurb()}
        <p>
          Cards have three responsive breakpoints based on their own width. Drag
          the slider to see padding tighten below 300px and loosen above 500px.
        </p>
        <p>
          Text follows the card's width too: a little smaller in a narrow card,
          larger in a wide one, never below <code>--font-size-min-text</code>
          (<code>--font-size-min-caption</code> for the footer), and not at all
          on a phone, where the card is the page. Turn it off with
          <code>--card-font-size-slope: 0</code>, or pin a size per tier with
          <code>--card-font-size-small</code> and
          <code>--card-font-size-large</code>.
        </p>
      {/snippet}
      {#snippet inputArea()}
        <label>
          Width: {cardWidth}px
          <Slider bind:value={cardWidth} min={200} max={800} />
        </label>
        <label>
          Height: {cardHeight}px
          <Slider bind:value={cardHeight} min={200} max={800} />
        </label>
        <Checkbox bind:checked={responsiveType}>Scale type with width</Checkbox>
      {/snippet}
      <div class:fixed-type={!responsiveType}>
        <Card center width="{cardWidth}px" height="{cardHeight}px">
          {#snippet header()}
            <div>Card Header</div>
          {/snippet}
          <div>
            Resize the slider to see responsive typography and spacing kick in.
          </div>
          <div>{cardWidth}&times;{cardHeight}</div>

          {#snippet footer()}
            <div>Card Footer</div>
          {/snippet}
        </Card>
      </div>
    </DemoWithCode>

    <DemoWithCode
      code={`<div class="wide-column">{@render infoCard()}</div>
<div class="with-sidebar">
  <aside>{@render infoCard()}</aside>
  <p>...the rest of the page...</p>
</div>

{#snippet infoCard()}
  <Card width="100%" --card-width-small="100%">
    {#snippet header()}
      <h3>Fall registration is open</h3>
    {/snippet}
    <p>Sign up by November 15 to keep your spot. ...</p>
    {#snippet footer()}
      <span>Updated October 21</span>
    {/snippet}
  </Card>
{/snippet}`}
    >
      {#snippet blurb()}
        <p>
          The same card in two places. As the one thing across a wide column
          it reads large; in a 260px sidebar it tightens up. Its footer is a
          caption, so it stays a step smaller than the body in both.
        </p>
      {/snippet}
      <div class="wide-column">
        {@render infoCard()}
      </div>
      <div class="with-sidebar">
        <aside>
          {@render infoCard()}
        </aside>
        <p>
          The rest of the page goes here. The sidebar is 260px wide whatever the
          screen, so its card gets small-card type.
        </p>
      </div>
    </DemoWithCode>

    <DemoWithCode
      code={`<Stack gap="0">
  <Card marginBlock="0" marginInline="0">First, flush against the next one.</Card>
  <Card marginBlock="0" marginInline="0">Second, no gap between them.</Card>
</Stack>`}
    >
      {#snippet blurb()}
        <p>
          Card has a default <code>margin</code> on every side (space between it
          and whatever's next to it). Override with <code>marginBlock</code>/
          <code>marginInline</code> -- one value for both sides of that axis, two
          (<code>"1rem 0"</code>) for start and end independently. Handy for
          butting cards up against each other, as here, or against a Stack's own
          <code>gap</code> instead of stacking both.
        </p>
      {/snippet}
      <Stack gap="0">
        <Card marginBlock="0" marginInline="0">First, flush against the next one.</Card>
        <Card marginBlock="0" marginInline="0">Second, no gap between them.</Card>
      </Stack>
    </DemoWithCode>
  </CssVariableDemo>
</Container>

<style>
  .fixed-type {
    --card-font-size-slope: 0;
  }
  .wide-column,
  .with-sidebar > aside {
    container-type: inline-size;
  }
  .with-sidebar {
    display: grid;
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 16px;
    align-items: start;
  }
</style>
