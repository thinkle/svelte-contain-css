/**
 * The style-prop shorthands, grouped to mirror the SCSS mixins that make them
 * readable.
 *
 * The problem this solves: which shorthands a component accepted used to be a
 * hand-maintained list in each component, drifting from the mixins its CSS
 * actually included. Tag exposed `fontSize` while the other 23 components
 * whose CSS includes a typography mixin exposed none of it -- `--button-font-
 * weight` resolved perfectly well, there was just no prop for it. In the other
 * direction, FormItem injected three variables no stylesheet read at all.
 *
 * So each group below names one mixin, and a component's prop list is the
 * union of the groups for the mixins its own CSS includes. "Which shorthands
 * does this component take" stops being a decision and becomes a consequence.
 *
 * The prop types are derived from these same arrays via `StyleProps<>`, so the
 * type and the runtime list cannot disagree -- adding a name to the array is
 * what adds the prop.
 *
 * A shorthand is only safe when the element the component renders has no HTML
 * attribute of that name: `ContainProps` resolves the clash by dropping the
 * attribute, which is right for a deprecated or meaningless one and wrong for
 * `<progress max>` or `<option label>`. That is why the size group is applied
 * per component rather than being folded into the others, and why Progress's
 * accessible-name prop is `progressLabel`.
 */

/** Every style prop takes a CSS value, or null/undefined to leave it unset. */
export type StyleProps<T extends readonly string[]> = {
  [K in T[number]]?: string | null;
};

/** `@include color-props(<prefix>, ...)` */
export const COLOR_VARS = ["bg", "fg"] as const;

/** `@include padding-props(...)`, and the box-props family that includes it */
export const PADDING_VARS = ["padding"] as const;

/** The border-radius the box-props family sets alongside padding */
export const RADIUS_VARS = ["borderRadius"] as const;

/** `@include margin-props(<prefix>, ...)` */
export const MARGIN_VARS = ["marginBlock", "marginInline"] as const;

/** `@include gap-props(<prefix>, ...)` */
export const GAP_VARS = ["gap"] as const;

/**
 * `@include typography-props(...)` and its `-bare` / `-bold` variants.
 *
 * `fontSize` was the only one of these ever exposed as a prop, and only on
 * Tag. The rest resolved in CSS the whole time.
 */
export const TYPOGRAPHY_VARS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "textAlign",
  "textTransform",
  "textDecoration",
  "fontVariant",
] as const;

/**
 * `@include typography-container-props(...)`, which is typography-props plus
 * the readable measure it imposes on prose children.
 */
export const TYPOGRAPHY_CONTAINER_VARS = [
  ...TYPOGRAPHY_VARS,
  "lineWidth",
] as const;

/**
 * `@include box-size-props(<prefix>, ...)`.
 *
 * Deliberately NOT part of any other group: `width` and `height` are real HTML
 * attributes on `<input>`, `<img>`, `<canvas>` and `<iframe>`, so a component
 * rendering one of those must not shadow them. Applied per component.
 */
export const SIZE_VARS = [
  "width",
  "minWidth",
  "maxWidth",
  "height",
  "minHeight",
  "maxHeight",
] as const;

export type ColorStyleProps = StyleProps<typeof COLOR_VARS>;
export type PaddingStyleProps = StyleProps<typeof PADDING_VARS>;
export type RadiusStyleProps = StyleProps<typeof RADIUS_VARS>;
export type GapStyleProps = StyleProps<typeof GAP_VARS>;
export type TypographyStyleProps = StyleProps<typeof TYPOGRAPHY_VARS>;
export type TypographyContainerStyleProps = StyleProps<
  typeof TYPOGRAPHY_CONTAINER_VARS
>;
export type SizeStyleProps = StyleProps<typeof SIZE_VARS>;
