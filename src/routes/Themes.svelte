<script lang="ts">
  import purple from "$lib/vars/themes/purple.css?raw";
  import browser from "$lib/vars/themes/typography-browser.css?raw";
  import airy from "$lib/vars/themes/typography-airy.css?raw";
  import ibm from "$lib/vars/themes/typography-carbon.css?raw";
  import lightordark from "$lib/vars/themes/lightordark.css?raw";
  import light from "$lib/vars/themes/light.css?raw";
  import dark from "$lib/vars/themes/dark.css?raw";
  import responsiveTypography from "$lib/vars/responsive-typography.css?raw";
  import boxy from "$lib/vars/boxy.css?raw";
  import fancyParagraphs from "$lib/vars/fancy-paragraphs.css?raw";
  let typographyThemes = [
    { name: "Defaults", css: "", file: "" },
    {
      name: "Browser Defaults",
      css: browser,
      file: "themes/typography-browser.css",
    },
    { name: "Airy", css: airy, file: "themes/typography-airy.css" },
    { name: "IBM Plex", css: ibm, file: "themes/typography-carbon.css" },
  ];

  let colorThemes = [
    { name: "Purple", css: purple, file: "themes/purple.css" },
    { name: "Light", css: light, file: "themes/light.css" },
    { name: "Dark", css: dark, file: "themes/dark.css" },
    {
      name: "Light or Dark (Responsive)",
      css: lightordark,
      file: "themes/lightordark.css",
    },
    { name: "Defaults", css: "", file: "" },
  ];

  let extraThemes = [
    { name: "Responsive Typography", css: responsiveTypography, file: "" },
    { name: "Sharp Edges", css: boxy, file: "boxy.css" },
    {
      name: "Fancy Paragraphs",
      css: fancyParagraphs,
      file: "fancy-paragraphs.css",
    },
  ];
  let enabledExtraThemes = {
    0: false,
    1: false,
  };

  let rawCss = "";

  import RadioButton from "$lib/controls/RadioButton.svelte";
  import { onMount } from "svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Code from "$lib/misc/Code.svelte";
  let typographyTheme = 0;
  let colorTheme = 0;
  let ready = false;
  onMount(() => {
    ready = true;
  });
  function injectStyle(uid, css) {
    if (!ready) return;
    let id = `${uid}-injected-style`;
    let existing = document.getElementById(id);
    if (!existing) {
      existing = document.createElement("style");
      existing.id = id;
      document.head.appendChild(existing);
    }
    existing.innerHTML = css;
  }

  $: injectStyle("typography", typographyThemes[typographyTheme].css);
  $: injectStyle("color", colorThemes[colorTheme].css);
  $: injectStyle("extra-raw", `:root { ${rawCss} }`);

  $: for (let i = 0; i < extraThemes.length; i++) {
    if (enabledExtraThemes[i]) {
      injectStyle(`extra-${i}`, extraThemes[i].css);
    } else {
      injectStyle(`extra-${i}`, "");
    }
  }

  function buildThemeCode(...themes) {
    let themeFiles = [
      "defaults.css",
      ...themes.map((theme) => theme && theme.file).filter((file) => file),
    ];
    let themeImports = themeFiles
      .map((theme) => `\timport "contain-css-svelte/vars/${theme}";`)
      .join("\n");

    let scriptTag =
      "<scri" +
      `pt>
  ${themeImports}
  </scri` +
      "pt>";
    let styleTag = "";
    if (rawCss) {
      styleTag =
        `\n\n<sty` +
        `le>
:root {
  ${rawCss.replace("\n", "\n\t")}
}
</sty` +
        "le>";
    }

    return scriptTag + styleTag;
  }

  let themeCode = buildThemeCode();

  $: themeCode = buildThemeCode(
    rawCss,
    typographyThemes[typographyTheme],
    colorThemes[colorTheme],
    ...extraThemes
      .map((theme, i) => (enabledExtraThemes[i] ? theme : null))
      .filter((theme) => theme)
  );

  let showCode = false;
</script>

<FormItem fullWidth>
  <span class="label">Typography:</span>
  {#each typographyThemes as theme, i}
    <RadioButton bind:group={typographyTheme} value={i}
      >{theme.name}</RadioButton
    >
  {/each}
</FormItem>
<FormItem fullWidth>
  <span class="label">Color</span>
  {#each colorThemes as theme, i}
    <RadioButton bind:group={colorTheme} value={i}>{theme.name}</RadioButton>
  {/each}
</FormItem>
<FormItem fullWidth>
  <h3 class="label">Extra Settings</h3>
  {#each extraThemes as theme, i}
    <Checkbox bind:checked={enabledExtraThemes[i]}>{theme.name}</Checkbox>
  {/each}
</FormItem>
<FormItem>
  <span slot="label">Extra Variables</span>
  <textarea placeholder="--bg : red;" bind:value={rawCss}></textarea>
</FormItem>
<FormItem fullWidth>
  <Checkbox bind:checked={showCode}>Show code</Checkbox>
</FormItem>
{#if showCode}
  <Code code={themeCode} language="html" />
{/if}
