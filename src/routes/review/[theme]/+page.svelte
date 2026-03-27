<script lang="ts">
  import ReviewThemeIndex from "$lib/review/ReviewThemeIndex.svelte";
  import type { ReviewThemeName } from "$lib/review/themes";

  interface Props {
    data: {
      theme: ReviewThemeName;
      themeLabel: string;
    };
  }

  let { data }: Props = $props();
</script>

<ReviewThemeIndex theme={data.theme} themeLabel={data.themeLabel} />
