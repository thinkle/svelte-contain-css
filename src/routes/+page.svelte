<script lang="ts">	
  import IntroOverview from "./IntroOverview.svelte";
  import "$lib/vars/defaults.css";
  import "$lib/vars/themes/lightordark.css";
  import Bar from "$lib/layout/Bar.svelte";
  import Page from "$lib/layout/Page.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";

  import BarDemo from "./demos/BarDemo.svelte";

  import { onMount } from "svelte";  
  import ButtonDemo from "./demos/ButtonDemo.svelte";
  import TypographyDemo from "./demos/TypographyDemo.svelte";
  import SplitPaneDemo from "./demos/SplitPaneDemo.svelte";
  import CheckboxDemo from "./demos/CheckboxDemo.svelte";
  import RadioButtonDemo from "./demos/RadioButtonDemo.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import FormItemDemo from "./demos/FormItemDemo.svelte";
  import VariableDemo from "./demos/VariableDemo.svelte";
  import Button from "$lib/controls/Button.svelte";  
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
  import Installation from "./Installation.svelte";
  import CssVariableDemo from "./demos/CssVariableDemo.svelte";
  import TooltipDemo from "./demos/TooltipDemo.svelte";
  import DialogDemo from "./demos/DialogDemo.svelte";
  

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

  let menu : 
    {name : string, link? : string, component? : any}[]
  = [
    { name: "Intro", link : '#Intro' },
    { name: "Installation", link : '#Installation'},    
    { name: "Layout"},
    { name : 'Typography', component: TypographyDemo},
    { name : 'Grid Layout', component: GridLayout},
    { name : 'Split Pane', component: SplitPaneDemo},
    { name : 'Bar', component: BarDemo},
    { name : 'Page', component: PageDemo},
    {name : 'Components'},
    { name : 'Card', component: CardDemo},
    { name : 'Tile', component: TileDemo},
    { name : 'Rows and Columns', component: RowsAndColumnsDemo},
    { name: "Controls"},
    { name : 'Button', component: ButtonDemo},
    { name : 'Checkbox', component: CheckboxDemo},
    { name : 'Radio Button', component: RadioButtonDemo},
    { name : 'Slider', component: Slider},
    { name : 'Form Item', component: FormItemDemo},
    { name: "Overlays"},
    { name : 'Dialog', component: DialogDemo},
    { name : 'Tooltip', component: TooltipDemo},
    { name: "Dropdowns"},
    { name : 'Dropdown Menu', component: DropdownMenuDemo},
    { name: "Miscellaneous"},
    { name : 'Themes', component: Themes},
    { name : 'Variables', component: VariableDemo},
  ];

  let theDemo : SvelteComponent | null = null;
  let theItem = 0;
  $: theDemo = menu[theItem].component;
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
    <div class="info" 
      style:--button-bg="transparent" 
      style:--button-drop-shadow="none" 
      style:--button-border="none"
      style:--button-shadow-color="transparent">
      {#if theItem > 3} 
        <Button
          on:click={() => {
            theItem -= 1;
            if (theItem > 0 && !menu[theItem].link && !menu[theItem].component) {
              theItem -= 1;
            }
          }}
        >
          &lt;
        </Button>
      {/if}
      <div>{menu[theItem].name}</div>      
      <Button
        on:click={() => {
          theItem += 1;
          if (theItem < menu.length - 1 && !menu[theItem].link && !menu[theItem].component) {
            theItem += 1;
          }
        }}>&gt;</Button>
    </div>
    
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
        <Button
          on:click={() => {
            right = !right;
          }}
        >
          Move Sidebar to
          {#if right}Left{:else}Right{/if}
          {#if right}👈{:else}👉{/if}
        </Button>
      </li>
      {#each menu as item} 
        {#if item.link}
          <li>
            <a href={item.link}
              on:click={() => {
                theItem = menu.indexOf(item);
              }}
            >{item.name}</a>
          </li>
        {:else if item.component}
          <li><a href="#demo-area"
            on:click={() => {
              theItem = menu.indexOf(item);
            }}>{item.name}</a>
          </li>
        {:else}
          <li class="subheader"
            on:click={() => {
              theItem = menu.indexOf(item) + 1;
            }}
          >{item.name}</li>
        {/if}
      {/each}
    </MenuList>
  </Sidebar>
  <IntroOverview />
  <Installation/>
  <div id="demo-area">    
    {#if theDemo}    
       <svelte:component this={theDemo} /> 
    {/if}
  </div>
</Page>

<style>
  .info {
    display: flex;
    align-items: center;
  }
</style>