<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Card from "$lib/Card.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Container from "$lib/layout/Container.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Progress from "$lib/misc/Progress.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";

  let authors = $state(["Le Guin", "Butler", "Jemisin"]);
  function drop(name: string) {
    authors = authors.filter((a) => a !== name);
  }

  let inspected = $state("");
  function inspect(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    inspected = el.outerHTML.split(">")[0] + ">";
  }
</script>

<TextLayout>
  <h2>Attributes, classes and test hooks</h2>
  <p>
    Components forward what you set to the real element underneath. That is what
    lets you label them for screen readers, address them from tests, and hook
    your own CSS onto them &mdash; the things a component library has to allow
    if it is going to survive contact with a real app.
  </p>
</TextLayout>

<DemoWithCode
  code={`<Container id="results" aria-label="Search results" role="region">
  <Button aria-describedby="save-hint">Save</Button>
  <p id="save-hint">Saves without leaving the page.</p>
</Container>`}
>
  {#snippet header()}
    <h3>Accessibility attributes</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      <code>aria-*</code>, <code>role</code>, <code>id</code> and
      <code>tabindex</code> all reach the element. Click the button to see the
      tag it actually rendered.
    </p>
  {/snippet}
  <Container id="results" aria-label="Search results" role="region">
    <Stack gap="0.5rem" align="start">
      <Button aria-describedby="save-hint" onclick={inspect}>Save</Button>
      <p id="save-hint">Saves without leaving the page.</p>
      {#if inspected}
        <pre class="rendered">{inspected}</pre>
      {/if}
    </Stack>
  </Container>
</DemoWithCode>

<DemoWithCode
  code={`<!-- Attributes land on the INPUT, which is what they describe.
     class and style land on the wrapper the CSS targets. -->
<Checkbox name="terms" required aria-describedby="terms-hint">
  I accept the terms
</Checkbox>
<span id="terms-hint">You can withdraw consent later.</span>`}
>
  {#snippet header()}
    <h3>Wrapper components put attributes on the control</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      <code>Checkbox</code>, <code>Toggle</code> and <code>RadioButton</code> render
      a control inside a wrapper. Your <code>required</code> and
      <code>aria-describedby</code>
      belong on the control, so that is where they go; <code>class</code> and
      <code>style</code> go on the wrapper, which is what the component's CSS targets.
    </p>
  {/snippet}
  <Checkbox name="terms" required aria-describedby="terms-hint">
    I accept the terms
  </Checkbox>
  <span id="terms-hint">You can withdraw consent later.</span>
</DemoWithCode>

<DemoWithCode
  code={`<!-- The default is "Remove", which tells a screen-reader user nothing.
     Say what the button actually does in YOUR app: -->
{#each authors as author}
  <Tag onclose={() => drop(author)} closeLabel="Stop filtering by {author}">
    {author}
  </Tag>
{/each}`}
>
  {#snippet header()}
    <h3>Naming a component's own controls</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      Some components render a control you did not write, so an
      <code>aria-label</code>
      on the component would name the wrong thing. Those take an explicit prop instead.
      Tab to a close button and listen: with the default, five tags in a row all
      announce &ldquo;Remove, button&rdquo;.
    </p>
  {/snippet}
  <Inline gap="0.5rem" align="center">
    {#each authors as author (author)}
      <Tag
        onclose={() => drop(author)}
        closeLabel="Stop filtering by {author}"
      >
        {author}
      </Tag>
    {/each}
    {#if authors.length === 0}
      <Button onclick={() => (authors = ["Le Guin", "Butler", "Jemisin"])}>
        Reset
      </Button>
    {/if}
  </Inline>
  <p>
    <Progress value={40} progressLabel="Uploading photos" />
  </p>
</DemoWithCode>

<DemoWithCode
  code={`<Button data-testid="submit-order">Place order</Button>

// in your test
await page.getByTestId("submit-order").click();`}
  language="javascript"
>
  {#snippet header()}
    <h3>Test hooks</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      <code>data-*</code> attributes pass straight through, so components are addressable
      from Playwright, Testing Library or anything else that queries the DOM.
    </p>
  {/snippet}
  <Button data-testid="submit-order" onclick={inspect}>Place order</Button>
</DemoWithCode>

<DemoWithCode
  code={`<Card class="featured">Highlighted</Card>
<!-- renders class="card featured" -- your class is ADDED, not substituted -->

<style>
  /* :global is required: Svelte would otherwise scope this away */
  :global(.featured) {
    --card-bg: var(--primary-bg);
    --card-fg: var(--primary-fg);
  }
</style>`}
>
  {#snippet header()}
    <h3>Your own classes</h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      A <code>class</code> you pass is <em>added to</em> the component's own, so
      the component keeps its styling. Two things to know: the class must be
      defined with <code>:global</code>, because Svelte scopes styles to the
      component that declares them; and a class that sets
      <strong>variables</strong>
      works with the cascade, while one that sets <code>background</code> directly
      fights the component's own rules and will want
      <code>!important</code> sooner or later.
    </p>
  {/snippet}
  <Inline gap="1rem" align="stretch">
    <Card>Ordinary</Card>
    <Card class="featured">Highlighted</Card>
  </Inline>
</DemoWithCode>

<DemoWithCode
  code={`<Tag bg="rebeccapurple" style="vertical-align: baseline">Draft</Tag>
<!-- style="--tag-bg: rebeccapurple;vertical-align: baseline" -->`}
>
  {#snippet header()}
    <h3>Inline <code>style</code></h3>
  {/snippet}
  {#snippet blurb()}
    <p>
      An inline <code>style</code> is kept <em>alongside</em> the variables a component
      generates rather than replacing them, and your declarations come last, so they
      win. Use it for genuinely one-off positioning; anything reusable belongs in
      a class or a variable on an ancestor.
    </p>
  {/snippet}
  <p>
    Inline <Tag bg="rebeccapurple" style="vertical-align: baseline">Draft</Tag> in
    a sentence.
  </p>
</DemoWithCode>

<TextLayout>
  <h3>What does not forward</h3>
  <p>
    A few components have no single element to forward to, so they take no
    attributes: <code>FormProvider</code> and <code>Code</code> render no element
    of their own, <code>ResponsiveText</code> renders one element per breakpoint,
    and <code>Table</code>'s sticky mode renders a hidden measuring copy of its tables
    &mdash; an <code>id</code> would appear twice. Wrap them if you need a handle.
  </p>
</TextLayout>

<style>
  .rendered {
    font-size: var(--font-size-small, 0.85rem);
    white-space: pre-wrap;
    word-break: break-all;
    padding: var(--space-md, 0.5rem);
    background: var(--surface-bg, #0001);
    border-radius: var(--border-radius, 4px);
  }
  /* Deliberately :global -- this is the point the demo above is making. */
  :global(.featured) {
    --card-bg: var(--primary-bg);
    --card-fg: var(--primary-fg);
  }
</style>
