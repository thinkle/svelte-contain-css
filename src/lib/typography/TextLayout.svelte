<div>
  <slot />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  div {
    @include typography-container-props(body, text);
  }
  /*
  div :global(p) {
    @include typography-props(paragraph, text, body, container);
    @include color-props(paragraph, text, body, container);
    @include box-props-square(paragraph, text, body, container);
  }*/
  /*
  div :global(h1),
  div :global(h2),
  div :global(h3),
  div :global(h4),
  div :global(h5),
  div :global(h6) {
    @include typography-props(heading);
    @include color-props(heading);
  }*/
  /*
  div :global(h1:first-child),
  div :global(h2:first-child),
  div :global(h3:first-child),
  div :global(h4:first-child),
  div :global(h5:first-child),
  div :global(h6:first-child) {
    @include typography-props(first-heading, heading, text, body, container);
    @include color-props(first-heading, heading, text, body, container);
  }

  div :global(p:first-of-type),
  div :global(h1 + p),
  div :global(h2 + p),
  div :global(h3 + p),
  div :global(h4 + p),
  div :global(h5 + p),
  div :global(h6 + p) {
    @include typography-props(
      first-paragraph,
      paragraph,
      text,
      body,
      container
    );
  }
    */

  div :global(code) {
    @include typography-props(code);
    text-wrap: nowrap;
  }
</style>
