<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import Card from "$lib/Card.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import ReviewThemeStyle from "$lib/review/ReviewThemeStyle.svelte";
  import { reviewThemes, isReviewThemeName } from "$lib/review/themes";
  import {
    headingPresets,
    isHeadingPresetName,
    type SurfaceId,
  } from "./presets";
  import HeadingSpecimen from "./HeadingSpecimen.svelte";

  /* Heading color specimen: one preset x one theme, rendered on every kind
     of surface, with the overrides each colored surface needs for that
     preset shown under it. ?theme=<review theme>&preset=<preset>, and
     &recipes=off to see the surfaces without their overrides. Each block is
     a data-audit-target for screenshots. The query is read only in the
     browser: the route is prerendered, where searchParams is off-limits. */
  const params = $derived(browser ? page.url.searchParams : null);
  const themeName = $derived.by(() => {
    const t = params?.get("theme") ?? "light";
    return isReviewThemeName(t) ? t : "light";
  });
  const presetName = $derived.by(() => {
    const p = params?.get("preset") ?? "default";
    return isHeadingPresetName(p) ? p : "default";
  });
  const recipesOn = $derived(params?.get("recipes") !== "off");
  const preset = $derived(headingPresets[presetName]);
  const css = $derived(reviewThemes[themeName].css + "\n" + preset.css);

  const surfaces: { id: SurfaceId; label: string; vars?: Record<string, string> }[] = [
    { id: "card", label: "Card (theme surface)" },
    {
      id: "dark",
      label: "Dark Tile",
      vars: { "--tile-bg": "#1f2933", "--tile-fg": "#f5f1e8" },
    },
    {
      id: "primary",
      label: "Primary Tile",
      vars: { "--tile-bg": "var(--primary-bg)", "--tile-fg": "var(--primary-fg)" },
    },
    {
      id: "warning",
      label: "Warning Tile",
      vars: { "--tile-bg": "var(--warning-bg)", "--tile-fg": "var(--warning-fg)" },
    },
    {
      id: "remapped",
      label: "Remapped Tile (mix controls)",
      vars: {
        "--tile-bg-mix-color": "black",
        "--tile-bg-mix-amount": "78%",
        "--tile-fg-mix-color": "white",
        "--tile-fg-mix-amount": "100%",
      },
    },
  ];
  const layout = "--tile-width: 100%; --tile-align: stretch; text-align: start;";
  const dark = { "--tile-bg": "#1f2933", "--tile-fg": "#f5f1e8" };

  const recipeFor = (id: SurfaceId) =>
    recipesOn ? (preset.recipes[id] ?? {}) : {};
  const nestedRecipe = $derived(recipeFor("nested"));
  const toProps = (vars: Record<string, string>) =>
    Object.entries(vars)
      .map(([k, v]) => `${k}="${v}"`)
      .join("\n  ");
</script>

<svelte:head>
  <title>Heading colors · {presetName} · {themeName}</title>
</svelte:head>

<ReviewThemeStyle id="review-heading-theme" {css} />

<div
  class="specimen"
  data-preset={presetName}
  data-theme={themeName}
  data-recipes={recipesOn ? "on" : "off"}
>
  <p class="label">
    preset <b>{presetName}</b> · theme <b>{themeName}</b> · surface overrides
    <b>{recipesOn ? "on" : "off"}</b>
  </p>
  <section data-audit-target="page">
    <p class="label">Page (TextLayout)</p>
    <TextLayout>
      <HeadingSpecimen />
    </TextLayout>
  </section>

  <div class="grid">
    {#each surfaces as s}
      {@const recipe = recipeFor(s.id)}
      <section data-audit-target={s.id} data-testid={`surface-${s.id}`}>
        <p class="label">{s.label}</p>
        {#if s.id === "card"}
          <Card><HeadingSpecimen /></Card>
        {:else}
          <Tile style={layout} {...s.vars} {...recipe}>
            <HeadingSpecimen />
          </Tile>
        {/if}
        {#if Object.keys(recipe).length}
          <pre class="recipe">&lt;Tile
  {toProps(recipe)}&gt;</pre>
        {/if}
      </section>
    {/each}

    <section data-audit-target="nested" data-testid="surface-nested">
      <p class="label">Nested: Card › dark Tile › plain div</p>
      <Card>
        <h2>Outer card</h2>
        <Tile style={layout} {...dark} {...nestedRecipe}>
          <div class="plain">
            <HeadingSpecimen levels={3} />
          </div>
        </Tile>
      </Card>
      {#if Object.keys(nestedRecipe).length}
        <pre class="recipe">&lt;Tile
  {toProps(nestedRecipe)}&gt;</pre>
      {/if}
    </section>
  </div>
</div>

<style>
  .specimen {
    padding: 16px;
    display: grid;
    gap: 24px;
  }
  .label {
    font: 12px/1.2 system-ui, sans-serif;
    opacity: 0.7;
    margin: 0 0 6px;
  }
  .recipe {
    font: 11px/1.4 ui-monospace, monospace;
    margin: 6px 0 0;
    padding: 6px 8px;
    border-radius: 4px;
    background: color-mix(in srgb, currentColor 8%, transparent);
    white-space: pre-wrap;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    align-items: start;
  }
</style>
