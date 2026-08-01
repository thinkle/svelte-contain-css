<script lang="ts">
  import Tooltip from "$lib/overlays/Tooltip.svelte";

  // Manual test for lazy tooltip content mounting.
  // Content should NOT be in the DOM until a tooltip is first hovered/focused,
  // and positioning (including flip-up near the viewport bottom) must still be
  // correct on that FIRST show — the measurement element has to be populated
  // before it's measured.

  const cells = Array.from({ length: 40 }, (_, i) => i + 1);

  let mountedCount = $state(0);
  function countMounted() {
    // Count tooltip containers that actually have content in them.
    mountedCount = [...document.querySelectorAll(".tooltip")].filter(
      (el) => (el.textContent ?? "").trim().length > 0,
    ).length;
  }
</script>

<h1>Tooltip lazy-mount test</h1>

<p>
  <button onclick={countMounted}>Count populated .tooltip elements</button>
  <strong data-testid="count">{mountedCount}</strong>
  <br />
  Expect <strong>0</strong> before hovering anything. Each hovered tooltip adds
  2 (popover + measurement copy).
</p>

<h2>Rich snippet tooltips</h2>
<div class="grid">
  {#each cells as n}
    <Tooltip>
      {#snippet tooltip()}
        <div class="rich">
          <h3>Cell {n}</h3>
          <p>Detail line for cell {n} — deliberately chunky content.</p>
        </div>
      {/snippet}
      <span class="cell">{n}</span>
    </Tooltip>
  {/each}
</div>

<h2>Plain text tooltip</h2>
<p>
  <Tooltip tooltipText="Plain text tooltip content"
    ><span class="cell">text</span></Tooltip
  >
</p>

<h2>Keyboard focus (tab to these)</h2>
<p>
  <Tooltip tooltipText="Shown on focus, not just hover">
    <button>focusable target</button>
  </Tooltip>
</p>

<div class="spacer"></div>

<h2>Near the bottom — should flip UP on first hover</h2>
<p>
  <Tooltip vertical="bottom">
    {#snippet tooltip()}
      <div class="rich">
        <h3>Bottom edge</h3>
        <p>
          If positioning ran before content mounted, this would be measured as
          zero-height and would not flip above the target.
        </p>
      </div>
    {/snippet}
    <span class="cell">bottom</span>
  </Tooltip>
</p>

<style>
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    max-width: 400px;
  }
  .cell {
    display: inline-block;
    padding: 4px 8px;
    border: 1px solid #999;
    border-radius: 4px;
    background: #eee;
  }
  .rich {
    max-width: 260px;
  }
  .spacer {
    height: 80vh;
  }
</style>
