<script lang="ts">
  interface Props {
    sticky?: boolean;
    column_widths?: number[] | null;
    thead?: import("svelte").Snippet;
    tbody?: import("svelte").Snippet;
    children?: import("svelte").Snippet;
  }

  /* No attribute pass-through, deliberately: the sticky variant renders the
     header twice -- once as the visible sticky <table>, once collapsed inside
     the body table so the browser sizes the columns from it. Spreading a
     caller's `id` would emit it twice, which is invalid. Set attributes on the
     <table> markup you pass in as `thead`/`tbody`. */
  let {
    sticky = false,
    column_widths = null,
    thead,
    tbody,
    children,
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let columns = $state(column_widths || []);

  /* Column-width syncing for the sticky-header layout.

     The sticky header and the scrolling body have to look like one table, but
     a single <table> cannot do it: `position: sticky` on a <thead> loses its
     borders under `border-collapse: collapse` (verified in Chromium, Firefox
     and WebKit), and this library's whole border system is built on collapsed
     borders. So the header is its own <table>, sized from a measured colgroup.

     The trick that keeps that honest: the body table renders the REAL <thead>
     too, at `visibility: collapse`. That keeps the header's full contribution
     to column widths while costing zero vertical space -- so the browser sizes
     the columns from header and body together, in one ordinary layout pass.
     There is nothing to blend, nothing measured against the wrong containing
     block, and no second copy of the body.

     `visibility: collapse` also drops that copy out of the accessibility tree
     and out of the tab order in all three engines, so its duplicated controls
     are inert without needing the `inert` attribute. Note the consequence: the
     body table has no exposed column headers -- the visible sticky header is
     the accessible one. That matches the previous behavior, but it is a real
     gap, and only a genuine single-table layout would close it. */
  let bodyTable: HTMLTableElement | null = $state(null);
  let headTable: HTMLTableElement | null = $state(null);
  let columnCount = $state(0);
  /* See trimHeadOverhang(): a fixed-layout table's collapsed outer borders
     make it render a little wider than the width we ask for. */
  let overhang = $state(0);
  let resizeObserver: ResizeObserver | null = $state(null);
  let tableWidth = $state<number | null>(null);
  import { onDestroy } from "svelte";

  onDestroy(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
  });

  /* How many columns the table has. Pure colspan arithmetic over every row --
     no widths involved, so this is exact even when every row carries a colspan.
     The widest row wins, which also covers rows shortened by a rowspan above. */
  function countColumns(table: HTMLTableElement): number {
    let max = 0;
    for (const row of Array.from(table.rows)) {
      let n = 0;
      for (const cell of Array.from(row.cells)) n += cell.colSpan || 1;
      if (n > max) max = n;
    }
    return max;
  }

  /* Read the column widths off the ruler row: one empty, borderless, zero-
     height cell per column, sitting in the real table. Because it is built to
     have exactly one cell per column, there is no "find a row without a
     colspan" guesswork and no dividing a spanned cell evenly and hoping. */
  function measureRuler(table: HTMLTableElement): number[] {
    const row = table.querySelector<HTMLTableRowElement>(".column-ruler > tr");
    if (!row) return [];
    return Array.from(row.children).map(
      (cell) => cell.getBoundingClientRect().width,
    );
  }

  /* The table's own width is the truth; the per-cell widths only give the
     proportions. They don't add up to it, because `border-collapse: collapse`
     makes adjacent cells share a border that each of them reports in full, so
     the sum overshoots by about one border per interior boundary. Left alone,
     that makes the header table wider than the body it sits on. The overcount
     is a constant per boundary rather than a percentage, so spread it evenly. */
  function fitToTableWidth(widths: number[], width: number): number[] {
    if (!widths.length || !width) return widths;
    const total = widths.reduce((sum, w) => sum + w, 0);
    const delta = total - width;
    if (Math.abs(delta) < 0.5) return widths;
    const perColumn = delta / widths.length;
    return widths.map((w) => Math.max(0, w - perColumn));
  }

  function syncColumnWidths() {
    if (!bodyTable) return;

    /* First pass sizes the ruler. Rendering it makes this effect run again,
       and the second pass does the measuring. */
    const count = countColumns(bodyTable);
    if (count !== columnCount) {
      columnCount = count;
      corrections = 0;
      return;
    }

    const widths = measureRuler(bodyTable);
    if (!widths.length) return;

    const width = bodyTable.getBoundingClientRect().width;
    columns = fitToTableWidth(widths, width - overhang);
    tableWidth = width - overhang;
  }

  /* The header table is `table-layout: fixed` with `box-sizing: border-box`,
     and under `border-collapse: collapse` its outer borders are added on top
     of the column widths -- so it renders a pixel or two wider than the width
     we set, and its right edge overhangs the body. The amount isn't derivable
     from the computed border widths (it differs per table), so measure it once
     and fold it back in. One correction converges; the guard stops it from
     hunting if a layout ever refuses to settle. */
  let corrections = 0;
  function trimHeadOverhang() {
    if (!headTable || !bodyTable || !columns.length) return;
    const delta =
      headTable.getBoundingClientRect().width -
      bodyTable.getBoundingClientRect().width;
    if (Math.abs(delta) < 0.5 || corrections > 3) return;
    corrections += 1;
    overhang += delta;
    syncColumnWidths();
  }

  $effect(() => {
    if (column_widths || !sticky || !thead || !bodyTable) return;
    // Read columnCount so this re-runs once the ruler row has rendered.
    columnCount;
    syncColumnWidths();
    observeColumns();
  });

  $effect(() => {
    columns;
    trimHeadOverhang();
  });

  /* Keep columns in sync as the table changes underneath us.

     Watching the table itself is not enough, and this is the subtle one:
     reordering columns leaves the table exactly the same width, so a
     ResizeObserver on the table never fires -- yet every column width has
     moved and the header's colgroup is now stale. (Consumers have had to
     paper over this by remounting the component on a column-set key.)

     So observe the ruler cells: one per column, they ARE the quantity being
     copied into the colgroup. Reorder them and they swap widths, which fires;
     resize the container and they all change, which fires. Swap two columns of
     identical width and nothing fires -- correctly, because the colgroup would
     be unchanged. ResizeObserver reports them despite `visibility: collapse`,
     verified in Chromium, Firefox and WebKit.

     Debounced via rAF so a burst of Svelte updates costs one sync per frame. */
  let observedCount = -1;
  let observedRuler: Element | null = null;
  function observeColumns() {
    if (!bodyTable) return;
    if (typeof window === "undefined" || !window.ResizeObserver) return;

    const cells = Array.from(
      bodyTable.querySelectorAll<HTMLElement>(".column-ruler > tr > td"),
    );
    // The ruler is rendered a tick after the column count is known, so the
    // first call through here finds nothing. Bail without recording anything,
    // and the effect that set the count will bring us straight back.
    if (!cells.length) return;

    // Re-attach only when the ruler actually changed, or the observation
    // callback that firing `observe()` produces would re-enter and loop.
    if (observedRuler === cells[0] && observedCount === cells.length) return;
    observedRuler = cells[0];
    observedCount = cells.length;

    if (!resizeObserver) {
      let rafPending = false;
      resizeObserver = new ResizeObserver(() => {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(() => {
          rafPending = false;
          /* A fresh layout, so the overhang may be re-measured. Correcting
             only ever touches the header table, never the observed ruler, so
             this cannot re-enter. */
          corrections = 0;
          syncColumnWidths();
        });
      });
    }

    resizeObserver.disconnect();
    resizeObserver.observe(bodyTable);
    for (const cell of cells) resizeObserver.observe(cell);
  }
