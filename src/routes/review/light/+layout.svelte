<script lang="ts">
  import { getReviewTheme } from "$lib/review/themes";
  import ThemeStyle from "$lib/theme/ThemeStyle.svelte";

  let { children } = $props();
</script>

<ThemeStyle id="review-theme-light" css={getReviewTheme("light").css} />
{@render children?.()}
