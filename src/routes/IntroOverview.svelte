<script lang="ts">
  import "$lib/vars/defaults.css";
  import "$lib/vars/themes/lightordark.css";
  import Bar from "$lib/layout/Bar.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Card from "$lib/Card.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";

  import BarDemo from "./demos/BarDemo.svelte";

  import { onMount } from "svelte";
  import ResponsiveText from "$lib/layout/ResponsiveText.svelte";
  import ButtonDemo from "./demos/ButtonDemo.svelte";
  import TypographyDemo from "./demos/TypographyDemo.svelte";
  import SplitPaneDemo from "./demos/SplitPaneDemo.svelte";
  import CheckboxDemo from "./demos/CheckboxDemo.svelte";
  import RadioButtonDemo from "./demos/RadioButtonDemo.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import FormItemDemo from "./demos/FormItemDemo.svelte";
  import VariableDemo from "./demos/VariableDemo.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Code from "$lib/misc/Code.svelte";
  import Hero from "$lib/layout/Hero.svelte";
  import PageDemo from "./demos/PageDemo.svelte";
  import TabDemo from "./demos/TabDemo.svelte";
  import Container from "$lib/layout/Container.svelte";
  import DropdownMenuDemo from "./demos/DropdownMenuDemo.svelte";
  import Themes from "./Themes.svelte";
  import CardDemo from "./demos/CardDemo.svelte";
  import TileDemo from "./demos/TileDemo.svelte";
  import RowsAndColumnsDemo from "./demos/RowsAndColumnsDemo.svelte";
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import { base } from "$app/paths";
  import Dialog from "$lib/overlays/Dialog.svelte";
  import Tooltip from "$lib/overlays/Tooltip.svelte";

  let hash: string = "";
  const updateHash = () => {
    hash = window.location.hash;
    console.log("Hash is", hash);
  };
  onMount(() => {
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  });

  let right: boolean = false;
  let showDialog = false;
  let toggleDialog = () => {
    showDialog = !showDialog;
  };
</script>

<GridLayout --code-font-size="0.8rem">
  <Card>
    <h2 slot="header">Simple Components</h2>
    <p>
      Presenting the simple components you would expect to see in any modern
      component library.
    </p>
    <p>
      Using svelte components is easy and supports a number of intuitive
      properties, such as:
    </p>
    <Code
      code={`<Button 
  bg="green" 
  fg="white" 
  width="64px" 
  height="64px">
  Wow
</Button>`}
    />

    <br />Which produces:
    <Button bg="green" fg="white" width="64px" height="64px">Wow</Button>
  </Card>
  <Card>
    <h2 slot="header">CSS Variables</h2>
    <p>
      Our shorthand properties like bg and fg are just syntactic sugar for CSS
      variables scoped to components, like <code>--card-bg</code> and
      <code>--button-width</code>.
    </p>
    <p>
      Because we use CSS variables, you can inject variables wherever you like
      in your component heirarchy, as in this nav bar with custom buttons:
    </p>
    <Code
      code={`<Bar --bar-bg="#333"
  --button-bg="var(--material-color-purple)"
  --bar-link-fg="var(--material-color-yellow)"
  --button-fg="#eee"
  --button-height="3rem">
  <Button>Home</Button>
  <Button>About</Button>
  <Button>Contact</Button>
</Bar>`}
    />

    <Bar
      --bar-bg="#333"
      --button-bg="var(--material-color-purple)"
      --button-fg="white"
      --button-height="3rem"
      --bar-link-fg="var(--material-color-yellow)"
    >
      <Button>Home</Button>
      <Button>About</Button>
      <Button>Contact</Button>
      <a href="#">Home</a>
    </Bar>
  </Card>
  <Card>
    <h2 slot="header">Container Queries</h2>
    <div style="display: flex; position: relative;">
      <Sidebar>
        <p>
          This is the same "Sidebar" component that you see on the main page,
          but this time "contained" in a card.
        </p>
      </Sidebar>
      <p>
        We use container queries out of the box. This "Card" has a sidebar, for
        example, but because the card is small, the sidebar will be in the
        "expander" mode, regardless of the screen size.
      </p>
    </div>
  </Card>
  <Card>
    <h2 slot="header">For the Future</h2>
    <p>
      We use modern CSS features like <code>filter</code> and
      <code>transform</code>
      to handle affordances, so changing color schemes should be a snap and only
      require changing a single value.
    </p>
    <Code
      code={`
      <span style:--button-fg="white">
        <Button bg="var(--material-color-orange)">Orange</Button>
        <Button bg="var(--material-color-teal)">Teal</Button>
        <Button bg="var(--material-color-purple)">Purple</Button>
      </span>`}
    />
    <p style="text-align:center">
      <span style:--button-fg="white">
        <Button bg="var(--material-color-orange)">Orange</Button>
        <Button bg="var(--material-color-teal)">Teal</Button>
        <Button bg="var(--material-color-purple)">Purple</Button>
      </span>
    </p>
    <p>
      We also use features like <a href="#dialog" on:click={toggleDialog}
        ><code>&ltdialog&gt;</code></a
      >
      and the

      <Tooltip>
        <Button>Popup API</Button>
        <div slot="tooltip">
          Which handles overlays for items such as tooltips and dropdown menus,
          which we provide with
          <code>&lt;Tooltip&gt</code>
          and <code>&lt;DropdownMenu&gt</code>
          as well as with a custom
          <code>&lt;Select&gt;</code>
        </div>
      </Tooltip>
      for our overlays, so there's no need for portals or other shenanigans.
    </p>
    {#if showDialog}
      <Dialog onClose={() => (showDialog = false)}>
        <h1>Dialog</h1>
        <p id="dialog">
          Wow, a dialog! This uses the modern HTML dialog element, so it's ESC
          closable out of the box and follows a11y rules without even trying.
        </p>
      </Dialog>
    {/if}
  </Card>
</GridLayout>
