import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * <Surface>: a plain element that declares the surface it paints.
 *
 * Contain can't read an ancestor's painted color, so a TabBar inside a
 * hand-painted div resolves against the page and shows a band. Surface
 * paints a tier or role through color-props and publishes the pair, and it
 * must change nothing else about the box -- in particular no overflow, which
 * would stop a sticky Table head inside it from sticking.
 *
 *   npm run dev
 *   http://localhost:5173/svelte-contain-css/tests/surface
 */

const url = "/svelte-contain-css/tests/surface";

// Normalize color() / color-mix() output to pixels.
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

async function open(page: Page, palette = "light") {
  await page.goto(url);
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Palette").selectOption(palette);
}

for (const palette of ["light", "dark"]) {
  test(`${palette}: a TabBar inside a raised Surface matches the raised tier`, async ({ page }) => {
    await open(page, palette);
    const card = page.getByTestId("card");
    const surface = page.getByTestId("raised");
    const raised = await rgba(card);
    // The tier is the raised one, not the page's.
    await expect.poll(() => rgba(surface)).toEqual(raised);
    expect(raised).not.toEqual(await rgba(page.locator("body")));

    const strip = surface.locator(".tabs .bar");
    const active = strip.getByRole("button", { name: "Roster", exact: true });
    await expect.poll(() => rgba(strip)).toEqual(raised);
    await expect.poll(() => rgba(active)).toEqual(raised);
    expect(await rgba(active, "color")).toEqual(await rgba(surface, "color"));
  });
}

test("a role Surface paints the role, and a Surface nested in it does not inherit the role", async ({ page }) => {
  await open(page);
  const role = page.getByTestId("role");
  const primaryBg = await page.evaluate(() => {
    const probe = document.createElement("div");
    probe.style.backgroundColor = "var(--primary-bg)";
    document.body.append(probe);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = getComputedStyle(probe).backgroundColor;
    ctx.fillRect(0, 0, 1, 1);
    probe.remove();
    return [...ctx.getImageData(0, 0, 1, 1).data];
  });
  await expect.poll(() => rgba(role)).toEqual(primaryBg);
  await expect.poll(() => rgba(role.locator(".tabs .bar").first())).toEqual(await rgba(role));

  // The heading takes the role's foreground (an unpinned role surface), not
  // a tint toward primary, which can't reach contrast on primary.
  expect(await rgba(role.locator("h2"), "color")).toEqual(await rgba(role, "color"));
  // Text tones mix from this surface, not the page.
  expect(await rgba(page.getByTestId("role-muted"), "color")).not.toEqual(
    await rgba(page.locator("body"), "color"),
  );

  const nested = page.getByTestId("nested");
  expect(await rgba(nested)).not.toEqual(await rgba(role));
});

test("forwards attributes, renders the requested element and merges class", async ({ page }) => {
  await open(page);
  const el = page.getByTestId("as");
  expect(await el.evaluate((n) => n.tagName)).toBe("SECTION");
  await expect(el).toHaveAttribute("aria-label", "Section surface");
  await expect(el).toHaveClass(/\bpaint\b/);
  await expect(el).toHaveClass(/\bmine\b/);
  await expect(el).toHaveClass(/\btier-surface\b/);
});

test("as=details takes the element's own attributes and paints its tier", async ({ page }) => {
  await open(page);
  const el = page.getByTestId("details");
  expect(await el.evaluate((n) => n.tagName)).toBe("DETAILS");
  expect(await el.evaluate((n) => (n as HTMLDetailsElement).open)).toBe(true);
  await expect(el).toHaveClass(/\btier-surface-sunken\b/);
  expect(await el.evaluate((n) => getComputedStyle(n).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
});

test("box geometry is identical to a plain div", async ({ page }) => {
  await open(page);
  const plain = page.getByTestId("plain");
  const painted = page.getByTestId("painted");
  const box = (l: Locator) =>
    l.evaluate((n) => {
      const r = n.getBoundingClientRect();
      const s = getComputedStyle(n);
      return {
        width: r.width,
        height: r.height,
        padding: s.padding,
        margin: s.margin,
        border: s.borderWidth,
        overflow: s.overflow,
        display: s.display,
        position: s.position,
        containerType: s.containerType,
        contain: s.contain,
        boxShadow: s.boxShadow,
        radius: s.borderRadius,
      };
    });
  expect(await box(painted)).toEqual(await box(plain));
  // And it actually painted.
  expect(await rgba(painted)).not.toEqual(await rgba(plain));
});

test("a sticky Table head inside a Surface still sticks", async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 600 });
  await open(page);
  const surface = page.getByTestId("sticky");
  const head = surface.locator(".table-head-sticky");
  const surfaceTop = await surface.evaluate((n) => n.getBoundingClientRect().top + window.scrollY);
  // Scroll well into the table.
  await page.evaluate((y) => window.scrollTo(0, y + 600), surfaceTop);
  await expect
    .poll(() =>
      head.evaluate((el) => {
        const expected = parseFloat(getComputedStyle(el).top);
        return Math.abs(el.getBoundingClientRect().top - expected);
      }),
    )
    .toBeLessThanOrEqual(1);
});
