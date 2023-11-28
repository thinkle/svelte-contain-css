<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  import CssVariables from "./CssVariables.svelte";
  import CssWrapper from "./CssWrapper.svelte";
  let vars = {
    typography: [
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
        name: "--font-family",
        type: "text",
        placeholder: "e.g., Arial, sans-serif",
        defaultValue: "Verdana, Geneva, Tahoma, sans-serif",
        unit: "",
      },
    ],
    layout: [
      {
        name: "space",
        type: "length",
        placeholder: "2px",
      },
      {
        name: "pad",
        type: "length",
        placeholder: "calc(var(--space) * 4)",
      },
      {
        name: "shadow-distance",
        type: "length",
        placeholder: "2px",
      },
      {
        name: "border-radius",
        type: "radius",
        placeholder: "8px",
      },
    ],
    color: [
      "--body-bg",
      "--body-fg",
      "--primary-bg",
      "--primary-fg",
      "--secondary-bg",
      "--secondary-fg",
      "----inactive-bg",
      "--inactive-fg",
      "--shadow-color",
      "--border-color",
      "--menu-bg",
      "--menu-fg",
      "--menu-even-bg",
      "--menu-even-fg",
    ].map((v) => ({ name: v, type: "color", placeholder: "#110042" })),
  };
  let values = {
    typography: {},
    layout: {},
    color: {},
  };
  let mode: "typography" | "layout" | "color" = "layout";
</script>

<CssWrapper
  variables={{
    ...values.typography,
    ...values.layout,
    ...values.color,
  }}
>
  <Container>
    <Bar>
      <h2>CSS Variables</h2>
    </Bar>
    <TextLayout>
      <h3>About Variables</h3>
      <p>
        CSS Variables naturally flow down your component heirarchy, which makes
        them an ideal way to handle theming and styling in a modern component
        framework.
      </p>
      <p>
        <b>Contain</b> has specific variables for each type of component, but those
        variables inherit smart defaults from some top-level settings by default.
      </p>
      <p>
        The result is a modular system, where you can go in and customize, e.g.,
        the padding on a button if your heart desires, but if you would like to
        keep everything sane and consistent, you can do so by tweaking a few
        top-level variables and letting inheritance do the rest.
      </p>
    </TextLayout>
    <Page right>
      <Sidebar slot="sidebar" right>
        <MenuList>
          <li>
            <a href="#layout-vars" on:click={() => (mode = "layout")}>Layout</a>
          </li>
          <li>
            <a href="#typography-vars" on:click={() => (mode = "typography")}
              >Typography</a
            >
          </li>
          <li>
            <a href="#color-vars" on:click={() => (mode = "color")}>Colors</a>
          </li>
        </MenuList>
      </Sidebar>
      <Container>
        <h2>Variables for {mode}</h2>
        <CssVariables
          variables={vars[mode]}
          onSetVariables={(variables) => {
            values[mode] = variables;
          }}
        ></CssVariables>
      </Container>
    </Page>
  </Container>
</CssWrapper>
