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
    [
      "Lids",
      "Primary, secondary, and emergency closures for decisive sealing",
      "Sealed",
    ],
    [
      "Walls",
      "Panel seams, bin edges, manifest rows, and dividers that hold the line",
      "Inspect",
    ],
    [
      "Manifests",
      "Search fields, selectors, toggles, and sliders for cargo edits",
      "Sealed",
    ],
    [
      "Stacks",
      "Bars, cards, lists, inline controls, and ledgers stacked like tidy bins",
      "Sealed",
    ],
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
        <h1>Contain Depot Board</h1>
      </Stack>

      <Inline wrap="wrap">
        <DropdownMenu triggerAuditAction="open-actions-menu">
          {#snippet label()}
            Actions
          {/snippet}
          <li><button type="button">Share snapshot</button></li>
          <li><button type="button">Create inspection note</button></li>
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
        <h2>Contain depot board</h2>
        <h1>Lids, walls, manifests, and stacks in one cargo view</h1>
        <p>
          Welcome to the Contain depot, where ship manifests, policy memos,
          retail storage reports, and old-fashioned box glossaries arrive at the
          same inspection desk. Every crate earns a label, every label earns a
          little skepticism, and every suspicious lid is asked politely to close
          before the evening whistle.
        </p>
      </TextLayout>

      <GridLayout card>
        <Card>
          {#snippet header()}
            <h3>Readiness</h3>
          {/snippet}
          <h2>84%</h2>
          <p>
            Eight of ten containment checks are sealed and stacked. The
            remaining issues are ordinary yard dents: one crate has a soft
            corner, one manifest line needs more breathing room, and one label
            has been warned not to drift into international waters.
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
            <h3>Closure Set</h3>
          {/snippet}
          <Stack gap="var(--space)">
            <Inline wrap="wrap">
              <Button primary data-audit-action="focus-primary" data-audit-focus="true">
                Seal
              </Button>
              <Button secondary>Hold</Button>
            </Inline>
            <Inline wrap="wrap">
              <Button success>Clear</Button>
              <Button warning>Delay</Button>
              <Button danger>Reject</Button>
            </Inline>
          </Stack>
        </Card>

        <Card>
          {#snippet header()}
            <h3>Yard Rhythm</h3>
          {/snippet}
          <p>
            These progress rows track the practical rhythm of the yard: contrast
            between crates, separation between seals, density on the manifest,
            and hierarchy in the cargo stack. A good depot never lets a barrel
            pretend it is a filing cabinet.
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
                <Input
                  bind:value={search}
                  placeholder="Find a crate, seal, or manifest"
                />
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
                <Checkbox bind:checked={includeArchived}>Include archived containers</Checkbox>
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
                  the crew still needs to inspect its label, closure, and
                  surrounding paperwork. Long copy is useful here because a
                  container can look perfectly calm until a full manifest asks
                  it to hold three more lines than planned.
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
          <h2>Seal Checklist</h2>
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
                <th>Inspection Focus</th>
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
          <h2>Inspection preview</h2>
          <p>
            This modal is the inspection booth at the edge of the yard. The
            supervisor checks the selected container, confirms the handler, and
            stamps the confidence score before the little box is allowed to
            travel with the rest of the shipment.
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
