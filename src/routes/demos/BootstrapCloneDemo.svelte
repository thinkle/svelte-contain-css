<script>
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import "$lib/vars/themes/bootstrap.css";
  import Sidebar from "$lib/layout/Sidebar.svelte";

  import Bar from "$lib/layout/Bar.svelte";
  import Page from "$lib/layout/Page.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
</script>

<Page>
  <Button>Wow a button!</Button>
  <Button secondary>Secondary Button!</Button>
  <Button primary>Primary Button</Button>
  <Button warning>Warning Button</Button>
  <Card>Look a card!</Card>
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
