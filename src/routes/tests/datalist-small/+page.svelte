<script lang="ts">
  /* Fixtures for tests/datalist-small.spec.ts: realistic rows -- a leading
     avatar, a name and a line of detail, trailing tags and a button -- the
     shape that crowds on a phone. */
  import DataList from "$lib/layout/DataList.svelte";
  import DataListItem from "$lib/layout/DataListItem.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import Button from "$lib/controls/Button.svelte";
  import "$lib/vars/defaults.css";
  const rows = [
    { name: "Alex Johnson", detail: "Grade 7 · Algebra I · Advisory 3", when: "Today" },
    { name: "Taylor Brown-Martinez", detail: "Grade 7 · Biology", when: "Sunday, Aug 30" },
  ];
</script>

{#each [{ id: "default", stackable: undefined }, { id: "off", stackable: false }] as v}
  <div data-testid={v.id}>
    <DataList stackable={v.stackable}>
      {#each rows as r}
        <DataListItem>
          {#snippet start()}<span class="avatar">{r.name[0]}</span>{/snippet}
          <strong class="name">{r.name}</strong>
          <p>{r.detail}</p>
          {#snippet end()}
            <Tag>Turns 16</Tag><Tag>{r.when}</Tag><Button>Wish</Button>
          {/snippet}
        </DataListItem>
      {/each}
    </DataList>
  </div>
{/each}

<style>
  .avatar {
    display: inline-grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ccc;
  }
</style>
