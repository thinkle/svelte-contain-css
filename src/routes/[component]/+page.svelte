<script>
  import { page } from "$app/stores";
  import { Page } from "$lib/index";
  import Bar from "$lib/layout/Bar.svelte";
  import "$lib/vars/defaults.css";
  import { base } from "$app/paths";
  import "$lib/vars/themes/purple.css";
  import DynamicComponent from "../demos/DynamicComponent.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Themes from "../Themes.svelte";
  let showThemes = false;
</script>

<Page --bar-link-fg="pink">
  <Bar>
    <a href={base}>Home</a>
    {$$props.data.component}
    <Checkbox bind:checked={showThemes}>Show themes</Checkbox>
  </Bar>
  {#if showThemes}
    <Container>
      <Themes />
    </Container>
  {/if}
  <DynamicComponent component={$$props.data.component} />
</Page>
