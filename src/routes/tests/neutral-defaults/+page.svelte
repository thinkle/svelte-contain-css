<script lang="ts">
  /*
    Fixtures for tests/neutral-defaults.spec.ts.

    colors.css (built as vars/defaults.css) is the one file every consumer
    loads no matter what -- it's what an app with no theme at all, or a
    theme that only sets --bg/--fg, inherits before anything else runs. A
    tint picked here reaches every one of those apps whether they asked for
    it or not, which is exactly what happened when indigo was threaded
    through --bg/--fg/--focus-color/the link fallback while light.css was
    being redesigned (#18). A theme that wants a cast sets its own vars
    (see themes/light.css); this file has to stay neutral so that deriving
    from --bg/--fg/--primary actually means something.

    Deliberately imports ONLY defaults.css -- no theme -- to pin what an
    unthemed consumer actually gets.
  */
  import "$lib/vars/defaults.css";
</script>

<div data-testid="card" style="border: 1px solid var(--border-color);">card</div>

<a data-testid="link" href="#">a link</a>

<button data-testid="button">a button</button>
