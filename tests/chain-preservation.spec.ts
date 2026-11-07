import { test, expect } from "@playwright/test";

const url = "/svelte-contain-css/tests/chain-preservation";

for (const id of ["button", "link", "circle", "tag", "tab"]) {
  test(`${id} text tones follow the final local surface through variant changes`, async ({ page }) => {
    await page.goto(url);
    // Compare final pairs, not a painted color halfway through a transition.
    // The separate transition test below still checks the normal timings.
    await page.addStyleTag({ content: "#tones * { transition: none !important; }" });
    for (const active of [true, false, true]) {
      if (active) await expect(page.getByTestId(id)).toHaveClass(/\bprimary\b/);
      else await expect(page.getByTestId(id)).not.toHaveClass(/\bprimary\b/);
      const colors = await page.getByTestId(id).locator("span").evaluateAll(elements => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const context = canvas.getContext("2d")!;
        return elements.filter(el => ["Danger", "Muted"].includes(el.textContent ?? "")).map(el => {
          context.clearRect(0, 0, 1, 1);
          context.fillStyle = getComputedStyle(el).color;
          context.fillRect(0, 0, 1, 1);
          return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
        });
      });
      // A selected tab now joins its local surface rather than becoming a
      // primary-colored Button. Its nested Text must mix from that actual
      // pair in either state; the other controls retain their role colors.
      const expected = id === "tab"
        ? await page.getByTestId(id).evaluate(el => {
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = 1;
            const ctx = canvas.getContext("2d")!;
            const rgb = (color: string) => {
              ctx.clearRect(0, 0, 1, 1);
              ctx.fillStyle = color;
              ctx.fillRect(0, 0, 1, 1);
              return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3);
            };
            const css = getComputedStyle(el);
            const fg = rgb(css.color);
            const bg = rgb(css.backgroundColor);
            return [
              fg.map((channel, i) => (channel + [200, 0, 0][i]) / 2),
              fg.map((channel, i) => (channel + bg[i]) / 2),
            ];
          })
        : active ? [[200, 100, 100], [110, 115, 120]] : [[105, 5, 5], [125, 125, 125]];
      expect(colors).toHaveLength(2);
      colors.forEach((actual, index) => actual.forEach((channel, c) => expect(Math.abs(channel - expected[index][c]), JSON.stringify({ id, active, colors, expected })).toBeLessThanOrEqual(1)));
      await page.getByTestId("toggle").click();
    }
  });
}

test("factored borders remain local and directional overrides win", async ({ page }) => {
  await page.goto(url);
  await expect(page.getByTestId("parent")).toHaveCSS("border-top-width", "4px");
  await expect(page.getByTestId("parent")).toHaveCSS("border-bottom-width", "6px");
  await expect(page.getByTestId("child")).toHaveCSS("border-top-width", "0px");
  await expect(page.getByTestId("explicit-child")).toHaveCSS("border-top-width", "2px");
  await expect(page.getByTestId("explicit-child")).toHaveCSS("border-bottom-width", "2px");
});

test("factored transitions preserve full timing values and variant precedence", async ({ page }) => {
  await page.goto(url);
  for (const id of ["button", "link", "circle"]) {
    await expect(page.getByTestId(id)).toHaveCSS("transition-duration", "0.12s, 0.12s, 0.12s, 0.12s, 0.12s, 0.12s");
    await expect(page.getByTestId(id)).toHaveCSS("transition-timing-function", "ease-in, ease-in, ease-in, ease-in, ease-in, ease-in");
  }
  await page.locator("#tones").evaluate(el => (el as HTMLElement).style.setProperty("--primary-transition", "240ms linear"));
  // Button's clickable variant accepts a semantic transition; CircleButton's
  // base clickable chain remains component-only, exactly as before.
  await expect(page.getByTestId("button")).toHaveCSS("transition-duration", "0.24s, 0.24s, 0.24s, 0.24s, 0.24s, 0.24s");
  await expect(page.getByTestId("circle")).toHaveCSS("transition-duration", "0.12s, 0.12s, 0.12s, 0.12s, 0.12s, 0.12s");
});
