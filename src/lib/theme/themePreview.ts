import { fullThemes, colorThemes, typographyThemes, extraThemes, headingThemes } from "./themeConfig";

type ThemeSelection = {
  fullTheme: number;
  colorTheme: number;
  typographyTheme: number;
  headingTheme: number;
  enabledExtras: boolean[];
  rawCss: string;
};

// Use file names rather than array indices so a saved preview survives changes
// to the picker order. The fragment works on the static documentation host.
export function themePreviewHash(selection: ThemeSelection) {
  const params = new URLSearchParams();
  if (selection.fullTheme) {
    params.set("full", fullThemes[selection.fullTheme].file);
  } else {
    params.set("color", colorThemes[selection.colorTheme].file);
    params.set("type", typographyThemes[selection.typographyTheme].file);
  }
  if (selection.headingTheme) params.set("heading", headingThemes[selection.headingTheme].file);
  extraThemes.forEach((theme, index) => {
    if (selection.enabledExtras[index]) params.append("extra", theme.file);
  });
  if (selection.rawCss) params.set("css", selection.rawCss);
  return params.toString();
}

export function themePreviewStyles(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const full = fullThemes.find(theme => theme.file === params.get("full"));
  // Accept old links that encoded a heading treatment as an add-on.
  const headingFile = params.get("heading") ?? params.getAll("extra").find(file => headingThemes.some(theme => theme.file === file));
  const heading = headingThemes.find(theme => theme.file === headingFile);
  const styles = full?.file
    ? [heading?.file ? (full.cssWithoutHeadings ?? full.css) : full.css]
    : [
        (colorThemes.find(theme => theme.file === params.get("color")) ?? colorThemes[0]).css,
        (typographyThemes.find(theme => theme.file === params.get("type")) ?? typographyThemes[0]).css,
      ];
  if (heading?.file) styles.push(heading.css);
  // Separate style elements preserve leading font @imports and picker order.
  for (const theme of extraThemes) {
    if (params.getAll("extra").includes(theme.file)) styles.push(theme.css);
  }
  if (params.get("css")) styles.push(`:root { ${params.get("css")} }`);
  return styles;
}
