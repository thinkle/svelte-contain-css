<script lang="ts">
  import Prism from "prismjs";
  import "prismjs/components/prism-markup";
  import "prismjs/components/prism-css";
  import "prismjs/components/prism-clike";
  import "prismjs/components/prism-javascript";
  import "prism-svelte";

  interface Props {
    code: string;
    inline?: boolean;
    language?: string;
  }

  let { code, inline = false, language = "html" }: Props = $props();
  let highlightedCode = $derived.by(() => {
    if (language === "none") {
      return code;
    }

    const grammar = Prism.languages[language] ?? Prism.languages.markup;
    return Prism.highlight(code, grammar, language);
  });
</script>

<div class="code" class:inline>
  <pre class:language-none={language === "none"} class={`language-${language}`}>
    <code class={`language-${language}`}>{#if language === "none"}{highlightedCode}{:else}{@html highlightedCode}{/if}</code>
  </pre>
</div>

<style lang="scss">
  @use "$lib/sass/_mixins.scss" as *;

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

  .language-none {
    white-space: pre-wrap;
  }

  .code :global(code[class*="language-"]),
  .code :global(pre[class*="language-"]) {
    tab-size: var(--code-tab-size, 2em);
    @include color-props(code, surface);
    @include typography-props(code, surface);
  }

  .code :global(pre[class*="language-"]) {
    background: var(--code-bg);
    color: var(--code-fg);
    padding: 1em;
    border-radius: 0.3em;
    @include box-shadow(code, surface);
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
