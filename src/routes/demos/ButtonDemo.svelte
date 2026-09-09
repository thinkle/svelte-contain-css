<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import ButtonLink from "$lib/controls/ButtonLink.svelte";
  import CircleButton from "$lib/controls/CircleButton.svelte";
  import Container from "$lib/layout/Container.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import { buttonVars } from "./cssVariableDefs";
</script>

<Container border>
  <DemoWithCode
    code={`<Button>Standard Button</Button>
<Button bg="transparent">Transparent Button</Button>
<Button>
  Icon Button
  {#snippet icon()}
    <div>▶</div>
  {/snippet}
</Button>
<Button primary={true}>Primary Button</Button>
<Button disabled>Disabled Button</Button>
<ButtonLink href="https://example.com" target="_blank">Link Button</ButtonLink>
<CircleButton disabled bg="var(--material-color-deep-orange)" fg="white">+</CircleButton>
<CircleButton bg="var(--material-color-deep-orange)" fg="white">+</CircleButton>`}
  >
    {#snippet header()}
      <h2>Buttons</h2>
      <p>
        Buttons can be tuned with CSS properties (--button-bg, --button-fg, etc)
        and we also support a number of conveniences, such as an icon snippet,
        shorthand for primary/warning/danger buttons, styling for disabled
        buttons, a CircleButton component for little round buttons and a
        ButtonLink component for links that look like buttons.
      </p>
    {/snippet}
    <Button>Standard Button</Button>
    <Button bg="transparent">Transparent Button</Button>
    <Button>
      Icon Button
      {#snippet icon()}
        <div>▶</div>
      {/snippet}
    </Button>
    <Button primary={true}>Primary Button</Button>
    <Button disabled>Disabled Button</Button>
    <ButtonLink href="https://example.com" target="_blank"
      >Link Button</ButtonLink
    >
    <CircleButton disabled bg="var(--material-color-deep-orange)" fg="white"
      >+</CircleButton
    >
    <CircleButton bg="var(--material-color-deep-orange)" fg="white"
      >+</CircleButton
    >
  </DemoWithCode>

  <h3>Try Customizing Some Buttons...</h3>
  <CssVariableDemo variables={buttonVars}>
    <DemoWithCode
      code={`<Button>Standard Button</Button>
<Button warning>Warning Button</Button>
<Button primary>Primary Button</Button>
<Button disabled>Disabled Button</Button>
<ButtonLink href="https://example.com" target="_blank">Link Button</ButtonLink>
<ButtonLink primary href="https://example.com" target="_blank">Primary Link Button</ButtonLink>
<CircleButton bg="var(--material-color-deep-orange)" fg="white">+</CircleButton>`}
    >
      <Button>Standard Button</Button>
      <Button>
        Icon Button
        {#snippet icon()}
          <div>▶</div>
        {/snippet}
      </Button>
      <Button warning={true}>Warning Button</Button>
      <Button primary={true}>Primary Button</Button>
      <Button disabled>Disabled Button</Button>
      <ButtonLink href="https://example.com" target="_blank"
        >Link Button</ButtonLink
      >
      <ButtonLink primary href="https://example.com" target="_blank"
        >Primary Link Button</ButtonLink
      >
      <CircleButton disabled bg="var(--material-color-deep-orange)" fg="white"
        >+</CircleButton
      >
      <CircleButton bg="var(--material-color-deep-orange)" fg="white"
        >+</CircleButton
      >
      <TextLayout>
        <p>
          Testing out buttons inside a text layout, including <ButtonLink
            href="#">A Link Button</ButtonLink
          >.
        </p>
      </TextLayout>
    </DemoWithCode>
  </CssVariableDemo>
</Container>
