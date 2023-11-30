<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Menu from "$lib/dropdowns/DropdownMenu.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Container from "$lib/layout/Container.svelte";
  let longList: string[] = [];
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
</script>

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
      <li>
        <a href="#">{item}</a>
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
<Container>
  <Select bind:value={val}>
    <option value={1}>Option A</option>
    <option value={2}><b>Strong</b> B</option>
    <option value={3}><em>Fancy</em> C</option>
    <option value={4}><span style="color:red">Red</span> D</option>
  </Select>
  <p>
    Well look, they selected {val}
  </p>
  Selection:<input type="number" bind:value={val} />
</Container>
