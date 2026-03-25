import purple from "$lib/vars/themes/purple.css?raw";
import forest from "$lib/vars/themes/forest.css?raw";
import canyon from "$lib/vars/themes/canyon.css?raw";
import browser from "$lib/vars/themes/typography-browser.css?raw";
import airy from "$lib/vars/themes/typography-airy.css?raw";
import ibm from "$lib/vars/themes/typography-carbon.css?raw";
import editorial from "$lib/vars/themes/typography-editorial.css?raw";
import modernSerif from "$lib/vars/themes/typography-modern-serif.css?raw";
import light from "$lib/vars/themes/light.css?raw";
import dark from "$lib/vars/themes/dark.css?raw";
import material from "$lib/vars/themes/material.css?raw";
import retro from "$lib/vars/themes/retro.css?raw";
import bootstrap from "$lib/vars/themes/bootstrap.css?raw";
import responsiveTypography from "$lib/vars/responsive-typography.css?raw";
import boxy from "$lib/vars/boxy.css?raw";
import softCorners from "$lib/vars/soft-corners.css?raw";
import flat from "$lib/vars/flat.css?raw";
import layered from "$lib/vars/layered.css?raw";
import solidHeadings from "$lib/vars/solid-headings.css?raw";
import fancyParagraphs from "$lib/vars/fancy-paragraphs.css?raw";

// lightordark.css uses @import url() which won't resolve when injected at
// runtime — build it inline from the raw light/dark sources instead.
const lightordark = `@media (prefers-color-scheme: light) {\n${light}\n}\n@media (prefers-color-scheme: dark) {\n${dark}\n}`;

export type ThemeEntry = { name: string; css: string; file: string };

// Complete themes — define color, borders, typography themselves.
// When one of these is active, color + typography pickers are hidden.
export const fullThemes: ThemeEntry[] = [
  { name: "None", css: "", file: "" },
  { name: "Bootstrap", css: bootstrap, file: "themes/bootstrap.css" },
  { name: "Material", css: material, file: "themes/material.css" },
  { name: "Retro", css: retro, file: "themes/retro.css" },
];

export const colorThemes: ThemeEntry[] = [
  { name: "Light or Dark", css: lightordark, file: "themes/lightordark.css" },
  { name: "Light", css: light, file: "themes/light.css" },
  { name: "Dark", css: dark, file: "themes/dark.css" },
  { name: "Purple", css: purple, file: "themes/purple.css" },
  { name: "Forest", css: forest, file: "themes/forest.css" },
  { name: "Canyon", css: canyon, file: "themes/canyon.css" },
  { name: "Defaults", css: "", file: "" },
];

export const typographyThemes: ThemeEntry[] = [
  { name: "Airy", css: airy, file: "themes/typography-airy.css" },
  { name: "Browser Defaults", css: browser, file: "themes/typography-browser.css" },
  { name: "IBM Plex", css: ibm, file: "themes/typography-carbon.css" },
  { name: "Editorial Serif", css: editorial, file: "themes/typography-editorial.css" },
  { name: "Modern Serif", css: modernSerif, file: "themes/typography-modern-serif.css" },
  { name: "Defaults", css: "", file: "" },
];

export const extraThemes: ThemeEntry[] = [
  { name: "Responsive Typography", css: responsiveTypography, file: "responsive-typography.css" },
  { name: "Solid Headings", css: solidHeadings, file: "solid-headings.css" },
  { name: "Soft Corners", css: softCorners, file: "soft-corners.css" },
  { name: "Sharp Edges", css: boxy, file: "boxy.css" },
  { name: "Flat Surfaces", css: flat, file: "flat.css" },
  { name: "Layered Depth", css: layered, file: "layered.css" },
  { name: "Fancy Paragraphs", css: fancyParagraphs, file: "fancy-paragraphs.css" },
];
