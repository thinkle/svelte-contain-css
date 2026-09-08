<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Menu from "$lib/dropdowns/DropdownMenu.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Input from "$lib/controls/Input.svelte";
  import Container from "$lib/layout/Container.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Option from "$lib/controls/Option.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import type {
    MatchMode,
    TypeaheadMode,
  } from "$lib/dropdowns/DropdownMenu.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  let longList: string[] = [];
  let constrainedWidth = $state("80px");
  function randomWord() {
    let words = [
      "apple",
      "banana",
      "cherry",
      "durian",
      "eggplant",
      "fig",
      "grape",
      "honeydew",
      "ice cream",
      "jackfruit",
      "kiwi",
      "lemon",
      "mango",
      "nectarine",
      "orange",
      "pear",
      "quince",
      "raspberry",
      "strawberry",
      "tangerine",
      "ugli fruit",
      "watermelon",
    ];
    return words[Math.floor(Math.random() * words.length)];
  }
  for (let i = 0; i < 30; i++) {
    longList.push(`${randomWord()} ${i}`);
  }
  let val = $state(2);

  let people = [
    { name: "John", age: 30, label: "John (aged 30)" },
    { name: "Jane", age: 25, label: "Jane (aged 25)" },
    { name: "Jim", age: 40, label: "Jim (aged 40)" },
    { name: "Jill", age: 35, label: "Jill (aged 35)" },
  ];
  let selectedPerson = $state(people[0]);

  // --- Type-ahead playground -------------------------------------------------
  const iceCreamFlavors = [
    "Vanilla Bean",
    "Chocolate",
    "Double Dutch Chocolate",
    "Fresh Mint Chocolate Chip",
    "Salted Caramel Pretzel",
    "Strawberry Cheesecake Swirl",
    "Cookies and Cream Dream",
    "Roasted Banana Walnut",
    "Black Raspberry Chip",
    "Toasted Coconut Almond Fudge",
    "Brown Butter Pecan",
    "Espresso Chocolate Chunk",
    "Honey Lavender Shortbread",
    "Peanut Butter Cup Explosion",
    "Maple Bourbon Candied Bacon",
    "Lemon Blueberry Buttermilk",
    "Matcha White Chocolate",
    "Cinnamon Horchata",
    "Dark Cherry Amaretto",
    "Pistachio Rosewater",
    "Salted Peanut Butter Chocolate",
    "Very Berry Magic",
    "Berry Explosion",
    "Chocolate Fudge Brownie",
    "Choco-tastic Swirls",
  ];
  let matchMode = $state<MatchMode>("word");
  let typeaheadMode = $state<TypeaheadMode>("filter");
  let flavor = $state(iceCreamFlavors[0]);
</script>

