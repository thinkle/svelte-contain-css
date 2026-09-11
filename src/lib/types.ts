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
