<script lang="ts">
  /*
    Fixtures for tests/var-fallbacks.spec.ts.

    Three declarations in the library called `var()` where they meant
    `var-with-fallbacks()`. CSS `var()` takes exactly two arguments -- a name
    and a fallback -- and everything after the first comma IS the fallback, so
    `var(--padding, form-item, 8px)` asks for `--padding` with the fallback
    "form-item, 8px". That fallback is not a valid length, so with `--padding`
    unset the declaration is invalid at computed-value time and the property
    lands on its initial value. The prefixed variable in the middle is never
    consulted at all.

    These fixtures isolate each: the prefixed name must win, and the literal
    fallback must apply when nothing else is set.
  */
  import FormItem from "$lib/layout/FormItem.svelte";
  import Input from "$lib/controls/Input.svelte";
  import CircleButton from "$lib/controls/CircleButton.svelte";
  import "$lib/vars/defaults.css";
</script>

<!-- FormItem: the prefixed name must be consulted. `--padding` is set to a
     different value so a pass cannot come from the generic name. -->
<div
  data-testid="form-item-prefixed"
  style="--form-item-padding: 21px; --padding: 5px;"
>
  <FormItem>
    {#snippet label()}Label{/snippet}
    <Input value="x" />
  </FormItem>
</div>

<!-- FormItem: with no variable set at all, the literal 8px applies rather
     than collapsing to the initial 0. `--padding` is defined at :root by
     layout.css, so it has to be unset explicitly here -- and `initial` is the
     way to do that. `--padding: ;` would leave it DEFINED but empty, which
     substitutes nothing and lands back on 0. -->
<div data-testid="form-item-literal" style="--padding: initial;">
  <FormItem>
    {#snippet label()}Label{/snippet}
    <Input value="x" />
  </FormItem>
</div>

<!-- CircleButton: --button-border is the middle name that was being skipped. -->
<div data-testid="circle-button-button-border" style="--button-border: 3px solid rgb(1, 2, 3);">
  <CircleButton>x</CircleButton>
</div>

<!-- ...and the component's own name still beats it. -->
<div
  data-testid="circle-button-own-border"
  style="--button-border: 3px solid rgb(1, 2, 3); --circle-button-border: 5px solid rgb(4, 5, 6);"
>
  <CircleButton>x</CircleButton>
</div>

<!-- With nothing set, no border. This is the case that must not regress: the
     bug produced `medium none` by accident, and the fix must produce `none`
     on purpose. -->
<div data-testid="circle-button-no-border">
  <CircleButton>x</CircleButton>
</div>
