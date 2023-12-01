/* A convenient list of all the css variables (custom properties) in our library */

import { compile } from "svelte/compiler";

const plainProps = [
  "--border-color",
  "--border-radius",
  "--border-style",
  "--border-width",
  "--bold",
  "--font-size",
  "--font-size-small",
  "--first-heading-margin",
  "--white",
  "--black",
  "--text",
  "--text-size",
  "--transition",
  "--ui-font",
  "--greyed-out-filter",
  "stripe-bg",
  "--space",
  "--space-md",
  "--space-lg",
  "--space-xl",
  "--shadow-distance",
  "--shadow-color",
  "--shadow-blur",
  "icon-size",
];
const colorProps = [
  "--primary-bg",
  "--primary-fg",
  "--secondary-bg",
  "--secondary-fg",
  "--inactive-bg",
  "--inactive-fg",
];
const miscComponentProps = [
  "--dropdown-transition",
  "--column-gap",
  "--split-pane-width",
  "--split-pane-right-width",
  "--split-pane-left-width",
  "--sidebar-collapse",
  "--sidebar-expand",
  "--sidebar-transition",
  "--resizer-grab-width",
  "--resizer-grab-height",
  "--resizer-color",
  "--resizer-border",
  "--radio-button-space",
  "--mirror-sidebar-icons",
];
const flex = ["justify", "align", "gap"];
const color = ["fg", "bg"];
const typography = [
  "font-family",
  "text-transform",
  "font-weight",
  "font-size",
  "line-height",
  "letter-spacing",
  "text-decoration",
];
const ctypography = [...typography, "body-font-family"];
const box = [
  "padding",
  "border",
  "margin",
  "border-bottom",
  "border-top",
  "border-left",
  "border-right",
  "border-radius",
];
const size = [
  "width",
  "height",
  "min-width",
  "min-height",
  "max-width",
  "max-height",
];
const clickable = [
  "hover-filter",
  "hover-transform",
  "active-filter",
  "active-transform",
  "transition",
];
const scrollable = [
  "scrollbar-width",
  "scrollbar-height",
  "scrollbar-track-bg",
  "scrollbar-thumb-radius",
  "scrollbar-thumb-hover-bg",
  "scrollbar-thumb-bg",
];
const adaptiveSizes = [
  "width-small",
  "height-small",
  "width",
  "height",
  "width-large",
  "height-large",
];
const genericProps = Array.from(
  new Set([
    ...color,
    ...flex,
    ...ctypography,
    ...box,
    ...size,
    ...clickable,
    ...scrollable,
    ...adaptiveSizes,
  ])
).map((prop) => `--${prop}`);
export const cssProperties = Array.from(
  new Set([
    ...genericProps,
    ...miscComponentProps,
    ...plainProps,
    ...colorProps,
  ])
);

/* Now we get the list of component props... */

const components: {
  component: string;
  props: string[];
  propnames: string[];
}[] = [
  ...[
    "button",
    "mini-button",
    "menu-item",
    "dropdown-menu",
    "select",
    "checkbox",
    "checkbox-checked",
    "control",
    "ui",
    "tab-item",
  ].map((component) => ({
    component,
    props: [],
    propnames: [...box, ...color, ...clickable, ...typography, ...size],
  })),
  ...["container", "card", "page", "sidebar", "hero"].map((component) => ({
    component,
    props: [],
    propnames: [...box, ...color, ...ctypography, ...size, ...scrollable],
  })),
  ...["tab-bar", "bar", "form-item"].map((component) => ({
    component,
    props: [],
    propnames: [...box, ...color, ...typography, ...size, ...flex],
  })),

  ...["heading", "form-label", "form-item"].map((component) => ({
    component,
    props: [],
    propnames: [...typography, ...color, ...box],
  })),
  ...["code", "ui", "heading", "body"].map((component) => ({
    component,
    props: [],
    propnames: [...typography, ...color],
  })),
  {
    component: "tile",
    props: [],
    propnames: [
      ...color,
      ...box,
      ...typography,
      ...clickable,
      ...size,
      "width-large",
      "width-small",
      "height-large",
      "height-small",
      "selected",
      "checkbox",
      "checkbox-checked",
    ],
  },
  {
    component: "tile-selected",
    props: [],
    propnames: [...color, ...typography],
  },
];

for (let c of components) {
  c.props = c.propnames.map((prop) => `--${c.component}-${prop}`);
  cssProperties.push(...c.props);
}
cssProperties.sort();
console.log(cssProperties);
