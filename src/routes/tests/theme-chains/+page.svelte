<script lang="ts">
  // Prefix categories must affect only their property family. A UI font must
  // not set input padding, and a secondary palette must not size a button.
  import "$lib/vars/defaults.css";
  import { Button, ButtonLink, Input, Select, Container, FormItem, Tag } from "$lib";
</script>

<div id="theme">
  <Button data-testid="button">Button</Button>
  <Button primary data-testid="primary">Primary</Button>
  <ButtonLink href="/" data-testid="link">Link</ButtonLink>
  <Input aria-label="Input" data-testid="input" />
  <Select aria-label="Select" data-testid="select"><option value="one">One</option></Select>
  <FormItem globalInputStyles><input aria-label="Native field" data-testid="native" /></FormItem>
  <Tag data-testid="tag">Tag</Tag>
  <Container data-testid="container">Surface</Container>
</div>
