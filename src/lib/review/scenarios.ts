import IncredibleAppShell from "./scenarios/IncredibleAppShell.svelte";

export const reviewAppScenarios = {
  "incredible-app-shell": {
    title: "Incredible App Shell",
    component: IncredibleAppShell,
  },
} as const;

export type ReviewAppScenarioName = keyof typeof reviewAppScenarios;

export function isReviewAppScenarioName(
  value: string,
): value is ReviewAppScenarioName {
  return value in reviewAppScenarios;
}
