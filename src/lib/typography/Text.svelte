<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { injectVars } from "$lib/util";

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & {
    children?: Snippet;
    primary?: boolean;
    secondary?: boolean;
    info?: boolean;
    success?: boolean;
    warning?: boolean;
    danger?: boolean;
    muted?: boolean;
    color?: string;
    bold?: boolean;
    italic?: boolean;
    /** Percentage of the target color, e.g. "25%". */
    amount?: string;
    [variable: `--${string}`]: string | number | undefined;
  };

  let {
    children,
    primary = false,
    secondary = false,
    info = false,
    success = false,
    warning = false,
    danger = false,
    muted = false,
    bold = false,
    italic = false,
    color,
    amount,
    style: inlineStyle,
    ...restProps
  }: Props = $props();

  // Choose one tone deterministically; explicit color takes precedence.
  const tone = $derived(
    danger
      ? "danger"
      : warning
        ? "warning"
        : success
          ? "success"
          : info
            ? "info"
            : primary
              ? "primary"
              : secondary
                ? "secondary"
                : muted
                  ? "muted"
                  : null,
  );
  const target = $derived(color ?? (tone ? `var(--${tone}-color)` : null));
  const share = $derived(
    amount ??
      (tone && color === undefined
        ? `var(--${tone}-text-amount, var(--text-amount, 50%))`
        : "var(--text-amount, 50%)"),
  );
  const foreground = $derived.by(() => {
    if (!target) return "inherit";
    // currentColor in the color property means the inherited foreground.
    const mixed = `color-mix(in srgb, currentColor, ${target} ${share})`;
    if (color !== undefined || amount !== undefined) return mixed;
    return `var(--${tone}-text-fg, ${mixed})`;
  });
  const elementProps = $derived(
    Object.fromEntries(
      Object.entries(restProps).filter(([key]) => !key.startsWith("--")),
    ),
  );
  const style = $derived(
    injectVars(restProps, "text", []) + (inlineStyle ?? ""),
  );
</script>

<span
  {...elementProps}
  {style}
  style:color={foreground}
  class:bold
  class:italic
>
  {@render children?.()}
</span>

<style>
  .bold {
    font-weight: bold;
  }
  .italic {
    font-style: italic;
  }
</style>
