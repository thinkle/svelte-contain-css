<script lang="ts">
  import Container from "$lib/layout/Container.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariables from "./CssVariables.svelte";
  import CssWrapper from "./CssWrapper.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import TypographyThemeControls from "./TypographyThemeControls.svelte";
  import type { CSSVariable } from "./types";
  let cssVariables: CSSVariable[] = [
    {
      name: "--font-size",
      group: "Typography",
      type: "length",
      placeholder: "e.g., 1.2rem",
      defaultValue: "1.2rem",
      unit: "rem",
    },
    {
      name: "--body-font-family",
      group: "Typography",
      type: "text",
      placeholder: "e.g., Garamond, serif",
      defaultValue: "Garamond, serif",
      unit: "",
    },
    {
      name: "--line-height",
      type: "number",
      group: "Typography",
      placeholder: "e.g., 1.4",
      defaultValue: "1.4",
      unit: "",
    },
    {
      name: "--line-width",
      type: "length",
      group: "Typography",
      placeholder: "e.g., 30rem",
      defaultValue: "30rem",
      unit: "rem",
    },
    {
      group: "Heading",
      name: "--heading-font-variant",
      type: "text",
      placeholder: "e.g., small-caps",
      defaultValue: "small-caps",
    },
    {
      group: "Paragraphs",
      name: "--first-line-text-transform",
      type: "text",
      placeholder: "e.g., uppercase",
      defaultValue: "uppercase",
    },
    {
      group: "Typography",
      name: "--font-family",
      type: "text",
      placeholder: "e.g., Arial, sans-serif",
      defaultValue: "Verdana, Geneva, Tahoma, sans-serif",
      unit: "",
    },
    {
      group: "Heading",
      name: "--heading-font-family",
      type: "text",
      placeholder: "e.g., Arial, sans-serif",
      defaultValue: "var(--font-family)",
      unit: "",
    },
    {
      group: "Heading",
      name: "--heading-text-decoration",
      type: "decoration",
      placeholder: "e.g., underline",
      defaultValue: "none",
      unit: "",
    },

    {
      group: "UI",
      name: "--ui-font-family",
      type: "text",
      placeholder: "e.g., Arial, sans-serif",
      defaultValue: "var(--font-family)",
      unit: "",
    },
    {
      group: "Code",
      name: "--code-font-family",
      type: "text",
      placeholder: "e.g., Courier, monospace",
      defaultValue: "Courier, monospace",
      unit: "",
    },
    {
      group: "Code",
      name: "--code-font-size",
      type: "length",
      placeholder: "e.g., 0.9em",
      defaultValue: "0.9em",
      unit: "em",
    },

    {
      group: "Font Variants",
      name: "--bold",
      type: "text",
      placeholder: "e.g., bold",
      defaultValue: "bold",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-margin",
      type: "length",
      placeholder: "e.g., 0.5em 0",
      defaultValue: "0.5em 0",
      unit: "em",
    },
    {
      group: "Headings",
      name: "--first-heading-margin-top",
      type: "length",
      placeholder: "e.g., 0",
      defaultValue: "0",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-bg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "transparent",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-fg",
      type: "color",
      placeholder: "e.g., #000000",
      defaultValue: "var(--primary-bg)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-padding",
      type: "length",
      placeholder: "var(--space)",
      defaultValue: "",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-box-shadow",
      type: "text",
      placeholder: "e.g., 0 2px 8px rgba(0,0,0,0.15)",
      defaultValue: "unset",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-border-radius",
      type: "length",
      placeholder: "var(--border-radius)",
      defaultValue: "0",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-major-bg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "var(--heading-bg)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-major-fg",
      type: "color",
      placeholder: "e.g., #000000",
      defaultValue: "var(--heading-fg)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-major-padding",
      type: "length",
      placeholder: "var(--heading-padding)",
      defaultValue: "",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-major-box-shadow",
      type: "text",
      placeholder: "e.g., 0 2px 8px rgba(0,0,0,0.15)",
      defaultValue: "var(--heading-box-shadow)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-minor-bg",
      type: "color",
      placeholder: "e.g., #ffffff",
      defaultValue: "var(--heading-bg)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-minor-fg",
      type: "color",
      placeholder: "e.g., #000000",
      defaultValue: "var(--heading-fg)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-minor-padding",
      type: "length",
      placeholder: "var(--heading-padding)",
      defaultValue: "",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-minor-box-shadow",
      type: "text",
      placeholder: "e.g., 0 1px 4px rgba(0,0,0,0.12)",
      defaultValue: "var(--heading-box-shadow)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-1-font-size",
      type: "text",
      placeholder: "e.g., 2.5rem",
      defaultValue: "revert",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-2-font-size",
      type: "text",
      placeholder: "e.g., 2rem",
      defaultValue: "revert",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-3-font-size",
      type: "text",
      placeholder: "e.g., 1.5rem",
      defaultValue: "revert",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-4-font-size",
      type: "text",
      placeholder: "e.g., 1.25rem",
      defaultValue: "revert",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-5-font-size",
      type: "text",
      placeholder: "e.g., 1rem",
      defaultValue: "revert",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-6-font-size",
      type: "text",
      placeholder: "e.g., 0.875rem",
      defaultValue: "revert",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-1-box-shadow",
      type: "text",
      placeholder: "e.g., 0 2px 8px rgba(0,0,0,0.15)",
      defaultValue: "var(--heading-major-box-shadow)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-2-box-shadow",
      type: "text",
      placeholder: "e.g., 0 2px 8px rgba(0,0,0,0.15)",
      defaultValue: "var(--heading-major-box-shadow)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-3-box-shadow",
      type: "text",
      placeholder: "e.g., 0 1px 4px rgba(0,0,0,0.12)",
      defaultValue: "var(--heading-minor-box-shadow)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-4-box-shadow",
      type: "text",
      placeholder: "e.g., 0 1px 4px rgba(0,0,0,0.12)",
      defaultValue: "var(--heading-minor-box-shadow)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-5-box-shadow",
      type: "text",
      placeholder: "e.g., 0 1px 4px rgba(0,0,0,0.12)",
      defaultValue: "var(--heading-minor-box-shadow)",
      unit: "",
    },
    {
      group: "Headings",
      name: "--heading-6-box-shadow",
      type: "text",
      placeholder: "e.g., 0 1px 4px rgba(0,0,0,0.12)",
      defaultValue: "var(--heading-minor-box-shadow)",
      unit: "",
    },
    {
      group: "Paragraphs",
      name: "--paragraph-indent",
      type: "length",
      placeholder: "e.g., 1em",
      defaultValue: "none",
    },
    {
      group: "Paragraphs",
      name: "--first-paragraph-indent",
      type: "length",
      placeholder: "e.g., 1em",
      defaultValue: "none",
      unit: "em",
    },
    {
      group: "Paragraphs",
      name: "--paragraph-margin",
      type: "length",
      placeholder: "e.g., 0",
      defaultValue: "0",
    },
  ];

  let cssValues = $state({});
  let headingMode = $state<"one" | "three" | "six" | "fixed">("three");
  const headingExamples = [
    {
      level: 1,
      label: "Heading One",
      copy: "Graf graf. This paragraph follows the first heading.",
    },
    {
      level: 2,
      label: "Heading Two",
      copy: "Graf graf. This paragraph follows the second heading.",
    },
    {
      level: 3,
      label: "Heading Three",
      copy: "Graf graf. This paragraph follows the third heading.",
    },
    {
      level: 4,
      label: "Heading Four",
      copy: "Graf graf. This paragraph follows the fourth heading.",
    },
    {
      level: 5,
      label: "Heading Five",
      copy: "Graf graf. This paragraph follows the fifth heading.",
    },
    {
      level: 6,
      label: "Heading Six",
      copy: "Graf graf. This paragraph follows the sixth heading.",
    },
  ] as const;

  const headingModeVars = $derived.by(() => {
    if (headingMode === "one") {
      return {
        "--heading-fg": "var(--primary-bg)",
        "--heading-text-decoration": "underline",
      };
    }

    if (headingMode === "fixed") {
      return {
        "--heading-font-size": "24px",
        "--heading-fg": "var(--primary-bg)",
      };
    }

    if (headingMode === "six") {
      return {
        "--heading-1-fg": "var(--material-color-red-600)",
        "--heading-2-fg": "var(--material-color-deep-orange-600)",
        "--heading-3-fg": "var(--material-color-amber-700)",
        "--heading-4-fg": "var(--material-color-green-700)",
        "--heading-5-fg": "var(--material-color-light-blue-700)",
        "--heading-6-fg": "var(--material-color-purple-700)",
        "--heading-1-font-size": "2.4rem",
        "--heading-2-font-size": "2rem",
        "--heading-3-font-size": "1.7rem",
        "--heading-4-font-size": "1.4rem",
        "--heading-5-font-size": "1.15rem",
        "--heading-6-font-size": "1rem",
      };
    }

    return {
      "--heading-major-bg": "var(--primary-bg)",
      "--heading-major-fg": "var(--primary-fg)",
      "--heading-major-padding": "var(--padding)",
      "--heading-minor-fg": "var(--secondary-fg)",
      "--heading-minor-padding": "0 0 0 0.75rem",
      "--heading-minor-border-width": "0 0 0 4px",
      "--heading-minor-border-style": "solid",
      "--heading-minor-border-color": "var(--secondary-fg)",
    };
  });

  function varsToStyle(vars: Record<string, string>) {
    return Object.entries(vars)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");
  }

  function varsToCode(vars: Record<string, string>) {
    return Object.entries(vars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join("\n");
  }

  const headingModeLabel = $derived(
    headingMode === "one"
      ? "One shared heading rule"
      : headingMode === "fixed"
        ? "Fixed shared heading size"
        : headingMode === "three"
          ? "Major / minor / shared"
          : "Six explicit levels",
  );

  const headingExampleMarkup = $derived(
    headingExamples
      .map(
        ({ level, label, copy }) =>
          `    <h${level}>${label}</h${level}>\n    <p>${copy}</p>`,
      )
      .join("\n"),
  );

  const headingModeCode = $derived(`<div style="
${varsToCode(headingModeVars)}
">
  <TextLayout>
${headingExampleMarkup}
  </TextLayout>
</div>`);
</script>

<CssWrapper variables={cssValues}>
  <Container>
    <TextLayout>
      <h2 id="typography">Typography</h2>
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
        Headings now support a proper cascade: each level can resolve from
        <code>--heading-1</code> through <code>--heading-6</code>, then
        <code>--heading-major</code> or <code>--heading-minor</code>, and
        finally the shared <code>--heading</code> tokens.
      </p>
      <p>
        In practice, you usually set those variables on a wrapper around a
        <code>TextLayout</code>, not on each heading directly. The demo below
        shows that pattern.
      </p>
    </TextLayout>
    <TypographyThemeControls />
    <DemoWithCode code={headingModeCode} defaultTab="split">
      {#snippet header()}
        <h3>Heading Cascade</h3>
      {/snippet}
      {#snippet blurb()}
        <p>
          One shared text block, one wrapper element, and three ways of driving
          the heading cascade from top-level CSS variables.
        </p>
        <p>
          Current mode: <strong>{headingModeLabel}</strong>
        </p>
      {/snippet}
      {#snippet inputArea()}
        <Inline>
          <RadioButton bind:group={headingMode} value="one"
            >One heading rule</RadioButton
          >
          <RadioButton bind:group={headingMode} value="fixed"
            >Fixed heading size</RadioButton
          >
          <RadioButton bind:group={headingMode} value="three"
            >Three levels</RadioButton
          >
          <RadioButton bind:group={headingMode} value="six"
            >Six levels</RadioButton
          >
        </Inline>
      {/snippet}
      <div style={varsToStyle(headingModeVars)}>
        <TextLayout>
          {#each headingExamples as { level, label, copy } (level)}
            <svelte:element this={`h${level}`}>{label}</svelte:element>
            <p>{copy}</p>
          {/each}
        </TextLayout>
      </div>
    </DemoWithCode>
    <CssVariables
      variables={cssVariables}
      onSetVariables={(values) => {
        cssValues = values;
      }}
    />
  </Container>
</CssWrapper>
