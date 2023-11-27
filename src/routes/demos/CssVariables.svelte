<script lang="ts">
  import Container from "$lib/layout/Container.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import type { CSSVariable } from "./types";

  export let variables: CSSVariable[];
  type Callback = (variables: { [key: string]: string }) => void;
  export let onSetVariables: Callback;
  const variableValues: { [key: string]: string } = {};
</script>

<Container --form-label-width="20em">
  {#each variables as variable}
    <FormItem>
      <span slot="label">{variable.name}</span>
      <input
        type="text"
        placeholder={variable.placeholder}
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
    </FormItem>
  {/each}
</Container>
