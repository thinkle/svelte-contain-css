<script>
  import Container from "$lib/layout/Container.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
</script>

<SplitPane>
  <div slot="left">
    Wow oh wow this is <br />some content
    <br />it is so very nifty!
  </div>
  <div slot="right">Oh how amazing here is still more content.</div>
</SplitPane>
