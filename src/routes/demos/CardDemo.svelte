<script lang="ts">
  import Card from "$lib/Card.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Container from "$lib/layout/Container.svelte";

  let fixedHeight = true;
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
      <p>
        Here are some cards with and without headers inside resizable panes so
        you can see them acting responsively.
      </p>
      <p>Cards can be set to fixedHeight true or false.</p>
    </TextLayout>
    <FormItem>
      <Checkbox bind:checked={fixedHeight}>Fixed Height</Checkbox>
    </FormItem>
    <SplitPane leftWidth="7em" rightWidth="2fr">
      <div slot="left">Resize.</div>
      <div slot="right">
        <Card {fixedHeight} --text-align="center">
          <h1>Wow, so simple</h1>
          <p>Simplest possible card</p>
        </Card>
        <Card {fixedHeight}>
          <Checkbox bind:checked={fixedHeight}>Fixed Height</Checkbox>
        </Card>
        <Card {fixedHeight}>
          <div slot="header">Card Header</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque et mi orci. Donec euismod, nisl eget consectetur
            sagittis, nisl nunc consectetur nisi, euismod aliquam nisl nunc eu
            nisl. Donec euismod, nisl eget consectetur sagittis, nisl nunc
            consectetur nisi, euismod aliquam nisl nunc eu nisl.
          </div>
          <div slot="footer">Card foot</div>
        </Card>
        <Card {fixedHeight}>
          <div slot="header">Card Header</div>
          <div>Card with no feet</div>
        </Card>
        <Card {fixedHeight}>
          <div>Card with no head</div>
          <div slot="footer">Card foot</div>
        </Card>
      </div>
    </SplitPane>
  </CssVariableDemo>
</Container>
