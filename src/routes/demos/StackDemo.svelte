<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Card from "$lib/Card.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Container from "$lib/layout/Container.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";

  let stretchEnabled = $state(true);
  let stackMode = $state<"default" | "split" | "center" | "end">("split");

  const stackJustify = $derived(
    stackMode === "center" ? "center" : stackMode === "end" ? "flex-end" : null,
  );
  const stackModeLabel = $derived(
    stackMode === "split"
      ? "split"
      : stackMode === "center"
        ? 'justify="center"'
        : stackMode === "end"
          ? 'justify="flex-end"'
          : "default flow",
  );
  const stretchAttr = $derived(stretchEnabled ? "\n    stretch" : "");
  const modeAttr = $derived(
    stackMode === "split"
      ? "\n    split"
      : stackMode === "center"
        ? '\n    justify="center"'
        : stackMode === "end"
          ? '\n    justify="flex-end"'
          : "",
  );

  type MarginBlockMode = "both" | "top" | "bottom";
  let marginBlockMode = $state<MarginBlockMode>("top");
  const marginBlockValue = $derived(
    marginBlockMode === "both"
      ? "var(--gap-lg)"
      : marginBlockMode === "top"
        ? "var(--gap-lg) 0"
        : "0 var(--gap-lg)",
  );
</script>

<TextLayout>
  <h2>Stack</h2>
  <p>
    <code>&lt;Stack&gt;</code> is the generic vertical layout helper. Use it for
    sections, form groupings, and card internals where a simple vertical rhythm container
    is clearer than custom flex CSS.
  </p>
  <p>
    Stack removes direct-child block margins so its gap defines the spacing. If
    you want prose-style margins, use <code>&lt;TextLayout&gt;</code>.
  </p>
</TextLayout>
<DemoWithCode
  code={`<Stack>
  <h3>Release Notes</h3>
  <p>Stack keeps related content in vertical rhythm.</p>  
  <Button secondary>Preview</Button>
  <Button primary>Publish</Button>  
</Stack>`}
  ><Stack>
    <h3>Release Notes</h3>
    <p>Stack keeps related content in vertical rhythm.</p>
    <Button secondary>Preview</Button>
    <Button primary>Publish</Button>
  </Stack>
</DemoWithCode>
<TextLayout>
  <h2>Fill, Stretch, and Split</h2>
  <p>
    <code>fill</code> means <code>height: 100%</code>.
    <code>stretch</code> makes the Stack stretch across the parent cross-axis.
    <code>split</code> uses <code>space-between</code> on the Stack itself.
  </p>
</TextLayout>
<DemoWithCode
  code={`<Inline>
  <img
    src="https://loremflickr.com/320/400/cat?lock=stack-demo"
    alt="Placeholder preview"
    width="320"
    height="400"
  />
  <Stack${stretchAttr}${modeAttr}
    bg="var(--material-color-pink-50)"
    fg="black"
    heading-fg="var(--material-color-pink-700)"
    padding="16px"
    gap="16px"
  >
    <h3>Campaign Brief</h3>
    <p>One Stack, one shared container, one tall image beside it.</p>
    <p>Mode: ${stackModeLabel}</p>        
    <Button primary>Publish</Button>  
  </Stack>
</Inline>`}
>
  {#snippet header()}
    <h3><code>&lt;Stack stretch&gt;</code></h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      You can use "stretch" to make a stack fill its parent's cross-axis (when
      your stack is inside a horizontal flex container).
    </p>
    <p>
      In the demo, the image establishes a 400px-tall shared container. The
      <code>stretch</code> flag makes the Stack match that height, then switch
      between the default flow, <code>split</code>, and explicit
      <code>justify</code> modes.
    </p>
  {/snippet}
  {#snippet inputArea()}
    <Inline>
      <Checkbox bind:checked={stretchEnabled}>stretch</Checkbox>
      <strong>mode:</strong>
      <RadioButton bind:group={stackMode} value="default">default</RadioButton>
      <RadioButton bind:group={stackMode} value="split">split</RadioButton>
      <RadioButton bind:group={stackMode} value="center">center</RadioButton>
      <RadioButton bind:group={stackMode} value="end">end</RadioButton>
    </Inline>
  {/snippet}
  <Inline>
    <img
      src="https://loremflickr.com/320/400/cat?lock=stack-demo"
      alt="Placeholder preview"
      width="320"
      height="400"
    />
    <Stack
      stretch={stretchEnabled}
      split={stackMode === "split"}
      justify={stackJustify}
      bg="var(--material-color-pink-50)"
      fg="black"
      --heading-fg="var(--material-color-pink-700)"
      padding="16px"
      gap="16px"
    >
      <h3>Campaign Brief</h3>
      <p>One Stack, one shared container, one tall image beside it.</p>
      <p>Mode: {stackModeLabel}</p>
      <Button primary>Publish</Button>
    </Stack>
  </Inline>
</DemoWithCode>

<DemoWithCode
  code={`<Card fixedHeight> 
  <Stack fill split>
    <h3>Release Notes</h3>
    <p>The card supplies the surface.</p>
    <Inline>
      <Button secondary>Preview</Button>
      <Button primary>Publish</Button>
    </Inline>
  </Stack>
</Card>`}
>
  {#snippet header()}
    <h3>Using fill inside a fixed-height container</h3>
  {/snippet}
  <Card fixedHeight>
    <Stack fill split>
      <h3>Release Notes</h3>
      <p>The card supplies the surface.</p>
      <Inline>
        <Button secondary>Preview</Button>
        <Button primary>Publish</Button>
      </Inline>
    </Stack>
  </Card>
</DemoWithCode>

<DemoWithCode
  code={`<Stack marginBlock="${marginBlockValue}" center --stack-border="3px solid blue">
  <h3>The moving Stack</h3>
  <p>marginBlock: "${marginBlockValue}"</p>
</Stack>`}
>
  {#snippet header()}
    <h3>marginBlock / marginInline</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      Stack has no margin by default -- spacing between a Stack and its siblings
      comes from wherever it lives (a parent's <code>gap</code>, most often).
      When it does need its own space, <code>marginBlock</code> and
      <code>marginInline</code> take one value (both sides equal) or two (start,
      end independently). The green boxes above and below are fixed reference
      points; watch the bordered Stack move between them as you change the value.
    </p>
  {/snippet}
  {#snippet inputArea()}
    <Inline>
      <strong>marginBlock:</strong>
      <RadioButton bind:group={marginBlockMode} value="both">"var(--gap-lg)"</RadioButton>
      <RadioButton bind:group={marginBlockMode} value="top">"var(--gap-lg) 0"</RadioButton>
      <RadioButton bind:group={marginBlockMode} value="bottom">"0 var(--gap-lg)"</RadioButton>
    </Inline>
  {/snippet}
  <Stack
    justify="center"
    style="background-color:var(--success-bg); color:var(--success-fg); height: 100px;"
    center
    >A thing above
  </Stack>
  <Stack
    --stack-border="3px solid blue"
    marginBlock={marginBlockValue}
    center
  >
    <h3>The moving Stack</h3>
    <p>marginBlock: "{marginBlockValue}"</p>
  </Stack>
  <Stack
    justify="center"
    style="background-color:var(--success-bg); color:var(--success-fg); height: 100px;"
    center
    >A thing below
  </Stack>
</DemoWithCode>
