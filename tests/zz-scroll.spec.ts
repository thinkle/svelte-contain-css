import { test, expect } from "@playwright/test";

test("scroll numbers", async ({ page }) => {
  await page.goto("/svelte-contain-css/tests/tooltip-anchor");
  await page.waitForTimeout(700);
  const wrapper = page.getByTestId("anchor-plain");
  const tip = wrapper.locator(".tooltip:not(.measure)");
  const box = (await wrapper.boundingBox())!;
  await page.mouse.move(2, 2);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 });
  await page.waitForTimeout(400);
  console.log("OPEN?", await tip.evaluate((el) => el.matches(":popover-open")));
  const b4 = await tip.boundingBox();
  const t4 = await wrapper.boundingBox();
  await page.evaluate(() => window.scrollBy(0, 120));
  await page.waitForTimeout(300);
  console.log("OPEN AFTER?", await tip.evaluate((el) => el.matches(":popover-open")));
  const af = await tip.boundingBox();
  const ta = await wrapper.boundingBox();
  console.log("TIP", JSON.stringify(b4?.y), "->", JSON.stringify(af?.y));
  console.log("TARGET", JSON.stringify(t4?.y), "->", JSON.stringify(ta?.y));
  console.log("SCROLLY", await page.evaluate(() => window.scrollY));
});
