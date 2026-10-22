<script lang="ts">
  import type { Snippet } from "svelte";
  import { injectVars } from "$lib/util";
  import Container from "$lib/layout/Container.svelte";
  import TabBar from "$lib/layout/TabBar.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  type Props = {
    code?: string;
    scriptSource?: string;
    markupSource?: string;
    styleSource?: string;
    language?: string;
    summary?: string;
    /* "auto" (the default) opens side by side when the box is at least
       splitMinWidth wide on first render, and on the demo otherwise. */
    defaultTab?: "auto" | "demo" | "source" | "split";
    splitMinWidth?: number;
    width?: string | null;
    height?: string | null;
    codeWidth?: string | null;
    bg?: string | null;
    fg?: string | null;
    border?: string | null;
    borderRadius?: string | null;
    shadow?: string | null;
    padding?: string | null;
    gap?: string | null;
    marginBlock?: string | null;
    header?: Snippet;
    heading?: Snippet;
    blurb?: Snippet;
    inputArea?: Snippet;
    children?: Snippet;
  };

  let {
    code = "",
    scriptSource = "",
    markupSource = "",
    styleSource = "",
    language = "html",
    summary = "See Code",
    defaultTab = "auto",
    splitMinWidth = 960,
    width = null,
    height = null,
    codeWidth = null,
    bg = null,
    fg = null,
    border = null,
    borderRadius = null,
    shadow = null,
    padding = null,
    gap = null,
    marginBlock = null,
    header,
    heading,
    blurb,
    inputArea,
    children,
  }: Props = $props();

  const openScriptTag = '\x3Cscript lang="ts">';
  const closeScriptTag = "\x3C/script>";
  const openStyleTag = "\x3Cstyle>";
  const closeStyleTag = "\x3C/style>";

  const resolvedCode = $derived(
    code.trim().length
      ? code
      : [
          scriptSource.trim().length
            ? `${openScriptTag}\n${scriptSource.trim()}\n${closeScriptTag}`
            : "",
          markupSource.trim(),
          styleSource.trim().length
            ? `${openStyleTag}\n${styleSource.trim()}\n${closeStyleTag}`
            : "",
        ]
          .filter(Boolean)
          .join("\n\n"),
  );
  const hasSource = $derived(Boolean(resolvedCode.trim().length));
  const tabItems = $derived(
    hasSource
      ? [
          { label: "Demo", value: "demo" },
          { label: "Source", value: "source" },
          { label: "Side by Side", value: "split" },
        ]
      : [{ label: "Demo", value: "demo" }],
  );
  let box: HTMLDivElement | undefined = $state();

  /* "auto" is decided from the box's width once, on first render (see the
     effect below) -- never again on resize, so the view doesn't change
     under someone who has picked a tab or is just scrolling. Below the
     threshold each half of a split would be too cramped to read. */
  const resolveTab = (): "demo" | "source" | "split" => {
    if (!hasSource) return "demo";
    if (defaultTab === "auto") {
      return box && box.clientWidth >= splitMinWidth ? "split" : "demo";
    }
    return ["demo", "source", "split"].includes(defaultTab)
      ? (defaultTab as "demo" | "source" | "split")
      : "demo";
  };

  let activeTab = $state<"demo" | "source" | "split">("demo");
  let didInitializeTab = $state(false);

  $effect(() => {
    if (!didInitializeTab) {
      activeTab = resolveTab();
      didInitializeTab = true;
      return;
    }

    if (!hasSource) {
      activeTab = "demo";
      return;
    }

    if (!["demo", "source", "split"].includes(activeTab)) {
      activeTab = resolveTab();
    }
  });

  const style = $derived(
    injectVars(
      {
        width,
        height,
        codeWidth,
        bg,
        fg,
        border,
        borderRadius,
        shadow,
        padding,
        gap,
      },
      "demo-with-code",
      [
        "width",
        "height",
        "codeWidth",
        "bg",
        "fg",
        "border",
        "borderRadius",
        "shadow",
        "padding",
        "gap",
      ],
    ),
  );
</script>

<!-- No margin of its own by default; placed straight in a TextLayout's flow
     it is a figure there, and takes that layout's figure spacing. -->
<Container
  marginBlock={marginBlock ??
    "var(--demo-with-code-margin-block, var(--_figure-margin-block, 0))"}
  maxWidth="none"
  height="auto"
  padding="0"
  --reset-padding="var(--container-padding, var(--block-padding, var(--padding, 8px)))"
  --reset-margin-block="var(--container-margin-block, var(--block-margin-block, var(--margin-block, var(--gap, 16px)))))"
