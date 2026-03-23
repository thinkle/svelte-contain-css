<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Input from "$lib/controls/Input.svelte";
  import Option from "$lib/controls/Option.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import Fieldset from "$lib/layout/Fieldset.svelte";
  import Form from "$lib/layout/Form.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import FormProvider from "$lib/layout/FormProvider.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let fullName = $state("Joe Schmoe");
  let email = $state("joe@example.com");
  let role = $state("editor");
  let digest = $state(true);
  let confidence = $state(68);
</script>

<TextLayout>
  <h2>Forms</h2>
  <p>
    The form stack is four pieces: <code>Form</code>, <code>Fieldset</code>,
    <code>FormProvider</code>, and <code>FormItem</code>.
  </p>
  <p>
    Use <code>Fieldset</code> when you want semantic grouping and a legend, or
    use <code>FormProvider</code> when you only want shared defaults with no
    extra wrapper in the DOM.
  </p>

  <h3>What Each Piece Does</h3>
  <p>
    <code>Form</code> renders a real <code>&lt;form&gt;</code> element and also
    sets default layout context for nested <code>FormItem</code>s.
  </p>
  <p>
    <code>Fieldset</code> renders a real <code>&lt;fieldset&gt;</code> with an
    optional legend and also acts like a nested <code>FormProvider</code>.
  </p>
  <p>
    <code>FormProvider</code> is context only. It does not add visible chrome;
    it just sets defaults like <code>layout</code>,
    <code>fullWidth</code>, <code>globalInputStyles</code>, and
    <code>multiline</code> for nested <code>FormItem</code>s.
  </p>
  <p>
    <code>FormItem</code> is the labeled row or block that arranges the label,
    the main control, and optional trailing content.
  </p>
</TextLayout>

<DemoWithCode
  language="svelte"
  code={`<Form layout="above" fullWidth globalInputStyles>
  <Fieldset>
    {#snippet legend()}Profile{/snippet}

    <FormItem>
      {#snippet label()}Name{/snippet}
      <Input bind:value={fullName} />
    </FormItem>

    <FormItem>
      {#snippet label()}Role{/snippet}
      <Select bind:value={role}>
        <Option value="viewer">Viewer</Option>
        <Option value="editor">Editor</Option>
      </Select>
    </FormItem>
  </Fieldset>
</Form>`}
>
  {#snippet header()}
    <h3>Form with fieldsets</h3>
  {/snippet}
  <Container border padding="1rem" margin="1rem 0">
    <Form layout="above" fullWidth globalInputStyles>
      <Fieldset>
        {#snippet legend()}
          Profile
        {/snippet}

        <FormItem>
          {#snippet label()}
            Full Name
          {/snippet}
          <Input bind:value={fullName} />
        </FormItem>

        <FormItem>
          {#snippet label()}
            Email
          {/snippet}
          <Input bind:value={email} type="email" />
        </FormItem>

        <FormItem>
          {#snippet label()}
            Role
          {/snippet}
          <Select bind:value={role}>
            <Option value="viewer">Viewer</Option>
            <Option value="editor">Editor</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </FormItem>
      </Fieldset>

      <Fieldset>
        {#snippet legend()}
          Delivery
        {/snippet}

        <FormItem>
          {#snippet label()}
            Weekly Digest
          {/snippet}
          <Checkbox bind:checked={digest}>Email me a weekly summary</Checkbox>
        </FormItem>

        <FormItem>
          {#snippet label()}
            Confidence Threshold ({confidence}%)
          {/snippet}
          <Slider bind:value={confidence} min={0} max={100} step={1} />
        </FormItem>

        <FormItem>
          {#snippet after()}
            <Button primary>Save Preferences</Button>
          {/snippet}
        </FormItem>
      </Fieldset>
    </Form>
  </Container>
</DemoWithCode>

<TextLayout>
  <h3>Context Without Extra Chrome</h3>
  <p>
    Use <code>FormProvider</code> when you want to set defaults for a subsection
    but you do not want another form or fieldset wrapper.
  </p>
</TextLayout>

<DemoWithCode
  language="svelte"
  code={`<FormProvider layout="below" fullWidth>
  <FormItem>
    {#snippet label()}Name{/snippet}
    <input type="text" />
  </FormItem>

  <FormItem>
    {#snippet label()}Email{/snippet}
    <input type="email" />
  </FormItem>
</FormProvider>`}
>
  {#snippet header()}
    <h3>Context without extra chrome</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      The outer container here is just visual framing. The shared form defaults
      come from <code>FormProvider</code>.
    </p>
  {/snippet}
  <Container border padding="1rem" margin="1rem 0">
    <Stack>
      <FormProvider layout="below" fullWidth globalInputStyles>
        <FormItem>
          {#snippet label()}
            Name
          {/snippet}
          <Input value="Ada Lovelace" />
        </FormItem>

        <FormItem>
          {#snippet label()}
            Email
          {/snippet}
          <Input value="ada@example.com" type="email" />
        </FormItem>

        <FormItem layout="side">
          {#snippet label()}
            Override
          {/snippet}
          <Input value="This one opts back into side layout" />
        </FormItem>
      </FormProvider>
    </Stack>
  </Container>
</DemoWithCode>

<TextLayout>
  <h3>When To Reach For What</h3>
  <p>
    Use <code>Form</code> for an actual submit boundary. Use
    <code>Fieldset</code> when a group of controls needs a shared label and
    semantics. Use <code>FormProvider</code> when you only want inherited
    defaults. Use <code>FormItem</code> for each labeled control row.
  </p>
  <p>
    The separate <code>FormItem</code> page is still the right place to tune
    label width, layout variants, slots, and the lower-level CSS variables.
  </p>
</TextLayout>
