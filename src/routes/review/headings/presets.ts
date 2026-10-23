import solid from "$lib/vars/solid-headings.css?raw";
import editorial from "$lib/vars/editorial-headings.css?raw";
import restrained from "$lib/vars/restrained-headings.css?raw";
import expressive from "$lib/vars/expressive-headings.css?raw";

export const headingPresets = {
  default: { label: "Theme default", css: "" },
  restrained: { label: "Restrained", css: restrained },
  editorial: { label: "Editorial", css: editorial },
  expressive: { label: "Expressive", css: expressive },
  solid: { label: "Solid", css: solid },
} as const;

export type HeadingPresetName = keyof typeof headingPresets;

export function isHeadingPresetName(p: string): p is HeadingPresetName {
  return p in headingPresets;
}
