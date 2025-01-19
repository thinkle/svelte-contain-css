<script lang="ts">
    import Card from "$lib/Card.svelte";
    import Code from "$lib/misc/Code.svelte";
    import TextLayout from "$lib/typography/TextLayout.svelte";
    import CssVariableDemo from "./CssVariableDemo.svelte";
    
    // Your custom library components:
    import Progress from "$lib/misc/Progress.svelte";    
    import Button from "$lib/controls/Button.svelte"; // example button
    import FormItem from "$lib/layout/FormItem.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  
    // Example CSS variable definitions for the Progress component
    const progressVars = [
      { name: "--progress-height", label: "Height of the progress bar" },
      { name: "--progress-bar-color", label: "Fill color of the bar" },
      { name: "--progress-track-bg", label: "Track background color" },
    ];
  
    let state: "uninitiated" | "inprogress" | "complete" = "inprogress";
    let value = 40;
    let max = 100;
    let indeterminate = false;
  
  
    let slotContent = `Something's <i>happening</i> here...`;
  </script>
  
  <CssVariableDemo variables={progressVars}>
    <TextLayout>
      <h2>Progress Demo</h2>
      <p>
        Our <code>&lt;Progress /&gt;</code> component uses a hidden native
        <code>&lt;progress&gt;</code> element for accessibility, while 
        providing a fully styled track and bar for consistent, customizable visuals.
      </p>
      <p>
        This demo lets you try different states, numeric values, and 
        an indeterminate mode.
      </p>
  
      <!-- Use FormItem for each control -->
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
        <!-- 1) State selection (buttons) -->
        <FormItem>
          <span slot="label">State</span>
          <div style="display: flex; gap: 0.5rem;">            
            <RadioButton value="unintiated" bind:group={state}>Uninitiated</RadioButton>
            <RadioButton value="inprogress" bind:group={state}>In Progress</RadioButton>
            <RadioButton value="complete" bind:group={state}>Complete</RadioButton>
          </div>
        </FormItem>
  
        <!-- 2) Value slider -->
        <FormItem>
          <span slot="label">Value: {value} / {max}</span>
          <input
            type="range"
            min="0"
            max={max}
            bind:value
            disabled={indeterminate || state === "complete"}
            style="width: 12rem;" 
          />
        </FormItem>
  
        <!-- 3) Max slider -->
        <FormItem>
          <span slot="label">Max: {max}</span>
          <input
            type="range"
            min="10"
            max="200"
            bind:value={max}
            disabled={indeterminate}
            style="width: 12rem;"
          />
        </FormItem>
  
        <!-- 4) Indeterminate checkbox -->
        <FormItem>
            <Checkbox
                bind:checked={indeterminate}
                >Indeterminate</Checkbox>          
        </FormItem>
        <FormItem>
            <span slot="label">Slot Content</span>
            <input
                type="text"
                bind:value={slotContent}
                style="width: 12rem;"
            />
        </FormItem>
      </div>
  
      <!-- Display the progress in a card -->
      <Card>
        <Progress
          state={state}
          value={indeterminate ? "indeterminate" : value}
          {max}
        >
          {@html slotContent}
        </Progress>
      </Card>
  
      <!-- Code snippet -->
      <Code
        code={`
  <Progress
    state="${state}"
    ${!indeterminate ? `value={\${value}}` : ''}
    ${!indeterminate ? `max={\${max}}` : ''}
  >
    ${slotContent}    
  </Progress>
  `}
      />
  
      <p>
        We pass in a <code>state</code> property to control overall 
        styling (<code>uninitiated</code>, <code>inprogress</code>, or <code>complete</code>) 
        and a numeric <code>value</code> / <code>max</code> for determinate progress, 
        or <code>'indeterminate'</code> to show an indefinite loading mode.
      </p>
    </TextLayout>
  </CssVariableDemo>