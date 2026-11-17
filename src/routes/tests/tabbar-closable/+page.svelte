<script lang="ts">
  /* Fixture for tests/tabbar-closable.spec.ts. */
  import TabBar from "$lib/layout/TabBar.svelte";
  import TabItem from "$lib/controls/TabItem.svelte";
  import ThemeStyle from "$lib/theme/ThemeStyle.svelte";
  import light from "$lib/vars/themes/light.css?raw";
  import dark from "$lib/vars/themes/dark.css?raw";
  import bootstrap from "$lib/vars/themes/bootstrap.css?raw";
  import forest from "$lib/vars/themes/forest.css?raw";
  import material from "$lib/vars/themes/material.css?raw";
  import quiet from "$lib/vars/themes/quiet.css?raw";
  import underlinedTabs from "$lib/vars/underlined-tabs.css?raw";
  import "$lib/vars/defaults.css";

  const themes: Record<string, string> = {
    default: "",
    light,
    dark,
    bootstrap,
    forest,
    material,
    quiet,
    underlined: underlinedTabs,
  };
  let theme = $state("default");
  let active = $state("a");
  let log = $state<string[]>([]);
  const names = ["a", "b", "c"];
  const long = Array.from({ length: 8 }, (_, i) => `Brandy Balls recipe number ${i + 1}`);
</script>

<ThemeStyle id="closable-theme" css={themes[theme]} />
<label>Theme
  <select aria-label="Theme" bind:value={theme}>
    {#each Object.keys(themes) as t}<option value={t}>{t}</option>{/each}
  </select>
</label>
<button onclick={() => (log = [])}>clear log</button>
<pre data-testid="log">{log.join(",")}</pre>

<div data-testid="bar" style="width: 600px">
  <TabBar>
    <TabItem
      active={active === "a"}
      onclick={() => {
        active = "a";
        log.push("click:a");
      }}
      onclose={() => log.push("close:a")}
      closeLabel="Close Brandy Balls">Brandy Balls</TabItem
    >
    <TabItem
      active={active === "b"}
      onclick={() => {
        active = "b";
        log.push("click:b");
      }}
      onclose={() => log.push("close:b")}>Second</TabItem
    >
    <TabItem
      active={active === "c"}
      data-testid="control"
      onclick={() => {
        active = "c";
        log.push("click:c");
      }}>Control</TabItem
    >
    <TabItem data-testid="control2" onclick={() => log.push("click:d")}>Plain</TabItem>
  </TabBar>
</div>

<div data-testid="scroll" style="width: 320px">
  <TabBar>
    {#each long as name, i}
      <TabItem active={i === 0} onclose={() => {}} closeLabel={`Close ${name}`}
        >{name}</TabItem
      >
    {/each}
  </TabBar>
</div>
