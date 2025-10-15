<script lang="ts">
  interface Props {
    variables?: {
    [key: string]: string;
  };
    children?: import('svelte').Snippet;
  }

  let { variables = {}, children }: Props = $props();

  const getStyle = (vars: { [key: string]: string }) => {
    const style = Object.entries(vars)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n");
    return style;
  };
</script>

<div style={getStyle(variables)}>
  {@render children?.()}
</div>

<style>
  div {
    display: contents;
  }
</style>
