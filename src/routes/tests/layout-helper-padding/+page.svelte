<script lang="ts">
  /*
    Fixtures for tests/layout-helper-padding.spec.ts.

    Inline and Stack are bare flex helpers: they must not pick up the theme's
    --padding (or an enclosing surface's), only their own --inline-padding /
    --stack-padding or the `padding` prop.
  */
  import Inline from "$lib/layout/Inline.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Card from "$lib/Card.svelte";
  import "$lib/vars/defaults.css";
</script>

<div data-testid="themed" style="--padding: 17px;">
  <Inline><span>a</span><span>b</span></Inline>
  <Stack><span>a</span><span>b</span></Stack>
</div>

<div data-testid="in-card">
  <Card --card-padding="19px" --padding="19px">
    <Inline><span>a</span><span>b</span></Inline>
    <Stack><span>a</span><span>b</span></Stack>
  </Card>
</div>

<div data-testid="own-var" style="--padding: 17px; --inline-padding: 6px; --stack-padding: 7px;">
  <Inline><span>a</span></Inline>
  <Stack><span>a</span></Stack>
</div>

<div data-testid="prop">
  <Inline padding="9px"><span>a</span></Inline>
  <Stack padding="11px"><span>a</span></Stack>
</div>
