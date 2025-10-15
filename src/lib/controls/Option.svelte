<script>
  let { children, value, ...restProps } = $props();
</script>

<div {value} {...restProps}>
  {@render children()}
</div>
