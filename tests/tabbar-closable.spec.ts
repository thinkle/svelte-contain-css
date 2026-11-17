import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * A TabItem with `onclose` shows a close button as a SIBLING of its own
 * button, reads as one tab, and closes by click, Delete or middle-click.
 */
const URL = "/svelte-contain-css/tests/tabbar-closable";

async function rgba(el: Locator, property = "background-color") {
  return el.evaluate((node, property) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = getComputedStyle(node).getPropertyValue(property);
    ctx.fillRect(0, 0, 1, 1);
    return [...ctx.getImageData(0, 0, 1, 1).data];
  }, property);
}
// The log renders after a tick, so assert with a retrying matcher.
const expectLog = (page: Page, text: string) =>
  expect(page.getByTestId("log")).toHaveText(text, { useInnerText: true });

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 800 });
  await page.goto(URL);
  await page.waitForLoadState("networkidle");
});

test("close button exists, with its name, only when onclose is set", async ({ page }) => {
  const bar = page.getByTestId("bar");
  await expect(bar.getByRole("button", { name: "Close Brandy Balls" })).toHaveCount(1);
  await expect(bar.getByRole("button", { name: "Close tab" })).toHaveCount(1); // default name
  await expect(bar.locator(".tab")).toHaveCount(4);
  await expect(bar.locator(".tab.closable")).toHaveCount(2);
  // The non-closable tab has the same DOM as before: one button, no extras.
  const control = bar.locator(".tab:not(.closable)").first();
  expect(await control.evaluate((e) => e.children.length)).toBe(1);
  expect(await control.evaluate((e) => getComputedStyle(e).display)).toBe("contents");
});

test("the close button is a sibling of the tab button, never nested", async ({ page }) => {
  const tab = page.getByTestId("bar").locator(".tab.closable").first();
  expect(await tab.evaluate((e) => [...e.children].map((c) => c.tagName))).toEqual(["BUTTON", "BUTTON"]);
  expect(await tab.locator("button button").count()).toBe(0);
});

test("clicking close calls onclose and does not activate the tab", async ({ page }) => {
  await page.getByTestId("bar").getByRole("button", { name: "Close tab" }).click();
  await expectLog(page, "close:b");
});

test("clicking the tab calls onclick and not onclose", async ({ page }) => {
  await page.getByTestId("bar").getByRole("button", { name: "Second", exact: true }).click();
  await expectLog(page, "click:b");
});

test("Delete on the focused tab and middle-click close it", async ({ page }) => {
  const tab = page.getByTestId("bar").getByRole("button", { name: "Brandy Balls", exact: true });
  await tab.focus();
  await page.keyboard.press("Delete");
  await expectLog(page, "close:a");
  await page.getByTestId("bar").getByRole("button", { name: "Second", exact: true }).click({ button: "middle" });
  await expectLog(page, "close:a,close:b");
});

test("Delete and middle-click do nothing on a tab without onclose", async ({ page }) => {
  const control = page.getByTestId("control");
  await control.focus();
  await page.keyboard.press("Delete");
  await control.click({ button: "middle" });
  await expectLog(page, "");
});

