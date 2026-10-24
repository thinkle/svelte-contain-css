<script lang="ts">
  import { getReviewTheme } from "$lib/review/themes";
  import ThemeStyle from "$lib/theme/ThemeStyle.svelte";

  let { children } = $props();
</script>

<ThemeStyle id="review-theme-dark" css={getReviewTheme("dark").css} />
{@render children?.()}
