<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Container from "$lib/layout/Container.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import type { CSSVariable } from "./types";

  export let variables: CSSVariable[];
  export let customizedVariables: string[] = [];
  type Callback = (variables: { [key: string]: string }) => void;
  export let onSetVariables: Callback;
  const variableValues: { [key: string]: string } = {};
  let remainingVariables: CSSVariable[] = [];
  let theVariable: CSSVariable | null;

  function updateRemaining(customizedVariables: string[]) {
    remainingVariables = variables.filter(
      (v) => customizedVariables.find((cv) => cv === v.name) === undefined
    );
    theVariable = remainingVariables[0];
  }
  $: updateRemaining(customizedVariables);
</script>

<Container --form-label-width="20em">
  <FormItem>
    <Select
      slot="label"
      bind:value={theVariable}
      --select-width="22em"
      --menu-item-width="22em"
      --dropdown-menu-width="22em"
    >
      {#each remainingVariables as variable}
        <option value={variable}>{variable.name}</option>
      {/each}
    </Select>
    {#if theVariable}
      <input
        type="text"
        placeholder={theVariable.placeholder}
        bind:value={variableValues[theVariable.name]}
        on:input={(e) => {
          for (let v in variableValues) {
            if (variableValues[v] === "") {
              delete variableValues[v];
            }
          }
          onSetVariables(variableValues);
        }}
      />
    {/if}
    <div slot="after">
      {#if theVariable && variableValues[theVariable.name]}
        <div style="display:flex;justify-content:end;">
          <MiniButton
            primary
            on:click={() => {
              customizedVariables = [...customizedVariables, theVariable.name];
            }}>+</MiniButton
          >
        </div>
      {/if}
    </div>
  </FormItem>

  {#each customizedVariables as varName}
    {@const variable = variables.find((v) => v.name === varName)}
    <FormItem>
      <span slot="label">{variable?.name}</span>
      <input
        type="text"
        placeholder={variable?.placeholder}
        bind:value={variableValues[variable?.name]}
        on:input={(e) => {
          console.log("Update vars", variableValues);
          for (let v in variableValues) {
            if (variableValues[v] === "") {
              delete variableValues[v];
            }
          }
          onSetVariables(variableValues);
        }}
      />
      <MiniButton
        slot="after"
        on:click={() => {
          if (variable?.name) {
            delete variableValues[variable.name];
            customizedVariables = customizedVariables.filter(
              (v) => v !== variable.name
            );
            onSetVariables(variableValues);
          }
        }}>-</MiniButton
      >
    </FormItem>
  {/each}
</Container>
