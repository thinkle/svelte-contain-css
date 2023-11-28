<ul class="menu">
  <slot />
</ul>

<style lang="scss">
  @import "$lib/sass/_mixins.scss";
  .menu {
    list-style: none;
    padding: 0;
    margin: 0;
    @include color-props(menu, container);
  }

  .menu {
    @include global-buttons {
      display: grid;
      width: 100%;
      text-decoration: none;
      @include typography-props(menu-item, button, ui);
      @include color-props(menu-item, button);
      @include box-props-square(menu-item, button);
      @include clickable(menu-item, button);
    }

    & :global(li:nth-child(odd)) {
      @include global-buttons {
        @include color-props(menu-item-even, stripe, menu-item, button);
      }
    }

    & :global(li:nth-child(even)) :global(.active),
    :global(li:nth-child(odd)) :global(.active) {
      @include color-props(menu-item-active, primary, menu-item, button);
    }
  }
</style>
