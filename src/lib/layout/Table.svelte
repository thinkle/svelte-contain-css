<script lang="ts">
  interface Props {
    sticky?: boolean;
    column_widths?: number[] | null;
    thead?: import("svelte").Snippet;
    tbody?: import("svelte").Snippet;
    children?: import("svelte").Snippet;
  }

  /* No attribute pass-through, deliberately: the sticky variant renders the
     visible tables AND a visually-hidden clone of them used to measure column
     widths. Spreading a caller's `id` would emit it twice, which is invalid.
     Set attributes on the <table> markup you pass in as `thead`/`tbody`. */
  let {
    sticky = false,
    column_widths = null,
    thead,
    tbody,
    children,
  }: Props = $props();

  // svelte-ignore state_referenced_locally
  let columns = $state(column_widths || []);

  /* Code for syncing column widths for scrolling table solution.

     We measure ONE hidden clone that holds thead and tbody together, because
     that is the layout we are trying to reproduce: the visible sticky header
     and the visible scrolling body are two <table>s that have to *look* like
     one, so the widths they share must come from one table's layout pass.

     Measuring head and body as separate tables (which this used to do) and
     folding them together with Math.max() blends two unrelated constraint
     solutions -- each table solves for its own content at its own available
     width -- and the blend is routinely wider than either, which pushes the
     table into horizontal overflow nobody asked for. A single auto-layout
     table already takes the max of every cell in a column, including any
     border/padding difference between a <th> in the head and a <td> below
     it, and it does so with proportions that actually add up. */
  let measureClone: HTMLTableElement | null = $state(null);
  let resizeObserver: ResizeObserver | null = $state(null);
  let tableWidth = $state<number | null>(null);
  import { onDestroy } from "svelte";

  onDestroy(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  });

  function syncColumnWidths() {
    if (!measureClone) return;

    const spanOf = (cell: Element, attr: "colspan" | "rowspan") =>
      parseInt(cell.getAttribute(attr) || "1", 10);

    const getFlattenedCellWidths = (
      row: HTMLTableRowElement | null,
    ): number[] => {
      if (!row) return [];
      const colWidths: number[] = [];
      let colIndex = 0;

      for (const cell of Array.from(row.children) as HTMLElement[]) {
        const colspan = spanOf(cell, "colspan");
        const width = cell.offsetWidth / colspan;
        for (let j = 0; j < colspan; j++) {
          colWidths[colIndex++] = width;
        }
      }

      return colWidths;
    };

    const getTotalCols = (row: HTMLTableRowElement | null): number => {
      if (!row) return 0;
      return Array.from(row.children).reduce(
        (acc, cell) => acc + spanOf(cell, "colspan"),
        0,
      );
    };

    /* A row is a clean ruler if every cell covers exactly one column and one
       row: no colspan to divide evenly (a guess), and no rowspan, which would
       shift the columns that *neighbouring* rows report. */
    const isCleanRow = (row: HTMLTableRowElement) =>
      !Array.from(row.children).some(
        (cell) => spanOf(cell, "colspan") > 1 || spanOf(cell, "rowspan") > 1,
      );

    const findBestRow = (
      table: HTMLTableElement,
    ): HTMLTableRowElement | null => {
      const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>("tr"));

      // Fast path: first body row covers the vast majority of real tables
      const firstRow = table.querySelector<HTMLTableRowElement>("tbody tr, tr");
      if (firstRow && isCleanRow(firstRow)) return firstRow;

      // Otherwise: first clean row anywhere in the table, head or body -- they
      // share a column set, so either section measures the same columns.
      for (const row of rows) {
        if (isCleanRow(row)) return row;
      }

      // Last resort: the row that spans the most columns, so colspan division
      // is spread over as few cells as possible.
      let best: HTMLTableRowElement | null = null;
      let bestSpanCount = -1;
      for (const row of rows) {
        const spanCount = getTotalCols(row);
        if (spanCount > bestSpanCount) {
          bestSpanCount = spanCount;
          best = row;
        }
      }
      return best;
    };

    columns = fitToCloneWidth(
      getFlattenedCellWidths(findBestRow(measureClone)),
      measureClone.offsetWidth,
    );
    tableWidth = measureClone.offsetWidth;
  }

  /* The clone's own offsetWidth is the truth about how wide this table is;
     the per-cell widths only tell us the proportions. They don't add up to it,
     because `border-collapse: collapse` makes adjacent cells *share* a border
     that each of them reports in full -- so naively summing them overshoots by
     roughly one border per interior column boundary, and the visible tables,
     sized from that sum, overflow a container the table actually fits in.
     (This is the same off-by-a-border that produced the old one-pixel
     bleed-through, just multiplied by the column count.)

     The overcount is a constant per boundary, not a percentage, so spread the
     difference evenly rather than scaling. */
  function fitToCloneWidth(widths: number[], cloneWidth: number): number[] {
    if (!widths.length || !cloneWidth) return widths;
    const total = widths.reduce((sum, w) => sum + w, 0);
    const delta = total - cloneWidth;
    if (Math.abs(delta) < 0.5) return widths;
    const perColumn = delta / widths.length;
    return widths.map((w) => Math.max(0, w - perColumn));
  }

  let hasInitialized = $state(false);
  $effect(() => {
    if (thead && sticky && !hasInitialized) {
      setupWidths();
    }
  });

  function setupWidths() {
    if (column_widths) return;
    // If no column widths provided, reset columns to empty
    columns = [];
    if (thead && sticky && measureClone) {
      syncColumnWidths();
      // Set up ResizeObserver to keep columns in sync when content or size changes.
      // Debounce via rAF so rapid Svelte updates only trigger one sync per frame.
      if (
        !resizeObserver &&
        typeof window !== "undefined" &&
        window.ResizeObserver
      ) {
        let rafPending = false;
        resizeObserver = new ResizeObserver(() => {
          if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(() => {
              rafPending = false;
              syncColumnWidths();
            });
          }
        });
        resizeObserver.observe(measureClone);
      }
      hasInitialized = true;
    }
  }
