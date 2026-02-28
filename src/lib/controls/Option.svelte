<script lang="ts">
  /*
    This is an ugly solution.

    We want to support basically writing...

    <select>
      <option><b>Hello</b> world</option>
    </select>

    BUT... svelte5 complains that this is invalid HTML because <option> is not
    allowed to have HTML children. In svelte4 and before, we had no problem and
    the browser handles this fine (when we render a <select> element on mobile,
    it just ignores the markup, and when we render a custom dropdown, we use the
    innerHTML).

    So... to work around this, we now support...

    <option data-html="html-content">text content</option>

    But the ergonomics of that are terrible, so we introduce this component,
    <Option> which allows you to just change your svelte4 <option><b>...</b>...
    to <Option><b>...</b></Option> and it will extract the HTML and text content
    and render the appropriate <option> tag with data-html and text content.

    To do this, we render our text to a hidden div, extract the innerHTML and
    textContent, and then pass those in to the <option> tag.
  */

  export let value: any = undefined;

  let template: HTMLDivElement;

  $: textContent = template ? template.textContent : "";
  $: htmlContent = template ? template.innerHTML : "";
</script>

<option data-html={htmlContent} {value} {...$$restProps}>
  {textContent}
</option>

<div bind:this={template} style="display: none;" class="option-template hidden">
  <slot />
</div>
