<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import ButtonLink from "$lib/controls/ButtonLink.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Container from "$lib/layout/Container.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import { buttonVars } from "./cssVariableDefs";
</script>

<Container border>
  <TextLayout>
    <h2>Buttons</h2>
    <p>
      Buttons share the same token system as the rest of the library, so the
      same demo can show both semantic variants and CSS-variable tuning.
    </p>
  </TextLayout>

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
<MiniButton disabled bg="var(--material-color-deep-orange)" fg="white">+</MiniButton>
<MiniButton bg="var(--material-color-deep-orange)" fg="white">+</MiniButton>`}
  >
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
    <ButtonLink href="https://example.com" target="_blank">Link Button</ButtonLink>
    <MiniButton disabled bg="var(--material-color-deep-orange)" fg="white">+</MiniButton>
    <MiniButton bg="var(--material-color-deep-orange)" fg="white">+</MiniButton>
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
<MiniButton bg="var(--material-color-deep-orange)" fg="white">+</MiniButton>`}
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
      <MiniButton disabled bg="var(--material-color-deep-orange)" fg="white"
        >+</MiniButton
      >
      <MiniButton bg="var(--material-color-deep-orange)" fg="white">+</MiniButton>
      <TextLayout>
        <p>
          Testing out buttons inside a text layout, including <ButtonLink href="#"
            >A Link Button</ButtonLink
          >.
        </p>
      </TextLayout>
    </DemoWithCode>
  </CssVariableDemo>
</Container>