>
  <div class="demo-with-code" {style} bind:this={box}>
    {#if header || heading}
      <div class="demo-heading">
        <TextLayout>
          {@render (header ?? heading)?.()}
        </TextLayout>
      </div>
    {/if}
    {#if blurb}
      <div class="demo-blurb">
        <TextLayout>
          {@render blurb()}
        </TextLayout>
      </div>
    {/if}
    <div
      class="demo-body"
      style:--container-padding="var(--reset-padding)"
      style:--container-margin-block="var(--reset-margin-block)"
    >
      <TabBar
        items={tabItems}
        active={activeTab}
        onchange={(value) => {
          activeTab = (
            typeof value === "string" ? value : (value?.value ?? "demo")
          ) as "demo" | "source" | "split";
        }}
      />
      {#if inputArea}
        <div class="demo-input-area">
          {@render inputArea()}
        </div>
      {/if}
      {#if activeTab === "demo"}
        <div
          class="tab-panel demo-panel"
          style="--panel-height: var(--demo-with-code-height)"
        >
          {@render children?.()}
        </div>
      {:else if activeTab === "source"}
        <div class="tab-panel source-panel">
          <div class="code-wrap">
            {#key resolvedCode}
              <Code code={resolvedCode} {language} />
            {/key}
          </div>
        </div>
      {:else}
        <div class="tab-panel split-panel">
          <SplitPane
            leftWidth="1fr"
            rightWidth="1fr"
            height="var(--_split-height)"
            --split-pane-border="none"
            --split-pane-content-padding="var(--space-md)"
          >
            {#snippet left()}
              {@render children?.()}
            {/snippet}
            {#snippet right()}
              <div class="code-wrap split-code-wrap">
                {#key resolvedCode}
                  <Code code={resolvedCode} {language} />
                {/key}
              </div>
            {/snippet}
          </SplitPane>
        </div>
      {/if}
    </div>
  </div>
</Container>

<style>
  .demo-with-code {
    box-sizing: border-box;
    display: grid;
    gap: var(--demo-with-code-gap, var(--space-lg));
    /* As wide as a TextLayout's wide column (the same variable), so raising
       that one value widens the prose column's figures and its demos
       together and they keep a shared edge. */
    width: min(
      100%,
      var(--demo-with-code-width, var(--text-layout-wide-width, 72rem))
    );
    margin-inline: auto;
    padding: var(--demo-with-code-padding, var(--padding, 8px));
    background: var(
      --demo-with-code-bg,
      var(--container-bg, var(--bg, rgba(255, 255, 255, 0.8)))
    );
    color: var(--demo-with-code-fg, var(--container-fg, var(--fg, inherit)));
    border: var(
      --demo-with-code-border,
      1px solid color-mix(in srgb, var(--fg, #222) 12%, transparent)
    );
    border-radius: var(
      --demo-with-code-border-radius,
      var(--container-border-radius, var(--border-radius, 8px))
    );
    box-shadow: var(
      --demo-with-code-shadow,
      0 3px 12px color-mix(in srgb, var(--fg, #222) 14%, transparent)
    );
  }

  /* The caption belongs to this box, so it lines up with the box's own
     content edge (where the tabs start), not with the page's centred reading
     column: one left edge per unit. Still capped at the measure. */
  .demo-heading,
  .demo-blurb {
    min-width: 0;
    --prose-margin-inline: 0;
    --text-padding: 0;
    --text-layout-margin-inline: 0;
  }

  .demo-body {
    min-width: 0;
    display: grid;
    gap: var(--space-md);
  }

  .demo-input-area {
    box-sizing: border-box;
    display: grid;
    gap: var(--space-sm, 0.5rem);
    padding: var(--space-sm, 0.5rem) var(--space-md, 1rem);
  }

  .tab-panel {
    /* The docs page left-aligns its prose; a live demo shows the library's
       own default instead (a TextLayout there should centre, as it would in
       the consumer's app). */
    --prose-margin-inline: initial;
    --heading-margin-inline: initial;
    --text-layout-margin-inline: initial;
    box-sizing: border-box;
    min-width: 0;
    min-height: var(--panel-height);
    padding: var(--space-md);
    border: var(
      --demo-with-code-panel-border,
      1px solid color-mix(in srgb, var(--fg, #222) 8%, transparent)
    );
    border-radius: var(
      --demo-with-code-panel-border-radius,
      var(--border-radius, 8px)
    );
    background: var(
      --demo-with-code-panel-bg,
      color-mix(in srgb, var(--demo-with-code-bg, transparent) 60%, white 40%)
    );
    overflow: hidden;
  }

  .code-wrap {
    box-sizing: border-box;
    width: min(100%, var(--demo-with-code-code-width, 60rem));
    margin-inline: auto;
    --code-width: 100%;
  }

  .split-panel {
    padding: 0;
    /* As tall as the taller half -- a row of tags shouldn't sit in a 640px
       slab -- with each half capped, and scrolling past the cap, so a long
       code sample can't make the box enormous. An explicit height still
       pins it. */
    --_split-height: var(
      --demo-with-code-height,
      var(--demo-with-code-split-height, auto)
    );
  }
  .split-panel :global(.split-pane > :not(.resizer)) {
    max-height: var(--demo-with-code-split-max-height, min(70vh, 640px));
    overflow: auto;
  }

  /* SplitPane stacks its panes below 600px (it asks the same container this
     does). A fixed height only makes sense for panes side by side; stacked,
     it just leaves a slab of empty panel under the code. */
  @container (max-width: 600px) {
    .split-panel {
      --_split-height: auto;
    }
  }

  .split-panel :global(.split-pane) {
    border: none;
  }

  .split-code-wrap {
    width: 100%;
  }
</style>
