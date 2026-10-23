<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import Card from "$lib/Card.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import ReviewThemeStyle from "$lib/review/ReviewThemeStyle.svelte";
  import { reviewThemes, isReviewThemeName } from "$lib/review/themes";
  import { headingPresets, isHeadingPresetName } from "./presets";
  import HeadingSpecimen from "./HeadingSpecimen.svelte";

  /* Heading color specimen: one preset x one theme, rendered on every kind
     of surface. ?theme=<review theme>&preset=<preset>. Each block is a
     data-audit-target for screenshots. The query is read only in the
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
  const css = $derived(
    reviewThemes[themeName].css + "\n" + headingPresets[presetName].css,
  );

  const surfaces = [
    { id: "card", label: "Card (theme surface)" },
    {
      id: "dark",
      label: "Dark Tile",
      style: "--tile-bg: #1f2933; --tile-fg: #f5f1e8;",
    },
    {
      id: "primary",
      label: "Primary Tile",
      style: "--tile-bg: var(--primary-bg); --tile-fg: var(--primary-fg);",
    },
    {
      id: "declined",
      label: "Primary Tile, tint declined",
      style:
        "--tile-bg: var(--primary-bg); --tile-fg: var(--primary-fg); --heading-tint-scale: 0;",
    },
    {
      id: "warning",
      label: "Warning Tile",
      style: "--tile-bg: var(--warning-bg); --tile-fg: var(--warning-fg);",
    },
    {
      id: "remapped",
      label: "Remapped Tile (mix controls)",
      style:
        "--tile-bg-mix-color: black; --tile-bg-mix-amount: 78%; --tile-fg-mix-color: white; --tile-fg-mix-amount: 100%;",
    },
  ];
</script>

<svelte:head>
  <title>Heading colors · {presetName} · {themeName}</title>
</svelte:head>

<ReviewThemeStyle id="review-heading-theme" {css} />

<div class="specimen" data-preset={presetName} data-theme={themeName}>
  <p class="label">
    preset <b>{presetName}</b> · theme <b>{themeName}</b>
  </p>
  <section data-audit-target="page">
    <p class="label">Page (TextLayout)</p>
    <TextLayout>
      <HeadingSpecimen />
    </TextLayout>
  </section>

  <div class="grid">
    {#each surfaces as s}
      <section data-audit-target={s.id} data-testid={`surface-${s.id}`}>
        <p class="label">{s.label}</p>
        {#if s.id === "card"}
          <Card><HeadingSpecimen /></Card>
        {:else}
          <Tile style={`${s.style} --tile-width: 100%; --tile-align: stretch; text-align: start;`}>
            <HeadingSpecimen />
          </Tile>
        {/if}
      </section>
    {/each}

    <section data-audit-target="nested" data-testid="surface-nested">
      <p class="label">Nested: Card › dark Tile › plain div</p>
      <Card>
        <h2>Outer card</h2>
        <Tile style="--tile-bg: #1f2933; --tile-fg: #f5f1e8; --tile-width: 100%; --tile-align: stretch; text-align: start;">
          <div class="plain">
            <HeadingSpecimen levels={3} />
          </div>
        </Tile>
      </Card>
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
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    align-items: start;
  }
</style>
