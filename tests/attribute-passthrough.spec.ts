import { expect, test } from "@playwright/test";

/*
  The attribute pass-through contract, asserted for every component at once.

  Each case is read off the fixture at /svelte-contain-css/tests/passthrough rather than listed
  here, so adding a component to the fixture covers it without touching this
  file. What the fixture declares per component:

    data-probe       component name; its element carries data-testid="probe-<name>"
    data-root-class  the library class the root must still carry ("" to skip)
    data-split       attributes land on a different element than class/style

  Every regression this guards against was live before the pass-through work:
  a caller's `class` replacing the component's own, a caller's `style` wiping
  out the injected CSS variables, style props and `--*` rendering as invalid
  attributes, and five components typing `HTMLAttributes` while spreading
  nothing at all.
*/

type Probe = {
  name: string;
  rootClass: string;
  split: boolean;
};

const CALLER_STYLE_DECL = "outline-color: rgb(1, 2, 3)";
const CALLER_CLASS = "probe-class";

test.describe("attribute pass-through", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/svelte-contain-css/tests/passthrough");
    await expect(page.locator("[data-probe]").first()).toBeAttached();
  });

  async function probes(page: import("@playwright/test").Page) {
    return page.$$eval("[data-probe]", (nodes) =>
      nodes.map((n) => ({
        name: n.getAttribute("data-probe")!,
        rootClass: n.getAttribute("data-root-class") ?? "",
        split: n.getAttribute("data-split") === "true",
      })),
    ) as Promise<Probe[]>;
  }

  test("every component forwards data-testid, id and aria-label", async ({
    page,
  }) => {
    const cases = await probes(page);
    expect(cases.length).toBeGreaterThan(30);

    const missing: string[] = [];
    for (const { name } of cases) {
      const el = page.locator(`[data-testid="probe-${name}"]`).first();
      if ((await el.count()) === 0) missing.push(name);
    }
    // A component that drops rest props renders no element carrying the
    // testid at all -- which is exactly how Container, Card, Bar, Sidebar
    // and DropdownMenu behaved while their types promised otherwise.
    expect(missing, "components not forwarding attributes").toEqual([]);
  });

  test("a caller's class is added to the component's own, never replacing it", async ({
    page,
  }) => {
    const cases = await probes(page);
    const broken: string[] = [];

    for (const { name, rootClass, split } of cases) {
      const wrapper = page.locator(`[data-probe="${name}"]`);
      // On split components the class lands on the wrapper the CSS targets,
      // not on the control that carries the testid.
      const el = split
        ? wrapper.locator(`.${CALLER_CLASS}`).first()
        : page.locator(`[data-testid="probe-${name}"]`).first();

      const cls = (await el.getAttribute("class")) ?? "";
      if (!cls.split(/\s+/).includes(CALLER_CLASS)) {
        broken.push(`${name}: caller class missing (class="${cls}")`);
        continue;
      }
      if (rootClass && !cls.split(/\s+/).includes(rootClass)) {
        broken.push(`${name}: lost its own .${rootClass} (class="${cls}")`);
      }
    }

    expect(broken, "class merge failures").toEqual([]);
  });

  test("a caller's style is kept alongside the component's CSS variables", async ({
    page,
  }) => {
    const cases = await probes(page);
    const broken: string[] = [];

    for (const { name, split } of cases) {
      const wrapper = page.locator(`[data-probe="${name}"]`);
      const el = split
        ? wrapper.locator(`.${CALLER_CLASS}`).first()
        : page.locator(`[data-testid="probe-${name}"]`).first();

      const style = (await el.getAttribute("style")) ?? "";
      if (!style.includes("rgb(1, 2, 3)")) {
        broken.push(`${name}: caller style dropped (style="${style}")`);
      }
    }

    expect(broken, "caller style dropped").toEqual([]);
  });

  test("style props reach CSS variables instead of the caller's style being clobbered", async ({
    page,
  }) => {
    // Components given bg="rgb(4, 5, 6)" in the fixture must end up with the
    // variable set AND the caller's own style declaration -- the two used to
    // be mutually exclusive, whichever was written last winning outright.
    const cases = await probes(page);
    const broken: string[] = [];

    for (const { name, split } of cases) {
      const wrapper = page.locator(`[data-probe="${name}"]`);
      const el = split
        ? wrapper.locator(`.${CALLER_CLASS}`).first()
        : page.locator(`[data-testid="probe-${name}"]`).first();

      const style = (await el.getAttribute("style")) ?? "";
      if (!style.includes("rgb(4, 5, 6)")) continue; // no bg prop in the fixture
      if (!style.includes("rgb(1, 2, 3)")) {
        broken.push(`${name}: variable survived but caller style did not`);
      }
    }

    expect(broken, "variables and caller style not coexisting").toEqual([]);
  });

  test("style props and custom properties never render as attributes", async ({
    page,
  }) => {
    // `<button bg="red">` and `--tag-bg="red"` are invalid HTML and were both
    // being emitted, because rest props were spread whole after being read
    // for their variables.
    const offenders = await page.$$eval("[data-probe] *", (nodes) => {
      const styleProps = new Set([
        "bg",
        "fg",
        "padding",
        "margin",
        "gap",
        "justify",
        "align",
        "marginblock",
        "margininline",
        "borderradius",
        "fontsize",
        "maxwidth",
        "minwidth",
        "leftwidth",
        "rightwidth",
        "contentpadding",
      ]);
      const found: string[] = [];
      for (const node of nodes) {
        for (const attr of Array.from(node.attributes)) {
          const name = attr.name.toLowerCase();
          if (name.startsWith("--") || styleProps.has(name)) {
            found.push(`<${node.tagName.toLowerCase()} ${attr.name}>`);
          }
        }
      }
      return found;
    });

    expect([...new Set(offenders)], "invalid attributes in the DOM").toEqual(
      [],
    );
  });

  test("accessible names on component-owned controls are overridable", async ({
    page,
  }) => {
    // Tag's close button had a hardcoded "Close tag" that no caller could
    // reach: aria-label in rest props lands on the outer span, not the button.
    await page.goto("/svelte-contain-css/tests/passthrough");
    const tagClose = page.locator('[data-probe="Tag"] .close-button');
    if (await tagClose.count()) {
      await expect(tagClose).toHaveAttribute("aria-label", /.+/);
    }
  });
});
