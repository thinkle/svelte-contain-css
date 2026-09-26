<script lang="ts">
  import Tooltip from "$lib/overlays/Tooltip.svelte";
  import Button from "$lib/controls/Button.svelte";

  // Regression test for tooltip anchoring when the direct child of <Tooltip>
  // has no layout box of its own.
  //
  // The classic break: passing a --custom-property to a component makes Svelte
  // wrap it in <svelte-css-wrapper style="display: contents">, so the tooltip's
  // first element child measures as a 0x0 rect at the viewport origin and the
  // tooltip renders in the top-left corner instead of next to the button.
  //
  // Text-node children have the same class of problem: there is no element to
  // measure at all.

  const score = 42;
</script>

<h1>Tooltip anchor test</h1>

<div class="row">
  <span data-testid="anchor-plain">
    <Tooltip tooltipText="plain element child">
      <Button>plain</Button>
    </Tooltip>
  </span>
</div>

<div class="row">
  <span data-testid="anchor-cssprop">
    <Tooltip tooltipText="css-prop child">
      <Button --button-border-radius="50%">cssprop</Button>
    </Tooltip>
  </span>
</div>

<div class="row">
  <span data-testid="anchor-contents">
    <Tooltip tooltipText="display:contents child">
      <span style="display: contents"><Button>contents</Button></span>
    </Tooltip>
  </span>
</div>

<div class="row">
  <span data-testid="anchor-text">
    <Tooltip tooltipText="bare text child">bare text</Tooltip>
  </span>
</div>

<div class="row">
  <span data-testid="anchor-interpolation">
    <Tooltip tooltipText="interpolation child">{score}</Tooltip>
  </span>
</div>

<div class="row">
  <span data-testid="anchor-rich">
    <Tooltip>
      {#snippet tooltip()}
        <p>rich tooltip body</p>
      {/snippet}
      <Button>rich</Button>
    </Tooltip>
  </span>
</div>

<!-- Pinned against the viewport's bottom and right edges, so the tooltip has
     to flip: above the target, and to its left. -->
<span data-testid="anchor-bottom" class="pin" style="bottom: 12px; left: 40%;">
  <Tooltip tooltipText="flips above a target at the bottom edge">
    <Button>bottom</Button>
  </Tooltip>
</span>
<span data-testid="anchor-right" class="pin" style="top: 40%; right: 12px;">
  <Tooltip tooltipText="flips left of a target at the right edge">
    <Button>right</Button>
  </Tooltip>
</span>

<div class="tall-spacer"></div>

<style>
  .tall-spacer {
    /* Give the page room to scroll. */
    height: 150vh;
  }
  .pin {
    position: fixed;
  }
  .row {
    /* Push targets well away from the viewport origin so a mis-anchored
       tooltip (0,0) is unambiguously distinguishable from a correct one. */
    margin: 3rem 0 3rem 12rem;
  }
</style>
