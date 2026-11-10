import { getContext, setContext } from "svelte";

/**
 * Returns the element that scrolls a `Page`'s content, or `null`.
 *
 * `Page` pins its header and footer and scrolls the region between them, not
 * the window. Anything that needs to scroll "the page" — resetting scroll on
 * client-side navigation, a back-to-top button, scrolling a target into view
 * below a sticky bar — needs that element, and should not find it by
 * selecting `.page .content`, which is internal markup.
 */
export type PageScroller = () => HTMLElement | null;

const key = Symbol("contain-page-scroller");

/** Called by `Page`; consumers use `getPageScroller`. */
export function setPageScroller(scroller: PageScroller): void {
  setContext(key, scroller);
}

/**
 * Call during component initialisation, anywhere inside a `Page`. Returns a
 * getter rather than the element because the element does not exist until
 * `Page` has mounted; call it when you need it (in a handler, an effect, or
 * after navigation). It is reactive, so reading it in `$derived` or `$effect`
 * updates once the element exists. Outside a `Page` the getter returns
 * `null` — then the window is what scrolls.
 */
export function getPageScroller(): PageScroller {
  return getContext<PageScroller | undefined>(key) ?? (() => null);
}
