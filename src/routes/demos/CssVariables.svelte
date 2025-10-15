<script lang="ts">
  import { run } from "svelte/legacy";

  import Button from "$lib/controls/Button.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Accordion from "$lib/layout/Accordion.svelte";
  import Container from "$lib/layout/Container.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import type { CSSVariable } from "./types";

  type Callback = (variables: { [key: string]: string }) => void;
  interface Props {
    variables: CSSVariable[];
    customizedVariables?: string[];
    onSetVariables: Callback;
  }

  let {
    variables,
    customizedVariables = $bindable([]),
    onSetVariables,
  }: Props = $props();
  const variableValues: { [key: string]: string } = $state({});
  let remainingVariables: CSSVariable[] = $state([]);
  let theVariable: CSSVariable | null;
  let theVariables: {
    [key: string]: CSSVariable;
  } = $state({});

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
  run(() => {
    updateRemaining(customizedVariables);
  });
  let groups: (string | undefined)[] = $state([]);
  run(() => {
    groups = [];
    for (let variable of variables) {
      let group = variable.group;
      if (!groups.includes(group)) {
        groups = [...groups, group];
      }
    }
  });
</script>

<h2>Set CSS Variables</h2>
<Accordion --form-item-width="30em" highlanderMode={false}>
  {#each groups as group, i}
    {#if remainingVariables.filter((v) => v.group == group).length > 0}
      <details>
        <summary
          >{#if group}{group}{:else}General Variables{/if}</summary
        >
        <FormItem
          --form-label-align="end"
          --form-label-width="260px"
          --select-width="260px"
        >
          {#snippet label()}
            <div>
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
          {/snippet}
          {#if theVariables[group || "no-group"]}
            {@const variable = theVariables[group || "no-group"]}
            {#key theVariables[group]}
              <input
                type="text"
                placeholder={variable.placeholder || variable.defaultValue}
                bind:value={variableValues[variable.name]}
                oninput={(e) => {
                  for (let v in variableValues) {
                    if (variableValues[v] === "") {
                      delete variableValues[v];
                    }
                  }
                  onSetVariables(variableValues);
                }}
                onkeyup={(e) => {
                  if (e.key === "Enter") {
                    customizedVariables = [
                      ...customizedVariables,
                      variable.name,
                    ];
                  }
                }}
              />
            {/key}
          {/if}
          {#snippet after()}
            <div>
              {#if theVariables[group || "no-group"] && variableValues[theVariables[group || "no-group"].name]}
                {@const variable = theVariables[group || "no-group"]}
                <div style="display:flex;justify-content:end;">
                  <MiniButton
                    primary
                    onclick={() => {
                      customizedVariables = [
                        ...customizedVariables,
                        variable.name,
                      ];
                    }}>+</MiniButton
                  >
                </div>
              {/if}
            </div>
          {/snippet}
        </FormItem>
      </details>
    {/if}
  {/each}
  <details open={customizedVariables.length > 0}>
    <summary>Customized Variables</summary>

    {#each customizedVariables as varName}
      {@const variable = variables.find((v) => v.name === varName)}
      {#if variable}
        <FormItem>
          {#snippet label()}
            <span>{variable?.name}</span>
          {/snippet}
          <input
            type="text"
            placeholder={variable?.placeholder}
            bind:value={variableValues[variable.name]}
            oninput={(e) => {
              for (let v in variableValues) {
                if (variableValues[v] === "") {
                  delete variableValues[v];
                }
              }
              onSetVariables(variableValues);
            }}
          />
          {#snippet after()}
            <MiniButton
              onclick={() => {
                if (variable?.name) {
                  delete variableValues[variable.name];
                  customizedVariables = customizedVariables.filter(
                    (v) => v !== variable.name
                  );
                  onSetVariables(variableValues);
                }
              }}>-</MiniButton
            >
          {/snippet}
        </FormItem>
      {/if}
    {/each}
  </details>
</Accordion>
