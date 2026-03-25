import { extraThemes } from "./themeConfig";

export const themeState = $state({
  fullTheme: 0,       // index into fullThemes; 0 = None
  colorTheme: 0,      // index into colorThemes; 0 = Light or Dark
  typographyTheme: 0, // index into typographyThemes; 0 = Airy
  enabledExtras: extraThemes.map(() => false) as boolean[],
  rawCss: "",
});
