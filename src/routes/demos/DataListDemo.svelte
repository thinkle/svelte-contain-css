<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import DataList from "$lib/layout/DataList.svelte";
  import DataListItem from "$lib/layout/DataListItem.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import { dataListVars } from "./cssVariableDefs";

  let stackedActions = $state(false);
  let fixedActionRail = $state(false);
  let compactStacking = $state(false);
  let lastOpened = $state<string | null>(null);
  let openCount = $state(0);
  let iconSizePx = $state(48);
  let iconSizeCss = $derived(`${iconSizePx}px`);
  let iconRowMinHeightPx = $derived(iconSizePx + 16);
  let iconRowMinHeight = $derived(`${iconRowMinHeightPx}px`);

  const articleFeed = [
    {
      image: "https://loremflickr.com/320/320/cat?lock=11",
      imageAlt: "Orange cat looking at a ball of yarn",
      title: "Cats And Yarn",
      subtitle:
        "Why cats love string toys and safer alternatives for play time.",
      meta: "4 min read",
    },
    {
      image: "https://loremflickr.com/320/320/bird?lock=12",
      imageAlt: "Small songbird perched on a branch",
      title: "Birdwatching In Ten Minutes",
      subtitle:
        "A quick routine to spot common backyard birds before breakfast.",
      meta: "6 min read",
    },
    {
      image: "https://loremflickr.com/320/320/owl?lock=13",
      imageAlt: "Owl with bright eyes",
      title: "Owls At Dusk",
      subtitle:
        "Where and when to catch evening owl activity without disturbance.",
      meta: "5 min read",
    },
  ];

  let selectableList = $state(
    articleFeed.map((item, index) => ({ ...item, selected: index === 1 })),
  );
  let selectedCount = $derived(
    selectableList.filter((item) => item.selected).length,
  );
  let selectedTitles = $derived(
    selectableList.filter((item) => item.selected).map((item) => item.title),
  );

  const featureFeed = [
    {
      image: "https://loremflickr.com/320/320/parrot?lock=14",
      imageAlt: "Parrot in bright green and yellow feathers",
      title: "Parrot Care Starter Guide",
      subtitle: "Daily enrichment, social needs, and habitat basics.",
      tags: ["Care", "Beginner"],
      meta: "8 min read",
    },
    {
      image: "https://loremflickr.com/320/320/cat,window?lock=15",
      imageAlt: "Cat sitting by a sunlit window",
      title: "Indoor Cat Enrichment",
      subtitle:
        "Simple games and setups to keep indoor cats curious and active.",
      tags: ["Play", "Home"],
      meta: "7 min read",
    },
    {
      image: "https://loremflickr.com/320/320/kingfisher?lock=16",
      imageAlt: "Kingfisher near water",
      title: "Photographing Birds Ethically",
      subtitle: "Composition tips that avoid stressing wildlife.",
      tags: ["Photography", "Outdoors"],
      meta: "9 min read",
    },
  ];

  const basicListMarkup = `<DataList maxWidth="800px" iconSize="3rem" iconBorderRadius="50%">
  <DataListItem>
    {#snippet start()}
      <img src="https://loremflickr.com/120/120/cat?lock=1" alt="Cat with yarn" />
    {/snippet}
    <h4>Cats</h4>
    <p>Cats love to play with yarn.</p>
    {#snippet end()}
      <span>4 min read</span>
      <Button>Read</Button>
    {/snippet}
  </DataListItem>
</DataList>`;

  const iconSizeMarkup = $derived.by(() => {
    const items = articleFeed
      .slice(0, 2)
      .map(
        (item) => `  <DataListItem>
    {#snippet start()}
      <img src="${item.image}" alt="${item.imageAlt}" />
    {/snippet}
    <h4>${item.title}</h4>
    <p>${item.subtitle}</p>
  </DataListItem>`,
      )
      .join("\n");

    return `<DataList iconSize="${iconSizePx}px" itemMinHeight="${iconRowMinHeightPx}px">
${items}
</DataList>`;
  });

  const responsiveTypographyMarkup = `<SplitPane leftWidth="12em" rightWidth="2fr">
  {#snippet right()}
    <div class="responsive-typography-scope">
      <DataList class="responsive-typography-list">…</DataList>
    </div>
  {/snippet}
  </SplitPane>`;

  const responsiveTypographyStyle = `
  .responsive-typography-scope {
    container-type: inline-size;
  }

  .responsive-typography-list {
    --data-list-heading-font-size: 1.05rem;
    --data-list-paragraph-font-size: 0.95rem;
  }

  @container (max-width: 320px) {
    .responsive-typography-list {
      --data-list-heading-font-size: 0.85rem;
      --data-list-paragraph-font-size: 0.75rem;
    }
  }

  @container (min-width: 700px) {
    .responsive-typography-list {
      --data-list-heading-font-size: 1.3rem;
      --data-list-paragraph-font-size: 1.05rem;
    }
  }
`;

  const interactiveRowsMarkup = `<DataList>
  <DataListItem interactive onclick={() => openArticle()}>…</DataListItem>
</DataList>`;

  const selectableRowsMarkup = `<DataList>
  <DataListItem selectable bind:checked={selected}>…</DataListItem>
</DataList>`;

  const responsiveActionMarkup = $derived.by(() => {
    const attrs = [
      compactStacking ? "stackable" : null,
      stackedActions ? 'actionFlexDirection="column"' : null,
      fixedActionRail ? 'actionWidth="8.5rem"' : null,
    ].filter(Boolean);

    const openTag = attrs.length
      ? `<DataList\n  ${attrs.join("\n  ")}\n>`
      : "<DataList>";

    return `${openTag}
  <DataListItem>…</DataListItem>
</DataList>`;
  });
