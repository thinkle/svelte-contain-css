<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import ButtonLink from "$lib/controls/ButtonLink.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Container from "$lib/layout/Container.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import Code from "$lib/misc/Code.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import CssVariables from "./CssVariables.svelte";
  import CssWrapper from "./CssWrapper.svelte";
  import { buttonVars } from "./cssVariableDefs";
</script>

<Container border>
  <h2>Buttons</h2>
  <p>Our buttons are easily stylable with colors, padding,</p>
  <Code
    code={`<Button>Standard Button</Button>
<Button bg="transparent">Transparent Button</Button>
<Button>
  Icon Button
  <div slot="icon">▶</div>
</Button>
<Button primary={true}>Primary Button</Button>
<Button disabled>Disabled Button</Button>
<ButtonLink href="https://example.com" target="_blank">Link Button</ButtonLink>
<MiniButton disabled bg="var(--material-color-deep-orange)" fg="white">+</MiniButton>
<MiniButton bg="var(--material-color-deep-orange)" fg="white">+</MiniButton>`}
  />
  <h3>Try Customizing Some Buttons...</h3>
  <CssVariableDemo variables={buttonVars}>
    <Button>Standard Button</Button>
    <Button>
      Icon Button
      <div slot="icon">▶</div>
    </Button>
    <Button warning={true}>Warning Button</Button>
    <Button primary={true}>Primary Button</Button>
    <Button disabled>Disabled Button</Button>
    <ButtonLink href="https://example.com" target="_blank"
      >Link Button</ButtonLink
    >
    <MiniButton disabled bg="var(--material-color-deep-orange)" fg="white"
      >+</MiniButton
    >
    <MiniButton bg="var(--material-color-deep-orange)" fg="white">+</MiniButton>
  </CssVariableDemo>
</Container>
