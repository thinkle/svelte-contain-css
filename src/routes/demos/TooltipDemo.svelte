<script lang="ts">
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import CircleButton from "$lib/controls/CircleButton.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Tooltip from "$lib/overlays/Tooltip.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import { tooltipVars } from "./cssVariableDefs";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  let tooltipDisabled = $state(false);
</script>

<CssVariableDemo variables={tooltipVars}>
  <TextLayout>
    <h2>Tooltip</h2>
    <p>
      Wrap a target and provide tooltip text or a snippet. The native popover
      appears on hover or keyboard focus and closes with Escape.
    </p>
  </TextLayout>

  <DemoWithCode
    code={`<Tooltip tooltipText="This is a tooltip">
  <Button>Button</Button>
</Tooltip>`}
  >
    {#snippet header()}<h3>Basic tooltip</h3>{/snippet}
    {#snippet blurb()}
      <p>Hover over or focus the button. Moving away dismisses the tooltip.</p>
    {/snippet}
    <Tooltip tooltipText="This is a tooltip"><Button>Button</Button></Tooltip>
  </DemoWithCode>

  <DemoWithCode
    code={`<Tooltip vertical="top" horizontal="left" tooltipText="Your tooltip text here">
  <Button>top|left</Button>
</Tooltip>`}
  >
    {#snippet header()}<h3>Preferred positioning</h3>{/snippet}
    {#snippet blurb()}
      <p>
        Choose <code>horizontal="left|right"</code> and
        <code>vertical="top|bottom"</code>. The tooltip adjusts when the
        preferred placement would run off the screen.
      </p>
    {/snippet}
    <GridLayout>
      {#each ["top", "bottom"] as vertical}
        {#each ["left", "right"] as horizontal}
          <Tooltip
            {vertical}
            {horizontal}
            tooltipText={`<Tooltip vertical="${vertical}" horizontal="${horizontal}">`}
          >
            <Button>{`${vertical}|${horizontal}`}</Button>
          </Tooltip>
        {/each}
      {/each}
    </GridLayout>
  </DemoWithCode>

  <DemoWithCode
    code={`<Card>
  <Tooltip block>
    <Button>Fancy Tooltip Button</Button>
    {#snippet tooltip()}
      <p>This button is <i>extra fancy</i> and contains a list:</p>
      <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
    {/snippet}
  </Tooltip>
</Card>`}
  >
    {#snippet header()}<h3>Markup inside a tooltip</h3>{/snippet}
    {#snippet blurb()}
      <p>
        Use the <code>tooltip</code> snippet for formatted content. A tooltip can
        live inside a Card or another surface.
      </p>
    {/snippet}
    <Card>
      <Tooltip block>
        <Button>Fancy Tooltip Button</Button>
        {#snippet tooltip()}
          <p>This button is <i>extra fancy</i> and contains a list:</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        {/snippet}
      </Tooltip>
    </Card>
  </DemoWithCode>

  <DemoWithCode
    markupSource={`<Tooltip tooltipText="Tooltip for a tiny element" horizontal="left">
  <button type="button" class="blip" aria-label="Show tooltip for a tiny element"></button>
</Tooltip>
<Tooltip tooltipText="Tooltip for a small button">
  <CircleButton aria-label="Help">?</CircleButton>
</Tooltip>`}
    styleSource={`.blip {
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background-color: var(--material-color-blue-500);
  border-radius: 50%;
}`}
  >
    {#snippet header()}<h3>Small targets and the arrow</h3>{/snippet}
    {#snippet blurb()}
      <p>
        The arrow follows the target even when it is a small dot or a
        CircleButton. Each interactive target still needs an accessible name.
      </p>
    {/snippet}
    <div class="blip-container">
      {#each Array(5) as _, i}
        <Tooltip
          tooltipText={`Tooltip for blip ${i + 1}`}
          horizontal={i % 2 === 0 ? "left" : "right"}
        >
          <button
            type="button"
            class="blip"
            aria-label={`Show tooltip for blip ${i + 1}`}
          ></button>
        </Tooltip>
      {/each}
      <Tooltip tooltipText="Tooltip for a small button"
        ><CircleButton aria-label="Help">?</CircleButton></Tooltip
      >
    </div>
  </DemoWithCode>

  <DemoWithCode
    code={`<Tooltip tooltipText="Also without an element">Tooltips</Tooltip>
<Tooltip tooltipText="This component has a CSS-variable wrapper">
  <Tag --tag-bg="black" --tag-fg="white">Test</Tag>
</Tooltip>`}
  >
    {#snippet header()}<h3>Text and component targets</h3>{/snippet}
    {#snippet blurb()}
      <p>
        Targets can be bare text or components with Svelte's injected
        CSS-variable wrapper. The wrapper does not need a layout box.
      </p>
    {/snippet}
    <p>
      What about a <Tooltip tooltipText="Also without an element"
        >tooltip on naked text</Tooltip
      >?
    </p>
    <Tooltip tooltipText="This component has a CSS-variable wrapper"
      ><Tag --tag-bg="black" --tag-fg="white">Test</Tag></Tooltip
    >
  </DemoWithCode>

  <DemoWithCode
    markupSource={`<div class="hostile-cell">
  Name
  <Tooltip tooltipText="Formerly limited English proficient, not enrolled in an ELL program">
    <Tag>ELL</Tag>
  </Tooltip>
</div>`}
    styleSource={`.hostile-cell {
  white-space: nowrap;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
}`}
  >
    {#snippet header()}<h3>Independent tooltip typography</h3>{/snippet}
    {#snippet blurb()}
      <p>
        The popover remains a DOM child of its host. Tooltip resets inherited
        text styles so its long text wraps normally even inside this bold,
        uppercase, centred, <code>nowrap</code> cell.
      </p>
      <p>
        Custom properties still inherit. Explicit <code>--tooltip-*</code> variables
        override those defaults.
      </p>
    {/snippet}
    <div class="hostile-cell">
      Name
      <Tooltip
        tooltipText={'Formerly limited English proficient, not enrolled in an ELL program (Aspen: "Not enrolled in an ELLP")'}
        ><Tag>ELL</Tag></Tooltip
      >
    </div>
  </DemoWithCode>

  <DemoWithCode
    code={`<Tooltip tooltipText="Must confirm before proceeding" tooltipDisabled={${tooltipDisabled}}>
  <Button danger${!tooltipDisabled ? " disabled" : ""}>Do Scary Action</Button>
</Tooltip>`}
  >
    {#snippet header()}<h3>Disabled actions</h3>{/snippet}
    {#snippet blurb()}
      <p>
        A tooltip can explain why an action is disabled. Once the action is
        available, set <code>tooltipDisabled</code> to stop showing the explanation.
      </p>
    {/snippet}
    {#snippet inputArea()}
      <Checkbox bind:checked={tooltipDisabled}>Confirm scary action</Checkbox>
    {/snippet}
    <Tooltip
      tooltipText="You must check the box to enable this button"
      {tooltipDisabled}
    >
      <Button danger disabled={!tooltipDisabled}>Do Scary Action</Button>
    </Tooltip>
  </DemoWithCode>
</CssVariableDemo>

<style>
  .hostile-cell {
    white-space: nowrap;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    padding: 1rem;
    border: 1px dashed currentColor;
  }
  .blip-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
  }
  .blip {
    width: 16px;
    height: 16px;
    padding: 0;
    border: none;
    background-color: var(--material-color-blue-500);
    border-radius: 50%;
  }
</style>
