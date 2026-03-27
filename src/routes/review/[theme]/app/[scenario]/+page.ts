import { error } from "@sveltejs/kit";
import { loadReviewAppPage } from "$lib/review/loadReviewAppPage";
import { isReviewThemeName } from "$lib/review/themes";

export function load({ params }) {
  if (!isReviewThemeName(params.theme)) {
    throw error(404, `Unknown review theme: ${params.theme}`);
  }

  return loadReviewAppPage(params.scenario, params.theme);
}
