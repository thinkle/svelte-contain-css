<script lang="ts">
  import { getReviewTheme } from "$lib/review/themes";
  import ThemeStyle from "$lib/theme/ThemeStyle.svelte";

  let { children } = $props();
</script>

<ThemeStyle id="review-theme-purple" css={getReviewTheme("purple").css} />
{@render children?.()}
