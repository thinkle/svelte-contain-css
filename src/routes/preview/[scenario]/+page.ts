import { error } from "@sveltejs/kit";
import { isReviewAppScenarioName, reviewAppScenarios } from "$lib/review/scenarios";

export const entries = () => Object.keys(reviewAppScenarios).map(scenario => ({ scenario }));

export function load({ params }) {
  if (!isReviewAppScenarioName(params.scenario)) error(404, "Unknown preview scenario");
  return { scenario: params.scenario };
}
