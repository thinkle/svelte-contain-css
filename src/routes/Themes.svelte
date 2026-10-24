<script lang="ts">
  import { base } from "$app/paths";
  import { themeState } from "$lib/theme/themeState.svelte";
  import {
    fullThemes,
    colorThemes,
    typographyThemes,
    extraThemes,
    headingThemes,
  } from "$lib/theme/themeConfig";
  import {
    TextLayout,
    Button,
    Code,
    Checkbox,
    FormItem,
    Fieldset,
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
    headingThemeIndex: number,
    enabledExtras: boolean[],
    rawCss: string,
  ) {
    const files: string[] = ["defaults.css"];
    if (fullThemeIndex !== 0) {
      if (fullThemes[fullThemeIndex].file) {
        const full = fullThemes[fullThemeIndex];
        files.push(...(headingThemeIndex && full.filesWithoutHeadings ? full.filesWithoutHeadings : [full.file]));
      }
    } else {
      if (colorThemes[colorThemeIndex].file) {
        files.push(colorThemes[colorThemeIndex].file);
      }
      if (typographyThemes[typographyThemeIndex].file) {
        files.push(typographyThemes[typographyThemeIndex].file);
      }
    }
    if (headingThemeIndex) files.push(headingThemes[headingThemeIndex].file);
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
      themeState.headingTheme,
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
    <Fieldset>
      {#snippet legend()}Full Theme Preset{/snippet}
      {#each fullThemes as theme, i}
        <RadioButton bind:group={themeState.fullTheme} value={i}
          >{theme.name}</RadioButton
        >
      {/each}
    </Fieldset>

    {#if !usingFullTheme}
      <Fieldset>
        {#snippet legend()}Color{/snippet}
        {#each colorThemes as theme, i}
          <RadioButton bind:group={themeState.colorTheme} value={i}
            >{theme.name}</RadioButton
          >
        {/each}
      </Fieldset>

      <Fieldset>
        {#snippet legend()}Typography{/snippet}
        {#each typographyThemes as theme, i}
          <RadioButton bind:group={themeState.typographyTheme} value={i}
            >{theme.name}</RadioButton
          >
        {/each}
      </Fieldset>
    {/if}

    <Fieldset>
      {#snippet legend()}Headings{/snippet}
      {#each headingThemes as theme, i}
        <RadioButton bind:group={themeState.headingTheme} value={i}>{theme.name}</RadioButton>
      {/each}
    </Fieldset>

    <Fieldset>
      {#snippet legend()}Add-ons{/snippet}
      {#each extraThemes as theme, i}
        <Checkbox aria-label={theme.name} bind:checked={themeState.enabledExtras[i]}
          >{theme.name}</Checkbox
        >
      {/each}
      {#if themeState.enabledExtras[extraThemes.findIndex(theme => theme.file === "layered.css")]}
        <p>
          Layered Depth adds soft shadows to cards, buttons, lists, and overlays.
          The blog preview has few of these; the effect is easiest to see on cards.
          {#if showPreview}
            <Button type="button" onclick={() => { activePreview = "layout-workbench"; }}>Preview depth on cards</Button>
          {/if}
        </p>
      {/if}
    </Fieldset>

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
