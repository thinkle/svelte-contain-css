<script lang="ts">
  import "$lib/vars/defaults.css";
  import "$lib/vars/themes/light.css";
  import "$lib/vars/themes/typography-airy.css";
  import "$lib/vars/fancy-paragraphs.css";

  let { children } = $props();
</script>

{@render children?.()}
