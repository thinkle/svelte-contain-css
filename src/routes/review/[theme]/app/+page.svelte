<script lang="ts">
  import ReviewThemeAppIndex from "$lib/review/ReviewThemeAppIndex.svelte";
  import type { ReviewThemeName } from "$lib/review/themes";

  interface Props {
    data: {
      theme: ReviewThemeName;
      themeLabel: string;
    };
  }

  let { data }: Props = $props();
</script>

<ReviewThemeAppIndex theme={data.theme} themeLabel={data.themeLabel} />
