<script lang="ts">
  export let sticky = false;
  export let column_widths: number[] | null = null;
  let columns = column_widths || [];

  /* Code for syncing column widths for scrolling table solution */
  let headClone: HTMLTableElement | null = null;
  let bodyClone: HTMLTableElement | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let tableWidth = null;
  $: if (!column_widths) {
    // If no column widths provided, reset columns to empty
    columns = [];
    if ($$slots.thead && sticky && headClone && bodyClone) {
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
    }
  }
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
    // Get the first row of each table
    if (!headClone || !bodyClone) return;
    const headRow = headClone.querySelector("tr");
    const bodyRow = bodyClone.querySelector("tr");
    let maxColWidths = [];
    if (headRow && bodyRow) {
      const headCells = Array.from(headRow.children) as HTMLElement[];
      const bodyCells = Array.from(bodyRow.children) as HTMLElement[];
      const numCols = Math.max(headCells.length, bodyCells.length);
      for (let i = 0; i < numCols; i++) {
        const headCell = headCells[i];
        const bodyCell = bodyCells[i];
        const headWidth = headCell ? headCell.offsetWidth : 0;
        const bodyWidth = bodyCell ? bodyCell.offsetWidth : 0;
        maxColWidths[i] = Math.max(headWidth, bodyWidth);
      }
    }
    columns = maxColWidths;

    // After syncing, fit colgroup to table width if needed
    fitTableToColGroup(columns);
  }

  function fitTableToColGroup(columns: number[]) {
    let totalWidth = 0;
    for (let c of columns) {
      totalWidth += c;
    }
    tableWidth = totalWidth;
  }
</script>

{#if sticky}
  {#if $$slots.thead}
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
        <slot name="thead" />
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
        <slot name="tbody" />
        <!-- Table body content -->
        <slot />
        <!-- default slot for additional content -->
      </table>
    </div>
    <div class="visually-hidden">
      <table class="fixed-table-head" bind:this={headClone}>
        <slot name="thead" />
      </table>
      <table class="scrolling-table-body" bind:this={bodyClone}>
        <slot name="tbody" />
        <!-- Table body content -->
        <slot />
        <!-- default slot for additional content -->
      </table>
    </div>
  {:else}
    <div class="table-container">
      <div class="veil"></div>
      <table class:sticky>
        <slot />
      </table>
    </div>
  {/if}
{:else}
  <table>
    <slot />
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
    top: calc(
      -1 * (var(--table-margin-top, var(--container-margin-top, var(--paragraph-margin-top, var(--margin-top, unset)))))
    );
    height: var(
      --table-margin-top,
      var(
        --container-margin-top,
        var(--paragraph-margin-top, var(--margin-top, unset))
      )
    );
    left: calc(var(--padding) * -2);
    width: calc(100% + var(--padding) * 4);
    @include color-props(table, container);
    z-index: -1;
  }

  /* Visually make our two tables appear as one */
  .fixed-table-head {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
    box-shadow: 0;
    border-bottom: var(--table-first-row-bottom-border, 3px) solid
      var(--table-first-row-border-color, var(--secondary-bg));
  }
  .scrolling-table-body {
    margin-top: 0;
    padding-top: 0;
  }
  .visually-hidden {
    visibility: hidden;
    /* opacity: 0.5; */
    pointer-events: none;
    position: absolute;
  }
</style>
