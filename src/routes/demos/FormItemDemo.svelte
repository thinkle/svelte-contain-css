<script lang="ts">
  import FormItem from "$lib/layout/FormItem.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import CssVariables from "./CssVariables.svelte";
  import CssWrapper from "./CssWrapper.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import Button from "$lib/controls/Button.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import Accordion from "$lib/layout/Accordion.svelte";
  import TabBar from "$lib/layout/TabBar.svelte";
  import TabItem from "$lib/controls/TabItem.svelte";
  

  const formItemCSSVariables = [
    {
      name: "--form-label-width",
      type: "length",
      placeholder: "12em",
      defaultValue: "22em",
      unit: "em",
    },
    {
      name: "--form-input-width",
      type: "length",
      placeholder: "8em",
      defaultValue: "auto",
      unit: "em",
    },
    {
      name: "--form-item-pad",
      type: "length",
      placeholder: "var(--gap)",
      defaultValue: "var(--padding)",
      unit: "px",
    },
    {
      name: "--form-label-horizontal-gap",
      type: "length",
      placeholder: "var(--gap)",
      defaultValue: "var(--padding)",
      unit: "px",
    },
    {
      name: "--form-label-vertical-gap",
      type: "length",
      placeholder: "var(--padding)",
      defaultValue: "var(--space)",
      unit: "px",
    },
    {
      name: "--input-width",
      type: "length",
      placeholder: "var(--form-input-width)",
      defaultValue: "auto",
      unit: "em",
    },
    {
      name: "--input-padding",
      type: "padding",
      placeholder: "8px",
      defaultValue: "var(--padding) var(--space) var(--padding) var(--space)",
      unit: "px",
    },
    {
      name: "--input-border",
      type: "border",
      placeholder: "1px solid #ccc",
      defaultValue:
        "var(--border-width) var(--border-style) var(--border-color)",
    },
    {
      name: "--input-radius",
      type: "length",
      placeholder: "var(--border-radius)",
      defaultValue: "0",
    },
  ];


  let cssValues = {};

  let fullWidth = $state(false);
  let globalInputStyles = $state(true);
  let demoOrCode = $state("Demo");
