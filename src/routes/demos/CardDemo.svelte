<script lang="ts">
  import CssWrapper from "./CssWrapper.svelte";
  import CssVariables from "./CssVariables.svelte";
  import type { CSSVariable } from "./types";
  import Card from "$lib/Card.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Container from "$lib/layout/Container.svelte";
  let cssValues = {};
  let cssVariables: CSSVariable[] = [
    {
      name: "--card-width",
      defaultValue: "420px",
      type: "length",
    },
    {
      name: "--card-height",
      defaultValue: "300px",
      type: "length",
    },
    {
      name: "--card-footer-height",
      defaultValue: "2em",
      type: "length",
    },
    {
      name: "--card-header-height",
      defaultValue: "2em",
      type: "length",
    },
    {
      name: "--card-width-small",
      defaultValue: "250px",
      type: "length",
    },
    {
      name: "--card-height-small",
      defaultValue: "150px",
      type: "length",
    },
    {
      name: "--card-width-large",
      defaultValue: "600px",
      type: "length",
    },
    {
      name: "--card-height-large",
      defaultValue: "450px",
      type: "length",
    },
    {
      name: "--border-radius",
      defaultValue: "var(--border-radius)",
      type: "length",
    },
    {
      name: "--shadow-distance",
      defaultValue: "8px",
      type: "length",
    },
    {
      name: "--shadow-blur",
      defaultValue: "8px",
      type: "length",
    },
    {
      name: "--shadow-color",
      defaultValue: "#0003",
      type: "color",
    },
  ];
  let fixedHeight = true;
  import Checkbox from "$lib/controls/Checkbox.svelte";
</script>

<Container>
  <h2>Cards</h2>
  <p>
    We provide a basic card component that can include optional header and
    footer slots.
  </p>
  <p>
    Cards usually come with some box-shadow, coloring, and so forth, and have
    responsive sizing out of the box.
  </p>
  <p>
    Here are some cards with and without headers inside resizable panes so you
    can see them acting responsively.
  </p>
  <p>Cards can be set to fixedHeight true or false.</p>
  <CssVariables
    variables={cssVariables}
    onSetVariables={(v) => {
      cssValues = v;
    }}
  />
  <CssWrapper variables={cssValues}>
    <SplitPane leftWidth="7em" rightWidth="2fr">
      <div slot="left">Resize.</div>
      <div slot="right">
        <Card {fixedHeight}>
          <div>Simplest possible card</div>
          {#if fixedHeight}
            <div>(fixed height)</div>
          {:else}
            <div>(dynamic height)</div>
          {/if}
        </Card>
        <Card {fixedHeight}>
          <Checkbox bind:checked={fixedHeight}>Fixed Height</Checkbox>
        </Card>
        <Card {fixedHeight}>
          <div slot="header">Card Header</div>
          <div>Card body</div>
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
  </CssWrapper>
</Container>
