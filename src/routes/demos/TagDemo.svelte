<script lang="ts">
  import Tag from "$lib/misc/Tag.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  let shownTags = $state(["A", "B", "C", "D", "E"]);
  let colors = [
    "var(--material-color-red-500)",
    "var(--material-color-green-500)",
    "var(--material-color-blue-500)",
    "var(--material-color-amber-500)",
    "var(--material-color-purple-500)",
    "var(--material-color-pink-500)",
  ];
  const tagVars = [
    "tag-bg",
    "tag-fg",
    "tag-padding",
    "tag-border-radius",
    "tag-font-size",
  ];
</script>

<CssVariableDemo variables={tagVars}>
  <TextLayout>
    <h2>Tag</h2>
    <p>
      Tags are small, inline labels used to categorize or identify content. They
      can display topics, categories, statuses, or metadata in a compact format.
    </p>

    <h3>Basic Tags</h3>
    <p>Simple tags with default styling:</p>
    <Code
      code={`
<Tag>JavaScript</Tag>
<Tag>React</Tag>
<Tag>CSS</Tag>
      `}
    />
    <p>
      <Tag>JavaScript</Tag>
      <Tag>React</Tag>
      <Tag>CSS</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Svelte</Tag>
    </p>

    <h3>Closable Tags</h3>
    <p>
      Just provide an <code>onclose</code> prop if you want the tags to display with
      a close button.
    </p>
    <Code
      code={`
<Tag onclose={myCloseHandler}>Removable Tag</Tag>
      `}
    />
    <p>
      {#each shownTags as tag, i (tag)}
        <Tag
          bg={colors[i % colors.length]}
          fg="white"
          onclose={() => {
            shownTags = shownTags.filter((t) => t !== tag);
          }}>Tag {tag}</Tag
        >
      {/each}
    </p>

    <h3>Tags with Custom Styling</h3>
    <p>Override colors and spacing with CSS variables:</p>
    <Code
      code={`
<Tag --tag-bg="var(--material-color-red-100)" --tag-fg="var(--material-color-red-900)">
  Bug
</Tag>
<Tag --tag-bg="var(--material-color-green-100)" --tag-fg="var(--material-color-green-900)">
  Feature
</Tag>
      `}
    />
    <p>
      <Tag
        --tag-bg="var(--material-color-red-100)"
        --tag-fg="var(--material-color-red-900)"
      >
        Bug
      </Tag>
      <Tag
        --tag-bg="var(--material-color-green-100)"
        --tag-fg="var(--material-color-green-900)"
      >
        Feature
      </Tag>
      <Tag
        --tag-bg="var(--material-color-amber-100)"
        --tag-fg="var(--material-color-amber-900)"
      >
        Enhancement
      </Tag>
      <Tag
        --tag-bg="var(--material-color-blue-100)"
        --tag-fg="var(--material-color-blue-900)"
      >
        Documentation
      </Tag>
    </p>

    <h3>Status Tags</h3>
    <p>Use tags to display status information:</p>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <Tag --tag-bg="var(--material-color-green-600)" --tag-fg="white">
        ✓ Active
      </Tag>
      <Tag --tag-bg="var(--material-color-orange-600)" --tag-fg="white">
        ⚠ Pending
      </Tag>
      <Tag --tag-bg="var(--material-color-grey-600)" --tag-fg="white">
        ✕ Inactive
      </Tag>
    </div>

    <h3>Tags in Context</h3>
    <p>Tags work well alongside other content:</p>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <strong>Article: Introduction to Web Components</strong>
        <div
          style="margin-top: 0.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;"
        >
          <Tag>Web Components</Tag>
          <Tag>JavaScript</Tag>
          <Tag>Tutorial</Tag>
        </div>
      </div>
      <div>
        <strong>Issue: Fix responsive layout on mobile</strong>
        <div
          style="margin-top: 0.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;"
        >
          <Tag
            --tag-bg="var(--material-color-red-100)"
            --tag-fg="var(--material-color-red-900)"
          >
            Bug
          </Tag>
          <Tag
            --tag-bg="var(--material-color-blue-100)"
            --tag-fg="var(--material-color-blue-900)"
          >
            Mobile
          </Tag>
        </div>
      </div>
    </div>
  </TextLayout>
</CssVariableDemo>
