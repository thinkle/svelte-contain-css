import { error } from "@sveltejs/kit";
import { getReviewTheme, isReviewThemeName } from "$lib/review/themes";

export function load({ params }) {
  if (!isReviewThemeName(params.theme)) {
    throw error(404, `Unknown review theme: ${params.theme}`);
  }

  const theme = params.theme;
  const { label, css } = getReviewTheme(theme);

  return {
    theme,
    themeCss: css,
    themeLabel: label,
  };
}
