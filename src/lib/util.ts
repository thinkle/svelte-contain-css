import { cssProperties } from "./cssprops";

/**
 * Build the `--prefix-name` CSS variable declarations for a component.
 *
 * Kept separate from {@link elementProps} only so a component that composes its
 * style string by hand (Dialog, which also copies variables across a portal)
 * can reuse the naming rules. Prefer `elementProps` everywhere else.
 */
function buildVars(
  props: Record<string, any>,
  prefix: string,
  varList: readonly string[],
): string {
  let cssVars = "";
  for (const name of varList) {
    const value = props[name];
    // `0` is a meaningful length, so only null/undefined/"" are skipped.
    if (value == null || value === "") continue;
    cssVars += `--${prefix}-${toKebabCase(name)}: ${value};`;
  }
  for (const key in props) {
    // Custom properties arriving via an object spread -- see CssVarProps.
    if (key.startsWith("--")) cssVars += `${key}: ${props[key]};`;
  }
  return cssVars;
}

/**
 * Split a component's rest props into the attributes that belong on its root
 * element, with the component's CSS variables and the caller's own `style`
 * merged into a single `style` attribute.
 *
 * This is the one place the library's attribute pass-through contract lives.
 * It exists because spreading raw rest props gets three things wrong at once:
 *
 * 1. **Style props leaked as attributes.** `bg`, `fg`, `padding` and friends are
 *    read for their CSS variables but were then spread too, rendering invalid
 *    `<button bg="red">`. Names in `varList` are consumed here, never emitted.
 * 2. **The caller's `style` clobbered the variables.** `<Tag bg="red" style="margin:0">`
 *    dropped `--tag-bg` entirely, because the spread's `style` overwrote the
 *    component's. Both are concatenated instead, caller last so their
 *    declarations win without erasing the variables.
 * 3. **Custom properties leaked as attributes.** A spread `{"--tag-bg": "red"}`
 *    rendered a literal `--tag-bg="red"` attribute. They become declarations.
 *
 * `class` is deliberately NOT handled here. Merging it in the template as
 * `class={["tag", className]}` keeps the component's own class literal in the
 * markup, which is what lets the compiler's CSS pruning see that `.tag` is used.
 *
 * @param props - the component's rest props. Pass style props that were
 *   destructured out back in explicitly (`{ bg, fg, ...restProps }`) or their
 *   variables will not be emitted.
 * @param prefix - CSS variable prefix, e.g. `"tag"` for `--tag-bg`
 * @param varList - prop names to convert into `--prefix-name` declarations
 * @param extraVars - variables the component computes itself, e.g.
 *   `--slider-percent`. Placed after the prop variables and before the
 *   caller's `style`, so a caller can still override it.
 *
 * @example
 * const el = $derived(elementProps(restProps, "tag", ["bg", "fg", "padding"]));
 * // <span class={["tag", className]} class:primary {...el}>
 */
export function elementProps(
  props: Record<string, any>,
  prefix: string,
  varList: readonly string[] = [],
  extraVars = "",
): Record<string, unknown> {
  const attrs: Record<string, unknown> = {};
  for (const key in props) {
    if (key.startsWith("--")) continue; // becomes a declaration, not an attribute
    if (key === "style") continue; // merged below
    if (varList.includes(key)) continue; // a style prop, not an attribute
    attrs[key] = props[key];
  }
  const style =
    buildVars(props, prefix, varList) + extraVars + (props.style ?? "");
  if (style) attrs.style = style;
  return attrs;
}

/**
 * Build only the CSS variable string, for the rare component that cannot put
 * the result on an element it also spreads onto.
 */
export function injectVars(
  props: Record<string, any>,
  prefix: string,
  varList: readonly string[],
): string {
  return buildVars(props, prefix, varList);
}

function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function copyCSSVariables(
  origin: HTMLElement,
  target: HTMLElement,
  variableList: string[] = cssProperties,
) {
  const styles = getComputedStyle(origin);
  for (let v of variableList) {
    target.style.setProperty(`--${v}`, styles.getPropertyValue(`--${v}`));
  }
}
