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

/** Extended style props for layout containers */
export interface ContainerStyleProps extends BaseStyleProps {
  margin?: string | null;
  maxWidth?: string | null;
  borderRadius?: string | null;
}

/** Style props for bar/row components */
export interface BarStyleProps extends BaseStyleProps {
  justify?: string | null;
  align?: string | null;
  marginBottom?: string | null;
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
export interface CardStyleProps extends BaseStyleProps {
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
export interface DropdownMenuStyleProps extends BaseStyleProps {}