</script>

{#if sticky}
  {#if thead}
    <div class="scrolling-table">
      <table
        class="fixed-table-head"
        style:width="{tableWidth}px"
        style:max-width="{tableWidth}px"
      >
        <colgroup>
          {#each columns as width}
            <col style="width: {width}px" />
          {/each}
        </colgroup>
        {@render thead?.()}
      </table>
      <table
        class="scrolling-table-body"
        style:width="{tableWidth}px"
        style:max-width="{tableWidth}px"
      >
        <colgroup>
          {#each columns as width}
            <col style="width: {width}px" />
          {/each}
        </colgroup>
        {@render tbody?.()}
        <!-- Table body content -->
        {@render children?.()}
        <!-- default slot for additional content -->
      </table>
    </div>
    <div class="visually-hidden" aria-hidden="true">
      <!-- One table, head and body together: see syncColumnWidths() -->
      <table class="measure-clone" bind:this={measureClone}>
        {@render thead?.()}
        {@render tbody?.()}
        <!-- Table body content -->
        {@render children?.()}
        <!-- default slot for additional content -->
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
  /* The measuring clone must lay out in normal flow, because the whole point
     is to find out how wide the columns want to be *in this container*. Taking
     it out of flow (position: absolute/fixed) gives it the nearest positioned
     ancestor -- or, for fixed, the viewport -- as its containing block, so a
     table inside a Card or a SplitPane gets measured against the wrong width.

     It still must not occupy space or add to the scroll area, which is what
     `position: fixed` was doing for us: height: 0 + overflow: hidden does the
     same job while leaving the inline axis alone. The table inside still lays
     out at its full size and reports honest offsetWidth values; overflow only
     clips what we were never going to show. Don't "simplify" this back to a
     positioned box. display: none would be worse still -- no layout at all,
     so nothing to measure. */
  .visually-hidden {
    visibility: hidden;
    /* opacity: 0.5; */
    pointer-events: none;
    height: 0;
    overflow: hidden;
  }
  /* Nothing sticky or offset in here -- it only exists to be measured. */
  .measure-clone {
    margin: 0;
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
