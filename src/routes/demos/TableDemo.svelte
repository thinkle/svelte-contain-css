<script lang="ts">
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Table from "$lib/layout/Table.svelte";
  import Code from "$lib/misc/Code.svelte";

  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import DemoWithCode from "./DemoWithCode.svelte";
  import { tableVars } from "./cssVariableDefs";
  let widthModifier = $state(0);
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
    <Table>
      <tr><th>Fruits</th> <th>Colors</th></tr>
      <tr><td>Apple</td> <td>Red</td></tr>
      <tr><td>Banana</td> <td>Yellow</td></tr>
      <tr><td>Orange</td> <td>Orange</td></tr>
    </Table>
  </DemoWithCode>
  <TextLayout>
    <p>
      If you want sticky headers, it's best to use our separate slot for
      <code>&lt;thead&gt;</code> and <code>&lt;tbody&gt;</code> so we can create
      two separate tables for rendering/stacking purposes.
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
      Click plus (<MiniButton onclick={() => (widthModifier += 1)}>+</MiniButton
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
    defaultTab="split"
    code={`        
<Table>
  <tr><th>Team</th><th>Wins</th><th>Losses</th></tr>
  <tr tabindex="0" onclick={handleRowClick}>
    <th>Yankees</th><td>100</td><td>62</td>
  </tr>
  <tr tabindex="0" onclick={handleRowClick}>
    <th>Red Sox</th><td>92</td><td>70</td>
  </tr>
  ...
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
      <tr><th>Team</th><th>Wins</th><th>Losses</th></tr>
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
    </Table>
  </DemoWithCode>
  <DemoWithCode
    code={`
<Table>
  <tr><th>Team</th><th>Wins</th><th>Losses</th></tr>
  <tr>
    <th>Yankees</th>
    <td tabindex="0" onclick={handleCellClick}>100</td>
    <td tabindex="0" onclick={handleCellClick}>62</td>
  </tr>
  ...
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
      <tr><th>Team</th><th>Wins</th><th>Losses</th></tr>
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
    </Table>
  </DemoWithCode>
</CssVariableDemo>
