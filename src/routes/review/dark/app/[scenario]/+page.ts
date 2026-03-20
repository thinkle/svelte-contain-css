import { loadReviewAppPage } from "$lib/review/loadReviewAppPage";

export function load({ params }) {
  return loadReviewAppPage(params.scenario, "dark");
}
