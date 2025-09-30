<script lang="ts">
  import { onMount } from "svelte";
  export let highlanderMode: boolean = true;
  let wrapper: HTMLDivElement;

  function onAccordionClicked(e: MouseEvent) {
    if (!highlanderMode) {
      return;
    }

    const target = e.target as HTMLElement;

    // Ensure the click is within the current accordion wrapper
    if (target.closest(".accordion-wrapper") !== wrapper) {
      return;
    }

    // Check if the clicked element is a <summary>
    if (target.tagName === "SUMMARY") {
      const details = target.parentElement as HTMLDetailsElement;

      // Check if this <details> is nested inside another <details>
      const parentDetails = details.parentElement?.closest("details");
      if (
        parentDetails &&
        parentDetails.closest(".accordion-wrapper") === wrapper
      ) {
        return;
      }

      // Close all other <details> within the same wrapper
      const allDetails = wrapper.querySelectorAll("details");
      allDetails.forEach((d) => {
        if (d !== details) {
          d.open = false;
        }
      });
    }
  }
</script>

<div
  class="accordion-wrapper"
  on:click={onAccordionClicked}
  bind:this={wrapper}
>
  <slot />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  div {
    @include color-props(accordion, container);
    @include typography-props(accordion, header);
    @include box-props-square-border(accordion-wrapper, container);
    display: flex;
    flex-direction: column;
    gap: var(--accordion-gap, var(--gap));
  }

  div :global(details > summary) {
    @include color-props(accordion-summary, secondary);
    @include box-props-square-border(accordion-summary, container);
    @include clickable(accordion);
    @include focusable();
    cursor: pointer;
    @include typography-props-bare(accordion-summary);
  }
  div :global(details[open] > summary) {
    @include color-props(accordion-summary-open, primary);
    @include typography-props-bare(accordion-summary-open, accordion-summary);
  }
  div :global(details) {
    interpolate-size: allow-keywords;
  }

  div :global(details::details-content) {
    opacity: 0;
    block-size: 0;
    box-sizing: border-box;
    overflow-y: clip;
    transition: var(
      --details-transition,
      content-visibility 300ms allow-discrete,
      opacity 300ms,
      block-size 300ms
    );
  }

  div :global(details[open]::details-content) {
    opacity: 1;
    block-size: auto;
  }
  div :global(details::placeholder) {
    display: none;
  }
  div :global(summary) {
    list-style: var(--details-list-style, none);
    @include color-props(accordion-summary, secondary);
    @include box-props-square(accordion-summary, container);
  }
  div :global(summary::after) {
    content: var(--accordion-icon, "▼");
    float: right;
    transition: transform 0.3s;
  }
  div :global(details[open] > summary::after) {
    transform: var(--accordion-icon-transform, rotateX(180deg));
    content: var(--accordion-open-icon, var(--accordion-icon, "▼"));
  }
</style>
