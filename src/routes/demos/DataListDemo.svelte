<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import DataList from "$lib/layout/DataList.svelte";
  import DataListItem from "$lib/layout/DataListItem.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import { dataListVars } from "./cssVariableDefs";

  let stackedActions = false;
  let fixedActionRail = false;
  let compactStacking = false;
  let iconSizePx = 48;

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

  let selectableList = articleFeed.map((item, index) => ({
    ...item,
    selected: index === 1,
  }));

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

  $: iconSizeCss = `${iconSizePx}px`;
  $: iconRowMinHeight = `${iconSizePx + 16}px`;
  $: selectedCount = selectableList.filter((item) => item.selected).length;
  $: selectedTitles = selectableList
    .filter((item) => item.selected)
    .map((item) => item.title);

  function toggleSelected(index: number) {
    selectableList = selectableList.map((item, itemIndex) =>
      itemIndex === index ? { ...item, selected: !item.selected } : item,
    );
  }
</script>

<CssVariableDemo variables={dataListVars}>
  <TextLayout>
    <h2>Data List</h2>
    <p>
      Use <code>DataList</code> when each row needs a leading visual, a rich center
      column, and a trailing action cluster.
    </p>
  </TextLayout>

  <DemoWithCode
    markupSource={`<DataList maxWidth="800px" iconSize="3rem" iconBorderRadius="50%">
  <DataListItem>
    <img slot="start" src="https://loremflickr.com/120/120/cat?lock=1" alt="Cat with yarn" />
    <h4>Cats</h4>
    <p>Cats love to play with yarn.</p>
    <div slot="end">
      <span>4 min read</span>
      <Button>Read</Button>
    </div>
  </DataListItem>
</DataList>`}
    defaultTab="split"
    summary="Demo / Source / Side by Side"
  >
    <svelte:fragment slot="header">
      <h3>Basic Feed</h3>
      <p>
        A standard row with a leading image, rich body copy, and a trailing action
        cluster.
      </p>
    </svelte:fragment>

    <DataList maxWidth="800px" iconSize="3rem" iconBorderRadius="50%">
      {#each articleFeed as item}
        <DataListItem>
          <img slot="start" src={item.image} alt={item.imageAlt} />
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
          <div slot="end" class="action-cluster">
            <span class="meta">{item.meta}</span>
            <Button>Read</Button>
          </div>
        </DataListItem>
      {/each}
    </DataList>
  </DemoWithCode>

  <DemoWithCode
    markupSource={`<DataList iconSize="${iconSizePx}px" itemMinHeight="${iconSizePx + 16}px">
  <DataListItem>…</DataListItem>
</DataList>`}
    defaultTab="split"
  >
    <svelte:fragment slot="header">
      <h3>Icon Size Variants</h3>
      <p>
        <code>iconSize</code> controls both the image size and the default icon rail
        width, so it changes density quickly.
      </p>
    </svelte:fragment>

    <svelte:fragment slot="inputArea">
      <FormItem>
        <span slot="label">Icon size ({iconSizePx}px)</span>
        <Slider bind:value={iconSizePx} min={24} max={160} step={1} />
      </FormItem>
    </svelte:fragment>

    <DataList iconSize={iconSizeCss} itemMinHeight={iconRowMinHeight}>
      {#each articleFeed.slice(0, 2) as item}
        <DataListItem>
          <img slot="start" src={item.image} alt={item.imageAlt} />
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
        </DataListItem>
      {/each}
    </DataList>
  </DemoWithCode>

  <DemoWithCode
    markupSource={`<DataList>
  <DataListItem selectable bind:checked={selected}>…</DataListItem>
</DataList>`}
    defaultTab="split"
  >
    <svelte:fragment slot="header">
      <h3>Selectable Rows</h3>
      <p>
        Rows can act like selectable records, either with direct checkbox binding
        or with your own list-state updates.
      </p>
    </svelte:fragment>

    <p>
      <strong>{selectedCount}</strong> selected
      {#if selectedTitles.length}
        : {selectedTitles.join(", ")}
      {/if}
    </p>
    <DataList>
      {#each selectableList as item}
        <DataListItem selectable bind:checked={item.selected}>
          <img slot="start" src={item.image} alt={item.imageAlt} />
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
        </DataListItem>
      {/each}
    </DataList>
    <p>
      The same rows can also funnel state changes into your own list model.
    </p>
    <DataList>
      {#each selectableList as item, index}
        <DataListItem
          selectable
          checked={item.selected}
          on:click={() => toggleSelected(index)}
        >
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
        </DataListItem>
      {/each}
    </DataList>
  </DemoWithCode>

  <DemoWithCode
    markupSource={`<DataList stackable actionWidth="8.5rem">
  <DataListItem interactive>…</DataListItem>
</DataList>`}
    defaultTab="split"
    height="min(70vh, 560px)"
  >
    <svelte:fragment slot="header">
      <h3>Interactive Rows With Action Rail</h3>
      <p>
        This is the layout that really benefits from a full-width demo panel: the
        list can breathe, and the split view stays usable.
      </p>
    </svelte:fragment>

    <svelte:fragment slot="inputArea">
      <FormItem>
        <Checkbox bind:checked={compactStacking}>Stack on narrow containers</Checkbox>
      </FormItem>
      <FormItem>
        <Checkbox bind:checked={stackedActions}>Force vertical action cluster</Checkbox>
      </FormItem>
      <FormItem>
        <Checkbox bind:checked={fixedActionRail}>Reserve fixed action width</Checkbox>
      </FormItem>
    </svelte:fragment>

    <div class="responsive-rail-demo">
      <div class="responsive-rail-aside">
        <p>
          This narrower pane makes it easier to see the compact action rail and wrap
          behavior.
        </p>
      </div>
      <div class="responsive-rail-main">
        <DataList
          stackable={compactStacking}
          actionFlexDirection={stackedActions ? "column" : null}
          actionWidth={fixedActionRail ? "8.5rem" : null}
        >
          {#each featureFeed as item}
            <DataListItem interactive on:click={() => console.info("Open", item.title)}>
              <img slot="start" src={item.image} alt={item.imageAlt} />
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
              <div slot="end" class="action-cluster">
                <span class="meta">{item.meta}</span>
                <div class="tags">
                  {#each item.tags as tag}
                    <Tag>{tag}</Tag>
                  {/each}
                </div>
                <div class="mini-actions">
                  <MiniButton aria-label={`Save ${item.title}`}>★</MiniButton>
                  <MiniButton aria-label={`Share ${item.title}`}>↗</MiniButton>
                </div>
              </div>
            </DataListItem>
          {/each}
        </DataList>
      </div>
    </div>
  </DemoWithCode>
</CssVariableDemo>

<style lang="scss">
  .meta {
    white-space: nowrap;
    font-size: var(--font-size-small, 0.875rem);
    opacity: 0.8;
  }

  .action-cluster,
  .mini-actions,
  .tags {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .action-cluster {
    justify-content: flex-end;
  }

  .responsive-rail-demo {
    display: grid;
    grid-template-columns: minmax(12rem, 18rem) minmax(0, 1fr);
    gap: var(--space-md, 1rem);
    min-height: 100%;
  }

  .responsive-rail-aside,
  .responsive-rail-main {
    min-width: 0;
    container-type: inline-size;
  }

  .responsive-rail-aside {
    padding: var(--space-md, 1rem);
    border: 1px solid color-mix(in srgb, var(--fg, #222) 8%, transparent);
    border-radius: var(--border-radius, 8px);
  }

  @container (max-width: 720px) {
    .responsive-rail-demo {
      grid-template-columns: 1fr;
    }
  }
</style>
