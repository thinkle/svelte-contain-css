<script lang="ts">
  import Tag from "$lib/misc/Tag.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";

  let tags = ["Svelte", "CSS", "Components"];

  function removeTag(tag: string) {
    tags = tags.filter((t) => t !== tag);
  }

  function resetTags() {
    tags = ["Svelte", "CSS", "Components"];
  }
</script>

<Container border>
  <h2>Tags</h2>
  <p>
    Tags are small inline labels useful for categorization, status indicators,
    or dismissible items.
  </p>

  <h3>Basic Tags</h3>
  <Code
    code={`<Tag>Default</Tag>
<Tag primary>Primary</Tag>
<Tag secondary>Secondary</Tag>
<Tag warning>Warning</Tag>
<Tag danger>Danger</Tag>
<Tag success>Success</Tag>
<Tag info>Info</Tag>`}
  />
  <div style="margin: 1rem 0;">
    <Tag>Default</Tag>
    <Tag primary>Primary</Tag>
    <Tag warning>Warning</Tag>
    <Tag danger>Danger</Tag>
    <Tag success>Success</Tag>
    <Tag info>Info</Tag>
  </div>

  <h3>Closable Tags</h3>
  <p>Pass an <code>onclose</code> callback to make tags dismissible:</p>
  <Code
    code={`<Tag onclose={() => removeTag("Svelte")}>Svelte</Tag>`}
  />
  <div style="margin: 1rem 0;">
    {#each tags as tag}
      <Tag primary onclose={() => removeTag(tag)}>{tag}</Tag>
    {/each}
    {#if tags.length === 0}
      <button on:click={resetTags}>Reset tags</button>
    {/if}
  </div>

  <h3>Use Cases</h3>
  <p>Tags work great for status indicators:</p>
  <div style="margin: 1rem 0;">
    <Tag success>Published</Tag>
    <Tag warning>Draft</Tag>
    <Tag danger>Archived</Tag>
    <Tag info>Review</Tag>
  </div>
</Container>
