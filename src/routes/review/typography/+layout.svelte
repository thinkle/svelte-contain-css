<script lang="ts">
  import light from "$lib/vars/themes/light.css?raw";
  import airy from "$lib/vars/themes/typography-airy.css?raw";
  import fancy from "$lib/vars/fancy-paragraphs.css?raw";
  import ThemeStyle from "$lib/theme/ThemeStyle.svelte";
  let { children } = $props();
</script>

<ThemeStyle id="review-typography-colors" css={light} />
<ThemeStyle id="review-typography-fonts" css={airy} />
<ThemeStyle id="review-typography-paragraphs" css={fancy} />
{@render children?.()}
