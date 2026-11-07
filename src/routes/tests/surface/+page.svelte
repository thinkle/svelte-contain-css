<script lang="ts">
  /* Fixture for tests/surface.spec.ts.

     A plain element that paints its own background can't tell Contain about
     it: CSS can't read an ancestor's painted color, so a TabBar inside
     resolves against the page and shows a grey band (Updraft's white
     `.roster-shell` on a grey page). <Surface> is the sanctioned way to
     declare one. If it breaks, the "raised" TabBar strip and active tab come
     out in the page's color instead of the raised tier's.

     Surface must also be a drop-in for the div it replaces: no padding,
     border, margin, overflow or containment. The "sticky" case breaks
     visibly if it gains overflow -- the Table head scrolls away with the
     page instead of sticking -- and the "geometry" pair stop matching. */
  import { Surface, Card, TabBar, Table, Text } from "$lib";
  import ThemeStyle from "$lib/theme/ThemeStyle.svelte";
  import light from "$lib/vars/themes/light.css?raw";
  import dark from "$lib/vars/themes/dark.css?raw";

  let palette = $state("light");
  const rows = Array.from({ length: 60 }, (_, i) => [`Student ${i + 1}`, `${90 - (i % 20)}%`]);
</script>

<ThemeStyle id="surface-fixture-theme" css={palette === "dark" ? dark : light} />

<label>Palette
  <select aria-label="Palette" bind:value={palette}>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
</label>

<!-- Reference: what the raised tier looks like on a real Card. -->
<Card data-testid="card"><p>Card</p></Card>

<Surface tier="surface-raised" data-testid="raised">
  <TabBar items={["Roster", "Grades", "Notes"]} active="Roster" />
  <p>Raised surface</p>
</Surface>

<Surface colorRole="primary" data-testid="role">
  <TabBar items={["Roster", "Grades"]} active="Roster" />
  <h2>On primary</h2>
  <Text muted data-testid="role-muted">muted</Text>
  <Surface data-testid="nested">Nested default surface</Surface>
</Surface>

<Surface as="section" aria-label="Section surface" data-testid="as" class="mine">Section</Surface>

<!-- Element-specific attributes type-check and forward: `open` exists only on
     <details>, so this line also fails svelte-check if Surface loses its
     per-element typing. -->
<Surface as="details" tier="surface-sunken" open data-testid="details">
  <summary>Details</summary>
  Inside
</Surface>

<!-- Same styles, one div and one Surface: their boxes must be identical. -->
<div class="frame" data-testid="geometry">
  <div class="probe" data-testid="plain"><p>Box</p></div>
  <Surface class="probe" tier="surface-raised" data-testid="painted"><p>Box</p></Surface>
</div>

<Surface tier="surface-raised" data-testid="sticky">
  <Table sticky>
    {#snippet thead()}
      <thead><tr><th>Name</th><th>Attendance</th></tr></thead>
    {/snippet}
    {#snippet tbody()}
      <tbody>
        {#each rows as row}
          <tr><td>{row[0]}</td><td>{row[1]}</td></tr>
        {/each}
      </tbody>
    {/snippet}
  </Table>
</Surface>
<div style="height: 150vh"></div>

<style>
  .frame {
    display: flex;
    gap: 10px;
    width: 400px;
  }
  .frame :global(.probe) {
    flex: 1;
  }
</style>
