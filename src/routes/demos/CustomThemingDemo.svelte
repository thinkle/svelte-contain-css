<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Input from "$lib/controls/Input.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import TextArea from "$lib/controls/TextArea.svelte";
  import Card from "$lib/Card.svelte";
  import Fieldset from "$lib/layout/Fieldset.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import FormProvider from "$lib/layout/FormProvider.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Code from "$lib/misc/Code.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import { themeState } from "$lib/theme/themeState.svelte";
  import { colorThemes } from "$lib/theme/themeConfig";

  type Tier = "raised" | "sunken" | "overlay";
  const TIERS: { tier: Tier; label: string; uses: string; step: number }[] = [
    { tier: "raised", label: "Raised", uses: "Card, Tile", step: 0.03 },
    {
      tier: "sunken",
      label: "Sunken",
      uses: "Sidebar, a Card's header and footer",
      step: -0.015,
    },
    {
      tier: "overlay",
      label: "Overlay",
      uses: "DropdownMenu, Dialog (steps off raised)",
      step: 0.02,
    },
  ];
  const defaultStep = (t: Tier) => TIERS.find((x) => x.tier === t)!.step;

  type Preset = {
    name: string;
    bg: string;
    fg: string;
    primary: string;
    primaryFg: string;
    secondary: string;
    secondaryFg: string;
  };
  const PRESETS: Preset[] = [
    { name: "Light", bg: "#f4f5fb", fg: "#1b1d2e", primary: "#3949ab", primaryFg: "#ffffff", secondary: "#ad1457", secondaryFg: "#ffffff" },
    { name: "Dark", bg: "#1e2329", fg: "#e8ecef", primary: "#9fa8da", primaryFg: "#1a237e", secondary: "#f48fb1", secondaryFg: "#3b0a1e" },
    { name: "Black", bg: "#000000", fg: "#ffffff", primary: "#ffd54f", primaryFg: "#000000", secondary: "#80deea", secondaryFg: "#000000" },
    { name: "Paper", bg: "#f6f1e7", fg: "#2b2620", primary: "#8d4b2c", primaryFg: "#fffaf3", secondary: "#3f6b5c", secondaryFg: "#ffffff" },
    { name: "Midnight", bg: "#101a2e", fg: "#e3e9f4", primary: "#64b5f6", primaryFg: "#0b1a2e", secondary: "#ffab91", secondaryFg: "#2a0f05" },
  ];

  /* WCAG contrast between two hex colors. */
  function luminance(hex: string) {
    const n = parseInt(hex.slice(1), 16);
    return [n >> 16, (n >> 8) & 255, n & 255]
      .map((v) => v / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  }
  function contrast(a: string, b: string) {
    const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  }
  /* Text for a pinned background: the page's own text color if it reads
     there, else the page background (a dark pin on a light theme), else
     plain black or white. */
  function autoFg(on: string) {
    if (contrast(fg, on) >= 4.5) return fg;
    if (contrast(bg, on) >= 4.5) return bg;
    return contrast("#000000", on) >= contrast("#ffffff", on) ? "#000000" : "#ffffff";
  }

  /* A pinned color and the text on it. The text follows autoFg() until it
     is picked by hand. */
  type Pair = { color: string; fg: string; fgAuto: boolean };
  const pairFg = (p: Pair) => (p.fgAuto ? autoFg(p.color) : p.fg);

  let bg = $state(PRESETS[0].bg);
  let fg = $state(PRESETS[0].fg);
  let separateSurface = $state(false);
  let surface: Pair = $state({ color: "#ffffff", fg: "#000000", fgAuto: true });
  let primary = $state(PRESETS[0].primary);
  let primaryFg = $state(PRESETS[0].primaryFg);
  let secondary = $state(PRESETS[0].secondary);
  let secondaryFg = $state(PRESETS[0].secondaryFg);
  let depth = $state(1);
  let tiers = $state(
    Object.fromEntries(
      TIERS.map(({ tier, step }) => [
        tier,
        { pinned: false, color: "#ffffff", fg: "#000000", fgAuto: true, step },
      ]),
    ) as Record<Tier, Pair & { pinned: boolean; step: number }>,
  );

  /* Fields: a box (fill and edge) or an underline on the surface itself. The
     fill is lifted lighter than the surface by default; mixing toward the
     surface's text gives a darker well instead. */
  const FIELD_LIGHTEN = 1;
  const FIELD_FILL = 0;
  const FIELD_EDGE = 50;
  let fieldUnderline = $state(false);
  let fieldLighten = $state(FIELD_LIGHTEN);
  let fieldFill = $state(FIELD_FILL);
  let fieldEdge = $state(FIELD_EDGE);

  function usePreset(p: Preset) {
    ({ bg, fg, primary, primaryFg, secondary, secondaryFg } = p);
    separateSurface = false;
    depth = 1;
    for (const { tier, step } of TIERS) {
      tiers[tier].pinned = false;
      tiers[tier].fgAuto = true;
      tiers[tier].step = step;
    }
    surface.fgAuto = true;
  }

  /* What a theme would write: only what differs from the library's own
     defaults, so the output is the shortest theme that gives this result. */
  const themeVars = $derived.by(() => {
    const vars: [string, string][] = [
      ["--bg", bg],
      ["--fg", fg],
    ];
    if (separateSurface) {
      const text = pairFg(surface);
      vars.push(["--surface-bg", surface.color], ["--surface-fg", text === fg ? "var(--fg)" : text]);
    }
    if (depth !== 1) vars.push(["--surface-depth", String(depth)]);
    for (const { tier } of TIERS) {
      const t = tiers[tier];
      if (t.pinned) {
        const text = pairFg(t);
        vars.push(
          [`--surface-${tier}-bg`, t.color],
          [`--surface-${tier}-fg`, text === fg ? "var(--fg)" : text],
        );
      }
      else if (t.step !== defaultStep(tier))
        vars.push([`--surface-${tier}-step`, String(t.step)]);
    }
    vars.push(
      ["--primary-bg", primary],
      ["--primary-color", primary],
      ["--primary-fg", primaryFg],
      ["--secondary-bg", secondary],
      ["--secondary-color", secondary],
      ["--secondary-fg", secondaryFg],
    );
    if (fieldUnderline) {
      vars.push(
        ["--field-bg", "transparent"],
        ["--field-border-top", "none"],
        ["--field-border-inline", "none"],
        ["--field-square-radius", "0"],
        ["--textarea-min-height", "0"],
      );
    } else {
      if (fieldLighten !== FIELD_LIGHTEN) vars.push(["--field-lighten", String(fieldLighten)]);
      if (fieldFill !== FIELD_FILL) vars.push(["--field-fill-amount", `${fieldFill}%`]);
    }
    if (fieldEdge !== FIELD_EDGE) vars.push(["--field-edge-amount", `${fieldEdge}%`]);
    return vars;
  });

  const themeCss = $derived(
    `:root {\n${themeVars.map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}`,
  );

  /* The preview sits inside whatever theme this site is wearing, so it first
     puts back the library defaults that a bundled theme pins -- `initial`
     unsets a variable, and the derived ones are restated so they derive from
     this pair rather than the page's. Applying the theme to the site picks
     the "Defaults" color theme instead, which needs none of this. */
  const RESETS: [string, string][] = [
    ["--body-bg", "initial"],
    ["--body-fg", "initial"],
    ["--background-bg", "initial"],
    ["--background-fg", "initial"],
    ["--surface-bg", "var(--bg)"],
    ["--surface-fg", "var(--fg)"],
    ...TIERS.flatMap(({ tier }) => [
      [`--surface-${tier}-bg`, "initial"] as [string, string],
      [`--surface-${tier}-fg`, "initial"] as [string, string],
    ]),
    ["--surface-depth", "initial"],
    ...TIERS.flatMap(({ tier }) => [
      [`--surface-${tier}-step`, "initial"] as [string, string],
      [`--surface-${tier}-mix`, "initial"] as [string, string],
    ]),
    ["--inverse-bg", "var(--material-color-grey-800)"],
    ["--inverse-fg", "var(--white)"],
    ["--control-bg", "color-mix(in oklab, var(--surface-bg) 88%, var(--surface-fg))"],
    ["--control-fg", "var(--surface-fg)"],
    ["--border-color", "color-mix(in oklab, var(--fg) 35%, var(--bg))"],
    ["--stripe-bg", "color-mix(in srgb, var(--surface-bg) 94%, var(--surface-fg) 6%)"],
    ["--stripe-fg", "var(--surface-fg)"],
    ["--muted-color", "var(--bg)"],
    ...[
      "--field-bg", "--field-fg", "--field-fill-amount", "--field-lighten", "--field-edge-amount",
      "--field-border", "--field-border-color", "--field-border-top", "--field-border-inline",
      "--field-square-radius", "--textarea-min-height", "--focus-color", "--menu-item-bg", "--menu-item-fg",
      "--tab-bg", "--tab-fg", "--tab-active-bg", "--tab-active-fg", "--tab-bar-bg", "--tab-bar-fg",
      "--slider-track-bg", "--slider-fill-bg", "--slider-thumb-bg", "--slider-thumb-border",
    ].map((name) => [name, "initial"] as [string, string]),
  ];

  const previewStyle = $derived(
    [...RESETS, ...themeVars].map(([k, v]) => `${k}: ${v}`).join("; "),
  );

  const defaultsIndex = colorThemes.findIndex((t) => t.name === "Defaults");
  function applyToSite() {
    themeState.fullTheme = 0;
    themeState.colorTheme = defaultsIndex;
    themeState.rawCss = themeVars.map(([k, v]) => `${k}: ${v};`).join("\n");
  }
  const applied = $derived(
    themeState.colorTheme === defaultsIndex &&
      themeState.rawCss === themeVars.map(([k, v]) => `${k}: ${v};`).join("\n"),
  );
</script>

{#snippet pairControls(pair: Pair, name: string)}
  <input type="color" bind:value={pair.color} aria-label="{name} background" />
  <input
    type="color"
    value={pairFg(pair)}
    oninput={(e) => {
      pair.fg = e.currentTarget.value;
      pair.fgAuto = false;
    }}
    aria-label="{name} text"
    title="Text on it"
  />
  <code class="step" class:low={contrast(pairFg(pair), pair.color) < 4.5}>
    {contrast(pairFg(pair), pair.color).toFixed(1)}:1
  </code>
  {#if !pair.fgAuto}
    <Button onclick={() => (pair.fgAuto = true)}>Auto text</Button>
  {/if}
{/snippet}

<TextLayout>
  <h2>Custom Theming</h2>
  <p>
    Every color in ContainCSS comes from a CSS variable, and most of them come
    from just two: the page's background and foreground. Set
    <code>--bg</code> and <code>--fg</code> and you have a theme; everything
    else is optional.
  </p>

  <h3>Surfaces</h3>
  <p>
    Components sit on <em>surfaces</em>, a small ladder of backgrounds. The
    reading surface, <code>--surface-bg</code>, is the page itself unless you
    set it. The other tiers are a step off the surface: raised and overlay a
    little lighter, sunken a little darker. That reads as elevation on a
    light or a dark page alike, and <code>--surface-depth</code> scales every
    step at once (<code>0</code> is flat).
  </p>
  <table>
    <thead>
      <tr><th>Tier</th><th>Variable</th><th>Used by</th></tr>
    </thead>
    <tbody>
      <tr><td>Page</td><td><code>--bg</code> / <code>--fg</code></td><td>the page behind everything</td></tr>
      <tr><td>Surface</td><td><code>--surface-bg</code></td><td>Container, Bar, Table, Form, Page, Hero, Tabs, Accordion</td></tr>
      {#each TIERS as t}
        <tr><td>{t.label}</td><td><code>--surface-{t.tier}-bg</code></td><td>{t.uses}</td></tr>
      {/each}
    </tbody>
  </table>
  <p>
    Each tier is either <strong>stepped</strong>, by
    <code>--surface-raised-step</code> and friends (a change in oklch
    lightness, such as <code>0.03</code>), or <strong>pinned</strong> to an
    exact color with <code>--surface-raised-bg</code>. A stepped tier follows
    whatever surface it is on, including one you set locally, so a
    <code>&lt;Container --surface-bg="navy"&gt;</code> gets navy-tinted cards
    for free. Pin a tier only when you want that exact color.
  </p>
  <p>
    Accents are separate pairs: <code>--primary-bg</code> /
    <code>--primary-fg</code> and <code>--secondary-bg</code> /
    <code>--secondary-fg</code>. Quiet chrome such as a plain Button or a Tag
    and text fields are a step off whatever surface they sit on, so they need
    no colors of their own. Any component can still be colored directly with
    its own variables (<code>--card-bg</code>, <code>--button-bg</code>);
    see the Variables page.
  </p>

  <h3>Fields</h3>
  <p>
    Text fields (Input, Select, TextArea) have no colors of their own by
    default: each is a step lighter than whatever surface it sits on, the way
    a raised card is (<code>--field-lighten</code>, 1), and edged with a line
    mixed from the surface's pair (<code>--field-edge-amount</code>, 50%,
    about 3.5:1 so it stays findable). So you type in the white area of a
    grey page, in a lighter well on a dark sidebar, and in a white box with
    a visible edge on a white card. For a darker well instead, set
    <code>--field-lighten: 0</code> and <code>--field-fill-amount</code>
    (say 5%), which mixes toward the surface's text. <code>--field-bg</code>,
    <code>--field-fg</code> and <code>--field-border-color</code> pin exact
    colors instead. For underlined fields, drop the fill and the top and side
    edges, or load <code>vars/underline-fields.css</code>.
  </p>

  <h3>Try it</h3>
  <p>
    The preview below starts from the library's defaults, not this site's
    theme. When you like it, apply it to the whole site or copy the CSS.
  </p>
</TextLayout>

<div class="builder">
  <div class="controls">
    <Inline>
      {#each PRESETS as p}
        <Button onclick={() => usePreset(p)}>{p.name}</Button>
      {/each}
    </Inline>
    <FormProvider layout="side" --form-label-width="6.5rem">
      <Fieldset>
        {#snippet legend()}Page{/snippet}
        <FormItem>
          {#snippet label()}Background{/snippet}
          <input type="color" bind:value={bg} />
        </FormItem>
        <FormItem>
          {#snippet label()}Text{/snippet}
          <input type="color" bind:value={fg} />
        </FormItem>
        <FormItem>
          {#snippet label()}Surface{/snippet}
          <Inline>
            <Checkbox bind:checked={separateSurface}>Its own color</Checkbox>
            {#if separateSurface}
              {@render pairControls(surface, "Surface")}
            {/if}
          </Inline>
        </FormItem>
      </Fieldset>

      <Fieldset>
        {#snippet legend()}Tiers{/snippet}
        <FormItem>
          {#snippet label()}Depth{/snippet}
          <Inline>
            <Slider bind:value={depth} min={0} max={3} step={0.1} width="7rem" aria-label="Depth" />
            <code class="step">{depth.toFixed(1)}</code>
          </Inline>
        </FormItem>
        {#each TIERS as { tier, label: name }}
          <FormItem>
            {#snippet label()}{name}{/snippet}
            <Inline>
              <Checkbox bind:checked={tiers[tier].pinned}>Pin</Checkbox>
              {#if tiers[tier].pinned}
                {@render pairControls(tiers[tier], name)}
              {:else}
                <Slider
                  bind:value={tiers[tier].step}
                  min={-0.15}
                  max={0.15}
                  step={0.005}
                  width="7rem"
                  aria-label="{name} lightness step"
                />
                <code class="step">{tiers[tier].step > 0 ? "+" : ""}{tiers[tier].step.toFixed(3)}</code>
              {/if}
            </Inline>
          </FormItem>
        {/each}
      </Fieldset>

      <Fieldset>
        {#snippet legend()}Accents{/snippet}
        <FormItem>
          {#snippet label()}Primary{/snippet}
          <Inline>
            <input type="color" bind:value={primary} aria-label="Primary background" />
            <input type="color" bind:value={primaryFg} aria-label="Primary text" />
          </Inline>
        </FormItem>
        <FormItem>
          {#snippet label()}Secondary{/snippet}
          <Inline>
            <input type="color" bind:value={secondary} aria-label="Secondary background" />
            <input type="color" bind:value={secondaryFg} aria-label="Secondary text" />
          </Inline>
        </FormItem>
      </Fieldset>

      <Fieldset>
        {#snippet legend()}Fields{/snippet}
        <FormItem>
          {#snippet label()}Style{/snippet}
          <Checkbox bind:checked={fieldUnderline}>Underline</Checkbox>
        </FormItem>
        {#if !fieldUnderline}
          <FormItem>
            {#snippet label()}Lighter{/snippet}
            <Inline>
              <Slider bind:value={fieldLighten} min={0} max={3} step={0.1} width="7rem" aria-label="Field lift" />
              <code class="step">{fieldLighten.toFixed(1)}</code>
            </Inline>
          </FormItem>
          <FormItem>
            {#snippet label()}Toward text{/snippet}
            <Inline>
              <Slider bind:value={fieldFill} min={0} max={20} step={1} width="7rem" aria-label="Field fill toward text" />
              <code class="step">{fieldFill}%</code>
            </Inline>
          </FormItem>
        {/if}
        <FormItem>
          {#snippet label()}Edge{/snippet}
          <Inline>
            <Slider bind:value={fieldEdge} min={0} max={100} step={5} width="7rem" aria-label="Field edge" />
            <code class="step">{fieldEdge}%</code>
          </Inline>
        </FormItem>
      </Fieldset>
    </FormProvider>
  </div>

  <div class="preview" style={previewStyle} data-testid="theme-preview">
    <span class="tier-label">page</span>
    <div class="surface-sample">
      <span class="tier-label">surface</span>
      <div class="app">
        <!-- Painted like a Sidebar (the sunken tier) rather than a real one,
             which turns into a sheet at preview widths. -->
        <nav class="sunken-sample">
          <span class="tier-label">sunken</span>
          <MenuList>
            <li><button>Inbox</button></li>
            <li><button>Drafts</button></li>
            <li><button>Archive</button></li>
          </MenuList>
        </nav>
        <div class="main">
          <Card>
            {#snippet header()}<strong>Card header</strong> <span class="tier-label">sunken</span>{/snippet}
            <span class="tier-label">raised</span>
            <p>A card is raised off the surface. <a href="#top">A link</a> keeps its color on it.</p>
            <Inline>
              <Button primary>Primary</Button>
              <Button secondary>Secondary</Button>
              <Button>Plain</Button>
              <Tag>Tag</Tag>
            </Inline>
            <Input placeholder="A field" />
            <TextArea placeholder="A longer field" />
            {#snippet footer()}Card footer{/snippet}
          </Card>
          <div class="floating">
            <div class="overlay-sample">
              <span class="tier-label">overlay</span>
              <MenuList>
                <li><button>Rename</button></li>
                <li><button>Duplicate</button></li>
              </MenuList>
            </div>
            <span class="inverse-sample">A tooltip (inverse)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<TextLayout>
  <Code language="css" code={themeCss} />
  <Inline>
    <Button primary onclick={applyToSite} disabled={applied}>
      {applied ? "Applied to this site" : "Apply to this site"}
    </Button>
  </Inline>
  <p>
    Applying sets the color theme to <em>Defaults</em> and puts these lines in
    the theme picker's Extra Variables, where you can keep editing them.
  </p>
</TextLayout>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  .builder {
    container-type: inline-size;
    display: grid;
    gap: var(--gap, 1rem);
    margin-block: var(--gap, 1rem);
  }
  @container (min-width: 900px) {
    .builder {
      grid-template-columns: minmax(20rem, 2fr) 3fr;
      align-items: start;
    }
  }
  .controls {
    display: grid;
    gap: var(--gap, 1rem);
  }
  .controls input[type="color"] {
    inline-size: 3rem;
    block-size: 2rem;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }
  .step {
    min-inline-size: 4.5ch;
  }
  /* Below WCAG AA for body text. */
  .step.low {
    color: var(--danger-text-fg, var(--danger-color));
  }

  /* The preview paints the page and a surface itself, so each tier shows
     against the one below it. */
  .preview {
    background: var(--bg);
    color: var(--fg);
    padding: var(--gap, 1rem);
    border-radius: var(--border-radius, 0.5rem);
    border: 1px solid var(--border-color);
  }
  .surface-sample {
    @include color-props(theme-preview-surface, surface);
    padding: var(--gap, 1rem);
    border-radius: var(--border-radius, 0.5rem);
  }
  .app {
    display: flex;
    gap: var(--gap, 1rem);
  }
  .sunken-sample {
    @include color-props(theme-preview-sunken, surface-sunken);
    flex: 0 0 9rem;
    padding-block-start: 0.5rem;
    border-radius: var(--border-radius, 0.5rem);
  }
  .main {
    flex: 1;
    display: grid;
    gap: var(--gap, 1rem);
    align-content: start;
    min-inline-size: 0;
  }
  .floating {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    gap: var(--gap, 1rem);
  }
  .overlay-sample {
    @include color-props(theme-preview-overlay, surface-overlay);
    min-inline-size: 10rem;
    padding-block-start: 0.25rem;
    border-radius: var(--border-radius, 0.5rem);
    box-shadow: 0 0.25rem 1rem var(--shadow-color);
    overflow: hidden;
  }
  .inverse-sample {
    @include color-props(theme-preview-inverse, inverse);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: var(--font-size-small, 0.875rem);
  }
  .tier-label {
    display: block;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0.65;
    padding-inline: 0.5rem;
    margin-block-end: 0.25rem;
  }
  .preview > .tier-label {
    padding-inline: 0;
  }
</style>
