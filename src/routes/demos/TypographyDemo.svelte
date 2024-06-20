<script lang="ts">
  import Container from "$lib/layout/Container.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariables from "./CssVariables.svelte";
  import CssWrapper from "./CssWrapper.svelte";
  import type { CSSVariable } from "./types";
  let cssVariables: CSSVariable[] = [
    {
      name: "--text-size",
      type: "length",
      placeholder: "e.g., 1.2rem",
      defaultValue: "1.2rem",
      unit: "rem",
    },
    {
      name: "--body-font-family",
      type: "text",
      placeholder: "e.g., Garamond, serif",
      defaultValue: "Garamond, serif",
      unit: "",
    },
    {
      name: "--line-height",
      type: "number",
      placeholder: "e.g., 1.4",
      defaultValue: "1.4",
      unit: "",
    },
    {
      name: "--line-width",
      type: "length",
      placeholder: "e.g., 30rem",
      defaultValue: "30rem",
      unit: "rem",
    },
    {
      name: "--heading-font-variant",
      type: "text",
      placeholder: "e.g., small-caps",
      defaultValue: "small-caps",
    },
    {
      name: "--first-paragraph-first-line-text-transform",
      type: "text",
      placeholder: "e.g., uppercase",
      defaultValue: "uppercase",
    },
    {
      name: "--font-family",
      type: "text",
      placeholder: "e.g., Arial, sans-serif",
      defaultValue: "Verdana, Geneva, Tahoma, sans-serif",
      unit: "",
    },
    {
      name: "--heading-font-family",
      type: "text",
      placeholder: "e.g., Arial, sans-serif",
      defaultValue: "var(--font-family)",
      unit: "",
    },
    {
      name: "--heading-text-decoration",
      type: "decoration",
      placeholder: "e.g., underline",
      defaultValue: "none",
      unit: "",
    },

    {
      name: "--ui-font-family",
      type: "text",
      placeholder: "e.g., Arial, sans-serif",
      defaultValue: "var(--font-family)",
      unit: "",
    },
    {
      name: "--code-font-family",
      type: "text",
      placeholder: "e.g., Courier, monospace",
      defaultValue: "Courier, monospace",
      unit: "",
    },
    {
      name: "--code-font-size",
      type: "length",
      placeholder: "e.g., 0.9em",
      defaultValue: "0.9em",
      unit: "em",
    },

    {
      name: "--bold",
      type: "text",
      placeholder: "e.g., bold",
      defaultValue: "bold",
      unit: "",
    },
    {
      name: "--heading-margin",
      type: "length",
      placeholder: "e.g., 0.5em 0",
      defaultValue: "0.5em 0",
      unit: "em",
    },
    {
      name: "--first-heading-margin",
      type: "length",
      placeholder: "e.g., 0",
      defaultValue: "0",
      unit: "",
    },
    {
      name: "--heading-bg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "transparent",
      unit: "",
    },
    {
      name: "--heading-fg",
      type: "color",
      placeholder: "e.g., #000000",
      defaultValue: "var(--primary-bg)",
      unit: "",
    },
    {
      name: "--heading-padding",
      type: "length",
      placeholder: "var(--space)",
      defaultValue: "",
      unit: "",
    },
    {
      name: "--paragraph-indent",
      type: "length",
      placeholder: "e.g., 1em",
      defaultValue: "none",
    },
    {
      name: "--first-paragraph-indent",
      type: "length",
      placeholder: "e.g., 1em",
      defaultValue: "none",
      unit: "em",
    },
    {
      name: "--paragraph-margin",
      type: "length",
      placeholder: "e.g., 0",
      defaultValue: "0",
    },
  ];

  let cssValues = {};
</script>

<CssWrapper variables={cssValues}>
  <Container>
    <TextLayout>
      <h2>Typography</h2>
      <p>
        If you wrap an element in a
        <code>TextLayout</code> container, we will automatically apply some basic
        typography for body text, headers, and so forth.
      </p>
      <p>
        The TextLayout element uses some of the typographic styles that are
        applied at our top level component, which you can define anywhere in
        your project that you'd like to make changes.
      </p>
      <h3>The Typography Triangle</h3>
      <p>
        The key to good typography is paying attention to the harmony and
        balance of three simple factors:
      </p>
      <ol>
        <li>Font: the font (font-family and font-size in combination).</li>
        <li>Width: the width of each line.</li>
        <li>Spacing: the spacing between lines (line-height).</li>
      </ol>
      <p>
        In this system, you can customize those three elements with <code
          >--body-font-family</code
        >,
        <code>--line-width</code> and
        <code>--line-height</code>.
      </p>
      <h3>Headings</h3>
      <p>
        We take some pains to clean up the space around headings by default, so
        that headings are closer to the content they describe than the content
        that precedes them.
      </p>
      <p>
        If you want to use background colors on your heading, you should add
        some padding to them using the <code>--heading-pad</code> variable,
        which is unset by default (since our default headings don't have a
        background color). I recommend trying one of the existing spacing
        utility variables such as
        <code>var(--padding)</code> or <code>var(--gap)</code>
        or <code>var(--space)</code> to make sure the space around the heading will
        harmonize with space elsewhere in your interface.
      </p>
    </TextLayout>
    <CssVariables
      variables={cssVariables}
      onSetVariables={(values) => {
        cssValues = values;
      }}
    />
    <Code
      code={`
    <TextLayout>
      <h2>Typography</h2>
      <p>And so on...</p>
      <h3>More Headings</h3>
      <blockquote>And so on</blockquote>
      <p>And <q>so</q> on.</p>
    </TextLayout>
    `}
    />
  </Container>
</CssWrapper>
