<script lang="ts">
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Input from "$lib/controls/Input.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import Toggle from "$lib/controls/Toggle.svelte";
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import DataList from "$lib/layout/DataList.svelte";
  import DataListItem from "$lib/layout/DataListItem.svelte";
  import Fieldset from "$lib/layout/Fieldset.svelte";
  import Form from "$lib/layout/Form.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Inline from "$lib/layout/Inline.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Stack from "$lib/layout/Stack.svelte";
  import Table from "$lib/layout/Table.svelte";
  import Progress from "$lib/misc/Progress.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import Dialog from "$lib/overlays/Dialog.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  type TeamMember = {
    name: string;
    role: string;
    status: string;
    intent: "success" | "warning" | "info";
  };

  const members: TeamMember[] = [
    {
      name: "Avery Crate",
      role: "Box model curator",
      status: "Approved",
      intent: "success",
    },
    {
      name: "Mina Can",
      role: "Canister operations",
      status: "Reviewing",
      intent: "warning",
    },
    {
      name: "Jon Barrel",
      role: "Cargo product",
      status: "Queued",
      intent: "info",
    },
  ];

  const rhythm = [
    { label: "Crate contrast", value: 84 },
    { label: "Seal separation", value: 68 },
    { label: "Manifest density", value: 72 },
    { label: "Cargo hierarchy", value: 91 },
  ];

  const rows = [
    ["Buttons", "Primary, secondary, and intent surfaces", "Sealed"],
    ["Borders", "Cards, fieldsets, table rows, and list dividers", "Inspect"],
    ["Forms", "Inputs, select popovers, toggles, and sliders", "Sealed"],
    ["Grouping", "Bars, cards, lists, inline controls, and tables", "Sealed"],
  ];

  let plan = $state("growth");
  let density = $state("balanced");
  let includeArchived = $state(false);
  let notifications = $state(true);
  let confidence = $state(72);
  let owner = $state("design");
  let search = $state("crate polish");
  let detailOpen = $state(false);
  let dialogOpen = $state(false);

  let confidenceLabel = $derived(
    confidence > 80 ? "High" : confidence > 55 ? "Medium" : "Low",
  );

  function openDetail() {
    detailOpen = true;
  }

  function openDialog() {
    dialogOpen = true;
  }
</script>

