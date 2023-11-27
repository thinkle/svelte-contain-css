<script lang="ts">
  export let checked: boolean;
  let ref;
  let labelContent;
  let labelWidth;
  $: {
    if (ref) {
      labelContent = ref.innerHTML;
    }
  }
</script>

<label>
  <input type="checkbox" bind:checked />
  <span style:--label-width="{labelWidth + 4}px" bind:this={ref}><slot /></span>
</label>
<!-- Off-screen span for measuring -->
<span class="offscreen" bind:clientWidth={labelWidth}>{@html labelContent}</span
>

<style>
  :root {
    --checkbox-size: var(--font-size);
    --checkbox-bg: var(--inactive-bg);
    --checkbox-fg: var(--inactive-fg);
    --checkbox-checked-bg: var(--primary-bg);
    --checkbox-checked-fg: var(--primary-fg);
    --checkbox-border: 1px solid var(--white);
    --checkbox-checked-border: 1px solid var(--white);
    --checkbox-check: "✓";
  }

  .offscreen,
  label {
    font-family: var(--ui-font-family);
    font-size: var(--font-size);
  }

  .offscreen {
    visibility: hidden;
    font-weight: var(--checked-weight);
    position: absolute;
  }

  label {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    line-height: 1.2;
    position: relative;
    user-select: none;
  }
  label:hover {
    filter: var(--checkbox-hover-filter);
    transform: var(--checkbox-hover-transform);
  }
  label:has(:global(*:active)) {
    filter: var(--checkbox-active-filter);
    transform: var(--checkbox-active-transform);
  }
  label span {
    width: var(--label-width);
  }
  label:has(input:checked) {
    font-weight: var(--checked-weight);
  }

  input {
    display: none;
  }
  label::before {
    margin-right: var(--space);
    transition: all var(--checkbox-transition);
    display: inline-grid;
    place-content: center;
    content: " ";
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    background: var(--checkbox-bg);
    color: var(--checkbox-checked-fg);
    border: var(--checkbox-border);
    box-sizing: border-box;
  }
  label:has(input:checked)::before {
    background: var(--checkbox-checked-bg);
    color: var(--checkbox-checked-fg);
    border: var(--checkbox-checked-border);
    box-sizing: border-box;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
  }
  label:has(input:checked)::after {
    content: var(--checkbox-check);
    font-size: var(--checkbox-size);
    color: var(--checkbox-checked-fg);
    position: absolute;
    left: 0;
    animation: checkbox-check var(--checkbox-transition) ease-in-out;
  }

  @keyframes checkbox-check {
    0% {
      width: 0;
      overflow: hidden;
    }
    100% {
      width: var(--checkbox-size);
    }
  }
</style>
