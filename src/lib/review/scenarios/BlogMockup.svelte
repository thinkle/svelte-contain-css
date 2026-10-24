<script lang="ts">
  import Bar from "$lib/layout/Bar.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Sidebar from "$lib/layout/Sidebar.svelte";
  import MenuList from "$lib/layout/MenuList.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  import Stack from "$lib/layout/Stack.svelte";
</script>

<Page right data-audit-target="page">
  {#snippet header()}
    <Bar primary>
      <h1>The Tidy Shelf</h1>
      <Inline>
        <a href="#posts">Posts</a>
        <a href="#about">About</a>
      </Inline>
    </Bar>
  {/snippet}

  {#snippet sidebar()}
    <Sidebar right>
      <Stack split fill padding="var(--gap)">
        <div>
          <p>
            Writing about small spaces, big systems, and the quiet joy of a
            labeled drawer.
          </p>

          <h5>Recent posts</h5>
          <MenuList>
            <li><button>Closets that behave</button></li>
            <li><button>The case for pantry canisters</button></li>
            <li><button>Dividers, ranked</button></li>
          </MenuList>
        </div>
        <div>
          <h6>Filed under</h6>
          <Inline>
            <Tag>storage</Tag>
            <Tag>closets</Tag>
            <Tag>pantry</Tag>
          </Inline>
        </div>
      </Stack>
    </Sidebar>
  {/snippet}

  <TextLayout --text-layout-wide-width="var(--line-width)">
    <article id="posts">
      <h2>Why every drawer deserves a divider</h2>
      <div class="post-meta">
        <small>Posted on March 3 &middot; 6 minute read</small>
      </div>
      <p>
        Most clutter is not a lack of space. It is a lack of boundaries. A
        drawer without a divider is a negotiation that never ends, and the
        loudest item always wins.
      </p>

      <h3>Start with what you reach for</h3>
      <p>
        Before buying anything, empty the drawer and sort by how often each item
        is used. The things you touch daily earn the front row; everything else
        can queue politely behind them.
      </p>

      <h3>Choose dividers that adapt</h3>
      <p>
        Adjustable dividers let the drawer follow your life instead of the other
        way around. Tension-fit models are the easiest to rearrange, and they
        leave the wood unmarked.
      </p>

      <h4>A note on depth</h4>
      <p>
        Shallow drawers favour flat trays. Deep drawers want vertical
        organisation, where items stand like files in a cabinet.
      </p>

      <h3>Label what remains</h3>
      <p>
        A label turns a guess into a fact. Even a one-word tag saves the next
        person, usually you, from opening every drawer in the house.
      </p>

      <h2>Closing thoughts</h2>
      <p>
        Order is not about perfection. It is about making the next decision a
        little easier than the last one.
      </p>
    </article>
  </TextLayout>
</Page>