test("Tab order is the tab, then its close button, then the next tab", async ({ page }) => {
  const bar = page.getByTestId("bar");
  await bar.getByRole("button", { name: "Brandy Balls", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(bar.getByRole("button", { name: "Close Brandy Balls" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(bar.getByRole("button", { name: "Second", exact: true })).toBeFocused();
});

const themes = ["default", "light", "dark", "bootstrap", "forest", "material", "quiet", "underlined"];
for (const theme of themes) {
  test(`${theme}: the close button matches the tab button, inactive, hover and active`, async ({ page }) => {
    await page.getByLabel("Theme").selectOption(theme);
    await page.waitForTimeout(600);
    const bar = page.getByTestId("bar");
    const props = ["background-color", "color", "border-top-color", "border-bottom-width", "border-top-width"];
    // Colours transition (300ms); compare the pair only once they settle.
    const check = async (tabName: string, close: string, label: string) => {
      const tab = bar.getByRole("button", { name: tabName, exact: true });
      const x = bar.getByRole("button", { name: close, exact: true });
      for (const p of props) {
        await expect
          .poll(async () => JSON.stringify(await rgba(x, p)) === JSON.stringify(await rgba(tab, p)), {
            message: `${label} ${p}`,
          })
          .toBe(true);
      }
      expect((await x.boundingBox())!.height, label).toBe((await tab.boundingBox())!.height);
    };
    await page.mouse.move(0, 0);
    await check("Second", "Close tab", "inactive"); // inactive
    await check("Brandy Balls", "Close Brandy Balls", "active"); // active
    // hover over either half lights both
    const second = bar.getByRole("button", { name: "Second", exact: true });
    await second.hover();
    await page.waitForTimeout(500);
    await check("Second", "Close tab", "hover tab");
    await bar.getByRole("button", { name: "Close tab" }).hover();
    await page.waitForTimeout(500);
    await check("Second", "Close tab", "hover close");
    await bar.getByRole("button", { name: "Close Brandy Balls" }).hover();
    await page.waitForTimeout(500);
    await check("Brandy Balls", "Close Brandy Balls", "hover active");
  });
}

test("a non-closable tab is unchanged: same size and colours as before the feature", async ({ page }) => {
  const bar = page.getByTestId("bar");
  const control = bar.getByRole("button", { name: "Control", exact: true });
  const plain = bar.getByRole("button", { name: "Plain", exact: true });
  const a = await control.boundingBox();
  const b = await plain.boundingBox();
  // Same height as its neighbours, and the same (inactive) colours as another
  // plain tab; width follows the label only (no reserved close space).
  expect(a!.height).toBe(b!.height);
  expect(await rgba(plain)).toEqual(await rgba(bar.getByRole("button", { name: "Second", exact: true })));
  const cs = await control.evaluate((e) => {
    const s = getComputedStyle(e);
    return {
      pr: s.paddingRight, pl: s.paddingLeft, brr: s.borderTopRightRadius,
      bl: s.borderRightWidth, wrap: s.whiteSpace,
    };
  });
  expect(cs.pr).toBe(cs.pl);
  expect(cs.brr).not.toBe("0px");
  expect(cs.bl).toBe("1px");
  expect(await control.evaluate((e) => e.parentElement!.outerHTML.includes("tab-close-button"))).toBe(false);
  expect(await control.evaluate((e) => e.parentElement!.className)).toMatch(/^tab\b(?!.*closable)/);
});

test("closable tab silhouette: outer corners rounded, inner join square", async ({ page }) => {
  const tab = page.getByTestId("bar").locator(".tab.closable").nth(1);
  const [main, close] = await tab.locator("button").all();
  expect(await main.evaluate((e) => getComputedStyle(e).borderTopRightRadius)).toBe("0px");
  expect(await close.evaluate((e) => getComputedStyle(e).borderTopLeftRadius)).toBe("0px");
  expect(await main.evaluate((e) => getComputedStyle(e).borderTopLeftRadius)).not.toBe("0px");
  expect(await close.evaluate((e) => getComputedStyle(e).borderTopRightRadius)).not.toBe("0px");
  const m = (await main.boundingBox())!;
  const c = (await close.boundingBox())!;
  expect(Math.abs(m.x + m.width - c.x)).toBeLessThan(0.6); // flush, no seam
});

test("in a scrolling TabBar a closable tab keeps its label on one line and full width", async ({ page }) => {
  const scroll = page.getByTestId("scroll");
  const tabs = scroll.locator(".tab.closable");
  expect(await tabs.count()).toBe(8);
  for (const i of [0, 7]) {
    const label = tabs.nth(i).locator("button").first();
    const lh = await label.evaluate((e) => parseFloat(getComputedStyle(e).lineHeight) || 0);
    const box = (await label.boundingBox())!;
    expect(box.height).toBeLessThan(lh * 2 + 20); // one line
    expect(await label.evaluate((e) => getComputedStyle(e).whiteSpace)).toBe("nowrap");
    expect(await tabs.nth(i).evaluate((e) => getComputedStyle(e).flexShrink)).toBe("0");
    expect(box.width).toBeGreaterThan(150);
  }
  const bar = scroll.locator(".bar");
  expect(await bar.evaluate((e) => e.scrollWidth > e.clientWidth)).toBe(true);
});

test("close hit target is at least as large as Tag's (24px)", async ({ page }) => {
  const box = (await page.getByTestId("bar").getByRole("button", { name: "Close tab" }).boundingBox())!;
  expect(box.width).toBeGreaterThanOrEqual(24);
  expect(box.height).toBeGreaterThanOrEqual(24);
});

test("close hover uses a foreground scrim, not the tab fill", async ({ page }) => {
  const x = page.getByTestId("bar").getByRole("button", { name: "Close tab" });
  await x.hover();
  await page.waitForTimeout(400);
  const scrim = await x.evaluate((e) => getComputedStyle(e, "::before").backgroundColor);
  expect(scrim).not.toBe("rgba(0, 0, 0, 0)");
  expect(scrim).not.toBe("transparent");
});

test("close button focus ring is visible and inside the clipped TabBar", async ({ page }) => {
  const bar = page.getByTestId("bar");
  const x = bar.getByRole("button", { name: "Close Brandy Balls" });
  await bar.getByRole("button", { name: "Brandy Balls", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(x).toBeFocused();
  const ring = await x.evaluate((e) => {
    const s = getComputedStyle(e);
    return { style: s.outlineStyle, width: parseFloat(s.outlineWidth), offset: parseFloat(s.outlineOffset), shadow: s.boxShadow };
  });
  expect(ring.style).not.toBe("none");
  expect(ring.width).toBeGreaterThan(0);
  expect(ring.offset).toBeLessThanOrEqual(0); // drawn inside the button
  expect(ring.shadow === "none" || /\b0px 0px 0px 0px$/.test(ring.shadow)).toBe(true); // no outer spread for the bar to clip
  const xb = (await x.boundingBox())!;
  const bb = (await bar.locator(".bar").boundingBox())!;
  expect(xb.y).toBeGreaterThanOrEqual(bb.y - 0.5);
  expect(xb.y + xb.height).toBeLessThanOrEqual(bb.y + bb.height + 0.5);
});
