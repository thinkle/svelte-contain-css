<script lang="ts">
  import Card from "$lib/Card.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Slider from "$lib/controls/Slider.svelte";

  let fixedHeight = $state(true);
  let cardWidth = $state(420);
  let cardHeight = $state(300);
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import { cardVars } from "./cssVariableDefs";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Stack from "$lib/layout/Stack.svelte";
</script>

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
          <img src="https://picsum.photos/400/200" alt="Random Photo" />
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
          Toggle fixed-height mode and resize the pane to see how the card shell
          and content area respond together.
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
      code={`<Card center width="${cardWidth}px" height="${cardHeight}px">
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
          the slider to see typography and padding adapt at 300px and 500px.
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
      {/snippet}
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
    </DemoWithCode>
  </CssVariableDemo>
</Container>
