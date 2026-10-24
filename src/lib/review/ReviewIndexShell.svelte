<script lang="ts">
  import type { Snippet } from "svelte";
  import Container from "$lib/layout/Container.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Text from "$lib/typography/Text.svelte";

  interface Props {
    title: string;
    description: string;
    children?: Snippet;
  }

  let { title, description, children }: Props = $props();
</script>

<main>
  <Container height="auto">
    <Stack>
      <header>
        <Stack>
          <div><Text muted>Review Harness</Text></div>
          <h1>{title}</h1>
          <p>{description}</p>
        </Stack>
      </header>
      {@render children?.()}
    </Stack>
  </Container>
</main>
