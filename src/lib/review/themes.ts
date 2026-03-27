import bootstrap from "$lib/vars/themes/bootstrap.css?raw";
import dark from "$lib/vars/themes/dark.css?raw";
import light from "$lib/vars/themes/light.css?raw";
import material from "$lib/vars/themes/material.css?raw";
import purple from "$lib/vars/themes/purple.css?raw";
import retro from "$lib/vars/themes/retro.css?raw";
import { combinedThemes } from "$lib/theme/combinedThemes";

const lightordark = `@media (prefers-color-scheme: light) {\n${light}\n}\n@media (prefers-color-scheme: dark) {\n${dark}\n}`;

export const reviewThemes = {
  bootstrap: { label: "Bootstrap", css: bootstrap },
  dark: { label: "Dark", css: dark },
  light: { label: "Light", css: light },
  "light-or-dark": { label: "Light Or Dark", css: lightordark },
  material: { label: "Material", css: material },
  purple: { label: "Purple", css: purple },
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
