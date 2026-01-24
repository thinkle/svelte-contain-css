<script lang="ts">
  import Card from "$lib/Card.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";

  let fixedHeight = $state(true);
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import { cardVars } from "./cssVariableDefs";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
</script>

<Container>
  <CssVariableDemo variables={cardVars}>
    <TextLayout>
      <h2>Cards</h2>
      <p>
        We provide a basic card component that can include optional header and
        footer slots.
      </p>
      <p>
        Cards usually come with some box-shadow, coloring, and so forth, and
        have responsive sizing out of the box.
      </p>

      <h3>Basic Card</h3>
      <Code
        code={`<Card>
  <h1>Card Title</h1>
  <p>Card content goes here.</p>
</Card>`}
      />

      <h3>Card with Header and Footer</h3>
      <Code
        code={`<Card>
  {#snippet header()}
    <div>Card Header</div>
  {/snippet}
  <div>Card content here...</div>
  {#snippet footer()}
    <div>Card Footer</div>
  {/snippet}
</Card>`}
      />

      <h3>Fixed Height Cards</h3>
      <p>Cards can be set to fixedHeight true or false.</p>
      <Code
        code={`<Card fixedHeight={true}>
  <p>This card has a fixed height.</p>
</Card>`}
      />

      <h3>Interactive Example</h3>
      <p>
        Here are some cards with and without headers inside resizable panes so
        you can see them acting responsively.
      </p>
    </TextLayout>
    <FormItem>
      <Checkbox bind:checked={fixedHeight}>Fixed Height</Checkbox>
    </FormItem>
    <SplitPane leftWidth="7em" rightWidth="2fr">
      {#snippet left()}
            <div >Resize.</div>
          {/snippet}
      {#snippet right()}
            <div >
          <Card {fixedHeight} --text-align="center">
            <h1>Wow, so simple</h1>
            <p>Simplest possible card</p>
          </Card>
          <Card {fixedHeight}>
            <Checkbox bind:checked={fixedHeight}>Fixed Height</Checkbox>
          </Card>
          <Card {fixedHeight}>
            {#snippet header()}
                    <div >Card Header</div>
                  {/snippet}
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque et mi orci. Donec euismod, nisl eget consectetur
              sagittis, nisl nunc consectetur nisi, euismod aliquam nisl nunc eu
              nisl. Donec euismod, nisl eget consectetur sagittis, nisl nunc
              consectetur nisi, euismod aliquam nisl nunc eu nisl.
            </div>
            {#snippet footer()}
                    <div >Card foot</div>
                  {/snippet}
          </Card>
          <Card {fixedHeight}>
            {#snippet header()}
                    <div >Card Header</div>
                  {/snippet}
            <div>Card with no feet</div>
          </Card>
          <Card {fixedHeight}>
            <div>Card with no head</div>
            {#snippet footer()}
                    <div >Card foot</div>
                  {/snippet}
          </Card>
        </div>
          {/snippet}
    </SplitPane>
  </CssVariableDemo>
</Container>
