export const reviewThemeLabels = {
  bootstrap: "Bootstrap",
  dark: "Dark",
  light: "Light",
  "light-or-dark": "Light Or Dark",
  purple: "Purple",
} as const;

export type ReviewThemeName = keyof typeof reviewThemeLabels;
