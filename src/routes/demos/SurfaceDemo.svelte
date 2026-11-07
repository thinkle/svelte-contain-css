<script lang="ts">
  import Container from "$lib/layout/Container.svelte";
  import Surface, { type SurfaceTier } from "$lib/layout/Surface.svelte";
  import TabBar from "$lib/layout/TabBar.svelte";
  import Text from "$lib/typography/Text.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";

  const tiers: SurfaceTier[] = [
    "background",
    "surface",
    "surface-raised",
    "surface-sunken",
    "surface-overlay",
    "inverse",
  ];
  let tier = $state<SurfaceTier>("surface-sunken");
  let colorRole = $state("primary");
</script>

<Container>
  <TextLayout>
    <h2>Surface</h2>
    <p>
      A plain element that paints its own background must declare it. CSS
      can't read an ancestor's painted color, so tabs, text tones, headings
      and fields inside a hand-painted div resolve against whatever is
      <em>outside</em> it. <code>Surface</code> paints a tier or role and
      tells everything inside, and does nothing else: no padding, margin,
      border, overflow or containment, so it can replace the div without
      changing its box or breaking a sticky table inside.
    </p>
  </TextLayout>

  <DemoWithCode
    code={`<!-- Your layout stays yours: Surface adds only the colors. -->
<Surface tier="${tier}" style="padding: 1rem">
  <TabBar items={["Roster", "Grades", "Notes"]} />
  <p>Tabs, <Text muted>tones</Text> and headings follow the tier.</p>
</Surface>`}
  >
    {#snippet heading()}
      <h3>Paint a tier</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        Pick the tier the element is. Themes recolor tiers, so it follows
        every theme.
      </p>
    {/snippet}
    {#snippet inputArea()}
      <label
        >Tier
        <select bind:value={tier}>
          {#each tiers as t}<option value={t}>{t}</option>{/each}
        </select>
      </label>
    {/snippet}
    <Surface {tier} style="padding: 1rem">
      <TabBar items={["Roster", "Grades", "Notes"]} active="Roster" />
      <p>Tabs, <Text muted>tones</Text> and headings follow the tier.</p>
    </Surface>
  </DemoWithCode>

  <DemoWithCode
    code={`<Surface colorRole="${colorRole}" style="padding: 1rem">
  <h4>On ${colorRole}</h4>
  <p>A role, built in or defined by your app.</p>
</Surface>`}
  >
    {#snippet heading()}
      <h3>Paint a role</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        <code>colorRole</code> takes a built-in role or one your app defines
        with <code>--&lt;role&gt;-bg</code> / <code>--&lt;role&gt;-fg</code>.
        It isn't called <code>role</code>: that's the ARIA attribute, which
        still forwards.
      </p>
    {/snippet}
    {#snippet inputArea()}
      <label
        >Role
        <select bind:value={colorRole}>
          {#each ["primary", "secondary", "info", "success", "warning", "danger"] as r}
            <option value={r}>{r}</option>
          {/each}
        </select>
      </label>
    {/snippet}
    <Surface {colorRole} style="padding: 1rem">
      <h4>On {colorRole}</h4>
      <p>A role, built in or defined by your app.</p>
    </Surface>
  </DemoWithCode>
</Container>