<Page data-audit-target="page">
  {#snippet header()}
    <Bar primary height="auto">
      <Stack gap="0">
        <small>Workspace</small>
        <h1>Visual System Board</h1>
      </Stack>

      <Inline wrap="wrap">
        <DropdownMenu triggerAuditAction="open-actions-menu">
          {#snippet label()}
            Actions
          {/snippet}
          <li><button type="button">Share snapshot</button></li>
          <li><button type="button">Create theme note</button></li>
          <li><button type="button">Export comparison</button></li>
        </DropdownMenu>
        <Button data-audit-action="open-dialog" primary onclick={openDialog}>
          Preview
        </Button>
      </Inline>
    </Bar>
  {/snippet}

  <Container maxWidth="1180px">
    <Stack gap="var(--space-lg)">
      <TextLayout>
        <h2>Theme comparison</h2>
        <h1>Controls, borders, forms, and grouped surfaces in one cargo view</h1>
        <p>
          Welcome to the Contain depot, where every crate, can, backpack, and
          shipping container gets a themed inspection before it leaves the yard.
          This screen puts common application surfaces into one compact workflow
          so typography, spacing, color, and container behavior have enough real
          text to show what they are doing.
        </p>
      </TextLayout>

      <GridLayout card>
        <Card>
          {#snippet header()}
            <h3>Readiness</h3>
          {/snippet}
          <h2>84%</h2>
          <p>
            Eight of ten cargo checks are sealed and stacked. The remaining
            issues are ordinary design-review dents: a border that needs a
            cleaner edge, a row that needs more breathing room, and a form label
            that should not fall off the manifest.
          </p>
          {#snippet footer()}
            <Inline wrap="wrap">
              <Tag success>Passing</Tag>
              <Tag info>{confidenceLabel}</Tag>
            </Inline>
          {/snippet}
        </Card>

        <Card>
          {#snippet header()}
            <h3>Control Set</h3>
          {/snippet}
          <Stack gap="var(--space)">
            <Inline wrap="wrap">
              <Button primary data-audit-action="focus-primary" data-audit-focus="true">
                Primary
              </Button>
              <Button secondary>Secondary</Button>
            </Inline>
            <Inline wrap="wrap">
              <Button success>Success</Button>
              <Button warning>Warning</Button>
              <Button danger>Danger</Button>
            </Inline>
          </Stack>
        </Card>

        <Card>
          {#snippet header()}
            <h3>Surface Rhythm</h3>
          {/snippet}
          <p>
            These progress rows replace the fake chart with actual Contain
            primitives. They give each theme a chance to prove its rhythm across
            labels, meters, spacing, and status color without a custom graphic.
          </p>
          <Stack gap="var(--space)">
            {#each rhythm as item}
              <div>
                <strong>{item.label}</strong>
                <Progress value={item.value} max={100}>{item.value}%</Progress>
              </div>
            {/each}
          </Stack>
        </Card>
      </GridLayout>

      <GridLayout>
        <Container border data-audit-target="form-panel">
          <Bar secondary>
            <h2>Filters</h2>
            <Toggle bind:checked={notifications}>Alerts</Toggle>
          </Bar>

          <Form layout="above" fullWidth globalInputStyles>
            <Fieldset>
              {#snippet legend()}
                Search and segmentation
              {/snippet}

              <FormItem>
                {#snippet label()}
                  Search
                {/snippet}
                <Input bind:value={search} placeholder="Find a surface" />
              </FormItem>

              <FormItem>
                {#snippet label()}
                  Container
                {/snippet}
                <Select bind:value={plan}>
                  <option value="starter">Lunchbox</option>
                  <option value="growth">Shipping crate</option>
                  <option value="enterprise">Freight container</option>
                </Select>
              </FormItem>

              <FormItem>
                {#snippet label()}
                  Handler
                {/snippet}
                <RadioButton bind:group={owner} value="design">Box crew</RadioButton>
                <RadioButton bind:group={owner} value="frontend">Can crew</RadioButton>
                <RadioButton bind:group={owner} value="product">Pack crew</RadioButton>
              </FormItem>

              <FormItem>
                {#snippet label()}
                  Density
                {/snippet}
                <Select bind:value={density}>
                  <option value="compact">Compact</option>
                  <option value="balanced">Balanced</option>
                  <option value="spacious">Spacious</option>
                </Select>
              </FormItem>

              <FormItem>
                {#snippet label()}
                  Confidence {confidence}%
                {/snippet}
                <Slider bind:value={confidence} min={0} max={100} />
              </FormItem>

              <FormItem>
                {#snippet label()}
                  History
                {/snippet}
                <Checkbox bind:checked={includeArchived}>Include archived crates</Checkbox>
              </FormItem>
            </Fieldset>
          </Form>
        </Container>

        <Container border>
          <Bar secondary>
            <h2>Containment Queue</h2>
            <Button data-audit-action="open-detail" onclick={openDetail}>
              Inspect
            </Button>
          </Bar>

          {#if detailOpen}
            <div data-audit-target="detail-open">
              <Card>
                {#snippet header()}
                  <h3>Selection detail</h3>
                {/snippet}
                <p>
                  The selected container has survived the first shake test, but
                  the crew still needs to inspect how its label, action button,
                  and surrounding card behave in this theme. Long-ish copy here
                  is intentional: fancy paragraph treatments need enough words
                  to settle into their real line length.
                </p>
              </Card>
            </div>
          {/if}

          <DataList stackable>
            {#each members as member}
              <DataListItem interactive>
                {#snippet start()}
                  <Tag info>{member.name.slice(0, 1)}</Tag>
                {/snippet}
                <h3>{member.name}</h3>
                <span>{member.role}</span>
                {#snippet end()}
                  {#if member.intent === "success"}
                    <Tag success>{member.status}</Tag>
                  {:else if member.intent === "warning"}
                    <Tag warning>{member.status}</Tag>
                  {:else}
                    <Tag info>{member.status}</Tag>
                  {/if}
                {/snippet}
              </DataListItem>
            {/each}
          </DataList>
        </Container>
      </GridLayout>

      <Container border data-audit-target="table-panel">
        <Bar secondary>
          <h2>Surface Checklist</h2>
          <Inline wrap="wrap">
            <Tag info>{density}</Tag>
            <Tag success>{plan}</Tag>
          </Inline>
        </Bar>

        <Table>
          {#snippet thead()}
            <thead>
              <tr>
                <th>Area</th>
                <th>Review Focus</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
          {/snippet}

          {#snippet tbody()}
            <tbody>
              {#each rows as row}
                <tr>
                  <th>{row[0]}</th>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td><Button>Open</Button></td>
                </tr>
              {/each}
            </tbody>
          {/snippet}
        </Table>
      </Container>
    </Stack>
  </Container>

  {#if dialogOpen}
    <Dialog
      open={dialogOpen}
      onClose={() => {
        dialogOpen = false;
      }}
    >
      <div data-audit-target="dialog-open">
        <TextLayout>
          <h2>Theme preview</h2>
          <p>
            This modal is the inspection booth at the edge of the yard. It
            checks elevated surfaces, focus treatment, buttons, and card
            grouping inside an overlay, while still giving paragraph typography
            enough room to show its personality.
          </p>
        </TextLayout>
        <GridLayout card>
          <Card>
            {#snippet header()}
              <h3>Container</h3>
            {/snippet}
            <strong>{plan}</strong>
          </Card>
          <Card>
            {#snippet header()}
              <h3>Owner</h3>
            {/snippet}
            <strong>{owner}</strong>
          </Card>
          <Card>
            {#snippet header()}
              <h3>Confidence</h3>
            {/snippet}
            <strong>{confidence}%</strong>
          </Card>
        </GridLayout>
      </div>
    </Dialog>
  {/if}
</Page>
