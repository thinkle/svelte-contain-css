<script>
  import { page } from "$app/stores";
  import "$lib/vars/defaults.css";
  import "$lib/vars/themes/purple.css";
  import DynamicComponent from "../demos/DynamicComponent.svelte";
</script>

<DynamicComponent component={$$props.data.component} />