<DemoWithCode
  code={`<Bar>
  <Menu>
    {#snippet label()}
      <span>Left Menu</span>
    {/snippet}
    <li><button>Foo</button></li>
    <li><button>Bar</button></li>
    <li><button>Baz</button></li>
    <li><button>Bang</button></li>
  </Menu>
  <Menu>
    {#snippet label()}
      <span>Long Menu</span>
    {/snippet}
    ...
  </Menu>
</Bar>`}
>
  {#snippet header()}
    <h2>Dropdown Menus</h2>
    <p>
      Our basic dropdowns work well, even if the contents are longer than the
      contents of the page (see "long menu" example).
    </p>
  {/snippet}
  <Bar>
    <div data-testid="dropdown-left-menu">
      <Menu>
        {#snippet label()}
          <span>Left Menu</span>
        {/snippet}
        <li><button>Foo</button></li>
        <li><button>Bar</button></li>
        <li><button>Baz</button></li>
        <li><button>Bang</button></li>
      </Menu>
    </div>
    <div data-testid="dropdown-long-menu">
      <Menu>
        {#snippet label()}
          <span>Long Menu</span>
        {/snippet}
        {#each longList as item}
          <li id="go-nowhere">
            <a href="#go-nowhere">{item}</a>
          </li>
        {/each}
      </Menu>
    </div>
    <div data-testid="dropdown-right-menu">
      <Menu>
        {#snippet label()}
          <span>Right Menu</span>
        {/snippet}
        <li><button>Foo</button></li>
        <li><button>Bar</button></li>
        <li><button>Baz</button></li>
        <li><button>Bang</button></li>
      </Menu>
    </div>
  </Bar>
</DemoWithCode>
<DemoWithCode
  code={`<Bar --bar-bg="#2a2a2a" --bar-fg="#f5f5f5" --hover-color-mix="white">
  <Menu
    --menu-trigger-bg="transparent"
    --menu-trigger-fg="var(--bar-fg)"
    --menu-bg="#111"
    --menu-fg="#f5f5f5"
  >
    {#snippet label()}
      <span>Window</span>
    {/snippet}
    <li><button>Minimize</button></li>
    <li><button>Zoom</button></li>
    <li><button>Bring All to Front</button></li>
  </Menu>
</Bar>`}
>
  {#snippet header()}
    <p>
      If you want a dropdown trigger to blend into a surrounding bar without also
      recoloring the popup, use <code>--menu-trigger-bg</code> and
      <code>--menu-trigger-fg</code>. The trigger falls back to the regular
      <code>--menu-*</code> variables, so existing styling still works.
    </p>
  {/snippet}
  <Bar --bar-bg="#2a2a2a" --bar-fg="#f5f5f5" --hover-color-mix="white">
    <Menu
      --menu-trigger-bg="transparent"
      --menu-trigger-fg="var(--bar-fg)"
      --menu-bg="#111"
      --menu-fg="#f5f5f5"
    >
      {#snippet label()}
        <span>Window</span>
      {/snippet}
      <li><button>Minimize</button></li>
      <li><button>Zoom</button></li>
      <li><button>Bring All to Front</button></li>
    </Menu>
  </Bar>
</DemoWithCode>
<DemoWithCode
  code={`<Menu matchMode="${matchMode}" typeaheadMode="${typeaheadMode}">
  {#snippet label()}<span>Pick a flavor</span>{/snippet}
  {#each iceCreamFlavors as flavor}
    <li><button>{flavor}</button></li>
  {/each}
</Menu>

<Select matchMode="${matchMode}" typeaheadMode="${typeaheadMode}" bind:value={selected}>
  {#each iceCreamFlavors as flavor}
    <option value={flavor}>{flavor}</option>
  {/each}
</Select>`}
>
  {#snippet header()}
    <h2>Type-ahead matching &amp; filtering</h2>
    <p>
      Open a menu and start typing to jump to an item. Two props tune this, and
      both work on <code>&lt;Select&gt;</code> and
      <code>&lt;DropdownMenu&gt;</code>:
    </p>
    <ul>
      <li>
        <code>matchMode</code> &mdash; <code>"prefix"</code> (default, match the
        start of the whole label), <code>"word"</code> (match the start of
        <em>any</em> word, so typing <code>choc</code> finds
        <code>"Double Dutch Chocolate"</code>), or <code>"substring"</code>
        (match anywhere).
      </li>
      <li>
        <code>typeaheadMode</code> &mdash; <code>"focus"</code> (default, move
        focus to the first match) or <code>"filter"</code> (hide non-matching rows
        so a long list collapses as you type; Backspace or Escape restores it, and
        Arrow / Tab cycle the rows that are left).
      </li>
    </ul>
    <p>
      Flip the toggles, then open either control and type a fragment like
      <code>choc</code>, <code>salted</code>, or <code>berry</code>.
    </p>
  {/snippet}
  {#snippet inputArea()}
    <FormItem>
      {#snippet label()}
        <span>matchMode</span>
      {/snippet}
      <RadioButton bind:group={matchMode} value="prefix">prefix</RadioButton>
      <RadioButton bind:group={matchMode} value="word">word</RadioButton>
      <RadioButton bind:group={matchMode} value="substring">
        substring
      </RadioButton>
    </FormItem>
    <FormItem>
      {#snippet label()}
        <span>typeaheadMode</span>
      {/snippet}
      <RadioButton bind:group={typeaheadMode} value="focus">focus</RadioButton>
      <RadioButton bind:group={typeaheadMode} value="filter">
        filter
      </RadioButton>
    </FormItem>
  {/snippet}

  <Bar>
    <div data-testid="typeahead-playground-menu">
      <Menu {matchMode} {typeaheadMode}>
        {#snippet label()}
          <span>Pick a flavor</span>
        {/snippet}
        {#each iceCreamFlavors as f}
          <li><button type="button">{f}</button></li>
        {/each}
      </Menu>
    </div>
    <Select
      data-testid="typeahead-playground-select"
      {matchMode}
      {typeaheadMode}
      bind:value={flavor}
    >
      {#each iceCreamFlavors as f}
        <option value={f}>{f}</option>
      {/each}
    </Select>
  </Bar>
  <Container>
    <p>We've got:</p>
    <ul>
      <li>
        typeaheadMode="{typeaheadMode}"
        {#if typeaheadMode == "filter"}
          <p>Items will disappear from the menu as you type</p>
        {/if}
      </li>
      <li>
        matchMode="{matchMode}"
        <p>
          {#if matchMode === "word"}
            Typing "berry" will match <em>berry</em> as a full word anywhere, so
            both "Berry Explosion" and "Very Berry Magic", but not
            <em>strawberry</em> as in "Strawberry Cheesecake Swirl."
          {:else if matchMode === "prefix"}
            Typing berry will <em>only</em> match flavors that start with berry,
            so we will match "Berry Explosion" but <em>not</em> "Very Berry Magic"
          {:else if matchMode === "substring"}
            Typing "berry" will match those letters <em>anywhere</em>
            in the word, so we will match <em>strawberry</em> as well as berry.
          {/if}
        </p>
      </li>
    </ul>
    <p>You have selected <code>{flavor}</code>.</p>
    <p>
      Try typing e.g. <code>berry</code>, <code>choc</code>, or
      <code>salted</code> after opening either control.
    </p>
  </Container>
</DemoWithCode>
<DemoWithCode
  code={`
<Select bind:value={val}>
  <option value={1}>Option A</option>
  <option value={2}><b>Strong</b> B</option>
  <option value={3}><em>Fancy</em> C</option>
  <option value={4}><span style="color:red">Red</span> D</option>
</Select>
  `}
>
  {#snippet header()}
    <h2>Select</h2>
    <p>
      Our <code>&lt;Select&gt;</code> element creates the select element we always
      wish we had, with styling allowed inside of the &lt;option&gt; tag. On small
      screens, we will fall back to acting like a standard select, but when
      there's enough space for our custom element, we'll use a dropdown menu to
      render a select button with markup allowed internally.
    </p>
  {/snippet}
  <FormItem>
    {#snippet label()}
      <span>Select a person:</span>
    {/snippet}
    <Select data-testid="person-select" bind:value={selectedPerson}>
      {#each people as person}
        <option value={person}>{person.label}</option>
      {/each}
    </Select>
    <Button
      onclick={() =>
        (selectedPerson = people[Math.floor(Math.random() * people.length)])}
      >Select Random Person</Button
    >
  </FormItem>
  <p>You selected {selectedPerson.name}, aged {selectedPerson.age}!</p>

  <FormItem>
    {#snippet label()}
      <span>Select an option:</span>
    {/snippet}
    <Select data-testid="styled-option-select" bind:value={val}>
      <Option value={1}>Option A</Option>
      <Option value={2}><b>Strong</b> B</Option>
      <Option value={3}><em>Fancy</em> C</Option>
      <Option value={4}><span style="color:red">Red</span> D</Option>
    </Select>
  </FormItem>
  <p>Well look, they selected {val}</p>
  <p>Show off two-way binding by changing the option here as well:</p>
  <FormItem>
    {#snippet label()}
      <span>Option #</span>
    {/snippet}
    <Input type="number" bind:value={val} />
  </FormItem>
</DemoWithCode>
<DemoWithCode
  code={`
<Select --select-width="${constrainedWidth}" bind:value={val}>
  ...
</Select>
  `}
>
  {#snippet header()}
    <h2>Controlling width</h2>
    <p>
      Here it is using the <code>--select-width</code> variable to constrain the
      select size.
    </p>
  {/snippet}
  {#snippet inputArea()}
    <FormItem>
      {#snippet label()}
        <span>--select-width</span>
      {/snippet}
      <Input bind:value={constrainedWidth} />
    </FormItem>
  {/snippet}
  <FormItem>
    {#snippet label()}
      <span>A narrower select:</span>
    {/snippet}
    <Select
      data-testid="constrained-select"
      --select-width={constrainedWidth}
      bind:value={val}
    >
      <Option value={1}>Option A</Option>
      <Option value={2}><b>Strong</b> B</Option>
      <Option value={3}><em>Fancy</em> C</Option>
      <Option value={4}><span style="color:red">Red</span> D</Option>
    </Select>
  </FormItem>
  <p>Here it is inside a full-width and regular width FormItem container.</p>
  <h3>Full Width</h3>
  <FormItem class="fullWidth">
    {#snippet label()}
      <span>Full Width Select:</span>
    {/snippet}
    <Select data-testid="full-width-select" bind:value={val}>
      <Option value={1}>Option A</Option>
      <Option value={2}><b>Strong</b> B</Option>
      <Option value={3}><em>Fancy</em> C</Option>
      <Option value={4}><span style="color:red">Red</span> D</Option>
    </Select>
  </FormItem>
  <h3>Regular Width</h3>
  <FormItem>
    {#snippet label()}
      <span>Regular Width Select:</span>
    {/snippet}
    <Select data-testid="regular-width-select" bind:value={val}>
      <Option value={1}>Option A</Option>
      <Option value={2}><b>Strong</b> B</Option>
      <Option value={3}><em>Fancy</em> C</Option>
      <Option value={4}><span style="color:red">Red</span> D</Option>
    </Select>
  </FormItem>
</DemoWithCode>
