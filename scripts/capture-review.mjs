import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const defaults = {
  baseUrl: "http://127.0.0.1:4173/svelte-contain-css",
  colorScheme: "",
  kind: "app",
  outputDir: "artifacts",
  scenario: "incredible-app-shell",
  theme: "light",
};

const options = parseArgs(process.argv.slice(2));
const serverConfig = getServerConfig(options.baseUrl);
const route = `/review/${options.theme}/${options.kind}/${options.scenario}`;
const targetUrl = `${options.baseUrl}${route}`;
const artifactDir = path.join(
  process.cwd(),
  options.outputDir,
  options.kind,
  options.scenario,
  options.theme,
);

let serverProcess;

try {
  const serverWasRunning = await isServerReady(targetUrl);
  if (!serverWasRunning) {
    serverProcess = startDevServer(serverConfig);
    await waitForServer(targetUrl, serverProcess);
  }

  await rm(artifactDir, { force: true, recursive: true });
  await mkdir(artifactDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1200 },
    colorScheme: resolveColorScheme(options),
  });

  const outputs = [];

  try {
    await stabilizePage(page);
    const pageTarget = await gotoReviewPage(page, targetUrl, artifactDir);

    const pageFile = path.join(artifactDir, "page.png");
    await pageTarget.screenshot({ path: pageFile });
    outputs.push({ file: "page.png", kind: "target", name: "page" });

    const actionNames = await getVisibleActionNames(page);

    for (const actionName of actionNames) {
      await gotoReviewPage(page, targetUrl, artifactDir);
      const action = await getVisibleActionLocator(page, actionName);
      const handled = await performAuditAction(page, action);
      if (!handled) {
        await action.click();
      }
      await settleAfterAction(page);

      const visibleTargets = await getVisibleTargetNames(page);
      let capturedVisibleTarget = false;
      for (const targetName of visibleTargets) {
        if (targetName === "page") continue;

        const target = page.locator(`[data-audit-target="${targetName}"]`).first();
        const fileName = `${targetName}.png`;
        await target.screenshot({ path: path.join(artifactDir, fileName) });
        capturedVisibleTarget = true;
        outputs.push({
          action: actionName,
          file: fileName,
          kind: "target",
          name: targetName,
        });
      }

      if (!capturedVisibleTarget) {
        const fileName = `${actionName}.png`;
        await page.screenshot({
          path: path.join(artifactDir, fileName),
          fullPage: false,
        });
        outputs.push({
          action: actionName,
          file: fileName,
          kind: "action",
          name: actionName,
        });
      }
    }

    await writeFile(
      path.join(artifactDir, "manifest.json"),
      JSON.stringify(
        {
          artifactDir,
          generatedAt: new Date().toISOString(),
          route,
          url: targetUrl,
          outputs,
        },
        null,
        2,
      ),
    );
  } finally {
    await browser.close();
  }
} finally {
  if (serverProcess) {
    serverProcess.kill("SIGTERM");
  }
}

function parseArgs(argv) {
  const parsed = { ...defaults };

  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const [key, value] = arg.slice(2).split("=");
    if (!value) continue;

    if (key === "base-url") parsed.baseUrl = value;
    if (key === "color-scheme") parsed.colorScheme = value;
    if (key === "kind") parsed.kind = value;
    if (key === "output-dir") parsed.outputDir = value;
    if (key === "scenario") parsed.scenario = value;
    if (key === "theme") parsed.theme = value;
  }

  return parsed;
}

function resolveColorScheme(options) {
  if (options.colorScheme === "dark" || options.colorScheme === "light") {
    return options.colorScheme;
  }

  if (options.theme === "dark") return "dark";
  return "light";
}

function getServerConfig(baseUrl) {
  const url = new URL(baseUrl);
  return {
    host: url.hostname,
    port: String(url.port || (url.protocol === "https:" ? 443 : 80)),
  };
}

async function getVisibleTargetNames(page) {
  const targetNames = await page
    .locator("[data-audit-target]")
    .evaluateAll((elements) =>
      elements
        .map((element) => element.getAttribute("data-audit-target"))
        .filter((value) => Boolean(value)),
    );

  const visibleTargets = [];
  for (const targetName of targetNames) {
    const locator = page.locator(`[data-audit-target="${targetName}"]`).first();
    if (await locator.isVisible()) {
      visibleTargets.push(targetName);
    }
  }

  return visibleTargets;
}

