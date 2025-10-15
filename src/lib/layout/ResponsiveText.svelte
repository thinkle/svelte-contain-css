<script lang="ts">
  import type { Snippet } from "svelte";

  const breakpoints = ["xs", "small", "medium", "large", "xl"] as const;

  const {
    greaterThan = null,
    smallerThan = null,
    xs,
    small,
    medium,
    large,
    xl,
    else: elseSnippet,
    greaterThan: greaterThanSnippet,
    smallerThan: smallerThanSnippet,
  }: {
    greaterThan?: (typeof breakpoints)[number] | null;
    smallerThan?: (typeof breakpoints)[number] | null;
    xs?: Snippet;
    small?: Snippet;
    medium?: Snippet;
    large?: Snippet;
    xl?: Snippet;
    else?: Snippet;
    greaterThan?: Snippet;
    smallerThan?: Snippet;
  } = $props();

  function computeSmallerThan(value: (typeof breakpoints)[number] | null) {
    if (!value) return "";
    const classes: string[] = [];
    for (const name of breakpoints) {
      classes.push(name);
      if (name === value) break;
    }
    return classes.map((name) => ` ${name}`).join("");
  }

  function computeGreaterThan(value: (typeof breakpoints)[number] | null) {
    if (!value) return "";
    const classes: string[] = [];
    for (const name of [...breakpoints].reverse()) {
      classes.push(name);
      if (name === value) break;
    }
    return classes.map((name) => ` ${name}`).join("");
  }

  const smallerThanClasses = $derived(computeSmallerThan(smallerThan));
  const greaterThanClasses = $derived(computeGreaterThan(greaterThan));

  const hasXs = $derived(Boolean(xs));
  const hasSmall = $derived(Boolean(small));
  const hasMedium = $derived(Boolean(medium));
  const hasLarge = $derived(Boolean(large));
  const hasXl = $derived(Boolean(xl));
</script>

<span class="xs">{@render xs?.()}</span>
<span class="small">{@render small?.()}</span>
<span class="medium">{@render medium?.()}</span>
<span class="large">{@render large?.()}</span>
<span class="xl">{@render xl?.()}</span>
<span
  class="else"
  class:xs={!hasXs}
  class:small={!hasSmall}
  class:medium={!hasMedium}
  class:large={!hasLarge}
  class:xl={!hasXl}
>
  {@render elseSnippet?.()}
</span>
<span class={greaterThanClasses}>{@render greaterThanSnippet?.()}</span>
<span class={smallerThanClasses}>{@render smallerThanSnippet?.()}</span>

<style>
  .xs,
  .small,
  .medium,
  .large,
  .xl {
    display: none;
  }
  @container (max-width: 240px) {
    .xs {
      display: contents;
    }
  }
  @container (min-width: 241px) and (max-width: 480px) {
    .small {
      display: contents;
    }
  }
  @container (min-width: 481px) and (max-width: 720px) {
    .medium {
      display: contents;
    }
  }
  @container (min-width: 721px) and (max-width: 1024px) {
    .large {
      display: contents;
    }
  }
  @container (min-width: 1025px) {
    .xl {
      display: contents;
    }
  }
  .else.render {
    display: contents;
  }
</style>
