/* Accent overrides for the theme picker: swap the primary and secondary
   colors on top of any theme.

   An accent is "" (the theme's own), a material hue ("teal"), or a custom
   color ("#e65100"). A hue needs a different shade per mode -- a dark page
   wants a light accent -- so the shade comes from the active color theme:
   600 / 700 on a light theme, 200 / 300 on a dark one, and both, switched
   by prefers-color-scheme, for "Light or Dark". A custom color is used as
   given.

   Only --primary-color / --secondary-color are set: every bundled theme
   derives its role background and text from them (see colors.css), so the
   output is the same one line a theme author would write. */

export const MATERIAL_HUES = [
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "grey",
  "blue-grey",
] as const;

export type AccentRole = "primary" | "secondary";
export type AccentMode = "light" | "dark" | "both";

const SHADES: Record<AccentRole, { light: number; dark: number }> = {
  primary: { light: 600, dark: 200 },
  secondary: { light: 700, dark: 300 },
};

export const isCustomAccent = (value: string) => value.startsWith("#");

function roleVars(role: AccentRole, value: string, mode: "light" | "dark") {
  const color = isCustomAccent(value)
    ? value
    : `var(--material-color-${value}-${SHADES[role][mode]})`;
  return `--${role}-color: ${color};`;
}

/* Which shades a color theme wants. A complete design system (Bootstrap,
   Material, Retro) is light. */
export function accentMode(colorFile: string, usingFullTheme: boolean): AccentMode {
  if (usingFullTheme) return "light";
  if (colorFile === "themes/dark.css") return "dark";
  if (colorFile === "themes/lightordark.css") return "both";
  return "light";
}

export function accentCss(
  accents: Partial<Record<AccentRole, string>>,
  mode: AccentMode,
): string {
  const block = (m: "light" | "dark") =>
    (Object.entries(accents) as [AccentRole, string][])
      .filter(([, value]) => value)
      .map(([role, value]) => roleVars(role, value, m))
      .join(" ");
  if (!block("light")) return "";
  if (mode !== "both") return `:root { ${block(mode)} }`;
  return (
    `:root { ${block("light")} }\n` +
    `@media (prefers-color-scheme: dark) { :root { ${block("dark")} } }`
  );
}