</script>

{#if sticky}
  {#if thead}
    <div class="scrolling-table">
      <!-- The visible, interactive header. Sticky as a whole <table>, because
           a sticky <thead> loses its borders under border-collapse: collapse.
           Its colgroup is copied from the real table's measured columns. -->
      <table
        class="fixed-table-head"
        bind:this={headTable}
        style:width={tableWidth ? `${tableWidth}px` : null}
        style:max-width={tableWidth ? `${tableWidth}px` : null}
      >
        {#if columns.length}
          <colgroup>
            {#each columns as width}
              <col style="width: {width}px" />
            {/each}
          </colgroup>
        {/if}
        {@render thead?.()}
      </table>

      <!-- The real table. It carries the header as well as the body, so the
           browser sizes the columns from both at once; the header copy is
           collapsed in CSS, keeping its width contribution at zero height. -->
      <table class="scrolling-table-body" bind:this={bodyTable}>
        {@render thead?.()}
        {@render tbody?.()}
        <!-- Table body content -->
        {@render children?.()}
        <!-- default slot for additional content -->
        {#if columnCount}
          <!-- The ruler: one cell per column, so column widths can be read
               directly instead of guessed at from whichever row looks safe.
               Collapsed, so it costs no height and contributes no width. -->
          <tbody class="column-ruler" aria-hidden="true">
            <tr>
              {#each { length: columnCount } as _}
                <td></td>
              {/each}
            </tr>
          </tbody>
        {/if}
      </table>
    </div>
  {:else}
    <div class="table-container">
      <div class="veil"></div>
      <table class:sticky>
        {@render children?.()}
      </table>
    </div>
  {/if}
{:else}
  <table>
    {#if thead}
      {@render thead?.()}
    {/if}
    {#if tbody}
      {@render tbody?.()}
    {/if}
    {@render children?.()}
  </table>
{/if}

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  table:has(colgroup) {
    table-layout: fixed;
  }

  table {
    @include color-props(table, surface);
    @include typography-container-props(table, surface, paragraph);
    @include box-props-square-border(table, surface, paragraph);
    @include box-size-props(table);
    border-collapse: collapse;
    @include box-shadow(table, surface);
    margin-inline-start: auto;
    margin-inline-end: auto;
  }

  table :global(th) {
    @include color-props(table-head, text);
    @include typography-props-bold(table-head, header);
  }
  table :global(tr:has(th):first-child) {
    border-bottom: var(
      --table-first-row-bottom-border,
      var(--table-thick-border, 3px) solid
        var(--table-first-row-border-color, var(--secondary-bg))
    );
  }

  table > :global(tbody > tr > td),
  table > :global(tbody > tr > th),
  table > :global(thead > tr > th),
  table > :global(tr > td),
  table > :global(tr > th) {
    @include box-props-square-border(table-cell, cell);
    border-left: var(
      --table-border,
      1px solid var(--table-border-color, var(--secondary-bg))
    );
    border-right: var(
      --table-border,
      1px solid var(--table-border-color, var(--secondary-bg))
    );
  }
  table  :global(tr > th:first-child:has(~ td)) /* Left header on row with cells */ {
    border-right: var(
      --table-first-row-bottom-border,
      var(--table-thick-border, 3px) solid
        var(--table-first-row-border-color, var(--secondary-bg))
    ) !important ;
  }

  .table-container {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--_background-color, var(--white, #fff));
    margin-inline-start: auto;
    margin-inline-end: auto;
  }
  .sticky :global(thead) {
    position: sticky;
    top: 0;
    z-index: 2;
    background: var(--table-sticky-header-bg, var(--primary-bg));
    box-shadow: var(
      --table-sticky-header-box-shadow,
      0 2px 5px rgba(0, 0, 0, 0.1)
    );
    margin: 0;
    padding: 0;
  }
  .veil {
    background-color: var(--_background-color, var(--white, #fff));
    position: sticky;
    top: -2em;
    height: 3em;
    width: 100%;
  }

  /* Separate head and body fixed container logic */
  .fixed-table-head {
    position: sticky;
    top: var(--table-sticky-top, var(--padding));
    z-index: 2;
    @include color-props(table-head, table, surface);
  }
  .fixed-table-head::before {
    content: " ";
    position: absolute;
    --table-sticky-offset: var(--table-sticky-top, var(--padding));
    --table-top-veil-height: calc(
      var(--table-sticky-offset) + 1px +
        var(
          --table-margin-top,
          var(
            --surface-margin-top,
            var(--paragraph-margin-top, var(--margin-top, 0px))
          )
        )
    );
    top: calc(-1 * var(--table-top-veil-height));
    height: var(--table-top-veil-height);
    left: calc(var(--padding) * -2);
    width: calc(100% + var(--padding) * 4);
    @include color-props(table-backdrop, page, surface);
    z-index: -1;
  }
  .fixed-table-head :global(th) {
    @include color-props(table-head, text);
    @include typography-props-bold(table-head, header);
  }

  /* Visually make our two tables appear as one */
  .fixed-table-head {
    margin-bottom: 0;
    padding-bottom: 0;
    box-shadow: 0;
    border-bottom: none;
  }
  .scrolling-table-body {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
  .scrolling-table-body :global(tbody > tr:first-child > td),
  .scrolling-table-body :global(tbody > tr:first-child > th) {
    border-top: none;
  }
  /* The body table's own copy of the header. `visibility: collapse` is the
     one primitive that keeps a row group's contribution to column widths while
     reclaiming all of its vertical space -- so the browser solves the columns
     from header and body in a single pass, and the visible sticky header just
     copies the answer. Verified in Chromium, Firefox and WebKit, under
     `border-collapse: collapse` as well as `separate`.

     `visibility: hidden` will NOT do: it keeps the header's full height and
     you get a blank gap. `display: none` is worse -- no layout, nothing to
     measure, and the columns size from the body alone. */
  .scrolling-table-body > :global(thead) {
    visibility: collapse;
  }

  /* One cell per column, so widths can be read off directly. Collapsed for
     zero height, and stripped of padding and borders so it can never be the
     thing that decides a column's minimum width. */
  .column-ruler {
    visibility: collapse;
  }
  .column-ruler > tr > td {
    padding: 0;
    border: 0;
  }

  /* Interactive affordances: target rows/cells with tabindex for keyboard accessibility */
  table :global(tr[tabindex]) {
    @include clickable-cursor();
    @include focusable();
  }
  table :global(tr[tabindex] > th),
  table :global(tr[tabindex] > td),
  table :global(th[tabindex]),
  table :global(td[tabindex]) {
    @include clickable-cursor();
    @include clickable-affordance-transition();
  }
  table :global(tr[tabindex]:hover > th),
  table :global(tr[tabindex]:hover > td),
  table :global(tr[tabindex]:focus-visible > th),
  table :global(tr[tabindex]:focus-visible > td),
  table :global(th[tabindex]:hover),
  table :global(th[tabindex]:focus-visible),
  table :global(td[tabindex]:hover),
  table :global(td[tabindex]:focus-visible) {
    @include clickable-hover-affordance();
  }
  table :global(tr[tabindex]:active > th),
  table :global(tr[tabindex]:active > td),
  table :global(th[tabindex]:active),
  table :global(td[tabindex]:active) {
    @include clickable-active-affordance();
  }
  table :global(th[tabindex]),
  table :global(td[tabindex]) {
    @include focusable();
  }

  /* Apply thick border to column 1 in BOTH header and body tables, 
   BUT ONLY IF the scrolling table contains row headers in its tbody */
  .scrolling-table:has(
      .scrolling-table-body :global(tbody > tr > th:first-child)
    ) {
    .fixed-table-head :global(tr > th:first-child),
    .scrolling-table-body :global(tbody > tr > th:first-child) {
      border-right: var(
        --table-first-row-bottom-border,
        var(--table-thick-border, 3px) solid
          var(--table-first-row-border-color, var(--secondary-bg))
      ) !important;
    }
  }
  /* 2. Standard non-scrolling single <table> setup */
  table:has(:global(tbody > tr > th:first-child)) {
    :global(thead > tr > th:first-child),
    :global(tbody > tr > th:first-child) {
      border-right: var(
        --table-first-row-bottom-border,
        var(--table-thick-border, 3px) solid
          var(--table-first-row-border-color, var(--secondary-bg))
      );
    }
  }
</style>
