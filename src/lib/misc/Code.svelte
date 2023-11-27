<script lang="ts">
  export let code: string;
  import Prism from "svelte-prism";
  import "prismjs/themes/prism.css";
</script>

<Prism language="html" source={code} />
