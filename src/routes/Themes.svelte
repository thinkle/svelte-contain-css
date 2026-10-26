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
    TextArea,
    Card,
    Input,
    Tag,
  } from "$lib";
  import type { AddOnGroup, AddOnSample } from "$lib/theme/themeConfig";
  import { combinedThemeEntries } from "$lib/theme/combinedThemes";
  import { reviewAppScenarios } from "$lib/review/scenarios";
  import { themePreviewHash } from "$lib/theme/themePreview";
  import TabBar from "$lib/layout/TabBar.svelte";

  const usingFullTheme = $derived(themeState.fullTheme !== 0);

  /* Add-ons in a group are alternatives, shown as one choice with Default;
     the rest are independent checkboxes. The state underneath stays one
     flag per add-on (enabledExtras), as the URL hash and the injector
     expect: picking an option turns its group's other flags off. */
  const GROUPS: Record<AddOnGroup, { label: string; none: string }> = {
    corners: { label: "Corners", none: "The theme's own corners." },
    depth: { label: "Depth", none: "The theme's own shadows and surface shades." },
  };
  type AddOnItem =
    | { group: null; index: number }
    | { group: AddOnGroup; indexes: number[] };
  const addOnItems: AddOnItem[] = [];
  extraThemes.forEach((theme, index) => {
    if (theme.typography) return;
    if (!theme.group) return addOnItems.push({ group: null, index });
    const existing = addOnItems.find((item) => item.group === theme.group);
    if (existing && existing.group) existing.indexes.push(index);
    else addOnItems.push({ group: theme.group, indexes: [index] });
  });
  const typographyAddOns = extraThemes
    .map((theme, index) => ({ theme, index }))
    .filter(({ theme }) => theme.typography);

  /* Base themes are complete design systems (Bootstrap, Material, Retro)
     that replace the color and type choices. The combined presets are not:
     they are just a set of picker choices, so a preset button applies those
     choices and the pickers stay in charge. (fullThemes still lists the
     combined files, so old links to them keep loading.) */
  const presetFiles = new Set<string>(combinedThemeEntries.map((p) => p.file));
  const baseThemes = fullThemes
    .map((theme, index) => ({ theme, index }))
    .filter(({ theme }) => !presetFiles.has(theme.file));
  type Preset = (typeof combinedThemeEntries)[number];
  const presetName = (p: Preset) => p.name.replaceAll(" + ", ", ");
  function applyPreset(p: Preset) {
    const at = <T extends { file: string }>(list: T[], file: string) =>
      Math.max(0, list.findIndex((t) => t.file === file));
    themeState.fullTheme = 0;
    themeState.colorTheme = at(colorThemes, p.parts.color);
    themeState.typographyTheme = at(typographyThemes, p.parts.type);
    themeState.headingTheme = at(headingThemes, p.parts.heading);
    themeState.enabledExtras = extraThemes.map((t) =>
      (p.parts.extras as readonly string[]).includes(t.file),
    );
  }

  const chosen = (indexes: number[]) =>
    indexes.find((i) => themeState.enabledExtras[i]) ?? -1;
  function choose(indexes: number[], pick: number) {
    for (const i of indexes) themeState.enabledExtras[i] = i === pick;
  }

  /* The page's text size, for the Responsive Typography sample: it changes
     with the window, so the sample says what it is right now. */
  let rootFontSize = $state("");
  $effect(() => {
    themeState.enabledExtras.forEach(() => {});
    const read = () =>
      (rootFontSize = getComputedStyle(document.documentElement).fontSize);
    const frame = requestAnimationFrame(read);
    window.addEventListener("resize", read);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", read);
    };
  });

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

