<script lang="ts">
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import "$lib/vars/themes/bootstrap.css";
  import Sidebar from "$lib/layout/Sidebar.svelte";

  import Bar from "$lib/layout/Bar.svelte";
  import Page from "$lib/layout/Page.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import Container from "$lib/layout/Container.svelte";

  const scriptTag = "script";
</script>

<Page>
  <Container>
    <TextLayout>
      <h2>Bootstrap Theme Demo</h2>
      <p>
        This page demonstrates how Contain CSS components can be themed to look
        like Bootstrap. Simply import a theme CSS file to override the default
        CSS variables.
      </p>
      <Code
        code={`<${scriptTag}>
  // Import the Bootstrap theme
  import "$lib/vars/themes/bootstrap.css";
</${scriptTag}>`}
      />
      <p>
        All components below are using the Bootstrap theme variables, giving
        them a familiar Bootstrap appearance while using Contain CSS components.
      </p>

      <h3>Buttons</h3>
      <Code
        code={`<Button>Default Button</Button>
<Button secondary>Secondary Button</Button>
<Button primary>Primary Button</Button>
<Button warning>Warning Button</Button>`}
      />
    </TextLayout>
  </Container>

  <Button>Wow a button!</Button>
  <Button secondary>Secondary Button!</Button>
  <Button primary>Primary Button</Button>
  <Button warning>Warning Button</Button>

  <Container>
    <TextLayout>
      <h3>Card</h3>
      <Code code={`<Card>Card content here</Card>`} />
    </TextLayout>
  </Container>
  <Card>Look a card!</Card>

  <Container>
    <TextLayout>
      <h3>Form Controls</h3>
      <Code
        code={`<FormItem>
  {#snippet label()}Label{/snippet}
  <input type="text" />
</FormItem>

<FormItem>
  {#snippet label()}Dropdown{/snippet}
  <Select>
    <option>Option 1</option>
    <option>Option 2</option>
  </Select>
</FormItem>

<FormItem>
  {#snippet label()}Checkbox{/snippet}
  <Checkbox>Checkbox label</Checkbox>
</FormItem>`}
      />
    </TextLayout>
  </Container>
  <FormItem>
    {#snippet label()}
        <span >Label</span>
      {/snippet}
    <input type="text" />
  </FormItem>
  <FormItem>
    {#snippet label()}
        <span >Dropdown</span>
      {/snippet}
    <Select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
  </FormItem>
  <FormItem>
    {#snippet label()}
        <span >Checkbox</span>
      {/snippet}
    <Checkbox>Hello World</Checkbox>
  </FormItem>
</Page>
