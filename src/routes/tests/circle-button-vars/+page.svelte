<script lang="ts">
  /*
    Fixtures for tests/circle-button-vars.spec.ts.

    CircleButton was called MiniButton until it was renamed (a circle is not a
    place to put text), but its CSS variables kept the `mini-button` prefix.
    Its CSS now reads `--circle-button-*` with `--mini-button-*` behind it, so
    there are three things worth pinning: the new name works, the old name
    still works, and when both are set the new one wins.

    Static and deterministic, like the color-mix fixtures: assertions read
    computed styles off known nodes.
  */
  import CircleButton from "$lib/controls/CircleButton.svelte";
  import MiniButton from "$lib/controls/MiniButton.svelte";
  import "$lib/vars/defaults.css";
</script>

<!-- The new name, as a style prop. `bg`/`fg` are emitted with the component's
     own prefix, so this is also what proves the prop prefix moved. -->
<div data-testid="new-prop">
  <CircleButton bg="rgb(1, 2, 3)" fg="rgb(4, 5, 6)">x</CircleButton>
</div>

<!-- The new name, set as a variable on an ancestor. -->
<div
  data-testid="new-var"
  style="--circle-button-bg: rgb(7, 8, 9); --circle-button-fg: rgb(10, 11, 12); --circle-button-size: 41px;"
>
  <CircleButton>x</CircleButton>
</div>

<!-- The old name, untouched. This is the backward-compatibility case: an app
     that set these before the rename must render exactly as it did. -->
<div
  data-testid="old-var"
  style="--mini-button-bg: rgb(13, 14, 15); --mini-button-fg: rgb(16, 17, 18); --mini-button-size: 43px;"
>
  <CircleButton>x</CircleButton>
</div>

<!-- Both set: the new name resolves first. -->
<div
  data-testid="both-vars"
  style="--mini-button-bg: rgb(13, 14, 15); --mini-button-size: 43px; --circle-button-bg: rgb(19, 20, 21); --circle-button-size: 47px;"
>
  <CircleButton>x</CircleButton>
</div>

<!-- The documented limit of the old name: it is a fallback, so anything that
     defines the NEW name ahead of it wins -- including a bundled theme, which
     defines it at :root. An app still on `--mini-button-*` while loading a
     theme is the one case the rename does not carry over silently, so it is
     pinned here rather than left to be discovered. -->
<div data-testid="new-beats-old-at-distance" style="--circle-button-bg: rgb(25, 26, 27);">
  <div style="--mini-button-bg: rgb(28, 29, 30);">
    <CircleButton>x</CircleButton>
  </div>
</div>

<!-- The deprecated alias still renders a CircleButton, and still answers to
     the old variable name. -->
<div
  data-testid="alias-old-var"
  style="--mini-button-bg: rgb(22, 23, 24); --mini-button-size: 29px;"
>
  <MiniButton>x</MiniButton>
</div>
