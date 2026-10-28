<script lang="ts">
  import Table from "$lib/layout/Table.svelte";

  /* Fixture for horizontal scrolling and frozen columns in <Table sticky>.

     Each table sits in a fixed-size panel that scrolls vertically, standing
     in for a Page's content panel: the regression was a wide sticky table
     spilling its overflow into that panel, so the whole panel (and every
     toolbar in it) slid sideways instead of the table.

     "More columns" adds a batch of columns, so the tables start out fitting
     and are made to overflow while mounted -- the case a consumer hits when
     a column picker turns on twenty more fields. */
  let extra = $state(0);
  const base = ["Student", "Advisor", "Grade"];
  const fields = $derived(
    Array.from({ length: extra }, (_, i) => `Field ${i + 1}`),
  );
  const students = Array.from({ length: 40 }, (_, i) => `Student ${i + 1}`);
</script>

<h1>Sticky table: horizontal scroll and frozen columns</h1>
<button data-testid="more-columns" onclick={() => (extra += 12)}>
  More columns
</button>

{#each [{ id: "scroll", frozen: 0 }, { id: "freeze", frozen: 2 }] as section}
  <section class="panel" data-testid={section.id}>
    <p class="toolbar">Toolbar before the table</p>
    <Table sticky stickyColumns={section.frozen}>
      {#snippet thead()}
        <thead>
          {#if section.frozen}
            <!-- A group row: "Who" spans exactly the frozen block, so it is
                 frozen too; "Data" spans the rest and scrolls. -->
            <tr>
              <th colspan="2">Who</th>
              <th colspan={fields.length + 2}>Data</th>
            </tr>
          {/if}
          <tr>
            {#each base as c}<th>{c}</th>{/each}
            {#each fields as c}<th>{c}</th>{/each}
            <th>Notes</th>
          </tr>
        </thead>
      {/snippet}
      {#snippet tbody()}
        <tbody>
          {#each students as s, r}
            <tr>
              <th>{s}</th>
              <td>Advisor {r % 5}</td>
              <td>{9 + (r % 4)}</td>
              {#each fields as _, i}<td>{(r * 7 + i) % 100}</td>{/each}
              <td>
                {r === 0
                  ? "A long note that should wrap at the cell cap rather than stretching this column across the whole screen in one line."
                  : "-"}
              </td>
            </tr>
          {/each}
        </tbody>
      {/snippet}
    </Table>
  </section>
{/each}

<style>
  /* A vertical scroller like Page's .content: overflow-y auto, which makes
     overflow-x auto as well -- exactly where a spilled table used to land. */
  .panel {
    width: 800px;
    height: 420px;
    overflow-y: auto;
    margin: 1rem 0;
    padding: 0 1rem;
    border: 1px solid #ccc;
  }
</style>
