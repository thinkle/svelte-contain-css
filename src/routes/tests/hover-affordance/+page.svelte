<script lang="ts">
  // Deterministic fixtures for tests/hover-affordance.spec.ts. No theme is
  // loaded: these are the library defaults, which is where a fixed white
  // hover mix used to vanish into light surfaces. Transitions are turned off
  // so a hover reads its final color immediately.
  import Button from "$lib/controls/Button.svelte";
  import ButtonLink from "$lib/controls/ButtonLink.svelte";
  import CircleButton from "$lib/controls/CircleButton.svelte";
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import Bar from "$lib/layout/Bar.svelte";
</script>

<svelte:head>
  <style>
    [data-testid] * {
      transition: none !important;
    }
  </style>
</svelte:head>

<div style="padding: 2em;">
  <div data-testid="button"><Button>Standard</Button></div>
  <div data-testid="button-primary"><Button primary>Primary</Button></div>
  <div data-testid="button-warning"><Button warning>Warning</Button></div>
  <div data-testid="link"><ButtonLink href="#a">Link</ButtonLink></div>
  <div data-testid="link-primary">
    <ButtonLink primary href="#b">Primary link</ButtonLink>
  </div>
  <div data-testid="circle"><CircleButton>+</CircleButton></div>
  <div data-testid="circle-primary"><CircleButton primary>+</CircleButton></div>
  <div data-testid="circle-danger"><CircleButton danger>+</CircleButton></div>
  <div data-testid="menu-trigger">
    <DropdownMenu>
      <li><button>One</button></li>
    </DropdownMenu>
  </div>
  <div data-testid="primary-bar-trigger">
    <Bar primary>
      <div
        style:--menu-trigger-bg="var(--bar-bg)"
        style:--menu-trigger-fg="var(--bar-fg)"
      >
        <DropdownMenu>
          <li><button>One</button></li>
        </DropdownMenu>
      </div>
    </Bar>
  </div>
  <!-- An explicit --hover-color-mix still decides the direction. -->
  <div data-testid="forced-black" style="--hover-color-mix: black;">
    <Button primary>Forced</Button>
  </div>
</div>
