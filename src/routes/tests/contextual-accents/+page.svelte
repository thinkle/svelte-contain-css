<script lang="ts">
  // Links and fancy first letters must remain visible on colored surfaces;
  // exact global/component overrides still win over the default tint.
  import "$lib/vars/fancy-paragraphs.css";
  import { Bar, Container, TextLayout } from "$lib";
</script>

<div style="--primary-bg: #3949ab; --primary-color: #3949ab; --primary-fg: white;">
  <Bar primary data-testid="primary-bar">
    <a href="#article">Primary surface link</a>
    <h2><a href="#article">Heading link</a></h2>
  </Bar>
  <Container bg="#222" fg="white" data-testid="nested-surface">
    <TextLayout>
      <p id="article">A real paragraph with a <a href="#article">body link</a>.</p>
    </TextLayout>
    <Container bg="#eee" fg="#222" data-testid="inner-surface">
      <TextLayout><p>A nested paragraph and <a href="#article">link</a>.</p></TextLayout>
    </Container>
  </Container>
  <div style="--link-fg: #008000;">
    <Bar primary data-testid="global-exact"><a href="#article">Exact global link</a></Bar>
  </div>
  <!-- Exact link colors are keyed by color family, not by component. -->
  <div style="--on-primary-link-text-fg: #ffcc00;">
    <Bar primary data-testid="component-exact">
      <a href="#article">Exact link on the primary family</a>
    </Bar>
  </div>
  <div style="--on-surface-link-text-fg: #800080;">
    <Container data-testid="surface-exact"><a href="#article">Exact surface link</a></Container>
  </div>
  <Container bg="#222" fg="white" data-testid="custom-target"
    style="--link-color: #ff0000; --link-text-amount: 25%; --body-first-letter-fg: #00ff00;">
    <TextLayout><p>An exact drop letter and <a href="#article">custom link tint</a>.</p></TextLayout>
  </Container>
</div>
