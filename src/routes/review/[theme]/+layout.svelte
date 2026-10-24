<script lang="ts">
  import "$lib/vars/defaults.css";
  import type { Snippet } from "svelte";
  import ThemeStyle from "$lib/theme/ThemeStyle.svelte";
  import type { ReviewThemeName } from "$lib/review/themes";

  interface Props {
    data: {
      theme: ReviewThemeName;
      themeCss: string;
      themeLabel: string;
    };
    children: Snippet;
  }

  let { data, children }: Props = $props();
</script>

<ThemeStyle id={`review-theme-${data.theme}`} css={data.themeCss} />

{@render children()}
