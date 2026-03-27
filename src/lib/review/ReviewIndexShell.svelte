<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    title: string;
    description: string;
    children?: Snippet;
  }

  let { title, description, children }: Props = $props();
</script>

<div class="review-index-shell">
  <main class="review-index-panel">
    <header class="review-index-header">
      <p class="review-index-kicker">Review Harness</p>
      <h1>{title}</h1>
      <p class="review-index-description">{description}</p>
    </header>

    <div class="review-index-content">
      {@render children?.()}
    </div>
  </main>
</div>

<style>
  .review-index-shell {
    min-height: 100vh;
    padding: clamp(1.5rem, 4vw, 3rem);
    background:
      radial-gradient(
        circle at top,
        color-mix(in srgb, var(--primary-bg, #2563eb) 10%, transparent),
        transparent 45%
      ),
      var(--body-bg, var(--bg, #f8fafc));
    color: var(--body-fg, var(--fg, #1f2937));
  }

  .review-index-panel {
    width: min(100%, 52rem);
    margin: 0 auto;
    padding: clamp(1.25rem, 3vw, 2rem);
    background: var(--surface-bg, var(--bg, #ffffff));
    color: var(--surface-fg, var(--fg, #1f2937));
    border: 1px solid
      color-mix(in srgb, var(--border-color, currentColor) 55%, transparent);
    border-radius: var(--card-border-radius, 1rem);
    box-shadow:
      0 1.25rem 3rem color-mix(in srgb, var(--shadow-color, #111827) 18%, transparent);
  }

  .review-index-header {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .review-index-kicker {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--primary-bg, var(--link-fg, #2563eb));
  }

  h1 {
    margin: 0;
  }

  .review-index-description {
    margin: 0;
    max-width: 42rem;
    color: color-mix(in srgb, currentColor 78%, transparent);
  }

  .review-index-content {
    display: grid;
    gap: 1.5rem;
  }

  .review-index-content :global(h2) {
    margin: 0 0 0.75rem;
  }

  .review-index-content :global(ul) {
    margin: 0;
    padding-left: 1.25rem;
    display: grid;
    gap: 0.75rem;
  }

  .review-index-content :global(a) {
    color: var(--link-fg, var(--primary-bg, #2563eb));
    text-decoration-thickness: 0.08em;
    text-underline-offset: 0.16em;
  }

  .review-index-content :global(a:hover) {
    color: var(--link-hover-fg, var(--link-fg, var(--primary-bg, #1d4ed8)));
  }
</style>
