<script lang="ts">
  /* Fixtures for tests/fluid-type.spec.ts: the same Card and DataList in
     boxes of different widths, so type that follows a component's width can
     be measured against it. */
  import Card from "$lib/Card.svelte";
  import DataList from "$lib/layout/DataList.svelte";
  import DataListItem from "$lib/layout/DataListItem.svelte";
  import Input from "$lib/controls/Input.svelte";
  import Tile from "$lib/layout/Tile.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Option from "$lib/controls/Option.svelte";
  import "$lib/vars/defaults.css";
</script>

{#each [250, 420, 1000] as w}
  <div class="box" style="width: {w}px" data-testid="card-{w}">
    <Card width="100%" --card-width-small="100%" --card-margin="0">
      {#snippet header()}<h3>Header</h3>{/snippet}
      <p>Body text</p>
      {#snippet footer()}<span>Footer</span>{/snippet}
    </Card>
  </div>
{/each}

<div class="box" style="width: 250px" data-testid="card-no-slope">
  <Card width="100%" --card-width-small="100%" --card-margin="0" --card-font-size-slope="0">
    <p>Body text</p>
  </Card>
</div>

<div class="box" style="width: 250px" data-testid="card-designed-small">
  <Card width="100%" --card-width-small="100%" --card-margin="0" --card-font-size="11px">
    <p>Body text</p>
  </Card>
</div>

<div class="box" style="width: 300px" data-testid="card-fixed">
  <Card
    width="100%"
    --card-width-small="100%"
    --card-margin="0"
    height="150px"
  >
    {#snippet header()}<span>Header</span>{/snippet}
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      et mi orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    {#snippet footer()}<span>Footer</span>{/snippet}
  </Card>
</div>

{#each [200, 1000] as w}
  <div class="box" style="width: {w}px" data-testid="list-{w}">
    <DataList>
      <DataListItem>
        <h4>Row title</h4>
        <p>The line under it</p>
      </DataListItem>
    </DataList>
  </div>
{/each}

<!-- A wide box, so the tiles stay out of the small tier. -->
<div class="box" style="width: 900px">
  {#each [{ id: "default", w: null }, { id: "wide", w: "400px" }, { id: "narrow", w: "120px" }] as t}
    <span data-testid="tile-{t.id}">
      <Tile width={t.w}><h3>Title</h3><p>Tile text</p></Tile>
    </span>
  {/each}
</div>

<div style="font-size: 12px" data-testid="small-controls">
  <Input />
  <Select>
    <Option value="one">One</Option>
    <Option value="two">Two</Option>
  </Select>
</div>

<style>
  .box {
    container-type: inline-size;
    margin-bottom: 16px;
  }
</style>
