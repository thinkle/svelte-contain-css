<script lang="ts">
  import { cssProperties } from "$lib/cssprops";
  import Button from "$lib/controls/Button.svelte";
  import Accordion from "$lib/layout/Accordion.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import { accordionVars } from "./cssVariableDefs";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  accordionVars;
  let highlanderMode = $state(true);
</script>

<CssVariableDemo variables={accordionVars}>
  <TextLayout>
    <p>
      Our Accordion is simply some styling around the native &lt;details&gt;
      element.
    </p>
    <p>
      By default, we are in "Highlander" mode (<em>there can be only one</em> item
      open at a time), but you can turn that off by setting the highlanderMode prop
      to false.
    </p>
  </TextLayout>
  <Accordion {highlanderMode}>
    <details>
      <summary>Highlander Mode</summary>
      <p>
        When highlanderMode is true, opening one item will close any other open
        items.
      </p>
      <Checkbox bind:checked={highlanderMode}>highlanderMode</Checkbox>
    </details>
    <details>
      <summary>Hello</summary>
      <h2>Thing 1</h2>
      <p>This is the first thing</p>
    </details>
    <details>
      <summary>Goodbye</summary>
      <h2>Thing 2</h2>
      <p>This is the second thing</p>
    </details>
    <details>
      <summary>Goodnight</summary>
      <h2>Thing 3</h2>
      <p>This is the third thing</p>
    </details>
  </Accordion>
  <Code
    code={`<Accordion>
    <details>
        <summary>Hello</summary>
        <h2>Thing 1</h2>
        <p>This is the first thing</p>
    </details>
    <details>
        <summary>Goodbye</summary>
        <h2>Thing 2</h2>
        <p>This is the second thing</p>
    </details>
    <details>
        <summary>Goodnight</summary>
        <h2>Thing 3</h2>
        <p>This is the third thing</p>
    </details>
</Accordion>`}
  />
</CssVariableDemo>
