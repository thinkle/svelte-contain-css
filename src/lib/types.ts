/**
 * Common CSS variable props that can be passed to components.
 * These are converted to CSS custom properties via injectVars().
 */

/** Base style props supported by most components */
export interface BaseStyleProps {
  bg?: string | null;
  fg?: string | null;
  padding?: string | null;
  width?: string | null;
  height?: string | null;
}

/**
 * Logical margin props, shared by any component that lets a caller push
 * space above/below or side-to-side of it. `margin-block`/`margin-inline`
 * are native CSS shorthands that already take one value (both sides equal)
 * or two (start end) -- no separate top/bottom props to remember and no
 * 4-value shorthand order to get wrong.
 *
 * Deliberately NOT part of BaseStyleProps: it is wired into a component's
 * CSS one at a time (see margin-props() in _box.scss), so only components
 * that actually apply it declare it -- a prop that is typed but never read
 * by any CSS is exactly the bug this was introduced to stop repeating (see
 * Bar's marginTop, below).
 */
export interface MarginStyleProps {
  marginBlock?: string | null;
  marginInline?: string | null;
}

/** Extended style props for layout containers */
export interface ContainerStyleProps extends BaseStyleProps, MarginStyleProps {
  maxWidth?: string | null;
  borderRadius?: string | null;
}

/** Style props for bar/row components */
export interface BarStyleProps extends BaseStyleProps, MarginStyleProps {
  justify?: string | null;
  align?: string | null;
  /** @deprecated use `marginBlock` instead -- `"1rem 0"` composes what
   * `marginTop`/`marginBottom` used to do as two props, in the same
   * start/end order. Still supported: Bar composes marginTop/marginBottom
   * into marginBlock for you (with a dev-mode warning) when marginBlock
   * itself is not also given. */
  marginBottom?: string | null;
  /** @deprecated use `marginBlock` instead. See marginBottom. */
  marginTop?: string | null;
}

/** Style props for menu components */
export interface MenuStyleProps extends BaseStyleProps {
  itemPadding?: string | null;
  itemWidth?: string | null;
  itemHeight?: string | null;
  itemFg?: string | null;
  itemBg?: string | null;
  itemEvenFg?: string | null;
  itemEvenBg?: string | null;
  itemActiveFg?: string | null;
  itemActiveBg?: string | null;
}

/** Style props for card components */
export interface CardStyleProps extends BaseStyleProps, MarginStyleProps {
  borderRadius?: string | null;
  width?: string | null;
  height?: string | null;
}

/** Style props for tag components */
export interface TagStyleProps extends BaseStyleProps {
  borderRadius?: string | null;
  fontSize?: string | null;
}

/** Style props for sidebar components */
export interface SidebarStyleProps {
  bg?: string | null;
  fg?: string | null;
  width?: string | null;
}

/** Style props for hero components */
export interface HeroStyleProps extends BaseStyleProps {
  headingFg?: string | null;
  headingBg?: string | null;
}

/** Style props for dialog components */
export interface DialogStyleProps {
  // Dialog uses copyCSSVariables pattern, but base style props can be passed
}

/** Style props for dropdown menu components */
export interface DropdownMenuStyleProps extends BaseStyleProps {
  triggerBg?: string | null;
  triggerFg?: string | null;
  triggerPadding?: string | null;
}

/**
 * Props that let a caller set CSS custom properties directly on a component.
 *
 * NOTE: writing `<Tag --tag-bg="red">` in a template does NOT go through this
 * type -- Svelte intercepts `--*` attributes on components itself and renders
 * `<svelte-css-wrapper style="display: contents; --tag-bg: red;">` around the
 * component. This type covers the remaining path, an object spread
 * (`<Tag {...{"--tag-bg": "red"}}>`), which Svelte cannot detect statically and
 * therefore passes through as an ordinary prop.
 */
export type CssVarProps = {
  [key: `--${string}`]: string | number | null | undefined;
};

/**
 * The standard prop type for a Contain CSS component.
 *
 * Composes the three things every component's props are made of, and -- the
 * reason this exists rather than a bare `&` chain -- removes the element
 * attributes that the style props and the component's own props shadow.
 * `width`, `height` and `align` are real HTML attributes, so intersecting
 * `BaseStyleProps` with `HTMLInputAttributes` the old way produced
 * `(string | null) & (string | number | undefined)` for `width`: a type neither
 * side meant, which silently accepted and rejected the wrong values.
 *
 * @typeParam Attributes - the element's attribute type, e.g. `HTMLButtonAttributes`
 * @typeParam Own - the component's own props (snippets, variant booleans, ...)
 * @typeParam Style - the component's style props, e.g. `BaseStyleProps`
 * @typeParam Owned - attributes the component controls and a caller must not
 *   set, e.g. `"type"` on Slider's range input. Spreading rest props last means
 *   a caller's value would otherwise win over the component's own.
 *
 * @example
 * type Props = ContainProps<
 *   HTMLButtonAttributes,
 *   { primary?: boolean; children?: Snippet },
 *   BaseStyleProps
 * >;
 */
export type ContainProps<
  Attributes,
  Own = {},
  Style = {},
  Owned extends keyof Attributes | string = never,
> = Own &
  Style &
  Omit<Attributes, keyof Own | keyof Style | Owned> &
  CssVarProps;
