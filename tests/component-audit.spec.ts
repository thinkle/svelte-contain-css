import { expect, test } from "@playwright/test";
import {
  COMPONENT_AUDIT_VIEWPORTS,
  discoverComponentAuditTargets,
  getComponentAuditDir,
  stabilizeAuditPage,
  waitForComponentDemo,
  writeComponentArtifact,
} from "./utils/component-audit";
import { getComponentAuditStates } from "./utils/component-audit-states";

const auditTargets = await discoverComponentAuditTargets();

test.describe("component audit", () => {
  test.skip(auditTargets.length === 0, "No component demos found for audit.");

  for (const target of auditTargets) {
    test(`component audit: ${target.name}`, async ({ page }, testInfo) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      const failedRequests: string[] = [];
      const viewportSummaries: Array<Record<string, unknown>> = [];
      const artifacts: Array<Record<string, string>> = [];
      const states = getComponentAuditStates(target.name);

      page.on("console", (message) => {
        if (message.type() === "error") {
          consoleErrors.push(message.text());
        }
      });

      page.on("pageerror", (error) => {
        pageErrors.push(error.message);
      });

      page.on("requestfailed", (request) => {
        const type = request.resourceType();
        if (["document", "script", "stylesheet", "fetch", "xhr"].includes(type)) {
          failedRequests.push(`${type}: ${request.url()} (${request.failure()?.errorText})`);
        }
      });

      await stabilizeAuditPage(page);

      for (const viewport of COMPONENT_AUDIT_VIEWPORTS) {
        for (const state of states) {
          if (state.enabled && !state.enabled(viewport)) {
            continue;
          }

          await page.setViewportSize({
            width: viewport.width,
            height: viewport.height,
          });

          await page.goto(target.route);
          await waitForComponentDemo(page);
          await state.setup?.(page, viewport);

          const loadError = page.getByText("Failed to load the component:", {
            exact: false,
          });
          await expect.soft(
            loadError,
            `Demo route failed to load for ${target.name} at ${viewport.name}/${state.name}.`,
          ).toHaveCount(0);

          const content = page.locator(".content").first();
          await expect(content).toBeVisible();

          const screenshot = await page.screenshot({ fullPage: true });
          const screenshotPath = await writeComponentArtifact(
            target.name,
            `${viewport.name}/${state.name}.png`,
            new Uint8Array(screenshot),
          );
          await testInfo.attach(`${target.name}-${viewport.name}-${state.name}.png`, {
            contentType: "image/png",
            body: screenshot,
          });

          const accessibilityTree = await page.locator("body").ariaSnapshot();
          const a11yPath = await writeComponentArtifact(
            target.name,
            `${viewport.name}/${state.name}.a11y.yaml`,
            accessibilityTree,
          );
          await testInfo.attach(
            `${target.name}-${viewport.name}-${state.name}-a11y.yaml`,
            {
              contentType: "text/yaml",
              body: Buffer.from(accessibilityTree),
            },
          );

          const summary = await page.evaluate(() => {
            const headings = Array.from(
              document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
            ).map((heading) => ({
              level: heading.tagName,
              text: heading.textContent?.trim() || "",
            }));

            return {
              title: document.title,
              bodyClass: document.body.className,
              headings,
              buttons: document.querySelectorAll("button").length,
              inputs: document.querySelectorAll("input, select, textarea").length,
              dialogs: document.querySelectorAll("dialog").length,
              popovers: document.querySelectorAll("[popover]").length,
              colorScheme:
                getComputedStyle(document.documentElement).getPropertyValue(
                  "color-scheme",
                ) || null,
            };
          });

          viewportSummaries.push({
            viewport,
            state: state.name,
            route: target.route,
            screenshotPath,
            a11yPath,
            ...summary,
          });
          artifacts.push({
            kind: "screenshot",
            viewport: viewport.name,
            state: state.name,
            path: screenshotPath,
          });
          artifacts.push({
            kind: "a11y",
            viewport: viewport.name,
            state: state.name,
            path: a11yPath,
          });
        }
      }

      const summaryPayload = {
        component: target.name,
        route: target.route,
        artifactRoot: getComponentAuditDir(),
        consoleErrors,
        pageErrors,
        failedRequests,
        artifacts,
        captures: viewportSummaries,
      };
      const summaryJson = JSON.stringify(summaryPayload, null, 2);
      const summaryPath = await writeComponentArtifact(
        target.name,
        "summary.json",
        summaryJson,
      );
      await testInfo.attach(`${target.name}-summary.json`, {
        contentType: "application/json",
        body: Buffer.from(summaryJson),
      });

      expect.soft(
        consoleErrors,
        `Console errors while auditing ${target.name}. See attached summary JSON.`,
      ).toEqual([]);
      expect.soft(
        pageErrors,
        `Unhandled page errors while auditing ${target.name}. See attached summary JSON.`,
      ).toEqual([]);
      expect.soft(
        failedRequests,
        `Critical request failures while auditing ${target.name}. See attached summary JSON.`,
      ).toEqual([]);
    });
  }
});
