<script>
  import { page } from "$app/stores";
  import { Page } from "$lib/index";
  import Bar from "$lib/layout/Bar.svelte";
  import "$lib/vars/defaults.css";
  import { base } from "$app/paths";

  import DynamicComponent from "../../demos/DynamicComponent.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Themes from "../../Themes.svelte";
  import { fade, fly } from "svelte/transition";
  let showThemes = false;
  
</script>

<Page>
  <Bar>
    <a href={base || "/"}>Home</a>
    {$$props.data.component}
    <Checkbox bind:checked={showThemes}>Show themes</Checkbox>
  </Bar>
  {#if showThemes}
    <div in:fly={{y:-300}} out:fade>
    <Container height='auto'>
      <Themes />
    </Container>
    </div>
  {/if}
  <DynamicComponent component={$$props.data.component} />
</Page>
