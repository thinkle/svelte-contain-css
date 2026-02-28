<script>
  import { setContext, getContext } from "svelte";
  import { writable } from "svelte/store";
  import { get } from "svelte/store";

  export let layout = undefined;
  export let fullWidth = undefined;
  export let globalInputStyles = undefined;
  export let multiline = undefined;

  // Get parent context store if it exists
  const parentStore = getContext("formItemDefaults");

  const store = writable({
    layout,
    fullWidth,
    globalInputStyles,
    multiline,
  });

  // Update store reactively when props or parent change
  $: {
    let parentVal = undefined;
    if (parentStore && typeof parentStore.subscribe === 'function') {
      parentVal = get(parentStore);
    }
    store.set({
      layout: layout ?? parentVal?.layout,
      fullWidth: fullWidth ?? parentVal?.fullWidth,
      globalInputStyles: globalInputStyles ?? parentVal?.globalInputStyles,
      multiline: multiline ?? parentVal?.multiline,
    });
  }

  setContext("formItemDefaults", store);
</script>

<slot />
