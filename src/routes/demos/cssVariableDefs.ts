import type { CSSVariable } from "./types";

// Define common default variable definitions
let defaults: {
  [key: string]: {
    type: string;
    placeholder: string;
    defaultValue: string;
    unit?: string;
    color?: string;
    group?: string;
  };
} = {
  borderRadius: {
    type: "length",
    placeholder: "e.g., 4px",
    defaultValue: "var(--border-radius)",
    unit: "px",
    group: "Box",
  },
  padding: {
    type: "length",
    placeholder: "16px",
    defaultValue: "var(--padding)",
    unit: "",
    group: "Box",
  },
  color: {
    type: "color",
    placeholder: "e.g., #ffffff",
    defaultValue: "var(--color)",
    unit: "",
    group: "Color",
  },
  font: {
    type: "text",
    placeholder: "e.g., Arial",
    defaultValue: "var(--ui-font)",
    unit: "",
    group: "Typography",
  },
  transform: {
    type: "text",
    placeholder: "e.g., scale(1.1)",
    defaultValue: "var(--transform)",
    unit: "",
    group: "Affordances",
  },
  filter: {
    type: "text",
    placeholder: "e.g., brightness(1.2)",
    defaultValue: "var(--filter)",
    unit: "",
    group: "Affordances",
  },
  transition: {
    type: "text",
    placeholder: "e.g., all 0.3s",
    defaultValue: "var(--transition)",
    unit: "",
    group: "Affordances",
  },
  size: {
    type: "distance",
    placeholder: "48px",
    defaultValue: "",
    group: "Box",
  },
  time: {
    type: "time",
    placeholder: "300ms",
    defaultValue: "300ms",
    group: "Affordances",
  },
  fontFamily: {
    type: "text",
    placeholder: "e.g., Arial",
    defaultValue: "var(--font-family)",
  },
  textTransform: {
    type: "text",
    placeholder: "e.g., uppercase",
    defaultValue: "none",
  },
  textDecoration: {
    type: "text",
    placeholder: "e.g., underline",
    defaultValue: "none",
  },
  fontSize: {
    type: "text",
    placeholder: "e.g., 16px",
    defaultValue: "var(--font-size)",
  },
  fontWeight: {
    type: "text",
    placeholder: "e.g., 400",
    defaultValue: "var(--font-weight)",
  },
  lineHeight: {
    type: "text",
    placeholder: "e.g., 1.5",
    defaultValue: "var(--line-height)",
  },
  letterSpacing: {
    type: "text",
    placeholder: "e.g., 0.1em",
    defaultValue: "normal",
  },
  marginTop: {
    type: "text",
    placeholder: "e.g., 16px",
    defaultValue: "var(--margin-top)",
  },
  marginBottom: {
    type: "text",
    placeholder: "e.g., 16px",
    defaultValue: "var(--margin-bottom)",
  },
  textIndent: {
    type: "text",
    placeholder: "e.g., 1em",
    defaultValue: "0",
  },
  fontVariant: {
    type: "text",
    placeholder: "e.g., small-caps",
    defaultValue: "normal",
  },
  textAlign: {
    type: "text",
    placeholder: "e.g., center",
    defaultValue: "left",
  },
  cursor: {
    type: "text",
    placeholder: "e.g., pointer",
    defaultValue: "pointer",
  },
};

defaults.bgColor = {
  ...defaults.color,
  defaultValue: "var(--bg-color)",
  placeholder: "#efefef",
};
defaults.fgColor = {
  ...defaults.color,
  defaultValue: "var(--fg-color)",
  placeholder: "#212121",
};

/* Based on sass mix-in...
@mixin color-props ($prefixes...) {
  background: vars(bg, $prefixes...);
  color: vars(fg, $prefixes...);  
  --link-bg: #{vars(link-bg, $prefixes...)};
  --link-fg: #{vars(link-fg, $prefixes...)};
}
  */

function colorProps(prefix: string): CSSVariable[] {
  let group = "Color";
  return [
    {
      name: `--${prefix}-bg`,
      ...defaults.bgColor,
      group,
    },
    {
      name: `--${prefix}-fg`,
      ...defaults.fgColor,
      group,
    },
    {
      name: `--${prefix}-link-bg`,
      ...defaults.bgColor,
      group,
    },
    {
      name: `--${prefix}-link-fg`,
      ...defaults.fgColor,
      group,
    },
  ];
}

