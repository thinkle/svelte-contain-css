import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Page } from "@playwright/test";

export type ComponentAuditTarget = {
  name: string;
  route: string;
};

export type AuditViewport = {
  name: string;
  width: number;
  height: number;
};

const EXCLUDED_DEMOS = new Set([
  "CssVariableDemo",
  "DemoWithCode",
  "DynamicComponent",
]);

export const COMPONENT_AUDIT_VIEWPORTS: AuditViewport[] = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1440, height: 1200 },
];

export async function discoverComponentAuditTargets(
  cwd = process.cwd(),
): Promise<ComponentAuditTarget[]> {
  const demosDir = path.join(cwd, "src", "routes", "demos");
  const entries = await readdir(demosDir, { withFileTypes: true });
  const filter = process.env.COMPONENT_AUDIT_FILTER?.trim().toLowerCase();

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith("Demo.svelte"))
    .map((entry) => entry.name.replace(/\.svelte$/, ""))
    .filter((name) => !EXCLUDED_DEMOS.has(name))
    .map((name) => name.replace(/Demo$/, ""))
    .filter((name) => (filter ? name.toLowerCase().includes(filter) : true))
    .sort((left, right) => left.localeCompare(right))
    .map((name) => ({
      name,
      route: `/svelte-contain-css/component/${name}`,
    }));
}

export async function stabilizeAuditPage(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });

  await page.addInitScript(() => {
    const style = document.createElement("style");
    style.setAttribute("data-component-audit", "true");
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

  await page.route("https://loremflickr.com/**", async (route) => {
    const url = new URL(route.request().url());
    const width = url.pathname.split("/")[1] || "320";
    const height = url.pathname.split("/")[2] || "320";
    const label = url.searchParams.get("lock") || "demo";
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#d9e8f5" />
            <stop offset="100%" stop-color="#f8dcc0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)" />
        <circle cx="50%" cy="45%" r="24%" fill="rgba(255,255,255,0.55)" />
        <text x="50%" y="82%" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#28445c">
          Demo ${label}
        </text>
      </svg>
    `.trim();

    await route.fulfill({
      contentType: "image/svg+xml",
      body: svg,
    });
  });
}

export async function waitForComponentDemo(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");
  await page.waitForFunction(() => {
    const text = document.body.innerText;
    return !text.includes("Loading...") || text.includes("Failed to load the component:");
  });
}

export function getComponentAuditDir() {
  return process.env.COMPONENT_AUDIT_DIR?.trim() || "/tmp/contain-css-component-audit";
}

export function slugifyAuditPart(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function writeComponentArtifact(
  componentName: string,
  relativePath: string,
  body: Uint8Array | string,
) {
  const componentDir = path.join(
    getComponentAuditDir(),
    slugifyAuditPart(componentName),
  );
  const targetPath = path.join(componentDir, relativePath);
  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, body);
  return targetPath;
}
