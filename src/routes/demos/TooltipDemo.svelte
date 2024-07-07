<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
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
      Tooltips are triggered by mouseover events and by focus, so tooltips will
      show up for keyboard users. Because they're popovers, they are escape-key
      dismissable as well as disappearing when focus or the mouse moves.
    </p>
    <p>
      The tooltip will automatically adjust positions. You can change the
      default positioning by handing in horizontal=left|right and
      vertical=top|bottom as props.
    </p>
    <p style="text-align: center">
      For example:

      <br /><Tooltip
        vertical="top"
        horizontal="left"
        tooltipText="This is a top/left tooltip"
      >
        <Button>left, top</Button>
      </Tooltip>
      <br /><Tooltip
        vertical="bottom"
        horizontal="right"
        tooltipText="This is a bottom/right tooltip"
      >
        <Button>bottom, right</Button>
      </Tooltip>
    </p>
    <Code
      code={`
<Tooltip
  vertical="top"
  horizontal="left"
  tooltipText="This is a top|left tooltip"
>
  <Button>...</Button>
</Tooltip>
<Tooltip
  vertical="bottom"
  horizontal="right"
  tooltipText="This is a bottom|right tooltip"
>
  <Button>...</Button>
</Tooltip>
      `}
    />
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
      <div slot="tooltip">
        <p>This button is <i>extra fancy</i> and contains a list:</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
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
  </TextLayout>
</CssVariableDemo>

<style>
  .bottom-left {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .bottom-right {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
