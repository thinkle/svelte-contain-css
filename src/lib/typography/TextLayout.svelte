<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { ContainProps, MarginStyleProps } from "$lib/types";
  import { elementProps } from "$lib/util";

  type Props = ContainProps<
    HTMLAttributes<HTMLDivElement>,
    {
      id?: string;
      children?: import("svelte").Snippet;
    },
    MarginStyleProps
  >;

  let { id = "", children, class: className, ...restProps }: Props = $props();

  const el = $derived(
    elementProps(restProps, "text-layout", ["marginBlock", "marginInline"]),
  );
</script>

<div {id} class={className} {...el}>
  {@render children?.()}
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;
  div {
    @include typography-container-props(body, text);
    @include typography-props(body, text);
    width: var(--text-width, var(--body-width, 100%));
    /* Not margin-props() (_box.scss): that defaults both axes to 0, but a
       TextLayout has always centred itself horizontally by default. Same
       var-with-fallbacks() shape as everywhere else, just inline defaults to
       auto instead of 0 -- marginBlock is new and does default to 0, same as
       every other component. */
    margin-inline: var-with-fallbacks(--margin-inline, text-layout, auto);
    margin-block: var-with-fallbacks(--margin-block, text-layout, 0);
    padding-inline: var(--text-padding, var(--padding));
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
