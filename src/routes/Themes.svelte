<script lang="ts">
  import { run } from 'svelte/legacy';

  import purple from "$lib/vars/themes/purple.css?raw";
  import browser from "$lib/vars/themes/typography-browser.css?raw";
  import airy from "$lib/vars/themes/typography-airy.css?raw";
  import ibm from "$lib/vars/themes/typography-carbon.css?raw";
  import lightordark from "$lib/vars/themes/lightordark.css?raw";
  import light from "$lib/vars/themes/light.css?raw";
  import dark from "$lib/vars/themes/dark.css?raw";
  import bootstrap from "$lib/vars/themes/bootstrap.css?raw";
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
    {
      name: "Airy",
      css: airy,
      file: "themes/typography-airy.css",
      startsActive: true,
    },
    { name: "IBM Plex", css: ibm, file: "themes/typography-carbon.css" },
  ];

  let colorThemes = [
    { name: "Purple", css: purple, file: "themes/purple.css" },
    { name: "Light", css: light, file: "themes/light.css" },
    { name: "Dark", css: dark, file: "themes/dark.css" },
    {
      name: "Light or Dark (Responsive)",
      css: lightordark,
      startsActive: true,
      file: "themes/lightordark.css",
    },
    { name: "Defaults", css: "", file: "" },
  ];

  let extraThemes = [
    {
      name: "Responsive Typography",
      css: responsiveTypography,
      file: "responsive-typography.css",
    },
    { name: "Sharp Edges", css: boxy, file: "boxy.css" },
    {
      name: "Fancy Paragraphs",
      css: fancyParagraphs,
      file: "fancy-paragraphs.css",
    },
    {
      name: "Bootstrap Clone",
      css: bootstrap,
      file: "themes/bootstrap.css",
    },
  ];
  let enabledExtraThemes = $state({
    0: false,
    1: false,
  });

  let rawCss = $state("");

  import RadioButton from "$lib/controls/RadioButton.svelte";
  import { onMount } from "svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Code from "$lib/misc/Code.svelte";
  let typographyTheme = $state(typographyThemes.findIndex(
    (theme) => theme.startsActive
  ));
  let colorTheme = $state(colorThemes.findIndex((theme) => theme.startsActive));
  let ready = false;
  onMount(() => {
    ready = true;
    injectStyle("typography", typographyThemes[typographyTheme].css);
    injectStyle("color", colorThemes[colorTheme].css);
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

  run(() => {
    injectStyle("typography", typographyThemes[typographyTheme].css);
  });
  run(() => {
    injectStyle("color", colorThemes[colorTheme].css);
  });
  run(() => {
    injectStyle("extra-raw", `:root { ${rawCss} }`);
  });

  run(() => {
    for (let i = 0; i < extraThemes.length; i++) {
      if (enabledExtraThemes[i]) {
        injectStyle(`extra-${i}`, extraThemes[i].css);
      } else {
        injectStyle(`extra-${i}`, "");
      }
    }
  });

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

  let themeCode = $state(buildThemeCode());

  run(() => {
    themeCode = buildThemeCode(
      rawCss,
      typographyThemes[typographyTheme],
      colorThemes[colorTheme],
      ...extraThemes
        .map((theme, i) => (enabledExtraThemes[i] ? theme : null))
        .filter((theme) => theme)
    );
  });

  let showCode = $state(false);
</script>

<FormItem fullWidth>
  {#snippet label()}
    <span >Typography:</span>
  {/snippet}
  {#each typographyThemes as theme, i}
    <RadioButton bind:group={typographyTheme} value={i}
      >{theme.name}</RadioButton
    >
  {/each}
</FormItem>
<FormItem fullWidth>
  {#snippet label()}
    <span >Color</span>
  {/snippet}
  {#each colorThemes as theme, i}
    <RadioButton bind:group={colorTheme} value={i}>{theme.name}</RadioButton>
  {/each}
</FormItem>
<FormItem fullWidth>
  {#snippet label()}
    <span >Extra Settings</span>
  {/snippet}
  {#each extraThemes as theme, i}
    <Checkbox bind:checked={enabledExtraThemes[i]}>{theme.name}</Checkbox>
  {/each}
</FormItem>
<FormItem>
  {#snippet label()}
    <span >Extra Variables</span>
  {/snippet}
  <textarea placeholder="--bg : red;" bind:value={rawCss}></textarea>
</FormItem>
<FormItem fullWidth>
  <Checkbox bind:checked={showCode}>Show code</Checkbox>
</FormItem>
{#if showCode}
  <Code code={themeCode} language="html" />
{/if}
