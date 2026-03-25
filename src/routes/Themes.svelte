<script lang="ts">
  import { themeState } from "$lib/theme/themeState.svelte";
  import {
    fullThemes,
    colorThemes,
    typographyThemes,
    extraThemes,
  } from "$lib/theme/themeConfig";
  import {
    TextLayout,
    Container,
    Code,
    Checkbox,
    FormItem,
    RadioButton,
  } from "$lib";

  const usingFullTheme = $derived(themeState.fullTheme !== 0);

  let showCode = $state(false);

  const themeCode = $derived.by(() => {
    const files: string[] = ["defaults.css"];
    if (usingFullTheme) {
      files.push(fullThemes[themeState.fullTheme].file);
    } else {
      if (colorThemes[themeState.colorTheme].file)
        files.push(colorThemes[themeState.colorTheme].file);
      if (typographyThemes[themeState.typographyTheme].file)
        files.push(typographyThemes[themeState.typographyTheme].file);
    }
    for (let i = 0; i < extraThemes.length; i++) {
      if (themeState.enabledExtras[i]) files.push(extraThemes[i].file);
    }
    const imports = files
      .map((f) => `\timport "contain-css-svelte/vars/${f}";`)
      .join("\n");
    let code = "<scri" + `pt>\n${imports}\n</scri` + "pt>";
    if (themeState.rawCss) {
      code +=
        "\n\n<sty" +
        `le>\n:root {\n\t${themeState.rawCss.replace(/\n/g, "\n\t")}\n}\n</sty` +
        "le>";
    }
    return code;
  });

  let { includeBlurb = true } = $props();
</script>

{#if includeBlurb}
  <TextLayout>
    <h2>Themes</h2>
    <p>
      ContainCSS uses CSS properties for theming. There are numerous presets
      included, and you can also write your own themes or customize presets with
      extra variables easily enough.
    </p>
    <p>
      You can adjust this tutorial to use a theme of your choosing to get a feel
      for the power of our theming system. Just check the "Show code" box to see
      the imports and any extra variables you're using.
    </p>
  </TextLayout>
{/if}
<Container>
  <FormItem fullWidth>
    {#snippet label()}<span>Full Theme Preset</span>{/snippet}
    {#each fullThemes as theme, i}
      <RadioButton bind:group={themeState.fullTheme} value={i}
        >{theme.name}</RadioButton
      >
    {/each}
  </FormItem>

  {#if !usingFullTheme}
    <FormItem fullWidth>
      {#snippet label()}<span>Color</span>{/snippet}
      {#each colorThemes as theme, i}
        <RadioButton bind:group={themeState.colorTheme} value={i}
          >{theme.name}</RadioButton
        >
      {/each}
    </FormItem>

    <FormItem fullWidth>
      {#snippet label()}<span>Typography</span>{/snippet}
      {#each typographyThemes as theme, i}
        <RadioButton bind:group={themeState.typographyTheme} value={i}
          >{theme.name}</RadioButton
        >
      {/each}
    </FormItem>
  {/if}

  <FormItem fullWidth>
    {#snippet label()}<span>Add-ons</span>{/snippet}
    {#each extraThemes as theme, i}
      <Checkbox bind:checked={themeState.enabledExtras[i]}
        >{theme.name}</Checkbox
      >
    {/each}
  </FormItem>

  <FormItem>
    {#snippet label()}<span>Extra Variables</span>{/snippet}
    <textarea placeholder="--bg: red;" bind:value={themeState.rawCss}
    ></textarea>
  </FormItem>

  <FormItem fullWidth>
    <Checkbox bind:checked={showCode}>Show code</Checkbox>
  </FormItem>

  {#if showCode}
    <Code code={themeCode} language="html" />
  {/if}
</Container>
