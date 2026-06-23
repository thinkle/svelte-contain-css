<script lang="ts">
  import Inline from "$lib/layout/Inline.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  let shownTags = $state(["A", "B", "C", "D", "E"]);
  let colors = [
    "var(--material-color-red-500)",
    "var(--material-color-green-500)",
    "var(--material-color-blue-500)",
    "var(--material-color-amber-500)",
    "var(--material-color-purple-500)",
    "var(--material-color-pink-500)",
  ];
  import type { CSSVariable } from "./types";
  const tagVars: CSSVariable[] = [
    { name: "--tag-bg", type: "color", defaultValue: "var(--secondary-bg)" },
    { name: "--tag-fg", type: "color", defaultValue: "var(--secondary-fg)" },
    { name: "--tag-padding", type: "length", defaultValue: "0.2em 0.5em" },
    { name: "--tag-border-radius", type: "length", defaultValue: "0.25em" },
    { name: "--tag-font-size", type: "length", defaultValue: "0.85em" },
  ];
</script>

<CssVariableDemo variables={tagVars}>
  <TextLayout>
    <h2>Tag</h2>
    <p>
      Tags are small, inline labels used to categorize or identify content. They
      can display topics, categories, statuses, or metadata in a compact format.
    </p>
  </TextLayout>

  <DemoWithCode
    code={`
<Tag>JavaScript</Tag>
<Tag>React</Tag>
<Tag>CSS</Tag>
      `}
  >
    {#snippet header()}
      <h3>Basic tags</h3>
    {/snippet}
    {#snippet blurb()}
      <p>Simple tags with default styling.</p>
    {/snippet}
    <p>
      <Tag>JavaScript</Tag>
      <Tag>React</Tag>
      <Tag>CSS</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Svelte</Tag>
    </p>
  </DemoWithCode>

  <DemoWithCode
    code={`
<Tag onclose={myCloseHandler}>Removable Tag</Tag>
      `}
  >
    {#snippet header()}
      <h3>Closable tags</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        Provide an <code>onclose</code> prop to add a dismiss affordance.
      </p>
    {/snippet}
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
  </DemoWithCode>

  <DemoWithCode
    code={`
<Tag --tag-bg="var(--material-color-red-100)" --tag-fg="var(--material-color-red-900)">
  Bug
</Tag>
<Tag --tag-bg="var(--material-color-green-100)" --tag-fg="var(--material-color-green-900)">
  Feature
</Tag>
      `}
  >
    {#snippet header()}
      <h3>Custom styling</h3>
    {/snippet}
    {#snippet blurb()}
      <p>Override colors and spacing with CSS variables.</p>
    {/snippet}
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
  </DemoWithCode>

  <DemoWithCode
    code={`<Inline>
  <Tag --tag-bg="var(--material-color-green-600)" --tag-fg="white">
  ✓ Active
  </Tag>
  <Tag --tag-bg="var(--material-color-orange-600)" --tag-fg="white">
  ⚠ Pending
  </Tag>
  <Tag --tag-bg="var(--material-color-grey-600)" --tag-fg="white">
  ✕ Inactive
</Tag>
</Inline>`}
  >
    {#snippet header()}
      <h3>Status tags</h3>
    {/snippet}
    {#snippet blurb()}
      <p>Use tags to display status information inline with other UI.</p>
    {/snippet}
    <Inline>
      <Tag --tag-bg="var(--material-color-green-600)" --tag-fg="white">
        ✓ Active
      </Tag>
      <Tag --tag-bg="var(--material-color-orange-600)" --tag-fg="white">
        ⚠ Pending
      </Tag>
      <Tag --tag-bg="var(--material-color-grey-600)" --tag-fg="white">
        ✕ Inactive
      </Tag>
    </Inline>
  </DemoWithCode>

  <DemoWithCode
    code={`<Stack>
  <strong>Article: Introduction to Web Components</strong>
  <Inline>
    <Tag>Web Components</Tag>
    <Tag>JavaScript</Tag>
    <Tag>Tutorial</Tag>
  </Inline>
</Stack>`}
  >
    {#snippet header()}
      <h3>Tags in context</h3>
    {/snippet}
    {#snippet blurb()}
      <p>Tags work well alongside titles, issue metadata, and article labels.</p>
    {/snippet}
    <Stack>
      <Stack>
        <strong>Article: Introduction to Web Components</strong>
        <Inline>
          <Tag>Web Components</Tag>
          <Tag>JavaScript</Tag>
          <Tag>Tutorial</Tag>
        </Inline>
      </Stack>
      <Stack>
        <strong>Issue: Fix responsive layout on mobile</strong>
        <Inline>
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
        </Inline>
      </Stack>
    </Stack>
  </DemoWithCode>
</CssVariableDemo>
