<script lang="ts">
  import { onMount } from "svelte";
  import { themeState } from "./themeState.svelte";
  import { fullThemes, colorThemes, typographyThemes, extraThemes } from "./themeConfig";

  let ready = false;

  function injectStyle(uid: string, css: string) {
    if (!ready) return;
    const id = `${uid}-injected-style`;
    let el = document.getElementById(id) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    el.innerHTML = css;
  }

  function applyAll() {
    const usingFull = themeState.fullTheme !== 0;
    injectStyle("full", fullThemes[themeState.fullTheme].css);
    injectStyle("color", usingFull ? "" : colorThemes[themeState.colorTheme].css);
    injectStyle("typography", usingFull ? "" : typographyThemes[themeState.typographyTheme].css);
    for (let i = 0; i < extraThemes.length; i++) {
      injectStyle(`extra-${i}`, themeState.enabledExtras[i] ? extraThemes[i].css : "");
    }
    injectStyle("extra-raw", themeState.rawCss ? `:root { ${themeState.rawCss} }` : "");
  }

  onMount(() => {
    ready = true;
    applyAll();
  });

  $effect(() => {
    // Track all reactive dependencies
    themeState.fullTheme;
    themeState.colorTheme;
    themeState.typographyTheme;
    themeState.enabledExtras.join(""); // read array contents
    themeState.rawCss;
    applyAll();
  });
</script>
