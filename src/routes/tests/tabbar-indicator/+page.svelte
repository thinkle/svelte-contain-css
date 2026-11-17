<script lang="ts">
  /* Fixture for tests/tabbar-indicator.spec.ts.
     ?preset=off  loads no preset (the default look);
     ?dur=<css time + easing> sets --tab-indicator-transition for every bar. */
  import { page } from "$app/state";
  import TabBar from "$lib/layout/TabBar.svelte";
  import TabItem from "$lib/controls/TabItem.svelte";
  import ThemeStyle from "$lib/theme/ThemeStyle.svelte";
  import underlinedTabs from "$lib/vars/underlined-tabs.css?raw";
  import "$lib/vars/defaults.css";

  const preset = page.url.searchParams.get("preset") !== "off";
  const dur = page.url.searchParams.get("dur") ?? "200ms linear";

  let main = $state("a");
  let closable = $state("a");
  let dynamic = $state("b");
  let extra = $state(false);
  let wide = $state(false);
  let scrolled = $state("t0");
  let wrapped = $state("w0");
  let rtl = $state("a");
  let show = $state(true);
  let none = $state(false);
  const many = Array.from({ length: 10 }, (_, i) => `t${i}`);
  const wraps = Array.from({ length: 9 }, (_, i) => `w${i}`);
</script>

{#if preset}<ThemeStyle id="indicator-preset" css={underlinedTabs} />{/if}

<div style="--tab-indicator-transition: {dur}">
  <div data-testid="main" style="width: 600px">
    <TabBar>
      <TabItem data-testid="a" active={main === "a"} onclick={() => (main = "a")} style="--tab-indicator-color: rgb(200, 0, 0)">Alpha</TabItem>
      <TabItem data-testid="b" active={main === "b"} onclick={() => (main = "b")} style="--tab-indicator-color: rgb(0, 0, 200)">Beta tab here</TabItem>
      <TabItem data-testid="c" active={main === "c"} onclick={() => (main = "c")}>Gamma</TabItem>
    </TabBar>
  </div>

  <div data-testid="closable" style="width: 600px">
    <TabBar>
      <TabItem data-testid="ca" active={closable === "a"} onclick={() => (closable = "a")} onclose={() => {}}>Closable one</TabItem>
      <TabItem data-testid="cb" active={closable === "b"} onclick={() => (closable = "b")}>Plain</TabItem>
    </TabBar>
  </div>

  <div data-testid="dynamic" style="width: 600px">
    <button onclick={() => (extra = !extra)}>toggle first tab</button>
    <button onclick={() => (wide = !wide)}>widen active tab</button>
    <TabBar>
      {#if extra}<TabItem data-testid="d0" onclick={() => (dynamic = "a")}>Inserted before</TabItem>{/if}
      <TabItem data-testid="d1" active={dynamic === "a"} onclick={() => (dynamic = "a")}>One</TabItem>
      <TabItem data-testid="d2" active={dynamic === "b"} onclick={() => (dynamic = "b")} style={wide ? "min-width: 300px" : ""}>Two</TabItem>
    </TabBar>
  </div>

  <div data-testid="scroll" style="width: 300px">
    <TabBar>
      {#each many as t}
        <TabItem data-testid={t} active={scrolled === t} onclick={() => (scrolled = t)}>Tab number {t}</TabItem>
      {/each}
    </TabBar>
  </div>

  <div data-testid="wrap" style="width: 300px">
    <TabBar wrap>
      {#each wraps as t}
        <TabItem data-testid={t} active={wrapped === t} onclick={() => (wrapped = t)}>Tab {t}</TabItem>
      {/each}
    </TabBar>
  </div>

  <div data-testid="none">
    <TabBar>
      <TabItem data-testid="n1" active={none} onclick={() => (none = !none)}>Toggle me</TabItem>
      <TabItem>Never active</TabItem>
    </TabBar>
  </div>

  <div data-testid="rtl" dir="rtl" style="width: 300px">
    <TabBar>
      {#each many.slice(0, 6) as t, i}
        <TabItem data-testid={"r" + i} active={rtl === "r" + i} onclick={() => (rtl = "r" + i)}>Right tab {i}</TabItem>
      {/each}
    </TabBar>
  </div>

  <div data-testid="actions" style="width: 600px">
    <TabBar>
      <TabItem active>Only</TabItem>
      {#snippet actions()}<button data-testid="action">Act</button>{/snippet}
    </TabBar>
  </div>

  <button onclick={() => (show = !show)}>toggle unmount</button>
  {#if show}
    <div data-testid="unmount"><TabBar><TabItem active>Here</TabItem><TabItem>There</TabItem></TabBar></div>
  {/if}
</div>
