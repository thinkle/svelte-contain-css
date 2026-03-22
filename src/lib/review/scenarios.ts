import IncredibleAppShell from "./scenarios/IncredibleAppShell.svelte";
import LayoutWorkbench from "./scenarios/LayoutWorkbench.svelte";
import TableWorkbench from "./scenarios/TableWorkbench.svelte";

export const reviewAppScenarios = {
  "incredible-app-shell": {
    title: "Incredible App Shell",
    component: IncredibleAppShell,
  },
  "layout-workbench": {
    title: "Layout Workbench",
    component: LayoutWorkbench,
  },
  "table-workbench": {
    title: "Table Workbench",
    component: TableWorkbench,
  },
} as const;

export type ReviewAppScenarioName = keyof typeof reviewAppScenarios;

export function isReviewAppScenarioName(
  value: string,
): value is ReviewAppScenarioName {
  return value in reviewAppScenarios;
}
