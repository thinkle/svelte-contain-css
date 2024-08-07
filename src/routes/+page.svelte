<script lang="ts">
  import "$lib/vars/defaults.css";

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

  const componentCategories = [
    {
      title: "Overview",
      items: [
        { title: "About", url: "#about" },
        { title: "Themes", url: "#themes" },
        { title: "Variables", url: "#variables" },
        { title: "Typography", url: "#typography" },
      ],
    },
    {
      title: "Controls",
      items: [
        { title: "Button", url: "#button" },
        { title: "Checkbox", url: "#checkbox" },
        { title: "Radio", url: "#radio" },
        { title: "Input", url: "#input" },
        { title: "Select", url: "#select" },
      ],
    },
    {
      title: "Layout Components",
      items: [
        { title: "Bar", url: "#bar" },
        { title: "Cards", url: "#cards" },
        { title: "Tiles", url: "#tiles" },
        { title: "Grid", url: "#grid" },
        { title: "Rows & Columns", url: "#rows-and-columns" },
        { title: "Page", url: "#page" },
        { title: "Hero", url: "#hero" },
      ],
    },
    {
      title: "Fancy Stuff",
      items: [
        { title: "Tabs", url: "#tabs" },
        { title: "Sidebar", url: "#sidebar" },
        { title: "Split Pane", url: "#split" },
      ],
    },
    /* {
      title: "Advanced Components",
      items: [
        { title: "Accordion", url: "#accordion" },
        { title: "Dialog", url: "#dialog" },
        { title: "Drawer", url: "#drawer" },
        { title: "Modal", url: "#modal" },
        { title: "Popover", url: "#popover" },
        { title: "Tooltip", url: "#tooltip" }, 
      ],
    },*/
  ];
  let right: boolean = false;
</script>

<Hero center={true} bg="var(--primary-bg)" fg="var(--primary-fg)">
  <h1 style="text-align: center">Meet <em>ContainCSS</em></h1>
  <p>
    The Simple Svelte Component Library that uses css variables & container
    queries to make your life easier.
  </p>
</Hero>
<Page {right} sticky>
  <Bar slot="header" --bar-border-top="none">
    <div class="icon"></div>
    <h1><em>ContainCSS</em></h1>
    <div class="info"></div>
  </Bar>
  <Bar
    slot="footer"
    --bar-justify="flex-end"
    height="1.5em"
    --bar-border-top="none"
    --bar-border-bottom="none"
    marginBottom="0"
  >
    <a style:color="var(--body-fg)" href="https://tomhinkle.net"
      >by Tom Hinkle</a
    >
  </Bar>
  <Sidebar slot="sidebar" {right}>
    <MenuList>
      <li>
        <h3>Standalone Pages</h3>
        <DropdownMenu>
          <span slot="label">Jump to Component</span>
          {#each ["Card", "RadioButton", "Bar"] as component}
            <a href="{base}/component/{component}" target="_blank"
              >{component}</a
            >
          {/each}
        </DropdownMenu>
      </li>
      <li>
        <Button
          on:click={() => {
            right = !right;
          }}
        >
          Move Sidebar to
          {#if right}Left{:else}Right{/if}
        </Button>
      </li>
      <li>Jump</li>
      <li>
        {#each componentCategories as category}
          <h2>{category.title}</h2>
          {#each category.items as item}
            <li>
              <a class:active={hash === item.url} href={item.url}
                >{item.title}</a
              >
            </li>
          {/each}
        {/each}
      </li>
    </MenuList>
  </Sidebar>

  <h2 id="themes">Themes</h2>
  <Themes />

  <GridLayout>
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
    <Card fixedHeight={true}>
      <h2 slot="header">Container Queries</h2>
      <div style="display: flex; position: relative;">
        <Sidebar>
          <p>
            This is the same "Sidebar" component that you see on the main page,
            but this time "contained" in a card.
          </p>
        </Sidebar>
        <p>
          We use container queries out of the box, so you can adjust the layout
          of your components based on their size, rather than relying only on
          the viewport size. This "Card" has a sidebar, for example, but because
          the card is small, the sidebar will be in the "expander" small mode in
          the card, regardless of the screen size.
        </p>
      </div>
    </Card>
  </GridLayout>
  <div id="variables">
    <VariableDemo />
  </div>
  <!-- <div style="margin:auto">
    <h2>Responsive Content</h2>
    <p>
      We provide a convenient <code>ResponsiveText</code>
      component for making text appear depending on screen size.
    </p>
    <ResponsiveText>
      <p slot="xs">This text adapts!</p>
      <p slot="small">This text can change size (small screen)</p>
      <p slot="medium">
        This text will adapt to the container size. (medium size)
      </p>
      <p slot="large">
        This text will adapt and change depending on the size of the container.
        As the container grows, we have more room. (large size)
      </p>
      <div slot="xl">
        <h3>X-Large Container!</h3>
        <table>
          <tr>
            <td> Small Container </td>
            <td> Small Text </td>
          </tr>
          <tr>
            <td>Medium Container</td>
            <td>Medium length text</td>
          </tr>
          <tr>
            <td>Big Container</td>
            <td>Suddenly we have room for so much more detail!</td>
          </tr>
        </table>
      </div>
    </ResponsiveText>
    <ResponsiveText>
      <p slot="xs">This text is for small!</p>
      <p slot="small">This text is for small!</p>
      <p slot="medium">This text is for medium!</p>
      <p slot="else">This text is for everything else</p>
    </ResponsiveText>
    <ResponsiveText greaterThan="large">
      <p slot="greaterThan">This text is for large and up!</p>
    </ResponsiveText>
    <ResponsiveText smallerThan="large">
      <p slot="smallerThan">This text is for large and below!</p>
    </ResponsiveText>
  </div> -->
  <div id="typography">
    <TypographyDemo />
  </div>
  <Container><h2>Layout</h2></Container>
  <div id="bar">
    <BarDemo />
  </div>
  <div id="cards">
    <CardDemo />
  </div>
  <div id="tiles">
    <TileDemo />
  </div>
  <div id="grid"></div>
  <div id="hero"></div>
  <div id="rows-and-columns">
    <RowsAndColumnsDemo />
  </div>
  <h2>Components</h2>
  <div id="button">
    <ButtonDemo />
  </div>
  <div id="checkbox">
    <CheckboxDemo />
  </div>
  <div id="radio">
    <RadioButtonDemo />
  </div>
  <div id="form-item">
    <FormItemDemo />
  </div>
  <div id="tabs">
    <TabDemo />
  </div>
  <div id="page">
    <PageDemo />
  </div>
  <div id="split">
    <SplitPaneDemo />
  </div>
  <div id="menu">
    <DropdownMenuDemo />
  </div>
</Page>
