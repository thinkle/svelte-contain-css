<script>
  import purple from "$lib/vars/themes/purple.css?raw";
  import browser from "$lib/vars/themes/typography-browser.css?raw";
  import airy from "$lib/vars/themes/typography-airy.css?raw";
  import ibm from "$lib/vars/themes/typography-carbon.css?raw";
  import lightordark from "$lib/vars/themes/lightordark.css?raw";
  import light from "$lib/vars/themes/light.css?raw";
  import dark from "$lib/vars/themes/dark.css?raw";

  let typographyThemes = [
    { name: "Defaults", css: "" },
    { name: "Browser Defaults", css: browser },
    { name: "Airy", css: airy },
    { name: "IBM Plex", css: ibm },
  ];

  let colorThemes = [
    { name: "Purple", css: purple },
    { name: "Light", css: light },
    { name: "Dark", css: dark },
    { name: "Light or Dark (Responsive)", css: lightordark },
    { name: "Defaults", css: "" },
  ];

  import RadioButton from "$lib/controls/RadioButton.svelte";
  import { onMount } from "svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  let typographyTheme = 0;
  let colorTheme = 0;
  let ready = false;
  onMount(() => {
    ready = true;
  });
  function injectStyle(uid, css) {
    if (!ready) return;
    let id = `${uid}-injected-style`;
    let existing = document.getElementById(id);
    if (!existing) {
      existing = document.createElement("style");
      existing.id = id;
      document.head.appendChild(existing);
    }
    existing.innerHTML = css;
  }

  $: injectStyle("typography", typographyThemes[typographyTheme].css);
  $: injectStyle("color", colorThemes[colorTheme].css);
</script>

<FormItem fullWidth>
  <span class="label">Typography</span>
  {#each typographyThemes as theme, i}
    <RadioButton bind:group={typographyTheme} value={i}
      >{theme.name}</RadioButton
    >
  {/each}
</FormItem>
<FormItem fullWidth>
  <span class="label">Color</span>
  {#each colorThemes as theme, i}
    <RadioButton bind:group={colorTheme} value={i}>{theme.name}</RadioButton>
  {/each}
</FormItem>
