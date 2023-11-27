<script>
  import { page } from "$app/stores";

  import DynamicComponent from "../demos/DynamicComponent.svelte";
</script>

<DynamicComponent component={$$props.data.component} />
