import IncredibleAppShell from "./scenarios/IncredibleAppShell.svelte";
import LayoutWorkbench from "./scenarios/LayoutWorkbench.svelte";
import LaunchStudio from "./scenarios/LaunchStudio.svelte";
import TableWorkbench from "./scenarios/TableWorkbench.svelte";
import VisualSystemBoard from "./scenarios/VisualSystemBoard.svelte";

export const reviewAppScenarios = {
  "incredible-app-shell": {
    title: "Containership Console",
    component: IncredibleAppShell,
  },
  "layout-workbench": {
    title: "Container Store Report",
    component: LayoutWorkbench,
  },
  "launch-studio": {
    title: "Containment Doctrine Studio",
    component: LaunchStudio,
  },
  "table-workbench": {
    title: "Container Thesaurus",
    component: TableWorkbench,
  },
  "visual-system-board": {
    title: "Contain Depot Board",
    component: VisualSystemBoard,
  },
} as const;

export type ReviewAppScenarioName = keyof typeof reviewAppScenarios;

export function isReviewAppScenarioName(
  value: string,
): value is ReviewAppScenarioName {
  return value in reviewAppScenarios;
}
