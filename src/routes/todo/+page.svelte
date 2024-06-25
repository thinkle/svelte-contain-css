<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Themes from "../Themes.svelte";
  import "$lib/vars/defaults.css";
  import "$lib/vars/themes/lightordark.css";
  import "$lib/vars/themes/typography-airy.css";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Select from "$lib/controls/Select.svelte";
  let showThemes = false;
  let newTask = {
    name: "",
    priority: 5,
    category: "None",
  };
</script>

<Page>
  <Bar slot="header">
    <h1>The Canonical To Do List</h1>
    <Checkbox bind:checked={showThemes}>Edit Themes</Checkbox>
  </Bar>
  <Container>
    <FormItem fullWidth={true}>
      <span slot="label">Task</span>
      <input type="text" id="task" bind:value={newTask.name} />
    </FormItem>
    <FormItem fullWidth={true}>
      <span slot="label">Priority</span>
      <input type="number" min="1" max="10" bind:value={newTask.priority} />
    </FormItem>
    <FormItem fullWidth={true}>
      <span slot="label">Category</span>
      <Select bind:value={newTask.category}>
        <option value="house"> Household Chore </option>
        <option value="work"> Work Thing </option>
        <option value="school"> School Assignment </option>
        <option value="none">Generic</option>
      </Select>
    </FormItem>
    <FormItem fullWidth><Button primary>Add Task to List</Button></FormItem>
  </Container>
</Page>
