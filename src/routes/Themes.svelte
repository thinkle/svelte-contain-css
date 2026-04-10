<script lang="ts">
  import canyon from "$lib/vars/themes/canyon.css?raw";
  import forest from "$lib/vars/themes/forest.css?raw";
  import material from "$lib/vars/themes/material.css?raw";
  import purple from "$lib/vars/themes/purple.css?raw";
  import retro from "$lib/vars/themes/retro.css?raw";
  import browser from "$lib/vars/themes/typography-browser.css?raw";
  import airy from "$lib/vars/themes/typography-airy.css?raw";
  import ibm from "$lib/vars/themes/typography-carbon.css?raw";
  import editorial from "$lib/vars/themes/typography-editorial.css?raw";
  import modernSerif from "$lib/vars/themes/typography-modern-serif.css?raw";
  import light from "$lib/vars/themes/light.css?raw";
  import dark from "$lib/vars/themes/dark.css?raw";
  import bootstrap from "$lib/vars/themes/bootstrap.css?raw";
  import responsiveTypography from "$lib/vars/responsive-typography.css?raw";
  import boxy from "$lib/vars/boxy.css?raw";
  import flat from "$lib/vars/flat.css?raw";
  import fancyParagraphs from "$lib/vars/fancy-paragraphs.css?raw";
  import layered from "$lib/vars/layered.css?raw";
  import softCorners from "$lib/vars/soft-corners.css?raw";
  import solidHeadings from "$lib/vars/solid-headings.css?raw";

  const lightordark = `@media (prefers-color-scheme: light) {\n${light}\n}\n@media (prefers-color-scheme: dark) {\n${dark}\n}`;

  let fullThemes = [
    { name: "None", css: "", file: "" },
    { name: "Bootstrap", css: bootstrap, file: "themes/bootstrap.css" },
    { name: "Material", css: material, file: "themes/material.css" },
    { name: "Retro", css: retro, file: "themes/retro.css" },
    {
      name: "Canyon + Modern Serif + Fancy Paragraphs",
      css: [canyon, modernSerif, fancyParagraphs].join("\n"),
      file: "themes/canyon-modern-serif-fancy.css",
    },
    {
      name: "Forest + Editorial Serif + Rounded Corners",
      css: [forest, editorial, softCorners].join("\n"),
      file: "themes/forest-editorial-rounded.css",
    },
    {
      name: "Dark + IBM Plex + Layered Depth",
      css: [dark, ibm, layered].join("\n"),
      file: "themes/dark-ibm-layered.css",
    },
    {
      name: "Light + Airy + Solid Headings",
      css: [light, airy, solidHeadings].join("\n"),
      file: "themes/light-airy-solid.css",
    },
  ];

  let colorThemes = [
    {
      name: "Light or Dark",
      css: lightordark,
      file: "themes/lightordark.css",
    },
    { name: "Light", css: light, file: "themes/light.css" },
    { name: "Dark", css: dark, file: "themes/dark.css" },
    { name: "Purple", css: purple, file: "themes/purple.css" },
    { name: "Forest", css: forest, file: "themes/forest.css" },
    { name: "Canyon", css: canyon, file: "themes/canyon.css" },
    { name: "Defaults", css: "", file: "" },
  ];

  let typographyThemes = [
    { name: "Airy", css: airy, file: "themes/typography-airy.css" },
    {
      name: "Browser Defaults",
      css: browser,
      file: "themes/typography-browser.css",
    },
    { name: "IBM Plex", css: ibm, file: "themes/typography-carbon.css" },
    {
      name: "Editorial Serif",
      css: editorial,
      file: "themes/typography-editorial.css",
    },
    {
      name: "Modern Serif",
      css: modernSerif,
      file: "themes/typography-modern-serif.css",
    },
    { name: "Defaults", css: "", file: "" },
  ];

  let extraThemes = [
    {
      name: "Responsive Typography",
      css: responsiveTypography,
      file: "responsive-typography.css",
    },
    {
      name: "Solid Headings",
      css: solidHeadings,
      file: "solid-headings.css",
    },
    {
      name: "Soft Corners",
      css: softCorners,
      file: "soft-corners.css",
    },
    { name: "Sharp Edges", css: boxy, file: "boxy.css" },
    {
      name: "Flat Surfaces",
      css: flat,
      file: "flat.css",
    },
    {
      name: "Layered Depth",
      css: layered,
      file: "layered.css",
    },
    {
      name: "Fancy Paragraphs",
      css: fancyParagraphs,
      file: "fancy-paragraphs.css",
    },
  ];
  let enabledExtraThemes = extraThemes.map(() => false);

  let rawCss = "";

  import RadioButton from "$lib/controls/RadioButton.svelte";
  import { onMount } from "svelte";
  import Container from "$lib/layout/Container.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  export let includeBlurb = true;

  let fullTheme = 0;
  let typographyTheme = 0;
  let colorTheme = 0;
  let ready = false;

  $: usingFullTheme = fullTheme !== 0;

  function injectStyle(uid: string, css: string) {
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

  function applyAllThemes() {
    injectStyle("full", usingFullTheme ? fullThemes[fullTheme].css : "");
    injectStyle("color", usingFullTheme ? "" : colorThemes[colorTheme].css);
    injectStyle(
      "typography",
      usingFullTheme ? "" : typographyThemes[typographyTheme].css
    );
    injectStyle("extra-raw", rawCss ? `:root { ${rawCss} }` : "");

    for (let i = 0; i < extraThemes.length; i++) {
      injectStyle(`extra-${i}`, enabledExtraThemes[i] ? extraThemes[i].css : "");
    }
  }

  onMount(() => {
    ready = true;
    applyAllThemes();
  });

  $: if (ready) {
    fullTheme;
    colorTheme;
    typographyTheme;
    enabledExtraThemes;
    rawCss;
    applyAllThemes();
  }

  function buildThemeCode(
    fullThemeIndex: number,
    colorThemeIndex: number,
    typographyThemeIndex: number,
    enabledExtras: boolean[],
    rawCssValue: string,
  ) {
    let themeFiles = [
      "defaults.css",
    ];

    if (fullThemeIndex !== 0) {
      if (fullThemes[fullThemeIndex].file) {
        themeFiles.push(fullThemes[fullThemeIndex].file);
      }
    } else {
      if (colorThemes[colorThemeIndex].file) {
        themeFiles.push(colorThemes[colorThemeIndex].file);
      }
      if (typographyThemes[typographyThemeIndex].file) {
        themeFiles.push(typographyThemes[typographyThemeIndex].file);
      }
    }

    themeFiles.push(
      ...extraThemes
        .map((theme, i) => (enabledExtras[i] ? theme.file : ""))
        .filter(Boolean),
    );

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
    if (rawCssValue) {
      styleTag =
        `\n\n<sty` +
        `le>
:root {
  ${rawCssValue.replace(/\n/g, "\n\t")}
}
</sty` +
        "le>";
    }

    return scriptTag + styleTag;
  }

  $: themeCode = buildThemeCode(
    fullTheme,
    colorTheme,
    typographyTheme,
    [...enabledExtraThemes],
    rawCss,
  );
  let showCode = false;
</script>

{#if includeBlurb}
  <TextLayout>
    <h2>Themes</h2>
    <p>
      ContainCSS uses CSS properties for theming. You can combine a color theme,
      a typography theme, and additive tweaks, or choose a full preset.
    </p>
  </TextLayout>
{/if}

<Container>
  <FormItem fullWidth>
    <span slot="label">Full Theme Preset</span>
    {#each fullThemes as theme, i}
      <RadioButton bind:group={fullTheme} value={i}>{theme.name}</RadioButton>
    {/each}
  </FormItem>

  {#if !usingFullTheme}
    <FormItem fullWidth>
      <span slot="label">Color</span>
      {#each colorThemes as theme, i}
        <RadioButton bind:group={colorTheme} value={i}>{theme.name}</RadioButton>
      {/each}
    </FormItem>

    <FormItem fullWidth>
      <span slot="label">Typography</span>
      {#each typographyThemes as theme, i}
        <RadioButton bind:group={typographyTheme} value={i}>{theme.name}</RadioButton>
      {/each}
    </FormItem>
  {/if}

  <FormItem fullWidth>
    <span slot="label">Add-ons</span>
    {#each extraThemes as theme, i}
      <Checkbox bind:checked={enabledExtraThemes[i]}>{theme.name}</Checkbox>
    {/each}
  </FormItem>
  <FormItem>
    <span slot="label">Extra Variables</span>
    <textarea placeholder="--bg: red;" bind:value={rawCss}></textarea>
  </FormItem>
  <FormItem fullWidth>
    <Checkbox bind:checked={showCode}>Show code</Checkbox>
  </FormItem>
  {#if showCode}
    <Code code={themeCode} language="html" />
  {/if}
</Container>
