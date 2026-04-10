<script lang="ts">
  import { injectVars } from "$lib/util";
  import Container from "$lib/layout/Container.svelte";
  import TabBar from "$lib/layout/TabBar.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  export let code = "";
  export let scriptSource = "";
  export let markupSource = "";
  export let styleSource = "";
  export let language = "html";
  export let summary = "See Code";
  export let defaultTab: "demo" | "source" | "split" = "demo";
  export let width: string | null = null;
  export let height: string | null = null;
  export let codeWidth: string | null = null;
  export let bg: string | null = null;
  export let fg: string | null = null;
  export let border: string | null = null;
  export let borderRadius: string | null = null;
  export let shadow: string | null = null;
  export let padding: string | null = null;
  export let gap: string | null = null;

  const openScriptTag = '\x3Cscript lang="ts">';
  const closeScriptTag = "\x3C/script>";
  const openStyleTag = "\x3Cstyle>";
  const closeStyleTag = "\x3C/style>";

  $: resolvedCode = code.trim().length
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
        .join("\n\n");

  $: hasSource = Boolean(resolvedCode.trim().length);
  $: tabItems = hasSource
    ? ["demo", "source", "split"]
    : ["demo"];
  $: resolvedDefaultTab =
    hasSource && ["demo", "source", "split"].includes(defaultTab)
      ? defaultTab
      : "demo";

  let activeTab = resolvedDefaultTab;

  $: if (!hasSource) {
    activeTab = "demo";
  } else if (!["demo", "source", "split"].includes(activeTab)) {
    activeTab = resolvedDefaultTab;
  }

  $: style = injectVars(
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
  );

  function normalizeTabValue(value: string) {
    if (value === "source") return "source";
    if (value === "split") return "split";
    return "demo";
  }

  function toTabLabel(value: string) {
    if (value === "source") return "Source";
    if (value === "split") return "Side by Side";
    return "Demo";
  }
</script>

<Container margin="0" maxWidth="none" height="auto" padding="0">
  <div class="demo-with-code" {style}>
    {#if $$slots.header}
      <div class="demo-heading">
        <TextLayout>
          <slot name="header" />
        </TextLayout>
      </div>
    {/if}

    {#if $$slots.blurb}
      <div class="demo-blurb">
        <TextLayout>
          <slot name="blurb" />
        </TextLayout>
      </div>
    {/if}

    <div class="demo-body">
      <TabBar
        items={tabItems}
        active={activeTab}
        on:change={(event) => {
          activeTab = normalizeTabValue(event.detail.value);
        }}
        --tab-bar-gap="0"
      >
        <span slot="default" class="summary">{summary}</span>
      </TabBar>

      {#if $$slots.inputArea}
        <div class="demo-input-area">
          <slot name="inputArea" />
        </div>
      {/if}

      {#if activeTab === "demo"}
        <div
          class="tab-panel demo-panel"
          style:--panel-height="var(--demo-with-code-height)"
        >
          <slot />
        </div>
      {:else if activeTab === "source"}
        <div class="tab-panel source-panel">
          <div class="code-wrap">
            <Code code={resolvedCode} {language} />
          </div>
        </div>
      {:else}
        <div class="tab-panel split-panel">
          <SplitPane
            leftWidth="1fr"
            rightWidth="1fr"
            height="var(--demo-with-code-height, var(--demo-with-code-split-height, min(70vh, 640px)))"
            --split-pane-border="none"
            --split-pane-content-padding="var(--space-md)"
          >
            <div slot="left">
              <slot />
            </div>
            <div slot="right">
              <div class="code-wrap split-code-wrap">
                <Code code={resolvedCode} {language} />
              </div>
            </div>
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
    width: min(100%, var(--demo-with-code-width, 72rem));
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

  .demo-heading,
  .demo-blurb,
  .demo-body {
    min-width: 0;
  }

  .demo-body {
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
  }

  .split-panel :global(.split-pane) {
    border: none;
  }

  .split-code-wrap {
    width: 100%;
  }

  .summary {
    display: inline-flex;
    align-items: center;
    padding-inline: var(--space-sm, 0.5rem);
    font-size: var(--font-size-small, 0.875rem);
    opacity: 0.8;
  }
</style>