function typographyProps(prefix: string): CSSVariable[] {
  let group = "Typography";
  return [
    {
      name: `--${prefix}-font-family`,
      ...defaults.fontFamily,
      group,
    },
    {
      name: `--${prefix}-text-transform`,
      ...defaults.textTransform,
      group,
    },
    {
      name: `--${prefix}-text-decoration`,
      ...defaults.textDecoration,
      group,
    },
    {
      name: `--${prefix}-font-size`,
      ...defaults.fontSize,
      group,
    },
    {
      name: `--${prefix}-font-weight`,
      ...defaults.fontWeight,
      group,
    },
    {
      name: `--${prefix}-line-height`,
      ...defaults.lineHeight,
      group,
    },
    {
      name: `--${prefix}-letter-spacing`,
      ...defaults.letterSpacing,
      group,
    },
    {
      name: `--${prefix}-margin-top`,
      ...defaults.marginTop,
      group,
    },
    {
      name: `--${prefix}-margin-bottom`,
      ...defaults.marginBottom,
      group,
    },
    {
      name: `--${prefix}-text-indent`,
      ...defaults.textIndent,
      group,
    },
    {
      name: `--${prefix}-font-variant`,
      ...defaults.fontVariant,
      group,
    },
    {
      name: `--${prefix}-text-align`,
      ...defaults.textAlign,
      group,
    },
  ];
}
/* 
@mixin clickable($prefixes...) {
  cursor: pointer;
  transition: filter,transform var-with-fallbacks(--transition,button,control,300ms);
  &:hover {
    filter: var-with-fallbacks(--hover-filter, append($prefixes, brightness(1.4))...);
    transform: var-with-fallbacks(--hover-transform, append($prefixes, none)...);
  }
  &:active {
      filter: var-with-fallbacks(--hover-filter, append($prefixes, brightness(0.9))...);
      transform: var-with-fallbacks(--hover-transform, append($prefixes, translate(var(--space),var(--space)))...);
    }
} */
function clickableProps(prefix: string): CSSVariable[] {
  let group = "Affordances";
  return [
    {
      name: `--${prefix}-cursor`,
      ...defaults.cursor,
      group,
    },
    {
      name: `--${prefix}-transition`,
      ...defaults.transition,
      group,
    },
    {
      name: `--${prefix}-hover-filter`,
      ...defaults.filter,
      placeholder: "e.g., brightness(1.4)",
      defaultValue: "var(--hover-filter, brightness(1.4))",
      group,
    },
    {
      name: `--${prefix}-hover-transform`,
      ...defaults.transform,
      group,
    },
    {
      name: `--${prefix}-active-filter`,
      ...defaults.filter,
      placeholder: "e.g., brightness(0.9)",
      defaultValue: "var(--active-filter, brightness(0.9))",
      group,
    },
    {
      name: `--${prefix}-active-transform`,
      ...defaults.transform,
      placeholder: "e.g., translate(var(--space), var(--space))",
      defaultValue:
        "var(--active-transform, translate(var(--space), var(--space)))",
      group,
    },
  ];
}

function paddingProps(prefix: string): CSSVariable[] {
  return [
    {
      name: `--${prefix}-padding`,
      ...defaults.padding,
      group: "Box",
    },
  ];
}

function boxPropsSquare (prefix: string): CSSVariable[] {
  let group = "Box";
  return [
    ...paddingProps(prefix),
    {
      name: `--${prefix}-square-radius`,
      ...defaults.borderRadius,
      group,
    },
  ];
}

function boxProps(prefix: string): CSSVariable[] {
  let group = "Box";
  return [
    ...paddingProps(prefix),
    {
      name: `--${prefix}-border-radius`,
      ...defaults.borderRadius,
      group,
    },
  ];
}

function boxPropsBorder(prefix: string): CSSVariable[] {
  let group = "Box";
  return [...boxProps(prefix)];
}

function shadowProps(prefix: string): CSSVariable[] {
  let group = "Box Shadow";
  return [
    {
      name: `--${prefix}-shadow-blur`,
      ...defaults.shadow,
      group,
    },
    {
      name: `--${prefix}-shadow-color`,
      ...defaults.color,
      group,
    },
    {
      name: `--${prefix}-shadow-distance`,
      ...defaults.distance,
      group,
    },
  ];
}
/* Component variables */

