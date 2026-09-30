<script lang="ts">
  import Tooltip from "$lib/overlays/Tooltip.svelte";
  import Dialog from "$lib/overlays/Dialog.svelte";
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import Tag from "$lib/misc/Tag.svelte";

  // Regression test: an overlay is a DOM child of wherever it was placed, and
  // the top layer doesn't change inheritance. Each overlay below sits inside a
  // `.hostile` host -- nowrap, centred, bold, uppercase, italic, spaced out,
  // a pointer cursor -- the way a roster's name cell or a table header would
  // be. Its own text must still wrap and render with its own defaults.

  const longText =
    'Formerly limited English proficient, not enrolled in an ELL program (Aspen: "Not enrolled in an ELLP"). ' +
    "This sentence is here to make sure the tooltip is far wider than its max-width if it does not wrap.";

  // The triggers are Tags, as in the roster that found this; the tabindex
  // spans let the test open them by focus rather than a pointer.
  let dialogOpen = $state(false);
</script>

<h1>Overlay inheritance test</h1>

<table>
  <thead>
    <tr>
      <th class="hostile">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="hostile" data-testid="host-cell">
        Name
        <span data-testid="tip-default">
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <Tooltip tooltipText={longText}><span tabindex="0"><Tag>ELL</Tag></span></Tooltip>
        </span>
        <!-- The --tooltip-* vars must still win over the reset. -->
        <span data-testid="tip-themed">
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <Tooltip
            tooltipText="themed"
            --tooltip-white-space="nowrap"
            --tooltip-font-weight="900"
            --tooltip-text-align="right"
            --tooltip-text-transform="lowercase"
          ><span tabindex="0"><Tag>themed</Tag></span></Tooltip>
        </span>
      </td>
    </tr>
    <tr>
      <td class="hostile">
        <span data-testid="menu">
          <DropdownMenu>
            {#snippet label()}Menu{/snippet}
            <li><button type="button">A long menu item that ought to wrap inside its menu</button></li>
          </DropdownMenu>
        </span>
      </td>
    </tr>
    <tr>
      <td class="hostile">
        <button type="button" data-testid="open-dialog" onclick={() => (dialogOpen = true)}>
          Open dialog
        </button>
        {#if dialogOpen}
          <Dialog onclose={() => (dialogOpen = false)} data-testid="dialog">
            <p data-testid="dialog-text">{longText}</p>
          </Dialog>
        {/if}
      </td>
    </tr>
  </tbody>
</table>

<style>
  table {
    margin: 3rem 0 0 12rem;
  }
  .hostile {
    white-space: nowrap;
    text-align: center;
    font-weight: bold;
    font-style: italic;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-variant: small-caps;
    text-indent: 2em;
    line-height: 3;
    word-break: break-all;
    cursor: pointer;
    /* Theming reaches the overlay by custom-property inheritance; that has
       to keep working. */
    --tooltip-bg: rgb(255, 250, 205);
  }
</style>
