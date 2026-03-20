import { error } from "@sveltejs/kit";
import { isReviewAppScenarioName } from "$lib/review/scenarios";
import { reviewThemeLabels, type ReviewThemeName } from "$lib/review/themes";

export function loadReviewAppPage(
  scenario: string,
  theme: ReviewThemeName,
) {
  if (!isReviewAppScenarioName(scenario)) {
    throw error(404, `Unknown review scenario: ${scenario}`);
  }

  return {
    scenario,
    theme,
    themeLabel: reviewThemeLabels[theme],
  };
}
