<script>

</script>

<table>
    <slot/>
</table>

<style lang="scss">
    
    @import "$lib/sass/_mixins.scss";

    table {
        @include color-props(table, container);
        @include typography-container-props(table, container, paragraph);
        @include box-props-square-border(table, container, paragraph);
        border-collapse: collapse;        
        @include box-shadow(table, container);
    }

    table :global(th) {
        @include color-props(table-head, text);
        @include typography-props-bold(table-head, header);   
    }
    table :global(tr:has(th):first-child) {
        border-bottom: var(--table-first-row-bottom-border, var(--table-thick-border, 3px) solid var(--table-first-row-border-color,  var(--secondary-bg)));
    }

    table > :global(tbody >  tr > td), table > :global(tr > th), table > :global(tr > td), table > :global(tr > th) {        
        @include box-props-square-border(table-cell, cell, table);
        border-left: var(--table-border, 1px solid var(--table-border-color, var(--secondary-bg)));
        border-right: var(--table-border, 1px solid var(--table-border-color, var(--secondary-bg)));
    }
    table  :global(tr > th:first-child:has(~ td)) /* Left header on row with cells */            
    {
        border-right: var(--table-first-row-bottom-border, var(--table-thick-border, 3px) solid var(--table-first-row-border-color, var(--secondary-bg))) !important ;
    }

    table:has(th:first-child + td) :global(th:first-child) {
        border-right: var(--table-first-row-bottom-border, var(--table-thick-border, 3px) solid var(--table-first-row-border-color, var(--secondary-bg))) !important ;
    }

  
</style>