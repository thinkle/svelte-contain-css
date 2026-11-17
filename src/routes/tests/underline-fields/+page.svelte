<script lang="ts">
  /* Fixture for tests/underline-fields.spec.ts.
     ?preset=off loads no preset (the control). */
  import { page } from "$app/state";
  import { Input, TextArea, Select, Option } from "$lib";
  import ThemeStyle from "$lib/theme/ThemeStyle.svelte";
  import underlineFields from "$lib/vars/underline-fields.css?raw";
  import "$lib/vars/defaults.css";
  const preset = page.url.searchParams.get("preset") !== "off";
  const dur = page.url.searchParams.get("dur") ?? "1000ms linear";
</script>

{#if preset}<ThemeStyle id="underline-preset" css={underlineFields} />{/if}

<div style="width: 400px; --field-focus-underline-transition: {dur}">
  <p><Input data-testid="input" value="text" /></p>
  <p><TextArea data-testid="textarea" value="more text" /></p>
  <p><Select data-testid="select" value="One"><Option value="One">One</Option><Option value="Two">Two</Option></Select></p>
  <p style="--field-focus-underline-color: rgb(255, 0, 128); --field-focus-underline-origin: 0%;">
    <Input data-testid="colored" value="coloured" />
  </p>
  <p><input type="checkbox" data-testid="check" /></p>
</div>
