<script lang="ts">
  export let greaterThan: "xs" | "small" | "medium" | "large" | "xl" | null =
    null;
  export let smallerThan: "xs" | "small" | "medium" | "large" | "xl" | null =
    null;
  let smallerThanClasses = "";
  let greaterThanClasses = "";
  if (smallerThan) {
    for (let className of ["xs", "small", "medium", "large", "xl"]) {
      if (className === smallerThan) {
        smallerThanClasses += ` ${className}`;
        break;
      }
      smallerThanClasses += ` ${className}`;
    }
  }
  if (greaterThan) {
    for (let className of ["xl", "large", "medium", "small", "xs"]) {
      if (className === greaterThan) {
        greaterThanClasses += ` ${className}`;
        break;
      }
      greaterThanClasses += ` ${className}`;
    }
  }
  let xs: HTMLSpanElement;
  let small: HTMLSpanElement;
  let medium: HTMLSpanElement;
  let large: HTMLSpanElement;
  let xl: HTMLSpanElement;
</script>

<span class="xs" bind:this={xs}>
  <slot name="xs" />
</span>
<span class="small" bind:this={small}>
  <slot name="small" />
</span>
<span class="medium" bind:this={medium}>
  <slot name="medium" />
</span>
<span class="large" bind:this={large}>
  <slot name="large" />
</span>
<span class="xl" bind:this={xl}>
  <slot name="xl" />
</span>
<span
  class="else"
  class:xs={!$$slots.xs}
  class:small={!$$slots.small}
  class:medium={!$$slots.medium}
  class:large={!$$slots.large}
  class:xl={!$$slots.xl}
>
  <slot name="else" />
</span>
<span class={greaterThanClasses}>
  <slot name="greaterThan" />
</span>
<span class={smallerThanClasses}>
  <slot name="smallerThan" />
</span>

<style>
  .xs,
  .small,
  .medium,
  .large,
  .xl {
    display: none;
  }
  @container (max-width: 240px) {
    .xs {
      display: contents;
    }
  }
  @container (min-width: 241px) and (max-width: 480px) {
    .small {
      display: contents;
    }
  }
  @container (min-width: 481px) and (max-width: 720px) {
    .medium {
      display: contents;
    }
  }
  @container (min-width: 721px) and (max-width: 1024px) {
    .large {
      display: contents;
    }
  }
  @container (min-width: 1025px) {
    .xl {
      display: contents;
    }
  }
  .else.render {
    display: contents;
  }
</style>
