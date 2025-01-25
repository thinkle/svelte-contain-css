<script lang="ts">	
  import IntroOverview from "./IntroOverview.svelte";
  import "$lib/vars/defaults.css";
  import "$lib/vars/themes/lightordark.css";
  import Bar from "$lib/layout/Bar.svelte";
  import Page from "$lib/layout/Page.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  
  import BarDemo from "./demos/BarDemo.svelte";

  import { onMount, tick } from "svelte";  
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
  
  import DropdownMenuDemo from "./demos/DropdownMenuDemo.svelte";
  import Themes from "./Themes.svelte";
  import CardDemo from "./demos/CardDemo.svelte";
  import TileDemo from "./demos/TileDemo.svelte";
  import RowsAndColumnsDemo from "./demos/RowsAndColumnsDemo.svelte";
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import { base } from "$app/paths";  
  import Installation from "./Installation.svelte";  
  import TooltipDemo from "./demos/TooltipDemo.svelte";
  import DialogDemo from "./demos/DialogDemo.svelte";
  import ProgressDemo from "./demos/ProgressDemo.svelte";
  import TableDemo from "./demos/TableDemo.svelte";
  import AccordionDemo from "./demos/AccordionDemo.svelte";
  
  

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
    {name : string, link? : string, component? : any, demo? : string}[]
  = [
    { name: "Intro", link : '#Intro' },
    { name: "Installation", link : '#Installation'},    
    { name: "Layout"},
    { name : 'Typography', component: TypographyDemo, demo: 'Typography'},    
    { name : 'Split Pane', component: SplitPaneDemo, demo: 'SplitPane'},
    
    { name : 'Tabs', component: TabDemo, demo : 'Tab'},
    { name : 'Accordion', component: AccordionDemo, demo : 'Accordion'},
    { name : 'Bar', component: BarDemo, demo : 'Bar'},
    { name : 'Page', component: PageDemo, demo : 'Page'},
    {name : 'Table', component : TableDemo, demo : 'Table'},
    {name : 'Components'},
    { name : 'Card', component: CardDemo, demo : 'Card'},
    { name : 'Tile', component: TileDemo, demo : 'Tile'},
    { name : 'Rows and Columns', component: RowsAndColumnsDemo, demo : "RowsAndColumns"},
    { name: "Controls"},
    { name : 'Button', component: ButtonDemo, demo : "Button"},
    { name : 'Checkbox', component: CheckboxDemo, demo : "Checkbox"},
    { name : 'Radio Button', component: RadioButtonDemo, demo : "RadioButton"},
    { name : 'Slider', component: Slider},
    { name : 'Form Item', component: FormItemDemo, demo : "FormItem"},
    { name: "Overlays"},
    { name : 'Dialog', component: DialogDemo, demo : "Dialog"},
    { name : 'Tooltip', component: TooltipDemo, demo : "Tooltip"},
    { name: "Dropdowns"},
    { name : 'Dropdown Menu', component: DropdownMenuDemo, demo : "DropdownMenu"},
    { name: "Miscellaneous"},
    { name: 'Progress', component: ProgressDemo, demo : "Progress"},
    { name : 'Themes', component: Themes},
    { name : 'Variables', component: VariableDemo, demo : "Variable"},
  ];

  let theDemo : SvelteComponent | null = null;
  let theItem = 0;
  $: theDemo = menu[theItem].component || menu.find((m) => m.component)?.component;
  
  function changeItem (newIndex : number) {
    let delta = newIndex - theItem;
    let direction = delta > 0 ? 1 : -1;
    theItem = newIndex;
    // Skip over any headings that aren't actual items
    if (menu[theItem] && !menu[theItem].link && !menu[theItem].component) {
      theItem += direction;
    }
    let theLink = menu[theItem].link || '#demo-area';
    tick().then(()=>document.querySelector(theLink)?.scrollIntoView())
  }
  let sideWidth = 50;
</script>

<Hero center={true} bg="var(--primary-bg)" fg="var(--primary-fg)">
  <h1 style="text-align: center">Meet <em>ContainCSS</em></h1>
  <p>
    The Simple Svelte Component Library that uses css variables & container
    queries to make your life easier.
  </p>
</Hero>
<Page {right} sticky>
  <Bar slot="header" --bar-border-top="none" --side-width="{sideWidth}px">
    <div class="icon equal-width"></div>
    <h1><em>ContainCSS</em></h1>
    <div class="info equal-width" 
      bind:clientWidth={sideWidth}
      style:--button-bg="var(--bar-bg, var(--container-bg))" 
      style:--button-drop-shadow="none" 
      style:--button-border="none"
      style:--button-shadow-color="transparent">
      {#if theItem > 0} 
        <Button
          on:click={() => changeItem(theItem - 1)}
        >
          <span style="transform:rotate(180deg);display:inline-block;">⮕</span>
        </Button>
      {/if}
      
        <DropdownMenu --bg="#222">
          <span slot="label">
            {menu[theItem].name}
          </span>
          
          {#each menu as item,idx}            
            <li><Button value={idx} on:click={()=>changeItem(idx)}>{item.name}</Button></li>
          {/each}
        </DropdownMenu>
        
        
      <Button
        on:click={() => changeItem(theItem + 1)}>⮕</Button>
    
    
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
    <MenuList --menu-item-justify="start" --menu-item-padding="var(--padding) var(--padding) var(--padding) calc(4*var(--padding))">      
      {#each menu as item} 
        {#if item.link}
          <li>
            <a href={item.link}
            class:active={theItem === menu.indexOf(item)}
              on:click={() => {
                theItem = menu.indexOf(item);
              }}
            >{item.name}</a>
          </li>
        {:else if item.component}
          <li><a href="#demo-area"
            class:active={theItem === menu.indexOf(item)}
            on:click={() => {
              theItem = menu.indexOf(item);
            }}>{item.name}</a>
          </li>
        {:else}
          <li class="subheader"
            class:active={theItem === menu.indexOf(item)}
            on:click={() => {
              theItem = menu.indexOf(item) + 1;
            }}
          >{item.name}</li>
        {/if}
      {/each}
    </MenuList>
  </Sidebar>
  <IntroOverview id="Intro" />
  <Installation id="Installation"/>
  <div id="demo-area">        
    {#if theDemo}          
      {#if menu[theItem].demo}      
        <a href="{base}/component/{menu[theItem].demo}" target="_blank">Open separate page to experiment with theming</a>      
      {/if}
       <svelte:component this={theDemo} /> 
       {#if theItem < menu.length - 1}
       {@const nextItem = menu.find((m,i) => i > theItem && m.component)}
       {#if nextItem}
        <Bar --bar-justify="end">        
          <Button
            on:click={() => 
              changeItem(menu.indexOf(nextItem))
            }
          >
            Next: {nextItem.name}
          </Button>
        </Bar>
        {/if}
       {/if}
    {/if}
  </div>
  <!-- Help Svelte Pre-Render routes... -->
  <div class="hidden">
  {#each menu as item}
    {#if item.demo}
      <a href="{base}/component/{item.demo}" target="_blank">{item.name}</a>       
    {/if}|
  {/each}
  </div>
</Page>

<style>
  .hidden {
    visibility: hidden;    
  }
  .info {
    display: flex;
    justify-content: end;;
    align-items: center;
  }
  .equal-width {
    min-width: var(--side-width);
  }
  .subheader {
    background-color: var(--secondary-bg);
    color: var(--secondary-fg);
    padding: var(--padding);
  }

</style>