<script lang="ts">
  import { BROWSER, DEV } from "esm-env";
  import { onDestroy } from "svelte";

  interface Props {
    sticky?: boolean;
    /* Freeze the first n columns, spreadsheet-style: they stay put while the
       rest of the table scrolls sideways under them. Needs the sticky layout
       (`sticky` plus a `thead` snippet). See freezeColumns() below. */
    stickyColumns?: number;
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
    stickyColumns = 0,
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
     and out of the tab order in all three engines; the copy is marked `inert`
     as well (see below) so that is stated rather than implied. Note the
     consequence: the
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
    const scale = layoutScale(table);
    return Array.from(row.children).map(
      (cell) => cell.getBoundingClientRect().width / scale,
    );
  }

  /* getBoundingClientRect() measures what is on screen, after any transform
     or zoom on an ancestor; the widths are written back as layout pixels.
     Inside a scaled container (a theme preview at 50%, a zoomed canvas) the
     two differ, and the header came out at the wrong proportions. Divide by
     the ratio of the table's on-screen width to its layout width. */
  function layoutScale(el: HTMLElement): number {
    const layout = el.offsetWidth;
    const visual = el.getBoundingClientRect().width;
    return layout && visual ? visual / layout : 1;
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

    const width = bodyTable.getBoundingClientRect().width / layoutScale(bodyTable);
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
      (headTable.getBoundingClientRect().width -
        bodyTable.getBoundingClientRect().width) /
      layoutScale(bodyTable);
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

  /* The body table's copy of the header is there to be measured, not used,
     so say so. `visibility: collapse` already keeps it out of the tab order,
     but that is a side effect rather than a statement -- and tools that
     only recognize `visibility: hidden` (testing-library's role queries, for
     one) otherwise find every header control twice. `inert` is the accurate
     word for a copy-for-measurement: out of the focus order and out of the
     accessibility tree, with no effect on layout.

     The thead is the caller's markup, rendered from their snippet, so it
     cannot carry the attributes in the template. Watch both tables' direct
     children in case a snippet swaps its group out.

     Older consumers sometimes supplied bare <tr>s in these named snippets.
     Reparenting Svelte-owned nodes into a new <thead>/<tbody> is unsafe, but
     sticky mode can still degrade safely: the visible table tells us how many
     direct rows belong to the header, so mark the same leading rows in the
     body table as its collapsed measuring copy. Bare tbody rows remain where
     Svelte put them and visible. Warn in development so callers can restore
     the semantic row groups without shipping a doubled header meanwhile. */
  let warnedBareThead = false;
  let warnedBareTbody = false;
  $effect(() => {
    if (!sticky || !headTable || !bodyTable) return;
    const directRows = (table: HTMLTableElement) =>
      Array.from(table.children).filter(
        (child): child is HTMLTableRowElement => child.tagName === "TR",
      );
    const mark = () => {
      for (const head of bodyTable!.querySelectorAll(":scope > thead")) {
        if (!head.hasAttribute("inert")) head.setAttribute("inert", "");
        if (head.getAttribute("aria-hidden") !== "true")
          head.setAttribute("aria-hidden", "true");
      }

      const visibleBareHeadRows = directRows(headTable!);
      const bodyBareRows = directRows(bodyTable!);
      for (const row of bodyBareRows) {
        row.removeAttribute("data-contain-implicit-table-head");
        row.removeAttribute("inert");
        row.removeAttribute("aria-hidden");
      }
      for (const row of bodyBareRows.slice(0, visibleBareHeadRows.length)) {
        row.setAttribute("data-contain-implicit-table-head", "");
        row.setAttribute("inert", "");
        row.setAttribute("aria-hidden", "true");
      }

      if (BROWSER && DEV && visibleBareHeadRows.length && !warnedBareThead) {
        warnedBareThead = true;
        console.warn(
          "<Table sticky>: the thead snippet must render a <thead> containing its rows. Bare <tr> children are tolerated for compatibility, but are not semantic table markup.",
        );
      }
      if (
        BROWSER &&
        DEV &&
        tbody &&
        bodyBareRows.length > visibleBareHeadRows.length &&
        !warnedBareTbody
      ) {
        warnedBareTbody = true;
        console.warn(
          "<Table sticky>: the tbody snippet must render a <tbody> containing its rows. Bare <tr> children are tolerated for compatibility, but are not semantic table markup.",
        );
      }
    };
    mark();
    if (typeof MutationObserver === "undefined") return;
    const observer = new MutationObserver(mark);
    observer.observe(headTable, { childList: true });
    observer.observe(bodyTable, { childList: true });
    return () => observer.disconnect();
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

  /* Horizontal scrolling for the sticky layout.

     A wide sticky table has to scroll sideways in its own strip, or its
     overflow lands in whatever ancestor scrolls (typically a Page's content
     panel) and the whole page slides sideways instead of the table. But a
     scroll box around the WHOLE thing would become the sticky header's
     scroll container -- and `overflow-x: auto` drags overflow-y along to
     `auto` too -- so the header would stick to a box that never scrolls
     vertically, i.e. never stick at all.

     So the two tables get a strip each. The body sits in an ordinary
     `overflow-x: auto` strip. The header sits in its own strip whose
     scrollbar is hidden, and it is that strip's WRAPPER which is sticky:
     the sticky element is outside every scroll box we add, so it still
     sticks to the page. The two strips are then kept at the same
     scrollLeft. Both directions, so a trackpad swipe or shift-wheel over the
     header scrolls the body too.

     Setting scrollLeft fires a scroll event on the strip we set, which would
     bounce straight back. If the two strips' scroll ranges differ by a
     sub-pixel, that bounce clamps and the pair walks backwards away from the
     edge. So a programmatic scroll is remembered for one frame and its echo
     ignored. */
  let headStrip: HTMLDivElement | null = $state(null);
  let bodyStrip: HTMLDivElement | null = $state(null);
  let scrollEcho: HTMLElement | null = null;
  function syncScroll(from: HTMLElement | null, to: HTMLElement | null) {
    if (!from || !to) return;
    if (scrollEcho === from) return;
    if (Math.abs(to.scrollLeft - from.scrollLeft) < 0.5) return;
    scrollEcho = to;
    to.scrollLeft = from.scrollLeft;
    requestAnimationFrame(() => {
      if (scrollEcho === to) scrollEcho = null;
    });
  }

  /* Frozen columns (`stickyColumns`).

     There is no <thead> for columns, so this is per cell: the first n cells
     of every row, in both tables, get `position: sticky` with a left offset
     equal to the width of the frozen columns before them. Each strip is its
     own scroll box, so the header's frozen cells stick inside the header
     strip and the body's inside the body strip -- and because the strips
     share a scrollLeft, they stay lined up.

     The offsets come from `columns`, the same measured widths the header's
     colgroup is built from, so a frozen cell lands exactly where its column
     starts. Which column a cell is in is colspan/rowspan arithmetic (the
     same grid walk a browser does); a cell spanning past the frozen block is
     left alone, because it cannot be both frozen and scrolling.

     The cells are the caller's markup, so they are marked from here rather
     than in the template -- the same reason the header copy is made `inert`
     from here. A data attribute carries the styling (CSS below); the offset
     travels as a custom property on the cell. */
  function frozenOffsets(widths: number[], n: number): number[] {
    const offsets: number[] = [];
    let left = 0;
    for (let i = 0; i < n && i < widths.length; i++) {
      offsets.push(left);
      left += widths[i];
    }
    return offsets;
  }

  function freezeColumns(table: HTMLTableElement, offsets: number[]) {
    const n = offsets.length;
    let group: Element | null = null;
    // Rows still covered by a rowspan from above, per column.
    let covered: number[] = [];
    for (const row of Array.from(table.rows)) {
      if (row.parentElement !== group) {
        // A rowspan never reaches past its own row group.
        group = row.parentElement;
        covered = [];
      }
      const ruler = group?.classList.contains("column-ruler");
      let col = 0;
      for (const cell of Array.from(row.cells)) {
        while ((covered[col] ?? 0) > 0) col++;
        const span = cell.colSpan || 1;
        const rows = cell.rowSpan || 1;
        for (let k = col; k < col + span; k++)
          covered[k] = Math.max(covered[k] ?? 0, rows);

        if (!ruler && col + span <= n) {
          // "first" and "edge" let the CSS draw the outer borders.
          const where = [col === 0 && "first", col + span === n && "edge"]
            .filter(Boolean)
            .join(" ");
          if (cell.getAttribute("data-contain-frozen") !== where)
            cell.setAttribute("data-contain-frozen", where);
          cell.style.setProperty("--_frozen-left", `${offsets[col]}px`);
        } else if (cell.hasAttribute("data-contain-frozen")) {
          cell.removeAttribute("data-contain-frozen");
          cell.style.removeProperty("--_frozen-left");
        }
        col += span;
      }
      covered = covered.map((c) => Math.max(0, c - 1));
    }
  }

  $effect(() => {
    if (!sticky || !headTable || !bodyTable) return;
    const offsets = frozenOffsets(columns, Math.max(0, stickyColumns || 0));
    const tables = [headTable, bodyTable];
    const mark = () => tables.forEach((t) => freezeColumns(t, offsets));
    mark();
    /* Rows come and go (sorting, filtering, paging), and each new row's
       cells need marking. Attribute changes we make ourselves don't trip a
       childList observer, so this cannot loop. */
    if (!offsets.length || typeof MutationObserver === "undefined") return;
    const observer = new MutationObserver(mark);
    for (const t of tables)
      observer.observe(t, { childList: true, subtree: true });
    return () => observer.disconnect();
  });
</script>

{#if sticky}
  {#if thead}
    <div class="scrolling-table">
      <!-- The visible, interactive header. Sticky as a whole <table>, because
           a sticky <thead> loses its borders under border-collapse: collapse.
           Its colgroup is copied from the real table's measured columns.
           The wrapper is what sticks (and carries the top veil); the strip
           inside it scrolls sideways in step with the body. -->
      <div class="table-head-sticky">
        <div
          class="table-head-strip"
          bind:this={headStrip}
          onscroll={() => syncScroll(headStrip, bodyStrip)}
        >
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
        </div>
      </div>

      <!-- The real table. It carries the header as well as the body, so the
           browser sizes the columns from both at once; the header copy is
           collapsed in CSS, keeping its width contribution at zero height. -->
      <div
        class="table-body-strip"
        bind:this={bodyStrip}
        onscroll={() => syncScroll(bodyStrip, headStrip)}
      >
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
  <!-- A table can't shrink below its content, so on a narrow screen it is
       wider than its container. It scrolls sideways in its own strip rather
       than widening (or, under an overflow-clipping ancestor, being cut off
       by) everything around it. The sticky variant with a thead scrolls
       too, but needs one strip per table (see syncScroll()); the bare
       sticky-thead variant above does not scroll sideways: a scroll box
       would become its sticky header's scroll container. -->
  <div class="table-scroll">
    <table>
      {#if thead}
        {@render thead?.()}
      {/if}
      {#if tbody}
        {@render tbody?.()}
      {/if}
      {@render children?.()}
    </table>
  </div>
{/if}

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

  table:has(colgroup) {
    table-layout: fixed;
  }

  table {
    @include color-props(table, surface);
    @include typography-container-props(table, surface, paragraph);
    @include box-props-square(table, surface);
    @include border-props(table, surface);
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
        var(--table-first-row-border-color, var(--secondary-color, var(--secondary-bg)))
    );
  }

  table > :global(tbody > tr > td),
  table > :global(tbody > tr > th),
  table > :global(thead > tr > th),
  table > :global(tr > td),
  table > :global(tr > th) {
    @include box-props-square(table-cell, cell);
    @include border-props(table-cell, cell);
    border-left: var(
      --table-border,
      1px solid var(--table-border-color, var(--border-color))
    );
    border-right: var(
      --table-border,
      1px solid var(--table-border-color, var(--border-color))
    );
  }
  table  :global(tr > th:first-child:has(~ td)) /* Left header on row with cells */ {
    border-right: var(
      --table-first-row-bottom-border,
      var(--table-thick-border, 3px) solid
        var(--table-first-row-border-color, var(--secondary-color, var(--secondary-bg)))
    ) !important ;
  }

  /* A table has no block margin of its own (the <table> UA default is 0).
     Placed straight in a TextLayout's flow it is a figure, and takes that
     layout's figure spacing; --table-margin-block still wins. */
  .table-scroll,
  .scrolling-table,
  .table-container {
    margin-block: var(--table-margin-block, var(--_figure-margin-block, 0));
  }

  .scrolling-table {
    /* The sticky header's veil masks scrolled table content above its inset.
       At rest it must not paint over a toolbar BEFORE the table. Clip at the
       table wrapper's vertical edges, keeping horizontal overflow available.
       `clip` does not create a scroll container, so the header still sticks
       to the surrounding page/panel rather than this wrapper. */
    overflow-y: clip;
    overflow-x: visible;
  }

  .table-scroll {
    max-width: 100%;
    overflow-x: auto;
    /* Room for the table's own box-shadow, which the scroll box would
       otherwise clip. */
    padding: var(--table-scroll-padding, 0 0 4px);
    /* A visible scrollbar, not the hover-revealed one the other scroll areas
       use: a phone has no hover, and the bar is the only sign that the table
       goes on past the edge. */
    scrollbar-width: thin;
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

  /* Separate head and body fixed container logic.

     The wrapper sticks, not the table: the table sits inside a strip that
     scrolls sideways (see syncScroll()), and a sticky element inside a
     scroll box sticks to that box -- which never scrolls vertically. */
  .table-head-sticky {
    position: sticky;
    top: var(--table-sticky-top, var(--padding));
    z-index: 2;
  }
  /* The veil lives on the sticky wrapper rather than on the header table:
     the strip around the table clips its overflow, and the veil is ALL
     overflow (it hangs above the header). It now spans the strip rather
     than just the table, so a narrow centred table is masked edge to edge. */
  .table-head-sticky::before {
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
    /* Exactly the table's column, no wider. It used to hang 2 x --padding
       past each side, to cover a table that overflowed its container; the
       table no longer does (it scrolls in its strips), and a veil that pokes
       out sideways is itself horizontal overflow -- enough to make the
       surrounding panel scroll sideways by a few pixels. */
    left: 0;
    width: 100%;
    @include color-props(table-backdrop, page, surface);
    z-index: -1;
  }
  /* The header's strip scrolls only because the body does: no scrollbar of
     its own (one bar per table), but still a real scroll box, so a trackpad
     swipe or shift-wheel over the header moves the table. `overflow: hidden`
     would refuse user scrolling outright. */
  .table-head-strip {
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
  }
  .table-head-strip::-webkit-scrollbar {
    display: none;
  }
  .table-body-strip {
    overflow-x: auto;
    /* overflow-x: auto forces overflow-y to auto as well. The strip is as
       tall as the table, so that never scrolls -- say `hidden` anyway, so a
       rounding pixel can't conjure a vertical bar. */
    overflow-y: hidden;
    /* Same affordances as the plain Table's strip: room for the table's
       box-shadow, and an always-visible bar -- on a phone, the only sign
       that the table goes on past the edge. */
    padding: var(--table-scroll-padding, 0 0 4px);
    scrollbar-width: thin;
  }
  .fixed-table-head {
    @include color-props(table-head, table, surface);
  }

  /* The tables' own block margins belong outside the strips. Inside, a
     scroll box keeps them (it doesn't let them collapse through), so the
     header's top margin became a see-through band inside the sticky
     wrapper, with the body scrolling visibly behind it. Hand each margin to
     the box that now sits where the table used to: the same chain
     typography-container-props() reads for the table. */
  .table-head-sticky {
    margin-top: var(
      --table-margin-top,
      var(--surface-margin-top, var(--paragraph-margin-top, var(--margin-top, 0px)))
    );
  }
  .table-body-strip {
    margin-bottom: var(
      --table-margin-bottom,
      var(
        --surface-margin-bottom,
        var(--paragraph-margin-bottom, var(--margin-bottom, 0px))
      )
    );
  }
  .scrolling-table .fixed-table-head {
    margin-top: 0;
  }
  .scrolling-table .scrolling-table-body {
    margin-bottom: 0;
  }

  /* How wide a sticky table is once it can scroll.

     A plain auto-width table squeezes every column toward its min-content
     width before it admits to overflowing -- so a 34-column roster in a
     1100px column comes out as a wall of one-word-per-line cells, wider
     than the page anyway. Now that the table scrolls in its own strip it
     has no reason to squeeze: it takes its natural (max-content) width, and
     only scrolls when that doesn't fit. A table that fits lays out exactly
     as before, since max-content then IS the auto width.

     Natural width alone would let one long note stretch a column across the
     screen, so each cell is capped at --table-cell-max-width (20em) and
     wraps beyond that. Restore the old fit-to-container behavior with
     `--table-width: auto`; lift the cap with `--table-cell-max-width: none`. */
  .scrolling-table-body {
    width: var(--table-width, max-content);
  }
  .scrolling-table-body > :global(thead > tr > th),
  .scrolling-table-body > :global(thead > tr > td),
  .scrolling-table-body > :global(tbody > tr > th),
  .scrolling-table-body > :global(tbody > tr > td),
  .scrolling-table-body > :global(tr > th),
  .scrolling-table-body > :global(tr > td) {
    max-width: var(--table-cell-max-width, 20em);
  }

  /* Frozen columns (stickyColumns). Marked from script -- see
     freezeColumns(). Each strip is the scroll box its frozen cells stick
     to, so they hold still while the rest scrolls under them.

     They need an opaque background or the scrolled cells show through:
     the table's own resolved surface color (inherited --current-bg) for
     data cells; header cells already paint their own. Layering inside a
     table: frozen cells above the cells scrolling under them. Across the
     tables, the header strip's sticky wrapper (z-index 2) sits above the
     whole body, frozen cells included.

     Collapsed borders are painted by the table, not the cell, so they do
     not travel with a sticky cell (the same reason the header is its own
     table): scroll, and the frozen block loses its dividers while the
     table's lines slide past underneath. So the frozen cells draw their own
     with inset shadows -- a hairline after each frozen column, the table's
     outer edge on the first, and the thick first-column divider on the
     trailing edge of the block (and after a row-header column, below). */
  .scrolling-table :global([data-contain-frozen]) {
    --_frozen-line: var(--table-border-color, var(--border-color, currentColor));
    --_frozen-thick: var(
      --table-first-row-border-color,
      var(--secondary-color, var(--secondary-bg))
    );
    --_frozen-start: 0 0 0 transparent;
    --_frozen-end: inset -1px 0 0 var(--_frozen-line);
    position: sticky;
    /* One pixel short. A collapsed-border cell starts half a border inside
       its column, and that sliver is painted by the table, not the cell --
       so a cell stuck exactly at the strip's edge leaves a hairline of the
       scrolled content showing to its left. Sticking 1px further left tucks
       the sliver under the strip's edge, and the inset line drawn on the
       first frozen column lands where the table's left border would be. */
    left: calc(var(--_frozen-left, 0px) - 1px);
    z-index: 1;
    box-shadow: var(--_frozen-start), var(--_frozen-end);
  }
  .scrolling-table :global(td[data-contain-frozen]) {
    background-color: var(--table-frozen-bg, var(--current-bg));
  }
  .scrolling-table :global([data-contain-frozen~="first"]) {
    --_frozen-start: inset 1px 0 0 var(--_frozen-line);
  }
  .scrolling-table :global([data-contain-frozen~="edge"]) {
    --_frozen-end: inset calc(-1 * var(--table-thick-border, 3px)) 0 0
      var(--_frozen-thick);
  }
  .scrolling-table:has(
      .scrolling-table-body :global(tbody > tr > th:first-child)
    )
    :global(th:first-child[data-contain-frozen]) {
    --_frozen-end: inset calc(-1 * var(--table-thick-border, 3px)) 0 0
      var(--_frozen-thick);
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
  .scrolling-table-body
    > :global(tr[data-contain-implicit-table-head]) {
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

  /* Small tier (see $small-max): a sticky table gets a scroll box of its own.
     Wider than a phone, a sticky table had nowhere to scroll but the page --
     it can't use .table-scroll, because a scroll box becomes the sticky
     header's scroll container -- so the whole content pane, toolbar and
     heading included, panned sideways with it. Here that trade is the right
     one: the table scrolls vertically inside a box at most
     --table-max-height-small tall, while the synchronized head/body strips
     handle horizontal scrolling and frozen columns. The header's wrapper
     sticks to the top of the box instead of the page. */
  @include when-small {
    .scrolling-table,
    .table-container {
      overflow: auto;
      max-height: var(--table-max-height-small, 70vh);
      scrollbar-width: thin;
    }
    @supports (height: 100dvh) {
      .scrolling-table,
      .table-container {
        max-height: var(--table-max-height-small, 70dvh);
      }
    }
    /* The header is at the top of its own box now: no inset, and no veil,
       which only exists to mask page content scrolling past above it. */
    .table-head-sticky {
      top: 0;
    }
    .table-head-sticky::before,
    .veil {
      display: none;
    }
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
          var(--table-first-row-border-color, var(--secondary-color, var(--secondary-bg)))
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
          var(--table-first-row-border-color, var(--secondary-color, var(--secondary-bg)))
      );
    }
  }
</style>
