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
    applyStyle(id, css);
    return () => {
      removeStyle();
    };
  });

  onDestroy(() => {
    removeStyle();
  });
</script>
