import BlogMockup from "./scenarios/BlogMockup.svelte";
import IncredibleAppShell from "./scenarios/IncredibleAppShell.svelte";
import LayoutWorkbench from "./scenarios/LayoutWorkbench.svelte";
import LaunchStudio from "./scenarios/LaunchStudio.svelte";
import TableWorkbench from "./scenarios/TableWorkbench.svelte";
import VisualSystemBoard from "./scenarios/VisualSystemBoard.svelte";

export const reviewAppScenarios = {
  "blog-mockup": {
    title: "The Tidy Shelf (Blog)",
    description: "An editorial blog with an article, recent posts, and topic tags.",
    showcases: "Prose rhythm, heading hierarchy, primary-bar links, and a full-height sidebar.",
    components: ["Page", "Bar", "Sidebar", "Stack", "MenuList", "Tag", "TextLayout"],
    component: BlogMockup,
  },
  "incredible-app-shell": {
    title: "Containership Console",
    description: "A cargo operations console with filters and a responsive work queue.",
    showcases: "Form controls, data-list rows, responsive navigation, and live interface state.",
    components: ["Page", "Bar", "Form", "Fieldset", "Input", "Select", "Slider", "DataList"],
    component: IncredibleAppShell,
  },
  "layout-workbench": {
    title: "Container Store Report",
    description: "A retail storage report with aisle navigation, metric cards, and selectable tiles.",
    showcases: "Sidebar expansion, card and tile grids, responsive layout, and nested surfaces.",
    components: ["Page", "Sidebar", "MenuList", "GridLayout", "Card", "Tile", "TextLayout"],
    component: LayoutWorkbench,
  },
  "launch-studio": {
    title: "Containment Doctrine Studio",
    description: "A containment-history workspace with a hero, tabbed briefings, and interactive reference material.",
    showcases: "Tabs, split panes, menus, accordions, tooltips, and dialogs in a composed page.",
    components: ["Hero", "Page", "TabBar", "SplitPane", "Accordion", "DropdownMenu", "Dialog", "Tooltip"],
    component: LaunchStudio,
  },
  "table-workbench": {
    title: "Container Thesaurus",
    description: "A searchable container glossary with family filters and bulk actions.",
    showcases: "Sticky table headers, column alignment, filtering, and toolbar interactions.",
    components: ["Page", "Bar", "Table", "Form", "Fieldset", "Input", "Select", "Checkbox"],
    component: TableWorkbench,
  },
  "visual-system-board": {
    title: "Contain Depot Board",
    description: "A dense dashboard combining status cards, controls, lists, and reference tables.",
    showcases: "Color variants, nested surfaces, forms, overlays, and responsive dashboard composition.",
    components: ["Page", "GridLayout", "Card", "DataList", "Table", "Form", "Dialog", "Progress"],
    component: VisualSystemBoard,
  },
} as const;

export type ReviewAppScenarioName = keyof typeof reviewAppScenarios;

export function isReviewAppScenarioName(
  value: string,
): value is ReviewAppScenarioName {
  return value in reviewAppScenarios;
}
