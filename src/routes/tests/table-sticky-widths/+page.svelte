<script lang="ts">
  import Table from "$lib/layout/Table.svelte";

  /* Column counts chosen so that:
     - "narrow" comfortably fits the 600px container
     - "wide" cannot possibly fit, and must be allowed to overflow it

     The regression this guards: the sticky variant used to measure a hidden
     head clone and a hidden body clone as two separate tables and fold them
     together with Math.max(), which produced a column set wider than either
     table actually needed -- overflow in the narrow case, and incoherent
     proportions in the wide one. */
  // Short headers on purpose: this set's min-content width is comfortably
  // under the 600px frame, so any overflow is the measuring code's fault.
  const columns = ["Student", "Adv.", "Gr.", "Att.", "Late"];

  const wideExtra = [
    "Missing assignments",
    "Last contacted by advisor",
    "Reading level",
    "Math placement",
    "Guardian phone",
    "Transportation",
  ];

  const rows = [
    ["Ada", "Sanderson", "9", "97%", "0"],
    ["Grace", "Tran", "11", "91%", "3"],
    ["Alan", "Sanderson", "10", "88%", "1"],
  ];

  const wideRowExtra = [
    "0",
    "Aug 29",
    "Q",
    "Geometry",
    "555-0100",
    "Bus 12",
  ];
</script>

<h1>Sticky table column widths</h1>

<section data-testid="narrow" class="frame">
  <Table sticky>
    {#snippet thead()}
      <thead>
        <tr>
          {#each columns as c}<th>{c}</th>{/each}
        </tr>
      </thead>
    {/snippet}
    {#snippet tbody()}
      <tbody>
        {#each rows as row}
          <tr>
            {#each row as cell}<td>{cell}</td>{/each}
          </tr>
        {/each}
      </tbody>
    {/snippet}
  </Table>
</section>

<section data-testid="wide" class="frame">
  <Table sticky>
    {#snippet thead()}
      <thead>
        <tr>
          {#each [...columns, ...wideExtra] as c}<th>{c}</th>{/each}
        </tr>
      </thead>
    {/snippet}
    {#snippet tbody()}
      <tbody>
        {#each rows as row}
          <tr>
            {#each [...row, ...wideRowExtra] as cell}<td>{cell}</td>{/each}
          </tr>
        {/each}
      </tbody>
    {/snippet}
  </Table>
</section>

<!-- Ground truth: the same content in a plain, non-sticky Table in an
     identical frame. Whatever the browser does here is what the sticky
     variant's measured colgroup is supposed to reproduce. -->
<section data-testid="narrow-reference" class="frame">
  <Table>
    <thead>
      <tr>
        {#each columns as c}<th>{c}</th>{/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          {#each row as cell}<td>{cell}</td>{/each}
        </tr>
      {/each}
    </tbody>
  </Table>
</section>

<section data-testid="wide-reference" class="frame">
  <Table>
    <thead>
      <tr>
        {#each [...columns, ...wideExtra] as c}<th>{c}</th>{/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          {#each [...row, ...wideRowExtra] as cell}<td>{cell}</td>{/each}
        </tr>
      {/each}
    </tbody>
  </Table>
</section>

<!-- A full-width colspan toolbar row must not become the ruler we measure -->
<section data-testid="colspan" class="frame">
  <Table sticky>
    {#snippet thead()}
      <thead>
        <tr><th colspan={columns.length}>Caseload overview</th></tr>
        <tr>
          {#each columns as c}<th>{c}</th>{/each}
        </tr>
      </thead>
    {/snippet}
    {#snippet tbody()}
      <tbody>
        {#each rows as row}
          <tr>
            {#each row as cell}<td>{cell}</td>{/each}
          </tr>
        {/each}
      </tbody>
    {/snippet}
  </Table>
</section>

<style>
  /* A container narrower than the viewport: the old `position: fixed` clone
     measured against the viewport and never saw this constraint at all. */
  .frame {
    width: 600px;
    margin: 2rem 0;
    border: 1px solid #ccc;
    overflow-x: auto;
  }
</style>
