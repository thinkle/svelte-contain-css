<script lang="ts">
  import ReviewAppPage from "$lib/review/ReviewAppPage.svelte";

  let { data } = $props();
</script>

<ReviewAppPage {data} />
