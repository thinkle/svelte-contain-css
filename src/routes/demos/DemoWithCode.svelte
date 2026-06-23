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
    defaultTab?: "demo" | "source" | "split";
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
    defaultTab = "demo",
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
  const resolvedDefaultTab = $derived(
    hasSource && ["demo", "source", "split"].includes(defaultTab)
      ? defaultTab
      : "demo",
  );

  let activeTab = $state<"demo" | "source" | "split">("demo");
  let didInitializeTab = $state(false);

  $effect(() => {
    if (!didInitializeTab) {
      activeTab = resolvedDefaultTab;
      didInitializeTab = true;
      return;
    }

    if (!hasSource) {
      activeTab = "demo";
      return;
    }

    if (!["demo", "source", "split"].includes(activeTab)) {
      activeTab = resolvedDefaultTab;
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

<Container margin="0" maxWidth="none" height="auto" padding="0">
  <div class="demo-with-code" {style}>
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
    <div class="demo-body">
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
            {#snippet left()}
              {@render children?.()}
            {/snippet}
            {#snippet right()}
              <div class="code-wrap split-code-wrap">
                <Code code={resolvedCode} {language} />
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

  .demo-heading {
    min-width: 0;
  }

  .demo-blurb {
    min-width: 0;
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
</style>