{#snippet addOnSample(kind: AddOnSample)}
  {#if kind === "corners"}
    <Card --card-margin="0">Card</Card>
    <Button>Button</Button>
    <Input placeholder="Field" />
  {:else if kind === "depth"}
    <Card --card-margin="0">
      {#snippet header()}Header{/snippet}
      A card
    </Card>
    <Button primary>Button</Button>
  {:else if kind === "fields"}
    <Input placeholder="A field" />
  {/if}
{/snippet}

{#snippet themeForm()}
  <FormProvider layout="above">
    <Fieldset>
      {#snippet legend()}Base Theme{/snippet}
      <div class="addon-options">
        {#each baseThemes as { theme, index }}
          <RadioButton bind:group={themeState.fullTheme} value={index}
            >{index === 0 ? "ContainCSS" : theme.name}</RadioButton
          >
        {/each}
      </div>
      <small class="note">
        {#if usingFullTheme}
          A complete design system: it brings its own colors and type, so
          those choices are hidden.
        {:else}
          Pick colors, type and headings below, or start from a preset.
        {/if}
      </small>
      {#if !usingFullTheme}
        <div class="presets">
          {#each combinedThemeEntries as preset}
            <Button onclick={() => applyPreset(preset)}>{presetName(preset)}</Button>
          {/each}
        </div>
      {/if}
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
    {/if}

    <Fieldset>
      {#snippet legend()}Typography{/snippet}
      <div class="addons">
        <div class="addon">
          <div class="addon-text">
            {#if !usingFullTheme}
              <div class="addon-options">
                {#each typographyThemes as theme, i}
                  <RadioButton bind:group={themeState.typographyTheme} value={i}
                    >{theme.name}</RadioButton
                  >
                {/each}
              </div>
            {/if}
            {#each typographyAddOns as { theme, index }}
              <Checkbox aria-label={theme.name} bind:checked={themeState.enabledExtras[index]}
                >{theme.name}</Checkbox
              >
              <small>{theme.description}</small>
            {/each}
          </div>
          <div class="addon-sample type-sample" aria-hidden="true" inert>
            <TextLayout --prose-margin-inline="0">
              <h3>The quiet shelf</h3>
              <p>
                Once upon a time, a paragraph began with a flourish and kept
                going long enough to wrap onto a second line.
              </p>
            </TextLayout>
            <small>Body text is <strong>{rootFontSize}</strong> in this window.</small>
          </div>
        </div>
      </div>
    </Fieldset>

    <Fieldset>
      {#snippet legend()}Headings{/snippet}
      <div class="addons">
        <div class="addon">
          <div class="addon-options">
            {#each headingThemes as theme, i}
              <RadioButton bind:group={themeState.headingTheme} value={i}>{theme.name}</RadioButton>
            {/each}
          </div>
          <div class="addon-sample heading-sample" aria-hidden="true" inert>
            <TextLayout --prose-margin-inline="0">
              <h1>Heading one</h1>
              <h2>Heading two</h2>
              <h3>Heading three</h3>
              <h4>Heading four</h4>
            </TextLayout>
          </div>
        </div>
      </div>
    </Fieldset>

    <Fieldset>
      {#snippet legend()}Add-ons{/snippet}
      <!-- Each add-on with a line on what it changes and a small sample in
           the live theme: toggle it and watch the sample beside it. -->
      <div class="addons">
        {#each addOnItems as item}
          <div class="addon">
            {#if item.group}
              {@const indexes = item.indexes}
              {@const pick = chosen(indexes)}
              <div class="addon-text" role="radiogroup" aria-label={GROUPS[item.group].label}>
                <strong>{GROUPS[item.group].label}</strong>
                <div class="addon-options">
                  <RadioButton
                    name="addon-{item.group}"
                    value={-1}
                    group={pick}
                    onchange={() => choose(indexes, -1)}
                    >Default</RadioButton
                  >
                  {#each indexes as i}
                    <RadioButton
                      name="addon-{item.group}"
                      value={i}
                      group={pick}
                      onchange={() => choose(indexes, i)}
                      >{extraThemes[i].name}</RadioButton
                    >
                  {/each}
                </div>
                <small>{pick === -1 ? GROUPS[item.group].none : extraThemes[pick].description}</small>
              </div>
              <div class="addon-sample" aria-hidden="true" inert>
                {@render addOnSample(extraThemes[indexes[0]].sample)}
              </div>
            {:else}
              {@const theme = extraThemes[item.index]}
              <div class="addon-text">
                <Checkbox aria-label={theme.name} bind:checked={themeState.enabledExtras[item.index]}
                  >{theme.name}</Checkbox
                >
                <small>{theme.description}</small>
              </div>
              <div class="addon-sample" aria-hidden="true" inert>
                {@render addOnSample(theme.sample)}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </Fieldset>

    <FormItem>
      {#snippet label()}<span>Extra Variables</span>{/snippet}
      <TextArea
        placeholder="--surface-bg: lavender;&#10;--surface-raised-bg: white;"
        bind:value={themeState.rawCss}
      />
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
  .addons {
    container-type: inline-size;
    display: grid;
    gap: var(--gap, 1rem);
  }
  .addon {
    display: grid;
    gap: 0.5rem;
    align-items: center;
  }
  @container (min-width: 36rem) {
    .addon {
      grid-template-columns: minmax(14rem, 1fr) minmax(0, 1.4fr);
    }
  }
  .addon-text {
    display: grid;
    gap: 0.125rem;
  }
  .addon-text small {
    opacity: 0.8;
  }
  .addon-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1rem;
  }
  .note {
    display: block;
    opacity: 0.8;
    margin-block: 0.5rem;
  }
  .presets {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .type-sample,
  .heading-sample {
    display: block;
  }
  /* Headings in miniature: zoom scales their rem-based sizes and spacing
     too, which a smaller font-size on the wrapper would not. */
  .heading-sample {
    zoom: 0.55;
  }
  .addon-sample {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875em;
    --input-width: 9em;
    --card-width: 11em;
    --prose-margin-inline: 0;
  }
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
