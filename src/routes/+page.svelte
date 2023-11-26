<script>
  import Page from "$lib/layout/Page.svelte";
  import Card from "$lib/Card.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import "$lib/vars/defaults.css";
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";

  const componentCategories = [
    {
      title: "Simple Components",
      items: [
        { title: "Button", url: "/button" },
        { title: "Card", url: "/card" },
        { title: "Checkbox", url: "/checkbox" },
        { title: "Input", url: "/input" },
        { title: "Menu", url: "/menu" },
        { title: "Radio", url: "/radio" },
        { title: "Select", url: "/select" },
        { title: "Sidebar", url: "/sidebar" },
        { title: "Tabs", url: "/tabs" },
        { title: "Textarea", url: "/textarea" },
        { title: "Toggle", url: "/toggle" },
      ],
    },
    {
      title: "Layout Components",
      items: [
        { title: "Cards", url: "/cards" },
        { title: "Grid", url: "/grid" },
        { title: "Page", url: "/page" },
        { title: "Sidebar", url: "/sidebar" },
      ],
    },
    {
      title: "Advanced Components",
      items: [
        { title: "Accordion", url: "/accordion" },
        { title: "Dialog", url: "/dialog" },
        { title: "Drawer", url: "/drawer" },
        { title: "Modal", url: "/modal" },
        { title: "Popover", url: "/popover" },
        { title: "Tooltip", url: "/tooltip" },
      ],
    },
  ];
</script>

<h1>Contain Component Library</h1>
<Page>
  <Sidebar slot="sidebar">
    <MenuList>
      <li>
        {#each componentCategories as category}
          <h2>{category.title}</h2>
          {#each category.items as item}
            <li>
              <a href={item.url}>{item.title}</a>
            </li>
          {/each}
        {/each}
      </li>
    </MenuList>
  </Sidebar>

  <GridLayout>
    <Card center={true}>
      <p>Welcome to my new component library!</p>
    </Card>
    <Card>
      <h2 slot="header">Simple Components</h2>
      <p>
        Presenting the simple components you would expect to see in any modern
        component library.
      </p>
    </Card>
    <Card --card-bg="var(--material-color-purple)">
      <h2 slot="header">CSS Variables</h2>
      <p>
        We use simple CSS variables to adjust styles, which have the advantage
        of being easy to override and cascading down through the DOM, regardless
        of your other design choices.
      </p>
      <p>
        This card has a purple background, but you can change it by setting the <code
          >--card-bg</code
        > CSS variable on the card.
      </p>
    </Card>
    <Card fixedHeight={true}>
      <h2 slot="header">Container Queries</h2>
      <div style="display: flex; position: relative;">
        <Sidebar>
          <p>
            This is the same "Sidebar" component that you see on the main page,
            but this time "contained" in a card.
          </p>
        </Sidebar>
        <p>
          We use container queries out of the box, so you can adjust the layout
          of your components based on their size, rather than relying only on
          the viewport size. This "Card" has a sidebar, for example, but it's
          layout will be different than the sidebar on the main page.
        </p>
      </div>
    </Card>
    <Card>
      <h2 slot="header">The Adaptable Card</h2>
      <GridLayout --card-width-small="80px">
        <Card --card-bg="var(--material-color-teal)">We can nest</Card>
        <Card --card-bg="var(--material-color-deep-orange)"
          >Cards within cards</Card
        >
        <Card
          --card-bg="var(--material-color-yellow)"
          --card-fg="var(--material-color-grey-900)">Just for kicks!</Card
        >
        <p>If we really feel like it.</p>
      </GridLayout>
      <div slot="footer">We also support a simple card footer</div>
    </Card>
  </GridLayout>
  <TextLayout>
    <h2>Typography</h2>
    <p>Here is some basic text layout.</p>
    <p>
      Our core text-layout styles assume we define a body font size, a body
      font, and so on and so forth. Vital to our layout is the definition of <code
        >--line-width</code
      >, <code>--line-height</code>
      and <code>body-font-family</code>
      and <code>text-size</code> values that work harmoniously together.
    </p>
    <p>
      We also support <q>basic quotations.</q>
    </p>

    <div>
      <Button>Simple button</Button>
      <Button
        >Icon Button
        <span slot="icon">*</span>
      </Button>
      <Button center={true}>Centered Button</Button>
      <div>
        <Checkbox>Use Checkboxes</Checkbox>
        <Checkbox>Cool Beans</Checkbox>
      </div>
    </div>
    <p>
      Here is another paragraph just to see what happens with some more content
      along the bottom of the page and if it affects the layout of the
      checkboxes and such.
    </p>
  </TextLayout>
</Page>
