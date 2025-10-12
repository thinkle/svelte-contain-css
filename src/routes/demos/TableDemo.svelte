<script lang="ts">
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Table from "$lib/layout/Table.svelte";
  import Code from "$lib/misc/Code.svelte";

  import TextLayout from "$lib/typography/TextLayout.svelte";
  import CssVariableDemo from "./CssVariableDemo.svelte";
  import { tableVars } from "./cssVariableDefs";
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
    <Table sticky>
      <thead slot="thead">
        <tr><th>Team</th><th>Wins</th><th>Losses</th></tr>
      </thead>
      <tbody slot="tbody">
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

        <tr><th>Yankees</th><td>100</td><td>62</td></tr>
        <tr><th>Red Sox</th><td>92</td><td>70</td></tr>
        <tr><th>Blue Jays</th><td>91</td><td>71</td></tr>
        <tr><th>Orioles</th><td>52</td><td>110</td></tr>
      </tbody>
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
  </TextLayout>
</CssVariableDemo>
