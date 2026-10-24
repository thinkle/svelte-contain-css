<script lang="ts">
  // A color variant must still establish Text tones from its final local
  // surface, including after toggling. A parent's factored border/transition
  // must never leak into a child with its own independent policy.
  import "$lib/vars/defaults.css";
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { Button, ButtonLink, CircleButton, Tag, TabItem, Text, Inline, Tile } from "$lib";
  let active = $state(true);
  let ready = $state(false);
  onMount(() => { ready = true; });
</script>

<button data-testid="toggle" disabled={!ready} onclick={() => active = !active}>Toggle variants</button>
<div id="tones" style="--bg: rgb(240, 240, 240); --fg: rgb(10, 10, 10); --secondary-bg: rgb(240, 240, 240); --secondary-fg: rgb(10, 10, 10); --primary-bg: rgb(20, 30, 40); --primary-fg: rgb(200, 200, 200); --danger-color: rgb(200, 0, 0); --text-amount: 50%; --muted-text-amount: 50%; --button-transition: 120ms ease-in;">
  <Button data-testid="button" primary={active}><Text danger>Danger</Text><Text muted>Muted</Text></Button>
  <ButtonLink data-testid="link" href={base || "/"} primary={active}><Text danger>Danger</Text><Text muted>Muted</Text></ButtonLink>
  <CircleButton data-testid="circle" primary={active}><Text danger>Danger</Text><Text muted>Muted</Text></CircleButton>
  <Tag data-testid="tag" primary={active}><Text danger>Danger</Text><Text muted>Muted</Text></Tag>
  <TabItem data-testid="tab" active={active}><Text danger>Danger</Text><Text muted>Muted</Text></TabItem>
</div>

<Tile data-testid="parent" style="--tile-border: 4px solid blue; --tile-border-bottom: 6px dashed red;">
  <Inline data-testid="child">Borderless child</Inline>
  <Inline data-testid="explicit-child" style="--inline-border: 2px solid green;">Own border</Inline>
</Tile>
