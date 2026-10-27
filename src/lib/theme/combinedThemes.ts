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
import editorialHeadings from "$lib/vars/editorial-headings.css?raw";
import restrainedHeadings from "$lib/vars/restrained-headings.css?raw";
import expressiveHeadings from "$lib/vars/expressive-headings.css?raw";
import fancyParagraphs from "$lib/vars/fancy-paragraphs.css?raw";

export type CombinedThemeEntry = {
  name: string;
  css: string;
  file: string;
  cssWithoutHeadings: string;
  filesWithoutHeadings: string[];
  /* The picker choices this preset is made of, by file, so the Themes page
     can apply it as a starting point rather than a separate theme. */
  parts: { color: string; type: string; heading: string; extras: string[] };
};

// Keep typography first: its leading font @imports must precede declarations
// when these sources are composed into an injected stylesheet.
export const combinedThemes = {
  "canyon-modern-serif-fancy": {
    name: "Canyon + Modern Serif + Editorial Headings + Fancy Paragraphs",
    css: [modernSerif, canyon, editorialHeadings, fancyParagraphs].join("\n"),
    file: "themes/canyon-modern-serif-fancy.css",
    cssWithoutHeadings: [modernSerif, canyon, fancyParagraphs].join("\n"),
    filesWithoutHeadings: ["themes/typography-modern-serif.css", "themes/canyon.css", "fancy-paragraphs.css"],
    parts: { color: "themes/canyon.css", type: "themes/typography-modern-serif.css", heading: "editorial-headings.css", extras: ["fancy-paragraphs.css"] },
  },
  "forest-editorial-rounded": {
    name: "Forest + Editorial Serif + Restrained Headings + Rounded Corners",
    css: [editorial, forest, restrainedHeadings, softCorners].join("\n"),
    file: "themes/forest-editorial-rounded.css",
    cssWithoutHeadings: [editorial, forest, softCorners].join("\n"),
    filesWithoutHeadings: ["themes/typography-editorial.css", "themes/forest.css", "soft-corners.css"],
    parts: { color: "themes/forest.css", type: "themes/typography-editorial.css", heading: "restrained-headings.css", extras: ["soft-corners.css"] },
  },
  "dark-ibm-layered": {
    name: "Dark + IBM Plex + Expressive Headings + Layered Depth",
    css: [ibm, dark, expressiveHeadings, layered].join("\n"),
    file: "themes/dark-ibm-layered.css",
    cssWithoutHeadings: [ibm, dark, layered].join("\n"),
    filesWithoutHeadings: ["themes/typography-carbon.css", "themes/dark.css", "layered.css"],
    parts: { color: "themes/dark.css", type: "themes/typography-carbon.css", heading: "expressive-headings.css", extras: ["layered.css"] },
  },
  "light-airy-solid": {
    name: "Light + Airy + Solid Headings",
    css: [airy, light, solidHeadings].join("\n"),
    file: "themes/light-airy-solid.css",
    cssWithoutHeadings: [airy, light].join("\n"),
    filesWithoutHeadings: ["themes/typography-airy.css", "themes/light.css"],
    parts: { color: "themes/light.css", type: "themes/typography-airy.css", heading: "solid-headings.css", extras: [] },
  },
} as const satisfies Record<string, CombinedThemeEntry>;

export type CombinedThemeName = keyof typeof combinedThemes;

export const combinedThemeEntries = (
  Object.entries(combinedThemes) as [CombinedThemeName, CombinedThemeEntry][]
).map(([slug, theme]) => ({
  slug,
  ...theme,
}));
