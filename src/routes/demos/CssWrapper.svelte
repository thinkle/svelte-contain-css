<script lang="ts">
  export let variables: {
    [key: string]: string;
  } = {};

  const getStyle = (vars: { [key: string]: string }) => {
    const style = Object.entries(vars)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n");
    return style;
  };
</script>

<div style={getStyle(variables)}>
  <slot />
</div>

<style>
  div {
    display: contents;
  }
</style>
