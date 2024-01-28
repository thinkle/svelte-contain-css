<script lang="ts">
  import FormItem from "$lib/layout/FormItem.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import CssVariables from "./CssVariables.svelte";
  import CssWrapper from "./CssWrapper.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import Button from "$lib/controls/Button.svelte";

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

  let fullWidth = false;
  let globalInputStyles = true;
</script>

<Container border>
  <TextLayout>
    <h2>Forms</h2>
    <p>
      Our FormItem component is the heart of a simple approach to form layout.
      In a wide container, it puts labels side-by-side with inputs. In a narrow
      container, it puts labels above inputs. A number of CSS variables allow
      easy customization.
    </p>
    <p>
      Out of the box, we auto-style inputs within a FormItem, so you don't need
      to import yet another custom component unless you want something fancy
      like a custom checkbox or select box.
    </p>
    <p>
      You can turn off the global input styles by setting globalInputStyles to
      false.
    </p>
    <p>
      Out of the box, we use nested labels for simple accessibility, so it's
      important that if you have a complex input, you have the first item in it
      the one you want focused when the user clicks the label.
    </p>
  </TextLayout>
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
  </Container>
  <Container>
    <TextLayout>
      <h3>FormItem CSS Variables</h3>
      <p>Customize the style of our form items</p>
      <p>
        Remember, because these are CSS variables, they don't have to be added
        at the FormItem component level but can be added higher up the
        heirarchy.
      </p>
    </TextLayout>
    <CssVariables
      variables={formItemCSSVariables}
      onSetVariables={(variables) => {
        cssValues = variables;
      }}
    />
  </Container>
  <h3>In a wide container</h3>
  <FormItem>
    <span slot="label">Options:</span>
    <Checkbox bind:checked={fullWidth}>fullWidth</Checkbox>
    <Checkbox bind:checked={globalInputStyles}>globalInputStyles</Checkbox>
  </FormItem>
  <CssWrapper variables={cssValues}>
    <Container border>
      <FormItem {fullWidth} {globalInputStyles}>
        <span slot="label">Name</span>
        <input type="text" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        <span slot="label">Age</span>
        <input type="number" min="16" max="130" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        <span slot="label">Level</span>
        <input type="range" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        <Button primary>Add</Button>
      </FormItem>
    </Container>
    <h3>In a narrow container</h3>
    <Container border --container-max-width="300px">
      <FormItem {fullWidth} {globalInputStyles}>
        <span slot="label">Name</span>
        <input type="text" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        <span slot="label">Age</span>
        <input type="number" min="16" max="130" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        <span slot="label">Level</span>
        <input type="range" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        <Button primary>Add</Button>
      </FormItem>
    </Container>
  </CssWrapper>
</Container>
