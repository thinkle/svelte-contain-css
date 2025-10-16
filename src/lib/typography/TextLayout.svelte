<script lang="ts">
  interface Props {
    id?: string;
    children?: import("svelte").Snippet;
  }

  let { id = "", children }: Props = $props();
</script>

<div {id}>
  {@render children?.()}
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  div {
    @include typography-container-props(body, text);
    @include typography-props(body, text);
    width: var(--text-width, var(--body-width, 100%));
    margin-inline-start: auto;
    margin-inline-end: auto;
  }

  div :global(a) {
    color: var(
      --body-link-fg,
      var(--text-link-fg, var(--link-fg, currentColor))
    );
    background-color: var(
      --body-link-bg,
      var(--text-link-bg, var(--link-bg, transparent))
    );
    text-decoration: var(
      --body-link-text-decoration,
      var(--text-link-text-decoration, underline)
    );
    text-decoration-thickness: var(
      --body-link-text-decoration-thickness,
      var(--text-link-text-decoration-thickness, auto)
    );
    text-underline-offset: var(
      --body-link-underline-offset,
      var(--text-link-underline-offset, 0.2em)
    );
    transition:
      color 120ms ease,
      background-color 120ms ease;
    @include focusable();
  }

  div :global(a:hover),
  div :global(a:focus-visible) {
    color: var(
      --body-link-hover-fg,
      var(
        --text-link-hover-fg,
        var(--link-hover-fg, var(--link-fg, currentColor))
      )
    );
    background-color: var(
      --body-link-hover-bg,
      var(
        --text-link-hover-bg,
        var(--link-hover-bg, var(--link-bg, transparent))
      )
    );
  }

  div :global(code) {
    @include typography-props(code);
    text-wrap: nowrap;
  }
</style>
