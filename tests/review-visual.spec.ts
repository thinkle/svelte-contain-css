import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  expect,
  test,
  type Locator,
  type Page,
  type TestInfo,
} from "@playwright/test";

const defaultThemes = [
  "light",
  "dark",
  "bootstrap",
  "material",
  "retro",
  "canyon-modern-serif-fancy",
] as const;

const defaultScenarios = [
  {
    name: "incredible-app-shell",
    actions: [
      {
        action: "open-menu",
        target: "[data-audit-target='menu-open']",
        name: "filters-open",
      },
    ],
  },
  {
    name: "launch-studio",
    actions: [
      {
        action: "open-launch-menu",
        target: "[popover]:popover-open",
        name: "launch-menu-open",
      },
      {
        action: "show-tooltip",
        target: "[popover]:popover-open",
        name: "tooltip-open",
      },
      {
        action: "open-accordion",
        target: "[data-audit-target='accordion-open']",
        name: "accordion-open",
      },
      {
        action: "switch-tab",
        target: "[data-audit-target='readiness-tab']",
        name: "readiness-tab",
      },
      {
        action: "open-dialog",
        target: "[data-audit-target='dialog-open']",
        name: "dialog-open",
      },
    ],
  },
  {
    name: "layout-workbench",
    actions: [
      {
        action: "select-tile",
        target: "[data-audit-target='tile-selected']",
        name: "tile-selected",
      },
    ],
  },
  {
    name: "table-workbench",
    actions: [
      {
        action: "toggle-bulk-actions",
        target: "[data-audit-target='bulk-actions-open']",
        name: "bulk-actions-open",
      },
      {
        action: "open-team-select",
        target: "[popover]:popover-open",
        name: "team-select-open",
      },
    ],
  },
  {
    name: "visual-system-board",
    actions: [
      {
        action: "open-actions-menu",
        target: "[popover]:popover-open",
        name: "actions-menu-open",
      },
      {
        action: "focus-primary",
        target: "[data-audit-target='page']",
        name: "primary-focus",
      },
      {
        action: "open-dialog",
        target: "[data-audit-target='dialog-open']",
        name: "dialog-open",
      },
    ],
  },
] as const;

const viewports = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "mobile", width: 390, height: 1000 },
] as const;

const themes = parseListEnv("REVIEW_VISUAL_THEMES", defaultThemes);
const scenarios = defaultScenarios.filter((scenario) =>
  parseListEnv("REVIEW_VISUAL_SCENARIOS", defaultScenarios.map((item) => item.name)).includes(
    scenario.name,
  ),
);
const artifactRoot =
  process.env.REVIEW_VISUAL_DIR || "/tmp/contain-css-review-visuals";

test.describe("review app visuals", () => {
  for (const scenario of scenarios) {
    test.describe(scenario.name, () => {
      for (const theme of themes) {
        for (const viewport of viewports) {
          test(`${theme} ${viewport.name}`, async ({ page }, testInfo) => {
            const consoleErrors: string[] = [];
            const pageErrors: string[] = [];
            const failedRequests: string[] = [];

            page.on("console", (message) => {
              if (message.type() === "error") {
                consoleErrors.push(message.text());
              }
            });
            page.on("pageerror", (error) => pageErrors.push(error.message));
            page.on("requestfailed", (request) => {
              const type = request.resourceType();
              if (
                ["document", "script", "stylesheet", "fetch", "xhr"].includes(
                  type,
                )
              ) {
                failedRequests.push(
                  `${type}: ${request.url()} (${request.failure()?.errorText})`,
                );
              }
            });

            await stabilizeReviewPage(page);
            await page.setViewportSize({
              width: viewport.width,
              height: viewport.height,
            });

            await gotoScenario(page, theme, scenario.name);

            const target = page.locator("[data-audit-target='page']").first();
            await expect(target).toBeVisible();
            await expect(
              page.locator(`[data-review-scenario="${scenario.name}"]`),
            ).toBeVisible();

            const baseDir = path.join(
              artifactRoot,
              scenario.name,
              theme,
              viewport.name,
            );
            await capture(testInfo, target, baseDir, "page");

            if (viewport.name === "desktop") {
              for (const action of scenario.actions) {
                await captureActionTarget(page, testInfo, baseDir, theme, {
                  scenario: scenario.name,
                  ...action,
                });
              }
            }

            expect.soft(consoleErrors, "Console errors").toEqual([]);
            expect.soft(pageErrors, "Unhandled page errors").toEqual([]);
            expect.soft(failedRequests, "Critical request failures").toEqual([]);
          });
        }
      }
    });
  }
});

function parseListEnv<T extends string>(
  name: string,
  fallback: readonly T[],
): T[] {
  const raw = process.env[name]?.trim();
  if (!raw) return [...fallback];

  const allowed = new Set(fallback);
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter((value): value is T => allowed.has(value as T));
}

async function stabilizeReviewPage(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const style = document.createElement("style");
    style.textContent = `
      *,
      *::before,
      *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
        caret-color: transparent !important;
      }
    `;
    document.addEventListener("DOMContentLoaded", () => {
      document.head.appendChild(style);
    });
  });
}

async function gotoScenario(page: Page, theme: string, scenario: string) {
  await page.goto(`/svelte-contain-css/review/${theme}/app/${scenario}`);
  await page.waitForLoadState("networkidle");
}

async function captureActionTarget(
  page: Page,
  testInfo: TestInfo,
  baseDir: string,
  theme: string,
  options: {
    action: string;
    target: string;
    name: string;
    scenario: string;
  },
) {
  await gotoScenario(page, theme, options.scenario);

  const action = page.locator(`[data-audit-action="${options.action}"]`).first();
  await action.scrollIntoViewIfNeeded();
  await expect(action).toBeVisible();

  const focusSelf = (await action.getAttribute("data-audit-focus")) === "true";
  if (focusSelf) {
    await action.focus();
  } else {
    await action.click();
  }

  await page.waitForTimeout(150);
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      }),
  );

  const target = page.locator(options.target).first();
  await target.scrollIntoViewIfNeeded();
  await expect(target).toBeVisible();
  await capture(testInfo, target, baseDir, options.name);
}

async function capture(
  testInfo: TestInfo,
  locator: Locator,
  baseDir: string,
  name: string,
) {
  await mkdir(baseDir, { recursive: true });
  const buffer = await locator.screenshot();
  const file = path.join(baseDir, `${name}.png`);
  await writeFile(file, buffer);
  await testInfo.attach(name, {
    body: buffer,
    contentType: "image/png",
  });
}
