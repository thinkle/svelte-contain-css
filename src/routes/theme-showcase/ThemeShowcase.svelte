<script>
  import Button from "$lib/controls/Button.svelte";
  import Card from "$lib/Card.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Input from "$lib/controls/Input.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import Progress from "$lib/misc/Progress.svelte";
  import Table from "$lib/layout/Table.svelte";

  export let theme = "default";

  let radioValue = "option1";
  let checkboxValue = true;
  let progressValue = 65;
</script>

<div class="showcase" data-testid="theme-showcase">
  <h1>Theme Showcase: {theme}</h1>

  <section data-testid="buttons-section">
    <h2>Buttons</h2>
    <div class="component-row">
      <Button>Default</Button>
      <Button primary>Primary</Button>
      <Button secondary>Secondary</Button>
      <Button warning>Warning</Button>
      <Button danger>Danger</Button>
      <Button success>Success</Button>
      <Button info>Info</Button>
    </div>
  </section>

  <section data-testid="cards-section">
    <h2>Cards</h2>
    <div class="component-row">
      <Card>
        <span slot="header">Card Header</span>
        This is a basic card with some content inside it.
        <span slot="footer">Card Footer</span>
      </Card>
      <Card>
        A simple card without header or footer, just plain content.
      </Card>
    </div>
  </section>

  <section data-testid="form-section">
    <h2>Form Controls</h2>
    <Container>
      <FormItem>
        <span slot="label">Text Input</span>
        <Input placeholder="Enter text here..." />
      </FormItem>
      <FormItem>
        <span slot="label">Dropdown Select</span>
        <Select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </Select>
      </FormItem>
      <FormItem>
        <span slot="label">Checkbox</span>
        <Checkbox bind:checked={checkboxValue}>Accept terms</Checkbox>
      </FormItem>
      <FormItem>
        <span slot="label">Radio Buttons</span>
        <div class="radio-group">
          <RadioButton bind:group={radioValue} value="option1"
            >Option 1</RadioButton
          >
          <RadioButton bind:group={radioValue} value="option2"
            >Option 2</RadioButton
          >
          <RadioButton bind:group={radioValue} value="option3"
            >Option 3</RadioButton
          >
        </div>
      </FormItem>
    </Container>
  </section>

  <section data-testid="tags-section">
    <h2>Tags</h2>
    <div class="component-row">
      <Tag>Default Tag</Tag>
      <Tag>Another Tag</Tag>
      <Tag onclose={() => {}}>Closable Tag</Tag>
    </div>
  </section>

  <section data-testid="progress-section">
    <h2>Progress</h2>
    <Progress value={progressValue} max={100} />
  </section>

  <section data-testid="table-section">
    <h2>Table</h2>
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alice</td>
          <td>Developer</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>Bob</td>
          <td>Designer</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>Charlie</td>
          <td>Manager</td>
          <td>Away</td>
        </tr>
      </tbody>
    </Table>
  </section>

  <section data-testid="bar-section">
    <h2>Bar</h2>
    <Bar>
      <span>Left Content</span>
      <span>Center</span>
      <Button primary>Action</Button>
    </Bar>
  </section>
</div>

<style>
  .showcase {
    padding: var(--padding, 1rem);
    max-width: 900px;
    margin: 0 auto;
  }
  section {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
  h2 {
    margin-bottom: 0.75rem;
  }
  .component-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap, 0.5rem);
    align-items: flex-start;
  }
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
</style>