</script>
<CssVariableDemo variables={formItemCSSVariables}>
  
  
    <Accordion>
      <details open>
        <summary>Form Items</summary>
        <TextLayout><p>
          Our FormItem component is the heart of a simple approach to form layout.
          In a wide container, it puts labels side-by-side with inputs. In a narrow
          container, it puts labels above inputs. A number of CSS variables allow
          easy customization.
        </p>
        </TextLayout>
        <TabBar>
          <TabItem active={demoOrCode=='Demo'} on:click={()=>demoOrCode='Demo'}>Demo</TabItem>
          <TabItem active={demoOrCode=='Code'} on:click={()=>demoOrCode='Code'}>Code</TabItem>
        </TabBar>
        {#if demoOrCode=='Demo'}
          <Container maxWidth="200px">
            <h2>Log In</h2>
            <FormItem>
              {#snippet label()}
                        <span >Name</span>
                      {/snippet}
              <input type="text" placeholder="First Last"/>
            </FormItem>
            <FormItem>
              {#snippet label()}
                        <span >Password</span>
                      {/snippet}
              <input type="password" placeholder="***"/>
            </FormItem>
            <FormItem>            
              <input type="submit" value="Login"/>
            </FormItem>
          </Container>
        {:else}
          <Code code={`
            <FormItem>
              <span slot="label">Name</span>
              <input type="text" placeholder="First Last"/>
            </FormItem>
            <FormItem>
              <span slot="label">Password</span>
              <input type="password" placeholder="***"/>
            </FormItem>
            <FormItem>            
              <input type="submit" value="Login"/>
            </FormItem>
          `} />
        {/if}
      </details>
      <details>
        <summary>Bare Inputs</summary>
        <TextLayout>
          <p>
            Out of the box, we auto-style inputs within a FormItem, so you don't need
            to import yet another custom component unless you want something fancy
            like a custom checkbox or select box.
          </p>
          <p>
            You can turn off the global input styles by setting globalInputStyles to
            false.
          </p>
        </TextLayout>
        <Code code={`
          <FormItem>
            <span slot="label">Name</span>
            <input type="text" /> <!-- gets styles -->
          </FormItem>
          <FormItem globalInputStyles="false">
            <span slot="label">Name</span>
            <input type="text" /> <!-- Vanilla input -->
          </FormItem>
        `} />
      </details>
      <details>
        <summary>Accessibility</summary>
        <TextLayout>
          <p>
          Out of the box, we use nested labels for simple accessibility, so it's
          important that if you have a complex input, you have the first item in it
          the one you want focused when the user clicks the label.
          </p>
        </TextLayout>
      </details>
      <details>
        <summary>Slots</summary>
        <TextLayout>
          <p>
            If you just provide a single slot, that will be assumed to be
            the input area.
          </p>
          <p>We provide named slots for <code>label</code>, which you will usually
          want to use, and for <code>after</code>, which you can use in 
          cases where you want e.g. an input followed by a minibutton</p>
      </TextLayout>
        <Code code={`
          <FormItem>
            <span slot="label">Name</span>
            <input type="text" />
            <span slot="after">
              <Button>Go</Button>
            </span>
          </FormItem>
        `} />
          <FormItem>
            {#snippet label()}
                <span >Name</span>
              {/snippet}
            <input type="text" />
            {#snippet after()}
                <span >
                <Button>Go</Button>
              </span>
              {/snippet}
          </FormItem>
      </details>
    </Accordion> 
  
  <Container>
      <h3>Sample Code:</h3>
      <Code
        code={`
      <Container border --container-max-width="300px" --input-width="20em">      
        <FormItem>
          <span slot="label">Name</span>
          <input type="text" />
        </FormItem>
        <FormItem>
          <span slot="label">Age</span>
          <input type="number" min="16" max="130" />
        </FormItem>
        <FormItem>
          <span slot="label">Level</span>
          <input type="range" />
        </FormItem>
        <FormItem>
          <Button primary>Add</Button>  
        </FormItem>
      </Container>    
      `}
      />
      <h3>Result:</h3>
      <Container border --container-max-width="300px" --input-width="20em">
        <FormItem>
          {#snippet label()}
                <span >Name</span>
              {/snippet}
          <input type="text" />
        </FormItem>
        <FormItem>
          {#snippet label()}
                <span >Age</span>
              {/snippet}
          <input type="number" min="16" max="130" />
        </FormItem>
        <FormItem>
          {#snippet label()}
                <span >Level</span>
              {/snippet}
          <input type="range" />
        </FormItem>
        <FormItem>
          <Button primary>Add</Button>
        </FormItem>
      </Container>
    </Container>
    <Container>   
  <h3>In a wide container</h3>
  <FormItem>
    {#snippet label()}
            <span >Options:</span>
          {/snippet}
    <Checkbox bind:checked={fullWidth}>fullWidth</Checkbox>
    <Checkbox bind:checked={globalInputStyles}>globalInputStyles</Checkbox>
  </FormItem>
  
    <Container border>
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
                <span >Name</span>
              {/snippet}
        <input type="text" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
                <span >Age</span>
              {/snippet}
        <input type="number" min="16" max="130" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
                <span >Level</span>
              {/snippet}
        <input type="range" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        <Button primary>Add</Button>
      </FormItem>
    </Container>
    <h3>In a narrow container</h3>
    <Container border --container-max-width="300px">
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
                <span >Name</span>
              {/snippet}
        <input type="text" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
                <span >Age</span>
              {/snippet}
        <input type="number" min="16" max="130" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
                <span >Level</span>
              {/snippet}
        <input type="range" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        <Button primary>Add</Button>
      </FormItem>
    </Container>
  
</Container>
</CssVariableDemo>