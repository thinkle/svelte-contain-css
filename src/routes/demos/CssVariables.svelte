<script lang="ts">
  import type { CSSVariable } from "./types";

  export let variables: CSSVariable[];
  type Callback = (variables: { [key: string]: string }) => void;
  export let onSetVariables: Callback;
  const variableValues: { [key: string]: string } = {};
</script>

{#each variables as variable}
  <div class="variable">
    {variable.name} =
    <input
      type="text"
      placeholder={variable.placeholder}
      bind:value={variableValues[variable.name]}
      on:input={(e) => {
        console.log("Update vars", variableValues);
        onSetVariables(variableValues);
      }}
    />
  </div>
{/each}
