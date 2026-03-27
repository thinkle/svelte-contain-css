import light from "$lib/vars/themes/light.css?raw";
import dark from "$lib/vars/themes/dark.css?raw";
import forest from "$lib/vars/themes/forest.css?raw";
import canyon from "$lib/vars/themes/canyon.css?raw";
import airy from "$lib/vars/themes/typography-airy.css?raw";
import ibm from "$lib/vars/themes/typography-carbon.css?raw";
import editorial from "$lib/vars/themes/typography-editorial.css?raw";
import modernSerif from "$lib/vars/themes/typography-modern-serif.css?raw";
import softCorners from "$lib/vars/soft-corners.css?raw";
import layered from "$lib/vars/layered.css?raw";
import solidHeadings from "$lib/vars/solid-headings.css?raw";
import fancyParagraphs from "$lib/vars/fancy-paragraphs.css?raw";

export type CombinedThemeEntry = {
  name: string;
  css: string;
  file: string;
};

export const combinedThemes = {
  "canyon-modern-serif-fancy": {
    name: "Canyon + Modern Serif + Fancy Paragraphs",
    css: [canyon, modernSerif, fancyParagraphs].join("\n"),
    file: "themes/canyon-modern-serif-fancy.css",
  },
  "forest-editorial-rounded": {
    name: "Forest + Editorial Serif + Rounded Corners",
    css: [forest, editorial, softCorners].join("\n"),
    file: "themes/forest-editorial-rounded.css",
  },
  "dark-ibm-layered": {
    name: "Dark + IBM Plex + Layered Depth",
    css: [dark, ibm, layered].join("\n"),
    file: "themes/dark-ibm-layered.css",
  },
  "light-airy-solid": {
    name: "Light + Airy + Solid Headings",
    css: [light, airy, solidHeadings].join("\n"),
    file: "themes/light-airy-solid.css",
  },
} as const satisfies Record<string, CombinedThemeEntry>;

export type CombinedThemeName = keyof typeof combinedThemes;

export const combinedThemeEntries = (
  Object.entries(combinedThemes) as [CombinedThemeName, CombinedThemeEntry][]
).map(([slug, theme]) => ({
  slug,
  ...theme,
}));
