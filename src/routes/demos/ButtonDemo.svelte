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
<Button primary>Primary Button</Button>
<Button secondary>Secondary Button</Button>
<Button warning>Warning Button</Button>
<Button danger>Danger Button</Button>
<Button success>Success Button</Button>
<Button info>Info Button</Button>
<Button disabled>Disabled Button</Button>
<ButtonLink href="https://example.com" target="_blank">Link Button</ButtonLink>`}
  />
  <h3>Button Variants</h3>
  <p>Buttons support semantic color variants for different contexts:</p>
  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
    <Button>Default</Button>
    <Button primary>Primary</Button>
    <Button secondary>Secondary</Button>
    <Button warning>Warning</Button>
    <Button danger>Danger</Button>
    <Button success>Success</Button>
    <Button info>Info</Button>
    <Button disabled>Disabled</Button>
  </div>
  <h3>ButtonLink Variants</h3>
  <p>ButtonLink also supports the same variants:</p>
  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
    <ButtonLink href="#">Default</ButtonLink>
    <ButtonLink href="#" primary>Primary</ButtonLink>
    <ButtonLink href="#" secondary>Secondary</ButtonLink>
    <ButtonLink href="#" warning>Warning</ButtonLink>
    <ButtonLink href="#" danger>Danger</ButtonLink>
    <ButtonLink href="#" success>Success</ButtonLink>
    <ButtonLink href="#" info>Info</ButtonLink>
  </div>
  <h3>Icon Buttons & MiniButtons</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; margin: 1rem 0;">
    <Button>
      Icon Button
      <div slot="icon">▶</div>
    </Button>
    <MiniButton bg="var(--material-color-deep-orange)" fg="white">+</MiniButton>
    <MiniButton disabled bg="var(--material-color-deep-orange)" fg="white">+</MiniButton>
  </div>
  <h3>Try Customizing Some Buttons...</h3>
  <CssVariableDemo variables={buttonVars}>
    <Button>Standard Button</Button>
    <Button primary>Primary Button</Button>
    <Button secondary>Secondary Button</Button>
    <Button warning>Warning Button</Button>
    <Button danger>Danger Button</Button>
    <Button success>Success Button</Button>
    <Button info>Info Button</Button>
  </CssVariableDemo>
</Container>
