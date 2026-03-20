import type { Page } from "@playwright/test";
import type { AuditViewport } from "./component-audit";

export type ComponentAuditState = {
  name: string;
  enabled?: (viewport: AuditViewport) => boolean;
  setup?: (page: Page, viewport: AuditViewport) => Promise<void>;
};

const defaultState: ComponentAuditState = {
  name: "default",
};

const componentStates: Record<string, ComponentAuditState[]> = {
  Dialog: [
    defaultState,
    {
      name: "modal-open",
      async setup(page) {
        await page.getByTestId("open-modal-dialog").click();
        await page
          .locator("dialog[open]", {
            has: page.getByRole("heading", { name: "Modal Dialog" }),
          })
          .waitFor({ state: "visible" });
      },
    },
    {
      name: "non-modal-open",
      async setup(page) {
        await page.getByTestId("open-non-modal-dialog").click();
        await page
          .locator("dialog[open]", {
            has: page.getByRole("heading", { name: "Non-Modal Dialog" }),
          })
          .waitFor({ state: "visible" });
      },
    },
    {
      name: "dismissible-open",
      async setup(page) {
        await page.getByTestId("open-dismissible-dialog").click();
        await page
          .locator("dialog[open]", {
            has: page.getByRole("heading", {
              name: "Light-Dismissible Modal Dialog",
            }),
          })
          .waitFor({ state: "visible" });
      },
    },
  ],
  DropdownMenu: [
    defaultState,
    {
      name: "left-menu-open",
      async setup(page) {
        await page.getByRole("button", { name: "Left Menu" }).click();
        await page.locator("[popover]:popover-open").waitFor({ state: "visible" });
      },
    },
    {
      name: "long-menu-open",
      async setup(page) {
        await page.getByRole("button", { name: "Long Menu" }).click();
        await page.locator("[popover]:popover-open").waitFor({ state: "visible" });
      },
    },
    {
      name: "select-open",
      enabled(viewport) {
        return viewport.width > 600;
      },
      async setup(page) {
        await page.getByRole("button", { name: /John \(aged 30\)/ }).click();
        await page.locator("[popover]:popover-open").waitFor({ state: "visible" });
      },
    },
  ],
  Tab: [
    defaultState,
    {
      name: "tabbar-panel",
      async setup(page) {
        await page.getByRole("button", { name: "TabBar" }).click();
        await page.getByRole("heading", { name: "TabBar" }).waitFor({
          state: "visible",
        });
      },
    },
    {
      name: "containers-panel",
      async setup(page) {
        await page.getByRole("button", { name: "Containers & Tabs" }).click();
        await page
          .getByRole("heading", { name: "Nesting Tabs in Containers" })
          .waitFor({ state: "visible" });
      },
    },
    {
      name: "vars-panel",
      async setup(page) {
        await page.getByRole("button", { name: "Customize" }).click();
        await page
          .getByRole("heading", { name: "Adjust variables to customize tabs" })
          .waitFor({ state: "visible" });
      },
    },
  ],
};

export function getComponentAuditStates(componentName: string) {
  return componentStates[componentName] ?? [defaultState];
}
