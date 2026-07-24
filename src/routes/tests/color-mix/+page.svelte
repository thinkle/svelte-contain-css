<script lang="ts">
  // Deterministic fixtures for tests/color-mix.spec.ts. Kept static (no
  // controls) so assertions read computed styles off stable, known nodes.
  import Tag from "$lib/misc/Tag.svelte";
  import Button from "$lib/controls/Button.svelte";
  import "$lib/vars/defaults.css";
</script>

<!-- Baselines: variant tags with NO mix scope -->
<div data-testid="baseline">
  <Tag danger>danger</Tag>
  <Tag success>success</Tag>
</div>

<!-- No-op: an explicit 0% mix must render identically to the baseline
     (guards the newly-added `tag` fallback from shifting variant colors) -->
<div
  data-testid="zero-mix"
  style="--tag-bg-mix-color: black; --tag-bg-mix-amount: 0%; --tag-fg-mix-color: white; --tag-fg-mix-amount: 0%;"
>
  <Tag danger>danger</Tag>
  <Tag success>success</Tag>
</div>

<!-- Background-only mix: bg must change, fg must stay equal to baseline -->
<div
  data-testid="bg-only"
  style="--tag-bg-mix-color: black; --tag-bg-mix-amount: 60%;"
>
  <Tag danger>danger</Tag>
</div>

<!-- Foreground-only mix: fg must change, bg must stay equal to baseline -->
<div
  data-testid="fg-only"
  style="--tag-fg-mix-color: black; --tag-fg-mix-amount: 100%;"
>
  <Tag danger>danger</Tag>
</div>

<!-- Whole-family remap via the component-level prefix (no per-variant vars) -->
<div data-testid="btn-default">
  <Button primary>Primary</Button>
  <Button danger>Danger</Button>
  <Button success>Success</Button>
</div>
<div
  data-testid="btn-remapped"
  style="--button-bg-mix-color: black; --button-bg-mix-amount: 65%; --button-fg-mix-color: white; --button-fg-mix-amount: 100%;"
>
  <Button primary>Primary</Button>
  <Button danger>Danger</Button>
  <Button success>Success</Button>
</div>
