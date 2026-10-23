import solid from "$lib/vars/solid-headings.css?raw";
import editorial from "$lib/vars/editorial-headings.css?raw";
import restrained from "$lib/vars/restrained-headings.css?raw";
import expressive from "$lib/vars/expressive-headings.css?raw";

export type SurfaceId =
  | "card"
  | "dark"
  | "primary"
  | "warning"
  | "remapped"
  | "nested";

type Vars = Record<`--${string}`, string>;

/* What a theme author has to add on each colored surface to keep a preset's
   headings good there. They are ordinary --vars on the surface; nothing here
   is specimen-only API. Written with tokens, so one recipe serves every
   color theme. */
const onColor: Vars = {
  // Heading tints were chosen for the page; on a saturated surface they
  // drift toward its background. Headings take the surface's own fg.
  "--heading-tint-scale": "0",
  // Text tones likewise nudge the surface fg instead of repainting it.
  "--text-amount": "30%",
};
const onPrimary: Vars = onColor;
const onWarning: Vars = {
  ...onColor,
  // Warning text on a warning surface is just the surface's text.
  "--warning-text-fg-override": "currentColor",
};

export const headingPresets: Record<
  string,
  { label: string; css: string; recipes: Partial<Record<SurfaceId, Vars>> }
> = {
  default: {
    label: "Theme default",
    css: "",
    recipes: {
      primary: onPrimary,
      warning: onWarning,
      // Small h5/h6 need 4.5:1; the darkest surface needs a lighter touch.
      remapped: { "--heading-tint-scale": "0.75" },
    },
  },
  restrained: {
    label: "Restrained",
    css: restrained,
    recipes: { primary: onPrimary, warning: onWarning },
  },
  editorial: {
    label: "Editorial",
    css: editorial,
    recipes: {
      primary: {
        ...onPrimary,
        // The filled h1 inverts, so the block still reads as a block, and
        // the h2's rule takes the text color.
        "--heading-1-bg": "var(--primary-fg)",
        "--heading-1-fg": "var(--primary-bg)",
        "--heading-2-border-color": "currentColor",
      },
      warning: {
        ...onWarning,
        "--heading-2-border-color": "currentColor",
      },
    },
  },
  expressive: {
    label: "Expressive",
    css: expressive,
    recipes: {
      primary: {
        ...onPrimary,
        "--heading-1-bg": "var(--primary-fg)",
        "--heading-1-fg": "var(--primary-bg)",
        "--heading-2-border-color": "currentColor",
      },
      warning: {
        ...onWarning,
        "--heading-2-border-color": "currentColor",
        "--heading-1-box-shadow": "5px 5px 0 var(--warning-fg)",
      },
      // Strong tints read on light pages; dark surfaces want less.
      dark: { "--heading-tint-scale": "0.6" },
      remapped: { "--heading-tint-scale": "0.6" },
      nested: { "--heading-tint-scale": "0.6" },
    },
  },
  solid: {
    label: "Solid",
    css: solid,
    recipes: {
      primary: {
        ...onPrimary,
        "--heading-major-bg": "var(--primary-fg)",
        "--heading-major-fg": "var(--primary-bg)",
      },
      warning: onWarning,
    },
  },
};

export type HeadingPresetName = keyof typeof headingPresets;

export function isHeadingPresetName(p: string): p is HeadingPresetName {
  return p in headingPresets;
}
