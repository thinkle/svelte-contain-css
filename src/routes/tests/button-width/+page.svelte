<script lang="ts">
  /* Fixture for tests/button-width.spec.ts: Button is as wide as its label
     by default, even where flex/grid would stretch it, and contexts that
     want full-width buttons (MenuList) still get them. */
  import Button from "$lib/controls/Button.svelte";
  import ButtonLink from "$lib/controls/ButtonLink.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import "$lib/vars/defaults.css";
</script>

<div class="box" data-testid="stack">
  <Stack>
    <Button>Short</Button>
    <ButtonLink href="#x">Link</ButtonLink>
  </Stack>
</div>

<div class="box grid" data-testid="grid">
  <Button>Short</Button>
</div>

<div class="box" data-testid="full">
  <Stack>
    <Button width="100%">Full width</Button>
  </Stack>
</div>

<div class="box" data-testid="menu">
  <MenuList>
    <li><Button>Item</Button></li>
    <li><button>Raw</button></li>
  </MenuList>
</div>

<div class="box" data-testid="menu-custom">
  <MenuList --menu-item-width="120px">
    <li><Button>Item</Button></li>
  </MenuList>
</div>

<style>
  .box {
    width: 400px;
    margin-bottom: 24px;
  }
  .grid {
    display: grid;
  }
</style>
