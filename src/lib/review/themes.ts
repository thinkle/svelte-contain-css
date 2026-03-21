export const reviewThemeLabels = {
  bootstrap: "Bootstrap",
  dark: "Dark",
  light: "Light",
  "light-or-dark": "Light Or Dark",
  material: "Material",
  purple: "Purple",
  retro: "Retro",
} as const;

export type ReviewThemeName = keyof typeof reviewThemeLabels;
