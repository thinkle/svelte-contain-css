<script lang="ts">
  import FormItem from "$lib/layout/FormItem.svelte";
  import FormProvider from "$lib/layout/FormProvider.svelte";
  import Fieldset from "$lib/layout/Fieldset.svelte";
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
  import Form from "$lib/layout/Form.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Slider from "$lib/controls/Slider.svelte";

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
  let layoutDemo = $state<"side" | "above" | "below">("side");
  $effect(() => console.log("layoutDemo", layoutDemo));
  let containerSize = $state(200);
  let bdate = $state("1980-08-08");
</script>

<CssVariableDemo variables={formItemCSSVariables}>
  <TextLayout>
    <p>
      This page is the low-level <code>FormItem</code> deep dive. If you want
      the higher-level form stack first, use the <code>Form</code> tutorial page
      for <code>Form</code>, <code>Fieldset</code>,
      <code>FormProvider</code>, and how they compose together.
    </p>
  </TextLayout>
  <Accordion>
    <details open>
      <summary>Playground</summary>
      <Fieldset>
        {#snippet legend()}Form Settings{/snippet}
        <FormItem>
          {#snippet label()}Full Width{/snippet}
          <Checkbox bind:checked={fullWidth} />
        </FormItem>
        <FormItem>
          {#snippet label()}Global Input Styles{/snippet}
          <Checkbox bind:checked={globalInputStyles} />
        </FormItem>
        <FormItem>
          {#snippet label()}Layout{/snippet}
          <RadioButton name="layoutDemo" value="side" bind:group={layoutDemo}
            >side</RadioButton
          >
          <RadioButton name="layoutDemo" value="above" bind:group={layoutDemo}
            >above</RadioButton
          >
          <RadioButton name="layoutDemo" value="below" bind:group={layoutDemo}
            >below</RadioButton
          >
        </FormItem>
      </Fieldset>
      <Form {fullWidth} {globalInputStyles} layout={layoutDemo}>
        <Fieldset>
          {#snippet legend()}Biographical Info{/snippet}
          <FormItem>
            {#snippet label()}Name{/snippet}
            <input type="text" placeholder="First Last" />
          </FormItem>
          <FormItem>
            {#snippet label()}Birthday{/snippet}
            <input type="date" bind:value={bdate} />
            {#snippet after()}
              <div>
                Age: {(() => {
                  const today = new Date();
                  const birth = new Date(bdate);
                  let age = today.getFullYear() - birth.getFullYear();
                  const m = today.getMonth() - birth.getMonth();
                  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                    age--;
                  }
                  return age;
                })()}
              </div>
            {/snippet}
          </FormItem>
        </Fieldset>
      </Form>
    </details>
    <details open>
      <summary>Form Items</summary>
      <TextLayout
        ><p>
          <code>FormItem</code> is the core labeled control wrapper. In a wide
          container, it puts labels side-by-side with inputs. In a narrow
          container, it stacks them. The higher-level
          <code>Form</code>, <code>Fieldset</code>, and
          <code>FormProvider</code> components all exist mainly to set defaults
          around nested <code>FormItem</code>s.
        </p>
      </TextLayout>
      <FormItem>
        {#snippet label()}Container size (px){/snippet}
        <input type="number" bind:value={containerSize} />
        {#snippet after()}
          <Button onclick={() => (containerSize = 800)}>Wide</Button>
          <Button onclick={() => (containerSize = 200)}>Narrow</Button>
        {/snippet}
      </FormItem>
      <Container maxWidth={containerSize + "px"} border>
        <h2>Log In</h2>
        <FormItem>
          {#snippet label()}
            <span>Name</span>
          {/snippet}
          <input type="text" placeholder="First Last" />
        </FormItem>
        <FormItem>
          {#snippet label()}
            <span>Password</span>
          {/snippet}
          <input type="password" placeholder="***" />
        </FormItem>
        <FormItem>
          <input type="submit" value="Login" />
        </FormItem>
      </Container>

      <Code
        code={`
            <FormItem>
              {#snippet label()}Name{/snippet}
              <input type="text" placeholder="First Last"/>
            </FormItem>
            <FormItem>
              {#snippet label()}Password{/snippet}
              <input type="password" placeholder="***"/>
            </FormItem>
            <FormItem>            
              <input type="submit" value="Login"/>
            </FormItem>
          `}
      />
    </details>
    <details>
      <summary>Bare Inputs</summary>
      <TextLayout>
        <p>
          Out of the box, we auto-style inputs within a FormItem, so you don't
          need to import yet another custom component unless you want something
          fancy like a custom checkbox or select box.
        </p>
        <p>
          You can turn off the global input styles by setting globalInputStyles
          to false.
        </p>
      </TextLayout>
      <Code
        code={`
          <FormItem>
            {#snippet label()}Name{/snippet}
            <input type="text" /> <!-- gets styles -->
          </FormItem>
          <FormItem globalInputStyles="false">
            {#snippet label()}Name{/snippet}
            <input type="text" /> <!-- Vanilla input -->
          </FormItem>
        `}
      />
    </details>
    <details>
      <summary>Accessibility</summary>
      <TextLayout>
        <p>
          Out of the box, we use nested labels for simple accessibility, so it's
          important that if you have a complex input, you have the first item in
          it the one you want focused when the user clicks the label.
        </p>
      </TextLayout>
    </details>
    <details>
      <summary>Slots</summary>
      <TextLayout>
        <p>
          If you just provide a single slot, that will be assumed to be the
          input area.
        </p>
        <p>
          We provide named slots for <code>label</code>, which you will usually
          want to use, and for <code>after</code>, which you can use in cases
          where you want e.g. an input followed by a minibutton
        </p>
      </TextLayout>
      <Code
        code={`
          <FormItem>
            {#snippet label()}Name{/snippet}
            <input type="text" />
            {#snippet after()}
              <Button>Go</Button>
            {/snippet}
          </FormItem>
        `}
      />
      <FormItem>
        {#snippet label()}
          <span>Name</span>
        {/snippet}
        <input type="text" />
        {#snippet after()}
          <span>
            <Button>Go</Button>
          </span>
        {/snippet}
      </FormItem>
    </details>
  </Accordion>

  <Container>
    <h3>Code:</h3>
    <Code
      code={`
      <Container border --container-max-width="300px" --input-width="20em">
        <FormItem>
          {#snippet label()}Name{/snippet}
          <input type="text" />
        </FormItem>
        <FormItem>
          {#snippet label()}Age{/snippet}
          <input type="number" min="16" max="130" />
        </FormItem>
        <FormItem>
          {#snippet label()}Level{/snippet}
          <Slider />
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
          <span>Name</span>
        {/snippet}
        <input type="text" />
      </FormItem>
      <FormItem>
        {#snippet label()}
          <span>Age</span>
        {/snippet}
        <input type="number" min="16" max="130" />
      </FormItem>
      <FormItem>
        {#snippet label()}
          <span>Level</span>
        {/snippet}
        <Slider />
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
        <span>Options:</span>
      {/snippet}
      <Checkbox bind:checked={fullWidth}>fullWidth</Checkbox>
      <Checkbox bind:checked={globalInputStyles}>globalInputStyles</Checkbox>
    </FormItem>

    <Container border>
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
          <span>Name</span>
        {/snippet}
        <input type="text" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
          <span>Age</span>
        {/snippet}
        <input type="number" min="16" max="130" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
          <span>Level</span>
        {/snippet}
        <Slider />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        <Button primary>Add</Button>
      </FormItem>
    </Container>
    <h3>In a narrow container</h3>
    <Container border --container-max-width="300px">
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
          <span>Name</span>
        {/snippet}
        <input type="text" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
          <span>Age</span>
        {/snippet}
        <input type="number" min="16" max="130" />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        {#snippet label()}
          <span>Level</span>
        {/snippet}
        <Slider />
      </FormItem>
      <FormItem {fullWidth} {globalInputStyles}>
        <Button primary>Add</Button>
      </FormItem>
    </Container>
    <h3>Layout options</h3>
    <TextLayout>
      <p>
        You can control label placement per item with props: use <code
          >&lt;FormItem&gt;</code
        >
        (default, label to the left),
        <code>&lt;FormItem above&gt;</code> (label above), or
        <code>&lt;FormItem below&gt;</code> (label below). You can also pass
        <code>layout="side | above | below"</code> explicitly.
      </p>
    </TextLayout>
    <FormItem>
      {#snippet label()}
        <span>Layout:</span>
      {/snippet}
      <Checkbox
        checked={layoutDemo === "side"}
        onchange={() => (layoutDemo = "side")}
      >
        side (default)
      </Checkbox>
      <Checkbox
        checked={layoutDemo === "above"}
        onchange={() => (layoutDemo = "above")}
      >
        above
      </Checkbox>
      <Checkbox
        checked={layoutDemo === "below"}
        onchange={() => (layoutDemo = "below")}
      >
        below
      </Checkbox>
    </FormItem>
    <Container border>
      {#key layoutDemo}
        We are in {layoutDemo} mode.
        <FormItem layout={layoutDemo}>
          {#snippet label()}
            <span>Name</span>
          {/snippet}
          <input type="text" />
        </FormItem>
        <FormItem layout={layoutDemo}>
          {#snippet label()}
            <span>Email</span>
          {/snippet}
          <input type="email" />
        </FormItem>
      {/key}
    </Container>

    <h3>FormProvider for DRY defaults</h3>
    <TextLayout>
      <p>
        Use <code>FormProvider</code> to set defaults for all nested
        <code>FormItem</code>s. This is perfect when you want all form items in
        a section to share the same layout without repeating props on each one.
      </p>
    </TextLayout>

    <Code
      code={`<FormProvider layout="below" fullWidth={true}>
  <FormItem>
    {#snippet label()}Name{/snippet}
    <input type="text" />
  </FormItem>
  <FormItem>
    {#snippet label()}Email{/snippet}
    <input type="email" />
  </FormItem>
  <!-- Both inherit layout="below" and fullWidth={true} -->
</FormProvider>`}
    />

    <Container border>
      <h4>Without FormProvider (repetitive)</h4>
      <FormItem layout="below" fullWidth>
        {#snippet label()}
          <span>Name</span>
        {/snippet}
        <input type="text" />
      </FormItem>
      <FormItem layout="below" fullWidth>
        {#snippet label()}
          <span>Email</span>
        {/snippet}
        <input type="email" />
      </FormItem>
      <FormItem layout="below" fullWidth>
        {#snippet label()}
          <span>Phone</span>
        {/snippet}
        <input type="tel" />
      </FormItem>
    </Container>

    <Container border>
      <h4>With FormProvider (DRY)</h4>
      <FormProvider layout="below" fullWidth={true}>
        <FormItem>
          {#snippet label()}
            <span>Name</span>
          {/snippet}
          <input type="text" />
        </FormItem>
        <FormItem>
          {#snippet label()}
            <span>Email</span>
          {/snippet}
          <input type="email" />
        </FormItem>
        <FormItem>
          {#snippet label()}
            <span>Phone</span>
          {/snippet}
          <input type="tel" />
        </FormItem>
        <!-- Individual items can still override -->
        <FormItem layout="side">
          {#snippet label()}
            <span>Override</span>
          {/snippet}
          <input type="text" placeholder="This one uses 'side' layout" />
        </FormItem>
      </FormProvider>
    </Container>

    <h3>Fieldset Component</h3>
    <TextLayout>
      <p>
        Use <code>Fieldset</code> for semantic form grouping with a legend. It
        combines <code>&lt;fieldset&gt;</code> semantics with Container-like styling
        and automatically acts as a FormProvider for nested FormItems.
      </p>
    </TextLayout>

    <Code
      code={`<Fieldset layout="below" border padding="1rem">
  {#snippet legend()}Personal Information{/snippet}
  <FormItem>
    {#snippet label()}First Name{/snippet}
    <input type="text" />
  </FormItem>
  <FormItem>
    {#snippet label()}Last Name{/snippet}
    <input type="text" />
  </FormItem>
</Fieldset>`}
    />

    <Container border>
      <Fieldset layout="below" border padding="1rem">
        {#snippet legend()}
          <span>Personal Information</span>
        {/snippet}
        <FormItem>
          {#snippet label()}
            <span>First Name</span>
          {/snippet}
          <input type="text" />
        </FormItem>
        <FormItem>
          {#snippet label()}
            <span>Last Name</span>
          {/snippet}
          <input type="text" />
        </FormItem>
        <FormItem>
          {#snippet label()}
            <span>Email</span>
          {/snippet}
          <input type="email" />
        </FormItem>
      </Fieldset>

      <Fieldset layout="side" border padding="1rem" margin="1rem 0 0 0">
        {#snippet legend()}
          <span>Preferences</span>
        {/snippet}
        <FormItem>
          {#snippet label()}
            <span>Newsletter</span>
          {/snippet}
          <input type="checkbox" />
        </FormItem>
        <FormItem>
          {#snippet label()}
            <span>Notifications</span>
          {/snippet}
          <input type="checkbox" />
        </FormItem>
      </Fieldset>
    </Container>
  </Container>
</CssVariableDemo>