</script>

<CssVariableDemo variables={dataListVars}>
  <TextLayout>
    <h2>Data List</h2>
    <p>
      Use <code>DataList</code> when each row is a mini-layout with leading content,
      a rich center section, and trailing actions.
    </p>
    <p>
      This pattern differs from <code>Table</code>: rows can have
      variable-height content, chips/tags, and action clusters.
    </p>
  </TextLayout>

  <DemoWithCode markupSource={basicListMarkup}>
    {#snippet header()}
      <h3>Basic Feed</h3>
      <p>
        A standard data list row with image, heading, paragraph, and a trailing
        action cluster.
      </p>
    {/snippet}
    <DataList maxWidth="800px" iconSize="3rem" iconBorderRadius="50%">
      {#each articleFeed as item}
        <DataListItem>
          {#snippet start()}
            <img src={item.image} alt={item.imageAlt} />
          {/snippet}
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
          {#snippet end()}
            <span class="meta">{item.meta}</span>
            <Button>Read</Button>
          {/snippet}
        </DataListItem>
      {/each}
    </DataList>
  </DemoWithCode>

  <DemoWithCode markupSource={iconSizeMarkup}>
    {#snippet header()}
      <h3>Icon Size Variants</h3>
      <p>
        <code>iconSize</code> controls both image size and icon track width by default.
        Move the slider to preview row density from compact to oversized.
      </p>
    {/snippet}
    <FormItem>
      {#snippet label()}
        Icon size ({iconSizePx}px)
      {/snippet}
      <Slider bind:value={iconSizePx} min={25} max={200} step={1} />
    </FormItem>

    <DataList iconSize={iconSizeCss} itemMinHeight={iconRowMinHeight}>
      {#each articleFeed.slice(0, 2) as item}
        <DataListItem>
          {#snippet start()}
            <img src={item.image} alt={item.imageAlt} />
          {/snippet}
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
        </DataListItem>
      {/each}
    </DataList>
  </DemoWithCode>

  <DemoWithCode
    markupSource={responsiveTypographyMarkup}
    styleSource={responsiveTypographyStyle}
  >
    {#snippet header()}
      <h3>Responsive Typography (App CSS)</h3>
      <p>
        Set typography variables with container queries in your app/theme so the
        same <code>DataList</code> adapts to where it is used.
      </p>
      <p>
        This example uses container breakpoints at <code>320px</code> and
        <code>700px</code>.
      </p>
    {/snippet}
    <SplitPane leftWidth="12em" rightWidth="2fr">
      {#snippet left()}
        <p class="hint">
          Resize this pane to cross the 320px and 700px typography breakpoints.
        </p>
      {/snippet}
      {#snippet right()}
        <div class="responsive-typography-scope">
          <DataList class="responsive-typography-list">
            {#each articleFeed as item}
              <DataListItem>
                {#snippet start()}
                  <img src={item.image} alt={item.imageAlt} />
                {/snippet}
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
              </DataListItem>
            {/each}
          </DataList>
        </div>
      {/snippet}
    </SplitPane>
  </DemoWithCode>

  <DemoWithCode markupSource={interactiveRowsMarkup}>
    {#snippet header()}
      <h3>Interactive Rows</h3>
      <p>
        Use <code>interactive</code> when the entire row should behave like one
        click target.
      </p>
      <p>
        The interactive example has no trailing action controls, so the full row is
        the click target.
      </p>
    {/snippet}
    <DataList maxWidth="800px">
      {#each articleFeed as item}
        <DataListItem
          interactive
          onclick={() => {
            lastOpened = item.title;
            openCount += 1;
          }}
        >
          {#snippet start()}
            <img src={item.image} alt={item.imageAlt} />
          {/snippet}
          <h4>{item.title}</h4>
          <p>{item.subtitle} · {item.meta}</p>
        </DataListItem>
      {/each}
    </DataList>

    <p class="hint status">
      Last opened: {lastOpened ?? "none"} ({openCount} clicks)
    </p>
  </DemoWithCode>

  <DemoWithCode markupSource={selectableRowsMarkup}>
    {#snippet header()}
      <h3>Selectable Rows</h3>
      <p>
        Use <code>selectable</code> with <code>bind:checked</code> when rows
        represent a selected/unselected state.
      </p>
      <p>
        Selectable rows render a trailing checkbox by default unless you provide
        a custom <code>end</code> snippet.
      </p>
    {/snippet}
    <DataList maxWidth="800px">
      {#each selectableList as item}
        <DataListItem selectable bind:checked={item.selected}>
          {#snippet start()}
            <img src={item.image} alt={item.imageAlt} />
          {/snippet}
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
        </DataListItem>
      {/each}
    </DataList>

    <p class="hint status">
      Selected ({selectedCount}): {selectedTitles.length
        ? selectedTitles.join(", ")
        : "none"}
    </p>
  </DemoWithCode>

  <DemoWithCode markupSource={responsiveActionMarkup}>
    {#snippet header()}
      <h3>Responsive Action Layout</h3>
      <p>
        This section focuses on how the trailing action area adapts to narrow
        containers.
      </p>
      <p>
        Toggle stacking, direction, and reserved action width to see how rows
        rebalance content and controls.
      </p>
    {/snippet}
    <FormItem>
      <Checkbox bind:checked={stackedActions}>Stack trailing actions</Checkbox>
    </FormItem>
    <FormItem>
      <Checkbox bind:checked={fixedActionRail}>Reserve action width</Checkbox>
    </FormItem>
    <FormItem>
      <Checkbox bind:checked={compactStacking}>Allow compact stacking</Checkbox>
    </FormItem>

    <SplitPane leftWidth="12em" rightWidth="2fr">
      {#snippet left()}
        <p class="hint">
          Resize this pane to watch the action area wrap below row content at
          narrow widths.
        </p>
      {/snippet}
      {#snippet right()}
        <DataList
          stackable={compactStacking}
          actionFlexDirection={stackedActions ? "column" : "row"}
          actionWidth={fixedActionRail ? "8.5rem" : "auto"}
        >
          {#each featureFeed as item}
            <DataListItem>
              {#snippet start()}
                <img src={item.image} alt={item.imageAlt} />
              {/snippet}
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
              <div class="tag-row">
                {#each item.tags as tag}
                  <Tag>{tag}</Tag>
                {/each}
              </div>
              {#snippet end()}
                <span class="meta">{item.meta}</span>
                <MiniButton>E</MiniButton>
                <MiniButton primary>+</MiniButton>
              {/snippet}
            </DataListItem>
          {/each}
        </DataList>
      {/snippet}
    </SplitPane>
  </DemoWithCode>
</CssVariableDemo>

<style>
  .hint {
    margin: 0;
  }

  .status {
    margin-top: var(--space-lg);
    margin-bottom: var(--space-lg);
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25em;
  }

  .meta {
    white-space: nowrap;
    font-size: var(--font-size-small);
    opacity: 0.9;
  }

  .responsive-typography-scope {
    container-type: inline-size;
    min-width: 0;
  }

  :global(.responsive-typography-list) {
    --data-list-heading-font-size: 1.05rem;
    --data-list-paragraph-font-size: 0.95rem;
  }

  @container (max-width: 320px) {
    :global(.responsive-typography-list) {
      --data-list-heading-font-size: 0.85rem;
      --data-list-paragraph-font-size: 0.75rem;
    }
  }

  @container (min-width: 700px) {
    :global(.responsive-typography-list) {
      --data-list-heading-font-size: 1.3rem;
      --data-list-paragraph-font-size: 1.05rem;
    }
  }
</style>
