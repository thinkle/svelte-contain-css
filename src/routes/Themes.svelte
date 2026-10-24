<script lang="ts">
  import { base } from "$app/paths";
  import { themeState } from "$lib/theme/themeState.svelte";
  import {
    fullThemes,
    colorThemes,
    typographyThemes,
    extraThemes,
  } from "$lib/theme/themeConfig";
  import {
    TextLayout,
    Code,
    Checkbox,
    FormItem,
    RadioButton,
    FormProvider,
  } from "$lib";
  import { reviewAppScenarios } from "$lib/review/scenarios";
  import { themePreviewHash } from "$lib/theme/themePreview";
  import TabBar from "$lib/layout/TabBar.svelte";

  const usingFullTheme = $derived(themeState.fullTheme !== 0);

  let showCode = $state(false);

  function buildThemeCode(
    fullThemeIndex: number,
    colorThemeIndex: number,
    typographyThemeIndex: number,
    enabledExtras: boolean[],
    rawCss: string,
  ) {
    const files: string[] = ["defaults.css"];
    if (fullThemeIndex !== 0) {
      if (fullThemes[fullThemeIndex].file) {
        files.push(fullThemes[fullThemeIndex].file);
      }
    } else {
      if (colorThemes[colorThemeIndex].file) {
        files.push(colorThemes[colorThemeIndex].file);
      }
      if (typographyThemes[typographyThemeIndex].file) {
        files.push(typographyThemes[typographyThemeIndex].file);
      }
    }
    for (let i = 0; i < extraThemes.length; i++) {
      if (enabledExtras[i]) files.push(extraThemes[i].file);
    }
    const imports = files
      .map((f) => `\timport "contain-css-svelte/vars/${f}";`)
      .join("\n");
    let code = "<scri" + `pt>\n${imports}\n</scri` + "pt>";
    if (rawCss) {
      code +=
        "\n\n<sty" +
        `le>\n:root {\n\t${rawCss.replace(/\n/g, "\n\t")}\n}\n</sty` +
        "le>";
    }
    return code;
  }

  const themeCode = $derived(
    buildThemeCode(
      themeState.fullTheme,
      themeState.colorTheme,
      themeState.typographyTheme,
      [...themeState.enabledExtras],
      themeState.rawCss,
    ),
  );

  let { includeBlurb = true, showPreview = true } = $props();

  const previewOptions = Object.entries(reviewAppScenarios).map(
    ([value, { title }]) => ({ value, label: title }),
  );
  let activePreview = $state(previewOptions[0].value);
  const popOutHref = $derived(
    `${base}/preview/${activePreview}#${themePreviewHash(themeState)}`,
  );
  const PreviewComponent = $derived(
    reviewAppScenarios[activePreview as keyof typeof reviewAppScenarios]
      .component,
  );
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
      To see how a theme's headings hold up on light, dark and saturated
      surfaces, open the <a href={`${base}/review/headings?preset=editorial`}
        >heading specimen</a
      >.
    </p>
    <p>
      You can adjust this tutorial to use a theme of your choosing to get a feel
      for the power of our theming system. Just check the "Show code" box to see
      the imports and any extra variables you're using.
    </p>
    {@render themeForm()}
  </TextLayout>
{:else}
  {@render themeForm()}
{/if}
{#if showPreview}
  <TabBar
    items={previewOptions}
    active={activePreview}
    onchange={(item) => {
      if (item) activePreview = typeof item === "string" ? item : item.value;
    }}
  >
    {#snippet actions()}
      <a
        class="preview-link"
        href={popOutHref}
        target="_blank"
        rel="noopener"
        aria-label={`Open ${reviewAppScenarios[activePreview as keyof typeof reviewAppScenarios].title} full size in a new tab`}
      >
        Open full size <span aria-hidden="true">↗</span>
      </a>
    {/snippet}
  </TabBar>
  {#key activePreview}
    <div class="preview-frame" data-testid="theme-preview">
      <div class="preview-scaled">
        <PreviewComponent />
      </div>
    </div>
  {/key}
{/if}

{#snippet themeForm()}
  <FormProvider layout="above">
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
  </FormProvider>
{/snippet}

<style>
  .preview-link {
    white-space: nowrap;
    text-underline-offset: 0.2em;
  }
  .preview-frame {
    height: var(--theme-preview-height, 420px);
    overflow: hidden;
    border: 1px solid var(--border-color, currentColor);
  }
  /* Rendered at 2x size, then shrunk, so the page lays out like a desktop. */
  .preview-scaled {
    width: 200%;
    height: calc(var(--theme-preview-height, 420px) * 2);
    overflow: auto;
    overscroll-behavior: contain;
    /* Page's viewport is this embedded canvas rather than the browser. */
    --page-height: 100%;
    transform: scale(0.5);
    transform-origin: top left;
  }
</style>
