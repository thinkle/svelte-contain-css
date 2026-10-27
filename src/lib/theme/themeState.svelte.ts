import { extraThemes } from "./themeConfig";

export const themeState = $state({
  fullTheme: 0,       // index into fullThemes; 0 = None
  colorTheme: 0,      // index into colorThemes; 0 = Light or Dark
  typographyTheme: 0, // index into typographyThemes; 0 = Airy
  headingTheme: 0,    // Default preserves the full preset’s heading treatment
  enabledExtras: extraThemes.map(() => false) as boolean[],
  rawCss: "",
  // Accent overrides: "" (the theme's own), a material hue, or "#rrggbb".
  primaryAccent: "",
  secondaryAccent: "",
});
