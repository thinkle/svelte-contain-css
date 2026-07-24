<script lang="ts">
  import Tag from "$lib/misc/Tag.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";

  // ---- Interactive "mute the tags" controls -------------------------------
  let bgAmount = $state(20);
  let bgColor = $state("#808080");
  let fgAmount = $state(0);
  let fgColor = $state("#808080");

  // ---- Interactive "remap the buttons" control ----------------------------
  let btnBgAmount = $state(65);

  const VARIANTS = ["primary", "warning", "danger", "success", "info"] as const;

  // Live WCAG contrast readout. color-mix() reduces contrast between an fg/bg
  // pair as the amount climbs, so an AA-passing variant can silently drop
  // below AA once muted — surfacing the number makes that tradeoff visible
  // instead of leaving it to the eye. getComputedStyle resolves color-mix()
  // to concrete rgb in every current browser, so we just read the rendered
  // colors back off each tag rather than recomputing the mix ourselves.
  let tagEls = $state<Record<string, HTMLElement | undefined>>({});
  let ratios = $state<Record<string, number>>({});

  // Resolve ANY computed color string to 0–255 rgb by rasterizing it on a
  // 1×1 canvas. getComputedStyle returns color-mix() results in
  // `color(srgb 0.5 0.5 0.5)` float form (not rgb(0-255)) in Chromium, plus
  // oklab/hex/named elsewhere — a regex can't cover all of those, but the
  // canvas rasterizer normalizes every valid CSS color for free.
  let probeCtx: CanvasRenderingContext2D | null = null;
  function toRGB(color: string): [number, number, number] {
    if (!probeCtx) {
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      probeCtx = c.getContext("2d", { willReadFrequently: true });
    }
    if (!probeCtx) return [0, 0, 0];
    probeCtx.clearRect(0, 0, 1, 1);
    probeCtx.fillStyle = "#000";
    probeCtx.fillStyle = color; // ignored if the browser can't parse it
    probeCtx.fillRect(0, 0, 1, 1);
    const [r, g, b] = probeCtx.getImageData(0, 0, 1, 1).data;
    return [r, g, b];
  }
  function relLuminance([r, g, b]: [number, number, number]): number {
    const lin = (c: number) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  }
  function contrast(fg: string, bg: string): number {
    const l1 = relLuminance(toRGB(fg));
    const l2 = relLuminance(toRGB(bg));
    const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (hi + 0.05) / (lo + 0.05);
  }

  // Re-measure whenever any knob changes. The dependency reads make this
  // effect re-run on each; requestAnimationFrame lets the style system apply
  // the new custom-property values before we read them back.
  $effect(() => {
    // touch the reactive inputs so the effect re-runs when they change
    void [bgAmount, bgColor, fgAmount, fgColor];
    const id = requestAnimationFrame(() => {
      const next: Record<string, number> = {};
      for (const v of VARIANTS) {
        // Measure the actual .tag element, not the wrapper span the ref is
        // on — the wrapper has no background of its own, so reading it gives
        // every variant an identical (wrong) ratio.
        const el = tagEls[v]?.querySelector(".tag");
        if (!el) continue;
        const cs = getComputedStyle(el);
        next[v] = contrast(cs.color, cs.backgroundColor);
      }
      ratios = next;
    });
    return () => cancelAnimationFrame(id);
  });

  const rounded = (n: number | undefined) => (n ? n.toFixed(2) : "—");
  const passLabel = (n: number | undefined) =>
    n == null ? "" : n >= 4.5 ? "AA" : n >= 3 ? "AA large" : "fail";
</script>

<TextLayout>
  <h2>Color mixing</h2>
  <p>
    Any component styled through the <code>color-props</code> mixin can have its
    resolved foreground and background mixed toward another color, per channel,
    without restating the color itself. It's driven by four custom properties
    that mirror the base <code>--bg</code> / <code>--fg</code> tokens:
  </p>
  <ul>
    <li><code>--bg-mix-color</code> / <code>--bg-mix-amount</code></li>
    <li><code>--fg-mix-color</code> / <code>--fg-mix-amount</code></li>
  </ul>
  <p>
    They resolve along the same prefix chain as the color itself
    (<code>--tag-danger-bg-mix-color</code> → <code>--danger-bg-mix-color</code>
    → <code>--tag-bg-mix-color</code> → <code>--bg-mix-color</code>), so you can
    scope a mix to one variant, one component, or — via the bare global — the
    whole app. Defaults (amount <code>0%</code>, color <code>transparent</code>)
    are a no-op.
  </p>
</TextLayout>

<!-- 1. Interactive: dull a whole component's palette --------------------- -->
<TextLayout>
  <h3>Muting a component's palette</h3>
