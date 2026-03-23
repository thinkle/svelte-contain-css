<script lang="ts">
  import Accordion from "$lib/layout/Accordion.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import { accordionVars } from "./cssVariableDefs";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
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
  <DemoWithCode
    defaultTab="split"
    code={`<Accordion highlanderMode={${highlanderMode}}>
    <details open>
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
  >
    {#snippet inputArea()}
      <Checkbox bind:checked={highlanderMode}>highlanderMode</Checkbox>
    {/snippet}
    <Accordion {highlanderMode}>
      <details open>
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
  </DemoWithCode>
</CssVariableDemo>
