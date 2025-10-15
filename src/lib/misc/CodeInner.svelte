<script lang="ts">
  import "prismjs";
  import Prism from "svelte-prism";  
  interface Props {
    code: string;
    inline?: boolean;
    language?: string;
  }

  let { code, inline = false, language = "html" }: Props = $props();
</script>

<div class="code" class:inline>
  <Prism {language} source={code} />
</div>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";

  div {
    width: var(--code-width, var(--line-width, 90%));
    height: var(--code-height, auto);
    box-sizing: border-box;
    margin: auto;    
  }

  div > :global(pre) {
    width: var(--code-width, 100%);
    box-sizing: border-box;
    overflow-x: auto;
  }

  .code :global(code[class*="language-"]),
  .code :global(pre[class*="language-"]) {
    tab-size: var(--code-tab-size, 2em);
    @include color-props(code, container);
    @include typography-props(code, container);
  }

  .code :global(pre[class*="language-"]) {
    background: var(--code-bg);
    color: var(--code-fg);
    padding: 1em;
    border-radius: 0.3em;
    @include box-shadow(code, container);
  }

  .code :global(.token.comment),
  .code :global(.token.prolog),
  .code :global(.token.doctype),
  .code :global(.token.cdata) {
    @include color-props(code-comment, secondary, yellow);
  }

  .code :global(.token.string),
  .code :global(.token.attr-value) {
    @include color-props(code-string, code);
  }

  .code :global(.token.keyword) {
    @include color-props(code-keyword);
  }
  .code :global(.token.attr-name) {
    @include color-props(code-attr-name);
  }
  .code :global(.token.tag) {
    @include color-props(code-tag, code-keyword, code);
  }

  .code :global(.token.function) {
    @include color-props(code-function, code-keyword);
  }

  .code :global(.token.variable) {
    @include color-props(code-variable, code);
  }

  .code :global(.token.operator) {
    @include color-props(code-operator, code);
  }
</style>
