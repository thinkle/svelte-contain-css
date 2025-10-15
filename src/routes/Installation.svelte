<script lang="ts">
  import Code from "$lib/misc/Code.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";
  interface Props {
    id?: string;
  }

  let { id = "Installation" }: Props = $props();
</script>

<TextLayout {id}>
  <h1>Installation</h1>
  <p>Start by installing our library:</p>
  <Code
    language="none"
    code={`npm install contain-
  css-svelte`}
  />
  <p>
    Once you have that, you will need to make sure to import our styles
    somewhere in your project, such as at the top level, in order to define the
    CSS variables we depend on. You can also select a theme or set of themes if
    you like.
  </p>
  <Code
    language="js"
    code={`
import "contain-css-svelte/vars/defaults.css";
/* Optional color theme */
import "contain-css-svelte/themes/purple.css";
/* Optional typography theme */
import "contain-css-svelte/themes/typography-airy.css";
`}
  />
  <p>
    Now you're ready to import and use our components anywhere you like in the
    project.
  </p>
  <Code
    language="html"
    code={`
<script>
  import { Button } from "contain-css-svelte";
</script>
<Button>Hello World</Button> 
`}
  />
  <p>
    We use CSS variables wherever possible, so if you want to change up things
    like colors at a component level, you can simply inject the appropriate CSS
    variables into the component's style tag.
  </p>
</TextLayout>
