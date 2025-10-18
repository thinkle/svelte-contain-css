<script lang="ts">
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import Table from "$lib/layout/Table.svelte";
  import Code from "$lib/misc/Code.svelte";

  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
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
    <Code
      code={`
        <Table>        
            <tr><th>Fruits</th> <th>Colors</th></tr>
            <tr><td>Apple</td> <td>Red</td></tr>
            <tr><td>Banana</td> <td>Yellow</td></tr>
            <tr><td>Orange</td> <td>Orange</td></tr>        
        </Table>
        `}
    />
    <p>Which yields:</p>
    <Table>
      <tr><th>Fruits</th> <th>Colors</th></tr>
      <tr><td>Apple</td> <td>Red</td></tr>
      <tr><td>Banana</td> <td>Yellow</td></tr>
      <tr><td>Orange</td> <td>Orange</td></tr>
    </Table>
    <p>
      If you want sticky headers, it's best to use our separate slot for
      <code>&lt;thead&gt;</code> and <code>&lt;tbody&gt;</code> so we can create
      two separate tables for rendering/stacking purposes.
    </p>
    <Code
      code={`
  <Table sticky>
    <thead slot="thead">
      <!-- your sticky content here-->
    </thead>
    <tbody slot="tbody">
      <!-- your scrollable content here-->
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
    <p>
      Our Table element is a simple wrapper around an HTML Table that provides
      some basic styling and a few utility classes.
    </p>

    <Table>
      <tr><th>Team</th><th>Wins</th><th>Losses</th></tr>
      <tr><th>Yankees</th><td>100</td><td>62</td></tr>
      <tr><th>Red Sox</th><td>92</td><td>70</td></tr>
      <tr><th>Blue Jays</th><td>91</td><td>71</td></tr>
      <tr><th>Orioles</th><td>52</td><td>110</td></tr>
    </Table>

    <h3>Clickable Rows</h3>
    <p>
      Add <code>tabindex="0"</code> to rows to make them keyboard-accessible and
      trigger hover/focus affordances. This works with any table structure.
    </p>
    <Code
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
    />
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
    <p><em>Hover or focus (Tab key) on rows to see the affordances.</em></p>

    <h3>Clickable Cells</h3>
    <p>
      Add <code>tabindex="0"</code> to individual cells to make them clickable. Useful
      for data grids where specific cells trigger actions.
    </p>
    <Code
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
    />
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
    <p><em>Hover or focus on cells to see the affordances.</em></p>
  </TextLayout>
</CssVariableDemo>