export let buttonVars: CSSVariable[] = [
  ...colorProps("button"),
  ...colorProps("primary"),
  ...colorProps("warning"),
  ...typographyProps("button"),
  ...typographyProps("warning"),
  ...typographyProps("primary"),
  ...clickableProps("button"),
  ...boxProps("button"),
  ...shadowProps("button"),
  {
    name: "--button-border",
    defaultValue: "none",
    type: "border",
    group: "Box",
    placeholder: "1px solid grey",
  },
  {
    name: "--button-icon-gap",
    defaultValue: "var(--space)",
    type: "distance",
    unit: "px",
    group: "Box",
  },
];

export let cardVars = [
  ...shadowProps("card"),
  ...boxProps("card"),
  ...colorProps("card"),
  ...colorProps("card-header"),
  ...colorProps("card-footer"),
  {
    name: "--card-width",
    defaultValue: "420px",
    type: "length",
    group: "Size",
  },
  {
    name: "--card-height",
    defaultValue: "300px",
    type: "length",
    group: "Size",
  },
  {
    name: "--card-footer-height",
    defaultValue: "2em",
    type: "length",
    group: "Size",
  },
  {
    name: "--card-header-height",
    defaultValue: "2em",
    type: "length",
    group: "Size",
  },
  {
    name: "--card-width-small",
    defaultValue: "250px",
    type: "length",
    group: "Size",
  },
  {
    name: "--card-height-small",
    defaultValue: "150px",
    type: "length",
    group: "Size",
  },
  {
    name: "--card-width-large",
    defaultValue: "600px",
    type: "length",
    group: "Size",
  },
  {
    name: "--card-height-large",
    defaultValue: "450px",
    type: "length",
    group: "Size",
  },
];

export let dialogVars: CSSVariable[] = [
  {
    name: "--dialog-min-width",
    defaultValue: "300px",
    type: "length",
    group: "Size",
    placeholder: "e.g., 300px",
  },
  {
    name: "--dialog-max-width",
    defaultValue: "800px",
    type: "length",
    group: "Size",
    placeholder: "e.g., 800px",
  },
  {
    name: "--dialog-min-height",
    defaultValue: "300px",
    type: "length",
    group: "Size",
    placeholder: "e.g., 300px",
  },
  {
    name: "--dialog-max-height",
    defaultValue: "800px",
    type: "length",
    group: "Size",
    placeholder: "e.g., 800px",
  },
  ...boxProps("dialog"),
  ...shadowProps("dialog"),
  ...colorProps("dialog"),
  {
    name: "--dialog-underlay-color",
    defaultValue: "rgba(0,0,0,0.5)",
    type: "color",
    group: "Underlay",
    placeholder: "e.g., rgba(0,0,0,0.5)",
  },
  {
    name: "--dialog-underlay-filter",
    defaultValue: "blur(2px)",
    type: "text",
    group: "Underlay",
  },
];

export let tooltipVars = [
  ...boxProps("tooltip"),
  ...colorProps("tooltip"),
  ...shadowProps("tooltip"),
];

export let tableVars = [
  ...boxPropsBorder('table'),
  ...colorProps('table'),
  ...shadowProps('table'),  
  {
    name : '--table-first-row-bottom-border',
    defaultValue: '3px solid var(--table-first-row-border-color, var(--secondary-bg))',
    type: 'border',
    group: 'Table',
  },
  {
    name : '--table-border',
    defaultValue: '1px solid var(--table-border-color)',
    type: 'border',
    group: 'Table',
  },
  {
    name: '--table-border-color',
    defaultValue: 'var(--secondary-color)',
    type: 'color',
  },
  {
    name : '--table-first-row-border-color',
    defaultValue: 'var(--secondary-bg)',
    type: 'color',
  },
  ...colorProps('table-head'),
  ...typographyProps('table-head'),
]


export let accordionVars = [

  ...typographyProps('accordion'),
  ...typographyProps('accordion-summary'),
  ...typographyProps('accordion-summary-open'),
  ...colorProps('accordion'),
  ...colorProps('accordion-summary'),
  ...colorProps('accordion-summary-open'),
  ...boxPropsSquare('accordion-wrapper'),
  ...boxPropsSquare('accordion-summary'),
  {
    name : '--accordion-icon',
    defaultValue: '"▼"',
  },
  { name : '--accordion-gap',
    defaultValue: 'var(--space)',
  },
  {
    name : "--accordion-icon-transform",
    defaultValue: "rotateX(180deg)",
  },
  {
    name: "--accordion-open-icon",
    defaultValue: "var(--accordion-icon)",
  }
]



export let components = {
  button: buttonVars,
  card: cardVars,
  dialog: dialogVars,
};

export let vars = Object.values(components).flat();
export let cssProperties = vars.map((v) => v.name);

