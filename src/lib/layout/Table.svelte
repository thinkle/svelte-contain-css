<script>
  export let sticky = false;
</script>

{#if sticky}
  <div class="table-container">
    <div class="veil"></div>
    <table class:sticky>
      <slot />
    </table>
  </div>
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
</style>