</TextLayout>
<DemoWithCode
  summary="See the CSS"
  code={`<!-- Set on any ancestor; every Tag inside inherits it -->
<div style="--tag-bg-mix-color: ${bgColor}; --tag-bg-mix-amount: ${bgAmount}%;
            --tag-fg-mix-color: ${fgColor}; --tag-fg-mix-amount: ${fgAmount}%;">
  <Tag primary>primary</Tag>
  <Tag warning>warning</Tag>
  <Tag danger>danger</Tag>
  <Tag success>success</Tag>
  <Tag info>info</Tag>
</div>`}
>
  {#snippet inputArea()}
    <Stack gap="var(--space-md)">
      <Inline gap="var(--space-lg)" wrap="wrap">
        <FormItem>
          {#snippet label()}<span>Background mix: {bgAmount}%</span>{/snippet}
          <Slider bind:value={bgAmount} min={0} max={100} />
        </FormItem>
        <label>bg color <input type="color" bind:value={bgColor} /></label>
      </Inline>
      <Inline gap="var(--space-lg)" wrap="wrap">
        <FormItem>
          {#snippet label()}<span>Foreground mix: {fgAmount}%</span>{/snippet}
          <Slider bind:value={fgAmount} min={0} max={100} />
        </FormItem>
        <label>fg color <input type="color" bind:value={fgColor} /></label>
      </Inline>
      <p class="hint">
        Leave foreground at 0% for a classic "dulled but still legible" tag
        (only the background loses saturation). Watch the contrast numbers as
        you push either slider — that's the accessibility cost made visible.
      </p>
    </Stack>
  {/snippet}

  <div
    class="mix-scope"
    style="--tag-bg-mix-color: {bgColor}; --tag-bg-mix-amount: {bgAmount}%; --tag-fg-mix-color: {fgColor}; --tag-fg-mix-amount: {fgAmount}%;"
  >
    <Inline gap="var(--space-lg)" wrap="wrap">
      {#each VARIANTS as v (v)}
        <div class="swatch">
          <span bind:this={tagEls[v]}>
            <Tag primary={v === "primary"} warning={v === "warning"} danger={v === "danger"} success={v === "success"} info={v === "info"}>
              {v}
            </Tag>
          </span>
          <small class="ratio" class:fail={ratios[v] != null && ratios[v] < 3}>
            {rounded(ratios[v])}:1 {passLabel(ratios[v])}
          </small>
        </div>
      {/each}
    </Inline>
  </div>
</DemoWithCode>

<!-- 2. Remap a whole component family ------------------------------------ -->
<TextLayout>
  <h3>Remapping a whole family</h3>
  <p>
    Because <code>Button</code> already threads <code>button</code> through its
    color chain, one ancestor can recolor every button variant at once — here,
    mixing heavily toward black on the background and fully to white on the
    text yields a uniform white-on-dark scheme while each variant keeps a hint
    of its own hue underneath. No change to <code>Button</code> was needed for
    this.
  </p>
</TextLayout>
<DemoWithCode
  summary="See the CSS"
  code={`<div style="--button-bg-mix-color: black; --button-bg-mix-amount: ${btnBgAmount}%;
            --button-fg-mix-color: white; --button-fg-mix-amount: 100%;">
  <Button primary>Primary</Button>
  <Button danger>Danger</Button>
  <Button success>Success</Button>
  <Button info>Info</Button>
</div>`}
>
  {#snippet inputArea()}
    <FormItem>
      {#snippet label()}<span>Black mixed into background: {btnBgAmount}%</span>{/snippet}
      <Slider bind:value={btnBgAmount} min={0} max={100} />
    </FormItem>
    <p class="hint">
      Text is fixed at 100% white; slide the background mix from 0 (untouched
      variant colors) to 100 (pure black). The sweet spot in the middle keeps
      a readable hint of each variant's hue.
    </p>
  {/snippet}

  <Inline gap="var(--space-lg)" wrap="wrap">
    <div>
      <p class="hint">Default</p>
      <Inline gap="var(--space-md)" wrap="wrap">
        <Button primary>Primary</Button>
        <Button danger>Danger</Button>
        <Button success>Success</Button>
        <Button info>Info</Button>
      </Inline>
    </div>
    <div
      style="--button-bg-mix-color: black; --button-bg-mix-amount: {btnBgAmount}%; --button-fg-mix-color: white; --button-fg-mix-amount: 100%;"
    >
      <p class="hint">Mixed toward a dark scheme ({btnBgAmount}%)</p>
      <Inline gap="var(--space-md)" wrap="wrap">
        <Button primary>Primary</Button>
        <Button danger>Danger</Button>
        <Button success>Success</Button>
        <Button info>Info</Button>
      </Inline>
    </div>
  </Inline>
</DemoWithCode>

<!-- 3. No-op + edge cases ------------------------------------------------- -->
<TextLayout>
  <h3>Defaults and edge cases</h3>
  <p>
    With nothing set, output is identical to before this feature existed —
    <code>color-mix(in srgb, X, transparent 0%)</code> is exactly <code>X</code>.
    A component with no color context at all (no variant, no tokens) also stays
    well-defined: the mix of an unresolved color is simply dropped by the
    browser, same as it would be without mixing.
  </p>
</TextLayout>
<DemoWithCode>
  <Inline gap="var(--space-lg)" wrap="wrap">
    <Tag primary>primary</Tag>
    <Tag warning>warning</Tag>
    <Tag danger>danger</Tag>
    <Tag success>success</Tag>
    <Tag info>info</Tag>
    <Tag>plain</Tag>
  </Inline>
</DemoWithCode>

<style>
  .swatch {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm, 0.35rem);
  }
  .ratio {
    font-variant-numeric: tabular-nums;
    opacity: 0.7;
    font-size: 0.75rem;
  }
  .ratio.fail {
    color: var(--danger-bg, crimson);
    opacity: 1;
    font-weight: 600;
  }
  .hint {
    opacity: 0.7;
    font-size: 0.85rem;
    margin: 0 0 var(--space-sm, 0.5rem);
  }
  .mix-scope {
    padding: var(--space-md);
  }
</style>