async function getVisibleActionNames(page) {
  const actionNames = await page
    .locator("[data-audit-action]")
    .evaluateAll((elements) =>
      elements
        .map((element) => element.getAttribute("data-audit-action"))
        .filter((value) => Boolean(value)),
    );

  const visibleActions = [];
  for (const actionName of new Set(actionNames)) {
    const locator = await getVisibleActionLocator(page, actionName);
    if (locator) {
      visibleActions.push(actionName);
    }
  }

  return visibleActions;
}

async function getVisibleActionLocator(page, actionName) {
  const matches = page.locator(`[data-audit-action="${actionName}"]`);
  const count = await matches.count();

  for (let index = 0; index < count; index += 1) {
    const locator = matches.nth(index);
    if (await locator.isVisible()) {
      return locator;
    }
  }

  return null;
}

async function gotoReviewPage(page, targetUrl, artifactDir) {
  await page.goto(targetUrl);
  const pageTarget = page.locator("[data-audit-target='page']").first();
  await pageTarget.waitFor({ state: "attached" });

  if (!(await pageTarget.isVisible())) {
    await writeFile(
      path.join(artifactDir, "debug.html"),
      await page.content(),
    );
    await page.screenshot({
      fullPage: true,
      path: path.join(artifactDir, "debug-page.png"),
    });
    throw new Error(
      `Baseline audit target is attached but not visible for ${targetUrl}.`,
    );
  }

  return pageTarget;
}

async function settleAfterAction(page) {
  await delay(250);
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      }),
  );
}

async function performAuditAction(page, action) {
  const scrollSelector = await action.getAttribute("data-audit-scroll-selector");
  if (!scrollSelector) return false;

  const scrollOffset = Number.parseFloat(
    (await action.getAttribute("data-audit-scroll-offset")) || "0",
  );
  const scrollOffsetVar =
    (await action.getAttribute("data-audit-scroll-offset-var")) || "";

  await page.evaluate(
    ({ selector, offset, offsetVar }) => {
      const target = document.querySelector(selector);
      if (!(target instanceof HTMLElement)) return;

      target.scrollIntoView({ block: "start" });

      let resolvedOffset = offset;
      if (offsetVar) {
        const raw = getComputedStyle(target).getPropertyValue(offsetVar).trim();
        if (raw.endsWith("px")) {
          resolvedOffset += Number.parseFloat(raw);
        } else if (raw) {
          const probe = document.createElement("div");
          probe.style.position = "absolute";
          probe.style.visibility = "hidden";
          probe.style.height = raw;
          document.body.appendChild(probe);
          resolvedOffset += probe.getBoundingClientRect().height;
          probe.remove();
        }
      }

      let current = target.parentElement;
      while (current) {
        const style = getComputedStyle(current);
        const canScroll =
          /(auto|scroll)/.test(style.overflowY) &&
          current.scrollHeight > current.clientHeight;

        if (canScroll) {
          current.scrollTop += resolvedOffset;
          return;
        }

        current = current.parentElement;
      }

      const scrollingElement = document.scrollingElement;
      if (scrollingElement instanceof HTMLElement) {
        scrollingElement.scrollTop += resolvedOffset;
      } else {
        window.scrollBy(0, resolvedOffset);
      }
    },
    { selector: scrollSelector, offset: scrollOffset, offsetVar: scrollOffsetVar },
  );
  return true;
}

async function isServerReady(url) {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

function startDevServer({ host, port }) {
  return spawn(
    "npm",
    ["run", "dev", "--", "--port", port, "--strictPort", "--host", host],
    {
      cwd: process.cwd(),
      env: process.env,
      stdio: "pipe",
    },
  );
}

async function stabilizePage(page) {
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
      }
    `;

    document.addEventListener("DOMContentLoaded", () => {
      document.head.appendChild(style);
    });
  });
}

async function waitForServer(url, server) {
  const deadline = Date.now() + 30_000;
  let stderr = "";

  server.stderr?.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(
        `Dev server exited before becoming ready.\n${stderr.trim()}`.trim(),
      );
    }

    if (await isServerReady(url)) {
      return;
    }

    await delay(250);
  }

  throw new Error(`Timed out waiting for ${url}\n${stderr.trim()}`.trim());
}
