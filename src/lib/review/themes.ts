import bootstrap from "$lib/vars/themes/bootstrap.css?raw";
import dark from "$lib/vars/themes/dark.css?raw";
import light from "$lib/vars/themes/light.css?raw";
import material from "$lib/vars/themes/material.css?raw";
import forest from "$lib/vars/themes/forest.css?raw";
import canyon from "$lib/vars/themes/canyon.css?raw";
import purple from "$lib/vars/themes/purple.css?raw";
import retro from "$lib/vars/themes/retro.css?raw";
import { combinedThemes } from "$lib/theme/combinedThemes";

const lightordark = `@media (prefers-color-scheme: light) {\n${light}\n}\n@media (prefers-color-scheme: dark) {\n${dark}\n}`;

export const reviewThemes = {
  bootstrap: { label: "Bootstrap", css: bootstrap },
  dark: { label: "Dark", css: dark },
  light: { label: "Light", css: light },
  "light-or-dark": { label: "System (light/dark)", css: lightordark },
  material: { label: "Material", css: material },
  purple: { label: "Purple", css: purple },
  forest: { label: "Forest", css: forest },
  canyon: { label: "Canyon", css: canyon },
  retro: { label: "Retro", css: retro },
  "canyon-modern-serif-fancy": {
    label: combinedThemes["canyon-modern-serif-fancy"].name,
    css: combinedThemes["canyon-modern-serif-fancy"].css,
  },
  "forest-editorial-rounded": {
    label: combinedThemes["forest-editorial-rounded"].name,
    css: combinedThemes["forest-editorial-rounded"].css,
  },
  "dark-ibm-layered": {
    label: combinedThemes["dark-ibm-layered"].name,
    css: combinedThemes["dark-ibm-layered"].css,
  },
  "light-airy-solid": {
    label: combinedThemes["light-airy-solid"].name,
    css: combinedThemes["light-airy-solid"].css,
  },
} as const;

export type ReviewThemeName = keyof typeof reviewThemes;

export const reviewThemeNames = Object.keys(reviewThemes) as ReviewThemeName[];

export const reviewThemeLabels = Object.fromEntries(
  reviewThemeNames.map((theme) => [theme, reviewThemes[theme].label]),
) as Record<ReviewThemeName, string>;

export function getReviewTheme(theme: ReviewThemeName) {
  return reviewThemes[theme];
}

export function isReviewThemeName(theme: string): theme is ReviewThemeName {
  return theme in reviewThemes;
}

export const reviewThemeGroups = [
  {
    label: "Color palettes",
    description: "Color schemes using the library's default typography and geometry.",
    themes: ["light-or-dark", "light", "dark", "purple", "forest", "canyon"],
  },
  {
    label: "Complete themes",
    description: "Coordinated colors, controls, typography, and geometry.",
    themes: ["bootstrap", "material", "retro"],
  },
  {
    label: "Combinations",
    description: "Named recipes combining a palette, typography, and optional add-ons.",
    themes: ["canyon-modern-serif-fancy", "forest-editorial-rounded", "dark-ibm-layered", "light-airy-solid"],
  },
] as const satisfies readonly { label: string; description: string; themes: readonly ReviewThemeName[] }[];

export const reviewThemeDescriptions: Record<ReviewThemeName, string> = {
  "light-or-dark": "Light or dark colors following your system preference.",
  light: "Cool light surfaces with indigo accents.",
  dark: "Dark blue-grey surfaces with lavender accents.",
  purple: "Pale purple surfaces and a saturated purple primary color.",
  forest: "Light neutral surfaces with green accents.",
  canyon: "Warm cream surfaces with clay accents.",
  bootstrap: "Bootstrap-inspired colors, typography, controls, and spacing.",
  material: "Material-inspired colors, typography, controls, and depth.",
  retro: "Classic desktop colors, typography, borders, and controls.",
  "canyon-modern-serif-fancy": "Canyon colors, Modern Serif typography, Editorial Headings, and decorative paragraph first lines and letters.",
  "forest-editorial-rounded": "Forest colors, Editorial Serif typography, Restrained Headings, and rounded corners.",
  "dark-ibm-layered": "Dark colors, IBM Plex typography, Expressive Headings, and layered surface depth.",
  "light-airy-solid": "Light colors, Airy typography, and filled heading treatments.",
};
