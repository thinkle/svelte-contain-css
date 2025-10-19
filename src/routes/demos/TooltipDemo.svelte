<script lang="ts">
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Code from "$lib/misc/Code.svelte";
  import Tooltip from "$lib/overlays/Tooltip.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import { tooltipVars } from "./cssVariableDefs";
</script>

<CssVariableDemo variables={tooltipVars}>
  <TextLayout>
    <h2>Tooltip</h2>

    <p>
      Our tooltip component is a simple wrapper around a slot that displays a
      popover with the text provided.
    </p>
    <p>
      Basic usage just involves wrapping an element and handing in tooltip text
      as a prop, like this:
    </p>
    <Code
      code={`<Tooltip tooltipText="This is a tooltip">
    <Button>Button</Button>
  </Tooltip>`}
    />
    <p>
      Hover over this button for a tooltip:
      <Tooltip tooltipText="This is a tooltip">
        <Button>Button</Button>
      </Tooltip>
    </p>
    <p>
      <Tooltip tooltipText="Also without an element"
        ><span>Tooltips</span></Tooltip
      >
      are triggered by mouseover events and by focus, so tooltips will show up for
      keyboard users. Because they're popovers, they are escape-key dismissable as
      well as disappearing when focus or the mouse moves.
    </p>
    <p>
      The tooltip will automatically adjust positions. You can change the
      default positioning by handing in horizontal=left|right and
      vertical=top|bottom as props.
    </p>
    <p>
      For example:

      <GridLayout>
        {#each ["top", "bottom"] as vertical}
          {#each ["left", "right"] as horizontal}
            <Tooltip
              {vertical}
              {horizontal}
              tooltipText={`This is a ${vertical}|${horizontal} tooltip`}
            >
              <Button>{`${vertical}|${horizontal}`}</Button>
            </Tooltip>
          {/each}
        {/each}
      </GridLayout>

      <Code
        language="svelte"
        code={`
<Tooltip
  vertical="top"
  horizontal="left"
  tooltipText="This is a top|left tooltip"
>
  <Button>...</Button>
</Tooltip>

      `}
      />
    </p>
    <p>
      Note that if we are too close to the bottom or top of the screen, the
      tooltip will override the top|bottom prop and just do what fits.
    </p>

    <h2>Markup Inside the Tooltip</h2>
    <p>
      If you want to include markup inside a tooltip instead of just text, you
      can use the alternate slot syntax, like this:
    </p>
    <Tooltip>
      <Button>Fancy Tooltip Button</Button>
      {#snippet tooltip()}
        <div style="display:block">
          <p>This button is <i>extra fancy</i> and contains a list:</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      {/snippet}
    </Tooltip>
    <Code
      code={`<Tooltip>
    <Button>Fancy Tooltip Button</Button>
    <div slot="tooltip">
      <p>This button is <i>extra fancy</i> and contains a list:</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  </Tooltip>
`}
    />
    <p>Let's add a Tooltip in a Card!</p>
    <Card>
      <Tooltip>
        <Button>Fancy Tooltip Button</Button>
        {#snippet tooltip()}
          <div>
            <p>This button is <i>extra fancy</i> and contains a list:</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        {/snippet}
      </Tooltip>
    </Card>
    <h2>Customizing the "Arrow"</h2>
    <p>
      Things can get a little tricky if we have tiny UI elements with tooltips.
    </p>
    <p>This is probably a bad pattern, but let's support it anyway!</p>
    <div class="blip-container">
      {#each Array(5) as _, i}
        <Tooltip
          tooltipText={`Tooltip for blip ${i + 1}`}
          horizontal={i % 2 === 0 ? "left" : "right"}
        >
          <div class="blip" tabindex="0"></div>
        </Tooltip>
      {/each}
    </div>
  </TextLayout>
</CssVariableDemo>

<style>
  .blip-container {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
  }
  .blip {
    width: 16px;
    height: 16px;
    background-color: var(--material-color-blue-500);
    border-radius: 50%;
  }
</style>
