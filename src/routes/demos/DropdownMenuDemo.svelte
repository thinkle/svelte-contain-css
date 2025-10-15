<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Menu from "$lib/dropdowns/DropdownMenu.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Container from "$lib/layout/Container.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Option from "$lib/controls/Option.svelte";
  let longList: string[] = [];
  let constrainedWidth = "80px";
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
  let val = 2;

  let people = [
    { name: "John", age: 30, label: "John (aged 30)" },
    { name: "Jane", age: 25, label: "Jane (aged 25)" },
    { name: "Jim", age: 40, label: "Jim (aged 40)" },
    { name: "Jill", age: 35, label: "Jill (aged 35)" },
  ];
  let selectedPerson = people[0];
</script>

<TextLayout>
  <h2>Dropdown Menus</h2>
  <Bar>
    <Menu>
      <span slot="label">Left Menu</span>
      <li><button>Foo</button></li>
      <li><button>Bar</button></li>
      <li><button>Baz</button></li>
      <li><button>Bang</button></li>
    </Menu>
    <Menu>
      <span slot="label">Long Menu</span>
      {#each longList as item}
        <li id="go-nowhere">
          <a href="#go-nowhere">{item}</a>
        </li>
      {/each}
    </Menu>
    <Menu>
      <span slot="label">Right Menu</span>
      <li><button>Foo</button></li>
      <li><button>Bar</button></li>
      <li><button>Baz</button></li>
      <li><button>Bang</button></li>
    </Menu>
  </Bar>
  <p>
    Our basic dropdowns work well, even if the contents are longer than the
    contents of the page (see "long menu" example).
  </p>
  <Code
    code={`
  <Menu>
    <span slot="label">Menu Title</span>
    <li><button>Foo</button></li>
    <li><button>Bar</button></li>
    <li><button>Baz</button></li>
    <li><button>Bang</button></li>
  </Menu>
  `}
  />
</TextLayout>
<TextLayout>
  <h2>Select</h2>
  <p>
    Our <code>&lt;Select&gt;</code> element creates the select element we always
    wish we had, with styling allowed inside of the &lt;option&gt; tag. On small
    screens, we will fall back to acting like a standard select, but when there's
    enough space for our custom element, we'll use a dropdown menu to render a select
    button with markup allowed internally.
  </p>

  <FormItem>
    <span slot="label">Select a person:</span>
    <Select bind:value={selectedPerson}>
      {#each people as person}
        <option value={person}>{person.label}</option>
      {/each}
    </Select>
    <Button
      on:click={() =>
        (selectedPerson = people[Math.floor(Math.random() * people.length)])}
      >Select Random Person</Button
    >
  </FormItem>
  <p>You selected {selectedPerson.name}, aged {selectedPerson.age}!</p>

  <FormItem>
    <span slot="label">Select an option:</span>
    <Select bind:value={val}>
      <Option value={1}>Option A</Option>
      <Option value={2}><b>Strong</b> B</Option>
      <Option value={3}><em>Fancy</em> C</Option>
      <Option value={4}><span style="color:red">Red</span> D</Option>
    </Select>
  </FormItem>
  <Code
    code={`
<Select bind:value={val}>
  <option value={1}>Option A</option>
  <option value={2}><b>Strong</b> B</option>
  <option value={3}><em>Fancy</em> C</option>
  <option value={4}><span style="color:red">Red</span> D</option>
</Select>
  `}
  />
  <p>
    Well look, they selected {val}
  </p>
  <div>
    <p>Show off two way binding by changing the option here as well:</p>
    <FormItem>
      <span slot="label">Option #</span>
      <input type="number" bind:value={val} />
    </FormItem>
  </div>
  <h2>Controlling width</h2>
  <p>
    Here it is using the --select-width variable to constrain the select size.
    <FormItem>
      <span slot="label">--select-width</span>
      <input bind:value={constrainedWidth} />
    </FormItem>
    <FormItem>
      <span slot="label">A narrower select:</span>
      <Select --select-width={constrainedWidth} bind:value={val}>
        <Option value={1}>Option A</Option>
        <Option value={2}><b>Strong</b> B</Option>
        <Option value={3}><em>Fancy</em> C</Option>
        <Option value={4}><span style="color:red">Red</span> D</Option>
      </Select>
    </FormItem>
    <Code
      code={`
<Select --select-width="${constrainedWidth}" ...>
  ...
</Select>
  `}
    />
  </p>

  <TextLayout>
    <p></p>
  </TextLayout>
</TextLayout>
