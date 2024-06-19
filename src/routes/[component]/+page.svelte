<script>
  import { page } from "$app/stores";
  import { Page } from "$lib/index";
  import Bar from "$lib/layout/Bar.svelte";
  import "$lib/vars/defaults.css";
  import "$lib/vars/themes/purple.css";
  import DynamicComponent from "../demos/DynamicComponent.svelte";
</script>

<Page --bar-link-fg="pink">
  <Bar>
    <a href="/">Home</a>
    {$$props.data.component}
    <span>Standalone docs</span>
  </Bar>
  <DynamicComponent component={$$props.data.component} />
</Page>
