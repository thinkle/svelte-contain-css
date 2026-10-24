<script lang="ts">
  import { onDestroy } from "svelte";

  interface Props {
    css: string;
    id: string;
  }

  let { css, id }: Props = $props();

  let styleEl: HTMLStyleElement | null = null;

  function applyStyle(styleId: string, styleCss: string) {
    if (typeof document === "undefined") return;

    if (styleEl && styleEl.id !== styleId) {
      styleEl.remove();
      styleEl = null;
    }

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = styleCss;
  }

  function removeStyle() {
    if (!styleEl) return;
    styleEl.remove();
    styleEl = null;
  }

  $effect(() => {
    // Update in place. Recreating this node on each CSS change would move it
    // after later layers, letting a preset override the editor's custom vars.
    applyStyle(id, css);
  });

  onDestroy(() => {
    removeStyle();
  });
</script>
