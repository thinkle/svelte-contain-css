<script lang="ts">
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import CircleButton from "$lib/controls/CircleButton.svelte";
  import Table from "$lib/layout/Table.svelte";
  import Code from "$lib/misc/Code.svelte";

  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import { tableVars } from "./cssVariableDefs";
  let widthModifier = $state(0);

  /* Wide-table demo: a roster whose column set grows on demand, so the
     table starts out fitting and then has to scroll sideways. */
  let extraColumns = $state(6);
  const rosterFields = $derived(
    Array.from({ length: extraColumns }, (_, i) => `Week ${i + 1}`),
  );
  const roster = [
    "Ada Lovelace",
    "Grace Hopper",
    "Alan Turing",
    "Katherine Johnson",
    "Edsger Dijkstra",
    "Barbara Liskov",
    "Donald Knuth",
    "Margaret Hamilton",
    "John von Neumann",
    "Radia Perlman",
    "Ken Thompson",
    "Frances Allen",
  ];
  let frozen = $state(1);
</script>

<CssVariableDemo variables={tableVars}>
  <TextLayout>
    <h2>Table</h2>
    <p>For a basic table, we have simple styling.</p>
    <p>
      The code is as simple as replacing <code>&lt;table&gt;</code> with
      <code>&lt;Table&gt;</code>
    </p>
  </TextLayout>
  <DemoWithCode
    defaultTab="split"
    code={`    
        <Table>        
            <tr>
              <th>Fruits</th> 
              <th>Colors</th>
            </tr>
            <tr>
              <td>Apple</td> 
              <td>Red</td>
            </tr>
            <tr>
              <td>Banana</td> 
              <td>Yellow</td>
            </tr>
            <tr>
              <td>Orange</td> 
              <td>Orange</td>
            </tr>        
        </Table>
        `}
  >
    {#snippet header()}
      <h3>A basic table</h3>
    {/snippet}
    <Table>
      <tr><th>Fruits</th> <th>Colors</th></tr>
      <tr><td>Apple</td> <td>Red</td></tr>
      <tr><td>Banana</td> <td>Yellow</td></tr>
      <tr><td>Orange</td> <td>Orange</td></tr>
    </Table>
  </DemoWithCode>
  <TextLayout>
    <p>
      Sticky headers use the named <code>thead</code> and <code>tbody</code>
      snippets so Contain can create two separate tables for rendering and
      stacking. Each snippet must include its semantic row-group element:
      <code>thead()</code> renders <code>&lt;thead&gt;</code>, and
      <code>tbody()</code> renders <code>&lt;tbody&gt;</code>. Do not pass bare
      <code>&lt;tr&gt;</code> elements to either snippet.
    </p>
    <Code
      code={`
  <Table sticky>
    {#snippet thead()}
      <thead>
        <!-- your sticky content here-->
      </thead>
    {/snippet}
    {#snippet tbody()}
      <tbody>
        <!-- your scrollable content here-->
      </tbody>
    {/snippet}
  </Table>
  `}
    />
    <p>
      Click plus (<CircleButton onclick={() => (widthModifier += 1)}
        >+</CircleButton
      >) to change header size and watch scrolly table resize properly
    </p>
    <Table sticky>
      {#snippet thead()}
        <thead>
          <tr><th>Team</th><th>Wins</th><th>Losses</th></tr>
        </thead>
      {/snippet}
      {#snippet tbody()}
        <tbody>
          <tr
            ><th
              >Yankees{#each Array(widthModifier) as _}~{/each}
            </th><td>100</td><td>62</td></tr
          >
          <tr><th>Red Sox</th><td>92</td><td>70</td></tr>
          <tr><th>Blue Jays</th><td>91</td><td>71</td></tr>
          <tr><th>Orioles</th><td>52</td><td>110</td></tr>

          <tr><th>Yankees</th><td>100</td><td>62</td></tr>
          <tr><th>Red Sox</th><td>92</td><td>70</td></tr>
          <tr><th>Blue Jays</th><td>91</td><td>71</td></tr>
          <tr><th>Orioles</th><td>52</td><td>110</td></tr>

          <tr><th>Yankees</th><td>100</td><td>62</td></tr>
          <tr><th>Red Sox</th><td>92</td><td>70</td></tr>
          <tr><th>Blue Jays</th><td>91</td><td>71</td></tr>
          <tr><th>Orioles</th><td>52</td><td>110</td></tr>

          <tr><th>Yankees</th><td>100</td><td>62</td></tr>
          <tr><th>Red Sox</th><td>92</td><td>70</td></tr>
          <tr><th>Blue Jays</th><td>91</td><td>71</td></tr>
          <tr><th>Orioles</th><td>52</td><td>110</td></tr>

          <tr><th>Yankees</th><td>100</td><td>62</td></tr>
          <tr><th>Red Sox</th><td>92</td><td>70</td></tr>
          <tr><th>Blue Jays</th><td>91</td><td>71</td></tr>
          <tr><th>Orioles</th><td>52</td><td>110</td></tr>

          <tr><th>Yankees</th><td>100</td><td>62</td></tr>
          <tr><th>Red Sox</th><td>92</td><td>70</td></tr>
          <tr><th>Blue Jays</th><td>91</td><td>71</td></tr>
          <tr><th>Orioles</th><td>52</td><td>110</td></tr>

          <tr><th>Yankees</th><td>100</td><td>62</td></tr>
          <tr><th>Red Sox</th><td>92</td><td>70</td></tr>
          <tr><th>Blue Jays</th><td>91</td><td>71</td></tr>
          <tr><th>Orioles</th><td>52</td><td>110</td></tr>

          <tr><th>Yankees</th><td>100</td><td>62</td></tr>
          <tr><th>Red Sox</th><td>92</td><td>70</td></tr>
          <tr><th>Blue Jays</th><td>91</td><td>71</td></tr>
          <tr><th>Orioles</th><td>52</td><td>110</td></tr>
        </tbody>
      {/snippet}
    </Table>
  </TextLayout>

  <DemoWithCode
    code={`
<Table sticky stickyColumns={1}>
  {#snippet thead()}
    <thead>
      <tr>
        <th>Student</th>
        {#each fields as field}<th>{field}</th>{/each}
      </tr>
    </thead>
  {/snippet}
  {#snippet tbody()}
    <tbody>
      {#each students as student}
        <tr>
          <th>{student.name}</th>
          {#each fields as field}<td>{student[field]}</td>{/each}
        </tr>
      {/each}
    </tbody>
  {/snippet}
</Table>
      `}
  >
    {#snippet heading()}
      <h3>Wide tables: horizontal scroll and frozen columns</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        A sticky table too wide for its column scrolls sideways in its own
        strip; the header scrolls with it and still sticks on the way down.
        It keeps its natural width rather than squeezing every column, with
        long cells wrapping at <code>--table-cell-max-width</code> (20em). Set
        <code>--table-width: auto</code> to fit the container instead.
      </p>
      <p>
        <code>stickyColumns={"{n}"}</code> freezes the first <em>n</em> columns,
        spreadsheet-style, in the header and the body alike.
      </p>
      <p>
        <Button onclick={() => (extraColumns += 6)}>Add columns</Button>
        <Button onclick={() => (frozen = (frozen + 1) % 3)}
          >Frozen columns: {frozen}</Button
        >
      </p>
    {/snippet}
    <!-- The box stands in for a page's scrolling content panel, so the
         header has something to stick to inside the demo. -->
    <div class="demo-scroller">
      <Table sticky stickyColumns={frozen}>
        {#snippet thead()}
          <thead>
            <tr>
              <th>Student</th>
              <th>Advisor</th>
              {#each rosterFields as field}<th>{field}</th>{/each}
            </tr>
          </thead>
        {/snippet}
        {#snippet tbody()}
          <tbody>
            {#each roster as name, r}
              <tr>
                <th>{name}</th>
                <td>Room {101 + (r % 4)}</td>
                {#each rosterFields as _, i}
                  <td>{60 + ((r * 17 + i * 11) % 41)}%</td>
                {/each}
              </tr>
            {/each}
          </tbody>
        {/snippet}
      </Table>
    </div>
  </DemoWithCode>

  <DemoWithCode
    defaultTab="split"
    code={`
<Table>
  <thead>
    <tr><th>Team</th><th>Wins</th><th>Losses</th></tr>
  </thead>
  <tbody>
    <tr tabindex="0" onclick={handleRowClick}>  
      <th>Yankees</th><td>100</td><td>62</td>
    </tr>
    <tr tabindex="0" onclick={handleRowClick}>
      <th>Red Sox</th><td>92</td><td>70</td>
    </tr>
    ...
  </tbody>
</Table>
      `}
  >
    {#snippet heading()}
      <h3>Clickable Rows</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        Add <code>tabindex="0"</code> to rows to make them keyboard-accessible and
        trigger hover/focus affordances. This works with any table structure.
      </p>
      <p><em>Hover or focus (Tab key) on rows to see the affordances.</em></p>
    {/snippet}
    <Table>
      <thead>
        <tr><th>Team</th><th>Wins</th><th>Losses</th></tr>
      </thead>
      <tbody>
        <tr tabindex="0">
          <th>Yankees</th><td>100</td><td>62</td>
        </tr>
        <tr tabindex="0">
          <th>Red Sox</th><td>92</td><td>70</td>
        </tr>
        <tr tabindex="0">
          <th>Blue Jays</th><td>91</td><td>71</td>
        </tr>
        <tr tabindex="0">
          <th>Orioles</th><td>52</td><td>110</td>
        </tr>
      </tbody>
    </Table>
  </DemoWithCode>
  <DemoWithCode
    code={`
<Table>
  <thead>
    <tr><th>Team</th><th>Wins</th><th>Losses</th></tr>
  </thead>
  <tbody>
    <tr>
      <th>Yankees</th>
      <td tabindex="0" onclick={handleCellClick}>100</td>
      <td tabindex="0" onclick={handleCellClick}>62</td>
    </tr>
    ...
  </tbody>
</Table>
      `}
  >
    {#snippet heading()}
      <h3>Clickable Cells</h3>
    {/snippet}
    {#snippet blurb()}
      <p>
        Add <code>tabindex="0"</code> to individual cells to make them clickable.
        Useful for data grids where specific cells trigger actions.
      </p>
      <p><em>Hover or focus on cells to see the affordances.</em></p>
    {/snippet}

    <Table>
      <thead>
        <tr><th>Team</th><th>Wins</th><th>Losses</th></tr>
      </thead>
      <tbody>
        <tr>
          <th>Yankees</th>
          <td tabindex="0">100</td>
          <td tabindex="0">62</td>
        </tr>
        <tr>
          <th>Red Sox</th>
          <td tabindex="0">92</td>
          <td tabindex="0">70</td>
        </tr>
        <tr>
          <th>Blue Jays</th>
          <td tabindex="0">91</td>
          <td tabindex="0">71</td>
        </tr>
        <tr>
          <th>Orioles</th>
          <td tabindex="0">52</td>
          <td tabindex="0">110</td>
        </tr>
      </tbody>
    </Table>
  </DemoWithCode>
</CssVariableDemo>

<style>
  .demo-scroller {
    max-height: 360px;
    overflow-y: auto;
  }
</style>
