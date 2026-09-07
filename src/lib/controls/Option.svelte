<script lang="ts">
  /*
    This is an ugly solution.

    We want to support basically writing...

    <select>
      <option><b>Hello</b> world</option>
    </select>

    BUT... svelte5 complains that this is invalid HTML because <option> is not allowed to have HTML children. In svelte4 and before, we had no problem and 
    the browser handles this fine (when we render a <select> element on mobile, 
    it just ignores the markup, and when we render a custom dropdown, we use the innerHTML).

    So... to work around this, we now support...

    <option data-html="html-content">text content</option>

    But the ergonomics of that are terrible, so we introduce this component,
    <Option> which allows you to just change your svelte4 <option><b>...</b>...
    to <Option><b>...</b></Option> and it will extract the HTML and text content
    and render the appropriate <option> tag with data-html and text content.

    To do this, we render our text to a hidden div, extract the innerHTML and textContent, and then pass those in to the <option> tag.

  */
  import type { HTMLOptionAttributes } from "svelte/elements";

  type Props = {
    children?: import("svelte").Snippet;
    value?: any;
  } & Omit<HTMLOptionAttributes, "value">;

  let { children, value, ...restProps }: Props = $props();

  let template: HTMLDivElement | undefined = $state();

  // Extracted from the rendered children, in the DOM.
  let textContent = $state("");
  let htmlContent = $state("");

  function syncFromTemplate() {
    if (!template) return;
    textContent = template.textContent ?? "";
    htmlContent = template.innerHTML;
  }

  /*
    These have to be read back out of the DOM, and a $derived would only
    recompute when `template` itself changed -- which it never does once the
    element is bound. So rendering different content into the snippet (renaming
    a label, say) left the <option> showing whatever it was first given.

    Watching the template covers that: any change to the rendered children
    re-extracts the html and text.
  */
  $effect(() => {
    if (!template) return;
    syncFromTemplate();
    const observer = new MutationObserver(syncFromTemplate);
    observer.observe(template, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });
    return () => observer.disconnect();
  });
</script>

<option data-html={htmlContent} {value} {...restProps}>
  {@html textContent}
</option>

<div bind:this={template} style="display: none;" class="option-template hidden" aria-hidden="true">
  {@render children?.()}
</div>
