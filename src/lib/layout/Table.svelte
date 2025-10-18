<script lang="ts">
  import { run } from "svelte/legacy";

  interface Props {
    sticky?: boolean;
    column_widths?: number[] | null;
    thead?: import("svelte").Snippet;
    tbody?: import("svelte").Snippet;
    children?: import("svelte").Snippet;
  }

  let {
    sticky = false,
    column_widths = null,
    thead,
    tbody,
    children,
  }: Props = $props();

  let columns = $state(column_widths || []);

  /* Code for syncing column widths for scrolling table solution */
  let headClone: HTMLTableElement | null = $state(null);
  let bodyClone: HTMLTableElement | null = $state(null);
  let resizeObserver: ResizeObserver | null = $state(null);
  let tableWidth = $state(null);
  import { onDestroy } from "svelte";

  onDestroy(() => {
    if (resizeObserver) {
      if (headClone) resizeObserver.unobserve(headClone);
      if (bodyClone) resizeObserver.unobserve(bodyClone);
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  });

  function syncColumnWidths() {
    if (!headClone || !bodyClone) return;

    const getFlattenedCellWidths = (
      row: HTMLTableRowElement | null
    ): number[] => {
      if (!row) return [];
      const cells = Array.from(row.children) as HTMLElement[];
      const colWidths: number[] = [];
      let colIndex = 0;

      for (const cell of cells) {
        const colspan = parseInt(cell.getAttribute("colspan") || "1", 10);
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
        (acc, cell) => acc + parseInt(cell.getAttribute("colspan") || "1", 10),
        0
      );
    };

    const findBestRow = (
      table: HTMLTableElement
    ): HTMLTableRowElement | null => {
      const rows = Array.from(table.querySelectorAll("tr"));

      // First: find a row with no colspans
      for (const row of rows) {
        const hasColspan = Array.from(row.children).some((cell) =>
          cell.hasAttribute("colspan")
        );
        if (!hasColspan) return row;
      }

      // Otherwise: row with smallest total colspans
      let best: HTMLTableRowElement | null = null;
      let bestSpanCount = Infinity;
      for (const row of rows) {
        const spanCount = getTotalCols(row);
        if (spanCount < bestSpanCount) {
          bestSpanCount = spanCount;
          best = row;
        }
      }
      return best;
    };

    // Step 1: pick best candidate rows
    let headRow = findBestRow(headClone);
    let bodyRow = findBestRow(bodyClone);

    // Step 2: if their total col counts don't match, try to find a pair that does
    if (headRow && bodyRow && getTotalCols(headRow) !== getTotalCols(bodyRow)) {
      const headRows = Array.from(headClone.querySelectorAll("tr"));
      const bodyRows = Array.from(bodyClone.querySelectorAll("tr"));
      outer: for (const hr of headRows) {
        const hCols = getTotalCols(hr);
        for (const br of bodyRows) {
          if (hCols === getTotalCols(br)) {
            headRow = hr;
            bodyRow = br;
            break outer;
          }
        }
      }
    }

    // Step 3: flatten widths and compute max
    const headWidths = getFlattenedCellWidths(headRow);
    const bodyWidths = getFlattenedCellWidths(bodyRow);
    const numCols = Math.max(headWidths.length, bodyWidths.length);
    const maxColWidths: number[] = [];

    for (let i = 0; i < numCols; i++) {
      maxColWidths[i] = Math.max(headWidths[i] || 0, bodyWidths[i] || 0);
    }

    columns = maxColWidths;
    fitTableToColGroup(columns);
  }

  function fitTableToColGroup(columns: number[]) {
    let totalWidth = 0;
    for (let c of columns) {
      totalWidth += c;
    }
    tableWidth = totalWidth;
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
    if (thead && sticky && headClone && bodyClone) {
      syncColumnWidths();
      // Set up ResizeObserver to keep columns in sync when content or size changes
      if (
        !resizeObserver &&
        typeof window !== "undefined" &&
        window.ResizeObserver
      ) {
        resizeObserver = new ResizeObserver(() => {
          syncColumnWidths();
        });
        if (headClone) resizeObserver.observe(headClone);
        if (bodyClone) resizeObserver.observe(bodyClone);
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
    <div class="visually-hidden">
      <table class="fixed-table-head" bind:this={headClone}>
        {@render thead?.()}
      </table>
      <table class="scrolling-table-body" bind:this={bodyClone}>
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
  @import "$lib/sass/_mixins.scss";

  table {
    @include color-props(table, container);
    @include typography-container-props(table, container, paragraph);
    @include box-props-square-border(table, container, paragraph);
    border-collapse: collapse;
    @include box-shadow(table, container);
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
    @include box-props-square-border(table-cell, cell, table);
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
    background: var(--white);
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
    background-color: var(--white, #fff);
    position: sticky;
    top: -2em;
    height: 3em;
    width: 100%;
  }

  /* Separate head and body fixed container logic */
  .fixed-table-head {
    position: sticky;
    top: var(--padding);
    z-index: 2;
  }
  .fixed-table-head::before {
    content: " ";
    position: absolute;
    --table-top-veil-height: calc(
      1px +
        var(
          --table-margin-top,
          var(
            --container-margin-top,
            var(--paragraph-margin-top, var(--margin-top, unset))
          )
        )
    );
    top: calc(-1 * var(--table-top-veil-height));
    height: var(--table-top-veil-height);
    left: calc(var(--padding) * -2);
    width: calc(100% + var(--padding) * 4);
    @include color-props(table-backdrop, page, container);
    z-index: -1;
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
  .visually-hidden {
    visibility: hidden;
    /* opacity: 0.5; */
    pointer-events: none;
    position: fixed;
  }

  /* Interactive affordances: target rows/cells with tabindex for keyboard accessibility */
  table :global(tr[tabindex]) {
    @include clickable();
    @include focusable();
  }
  table :global(td[tabindex]) {
    @include clickable();
    @include focusable();
  }
</style>
