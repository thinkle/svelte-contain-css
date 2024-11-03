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
  let theVariables: {
    [key: string]: CSSVariable;
  } = {};

  function updateRemaining(customizedVariables: string[]) {
    remainingVariables = variables.filter(
      (v) => customizedVariables.find((cv) => cv === v.name) === undefined
    );
    for (let group in theVariables) {
      if (!remainingVariables.includes(theVariables[group])) {
        let theVariable = remainingVariables.find(
          (v) => v.group === group || (!v.group && group == "no-group")
        );
        if (theVariable) {
          theVariables[group] = theVariable;
        }
      }
    }
    //theVariables[group] = remainingVariables[0];
  }
  $: updateRemaining(customizedVariables);
  let groups: (string | undefined)[] = [];
  $: {
    groups = [];
    for (let variable of variables) {
      let group = variable.group;
      if (!groups.includes(group)) {
        groups = [...groups, group];
      }
    }
  }

</script>

<Container>
  {#each groups as group, i}
    {#if remainingVariables.filter((v) => v.group == group).length > 0}
      <FormItem --form-label-align="end">
        <div
          slot="label"
          
        >
          {#if !group}
            {#if groups.length > 1}
              <label for="css-var-{i}">General:</label>
            {/if}
          {:else}
            <label>{group}</label>
          {/if}
          {#key remainingVariables.length}
            {#if remainingVariables.filter((v) => v.group == group).length > 0}
              <Select
                id="css-var-{i}"                
                bind:value={theVariables[group || "no-group"]}
              >
                {#each remainingVariables as variable}
                  {#if variable.group === group}
                    <option value={variable}>{variable.name}</option>
                  {/if}
                {/each}
              </Select>
            {/if}
          {/key}
        </div>
        {#if theVariables[group || "no-group"]}
          {@const variable = theVariables[group || "no-group"]}
          {#key theVariables[group]}
            <input
              type="text"
              placeholder={variable.placeholder}
              bind:value={variableValues[variable.name]}
              on:input={(e) => {
                console.log("input", e);
                for (let v in variableValues) {
                  if (variableValues[v] === "") {
                    delete variableValues[v];
                  }
                }
                onSetVariables(variableValues);
              }}
              on:keyup={(e) => {
                if (e.key === "Enter") {
                  customizedVariables = [...customizedVariables, variable.name];
                }
              }}
            />
          {/key}
        {/if}
        <div slot="after">
          {#if theVariables[group || "no-group"] && variableValues[theVariables[group || "no-group"].name]}
            {@const variable = theVariables[group || "no-group"]}
            <div style="display:flex;justify-content:end;">
              <MiniButton
                primary
                on:click={() => {
                  customizedVariables = [...customizedVariables, variable.name];
                }}>+</MiniButton
              >
            </div>
          {/if}
        </div>
      </FormItem>
    {/if}
  {/each}

  {#each customizedVariables as varName}
    {@const variable = variables.find((v) => v.name === varName)}
    {#if variable}
      <FormItem>
        <span slot="label">{variable?.name}</span>
        <input
          type="text"
          placeholder={variable?.placeholder}
          bind:value={variableValues[variable.name]}
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
    {/if}
  {/each}
</Container>
