<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import Card from "$lib/Card.svelte";
  import Container from "$lib/layout/Container.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Text from "$lib/typography/Text.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import ReviewThemeStyle from "$lib/review/ReviewThemeStyle.svelte";
  import { reviewThemes, isReviewThemeName } from "$lib/review/themes";
  import {
    headingPresets,
    isHeadingPresetName,
    type SurfaceId,
  } from "./presets";
  import HeadingSpecimen from "./HeadingSpecimen.svelte";

  /* Heading color specimen: one preset x one theme, on the surfaces headings
     really land on -- the page, a Card, colored Container sections, and a
     row of ordinary Tiles -- with the overrides each colored surface needs
     for that preset shown under it. ?theme=<review theme>&preset=<preset>,
     and &recipes=off to see the surfaces without their overrides. Each block
     is a data-audit-target for screenshots. The query is read only in the
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

  type Props = Record<string, string>;
  const darkPair = { bg: "#1f2933", fg: "#f5f1e8" };

  const sections: { id: SurfaceId; label: string; props: Props }[] = [
    { id: "dark", label: "Dark Container", props: darkPair },
    {
      id: "primary",
      label: "Primary Container",
      props: { bg: "var(--primary-bg)", fg: "var(--primary-fg)" },
    },
    {
      id: "remapped",
      label: "Container remapped with mix controls",
      props: {
        "--container-bg-mix-color": "black",
        "--container-bg-mix-amount": "78%",
        "--container-fg-mix-color": "white",
        "--container-fg-mix-amount": "100%",
      },
    },
  ];

  const tiles: {
    id: SurfaceId | "tile";
    props: Props;
    title: string;
    tone: "success" | "info" | "warning" | "muted";
    note: string;
    body: string;
  }[] = [
    { id: "tile", props: {}, title: "Berths", tone: "success", note: "12 open", body: "Inner harbor, east quay." },
    {
      id: "tile-primary",
      props: { bg: "var(--primary-bg)", fg: "var(--primary-fg)" },
      title: "Pilot on call",
      tone: "info",
      note: "Ch. 14",
      body: "Request boarding an hour out.",
    },
    {
      id: "tile-warning",
      props: { bg: "var(--warning-bg)", fg: "var(--warning-fg)" },
      title: "Closures",
      tone: "warning",
      note: "2 active",
      body: "North berth closed to tenders.",
    },
    {
      id: "tile-success",
      props: { bg: "var(--success-bg)", fg: "var(--success-fg)" },
      title: "Inspections",
      tone: "success",
      note: "passed",
      body: "All moorings checked Monday.",
    },
    { id: "tile-dark", props: darkPair, title: "Night desk", tone: "muted", note: "after 6 pm", body: "Radio only; office closed." },
  ];

  const recipeFor = (id: SurfaceId | "tile"): Props =>
    recipesOn && id !== "tile" ? (preset.recipes[id] ?? {}) : {};
  const nestedRecipe = $derived(recipeFor("nested"));
  const code = (tag: string, props: Props) =>
    `<${tag}\n  ` +
    Object.entries(props)
      .map(([k, v]) => `${k}="${v}"`)
      .join("\n  ") +
    ">";
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

  <section data-audit-target="tiles">
    <p class="label">Tiles (GridLayout tile)</p>
    <GridLayout tile>
      {#each tiles as t}
        {@const recipe = recipeFor(t.id)}
        <Tile {...t.props} {...recipe} data-testid={`surface-${t.id}`}>
          <h3>{t.title} <Text {...{ [t.tone]: true }}>{t.note}</Text></h3>
          <p>{t.body}</p>
        </Tile>
      {/each}
    </GridLayout>
    {#each tiles as t}
      {@const recipe = recipeFor(t.id)}
      {#if Object.keys(recipe).length}
        <pre class="recipe">{code("Tile", { ...t.props, ...recipe })}</pre>
      {/if}
    {/each}
  </section>

  <div class="grid">
    <section data-audit-target="card" data-testid="surface-card">
      <p class="label">Card (theme surface)</p>
      <Card><HeadingSpecimen /></Card>
    </section>

    {#each sections as s}
      {@const recipe = recipeFor(s.id)}
      <section data-audit-target={s.id} data-testid={`surface-${s.id}`}>
        <p class="label">{s.label}</p>
        <Container {...s.props} {...recipe}>
          <HeadingSpecimen />
        </Container>
        {#if Object.keys(recipe).length}
          <pre class="recipe">{code("Container", { ...s.props, ...recipe })}</pre>
        {/if}
      </section>
    {/each}

    <section data-audit-target="nested" data-testid="surface-nested">
      <p class="label">Nested: Card › dark Container › plain div</p>
      <Card>
        <h2>Outer card</h2>
        <Container {...darkPair} {...nestedRecipe}>
          <div class="plain">
            <HeadingSpecimen levels={3} />
          </div>
        </Container>
      </Card>
      {#if Object.keys(nestedRecipe).length}
        <pre class="recipe">{code("Container", { ...darkPair, ...nestedRecipe })}</pre>
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
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
    align-items: start;
  }
</style>
