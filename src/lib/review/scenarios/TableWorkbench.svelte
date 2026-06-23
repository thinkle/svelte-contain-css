<script lang="ts">
  import Button from "$lib/controls/Button.svelte";
  import Checkbox from "$lib/controls/Checkbox.svelte";
  import Input from "$lib/controls/Input.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import Fieldset from "$lib/layout/Fieldset.svelte";
  import Form from "$lib/layout/Form.svelte";
  import FormItem from "$lib/layout/FormItem.svelte";
  import Page from "$lib/layout/Page.svelte";
  import Table from "$lib/layout/Table.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  type QueueRow = {
    id: string;
    task: string;
    owner: string;
    team: string;
    priority: "P0" | "P1" | "P2" | "P3";
    status: "Blocked" | "In Review" | "In Progress" | "Ready" | "Done";
    due: string;
  };

  const rows: QueueRow[] = [
    {
      id: "BOX-1042",
      task: "Define box as the square diplomat of containment",
      owner: "BX",
      team: "Boxes",
      priority: "P0",
      status: "Blocked",
      due: "Today",
    },
    {
      id: "BIN-221",
      task: "Compare open bins with lids, labels, and mild ambition",
      owner: "BN",
      team: "Bins",
      priority: "P1",
      status: "In Review",
      due: "Tomorrow",
    },
    {
      id: "BBL-878",
      task: "Separate barrels from casks without starting a cellar debate",
      owner: "BR",
      team: "Barrels",
      priority: "P1",
      status: "In Progress",
      due: "Tue",
    },
    {
      id: "CRT-1048",
      task: "Cross-reference crate with shipping, fruit, and stage magic",
      owner: "CR",
      team: "Crates",
      priority: "P2",
      status: "Ready",
      due: "Tue",
    },
    {
      id: "CAN-55",
      task: "Audit canister, tin, and can for pantry precision",
      owner: "CN",
      team: "Cans",
      priority: "P2",
      status: "In Progress",
      due: "Wed",
    },
    {
      id: "TUB-881",
      task: "Resolve whether a tub is a bin taking a bath",
      owner: "TB",
      team: "Bins",
      priority: "P0",
      status: "Blocked",
      due: "Wed",
    },
    {
      id: "JAR-399",
      task: "Update jar notes for pickles, buttons, and tiny CSS tokens",
      owner: "JR",
      team: "Jars",
      priority: "P3",
      status: "Done",
      due: "Thu",
    },
    {
      id: "DRM-1054",
      task: "Instrument drum definitions for industrial rhythm",
      owner: "DM",
      team: "Barrels",
      priority: "P1",
      status: "In Review",
      due: "Thu",
    },
    {
      id: "TTE-228",
      task: "Finalize tote entry for handles, errands, and library books",
      owner: "TT",
      team: "Totes",
      priority: "P2",
      status: "Ready",
      due: "Fri",
    },
    {
      id: "VLT-61",
      task: "Review vault as the dramatic cousin of a lockbox",
      owner: "VT",
      team: "Boxes",
      priority: "P3",
      status: "In Progress",
      due: "Fri",
    },
    {
      id: "AMP-889",
      task: "Reconcile amphora with vase, urn, and ancient snack jar",
      owner: "AM",
      team: "Jars",
      priority: "P2",
      status: "In Progress",
      due: "Next Mon",
    },
    {
      id: "PKT-405",
      task: "Publish packet notes for envelopes, sachets, and tiny payloads",
      owner: "PK",
      team: "Pouches",
      priority: "P2",
      status: "Ready",
      due: "Next Mon",
    },
  ];

  let query = $state("");
  let team = $state("all");
  let showClosed = $state(false);
  let bulkActionsOpen = $state(false);
  let stickyTableRegion: HTMLDivElement | null = $state(null);

  let filteredRows = $derived(
    rows.filter((row) => {
      const matchesQuery =
        query.trim().length === 0 ||
        `${row.id} ${row.task} ${row.owner} ${row.team}`
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesTeam = team === "all" || row.team === team;
      const matchesClosed = showClosed || row.status !== "Done";

      return matchesQuery && matchesTeam && matchesClosed;
    }),
  );

  let blockedCount = $derived(
    filteredRows.filter((row) => row.status === "Blocked").length,
  );

  function toggleBulkActions() {
    bulkActionsOpen = !bulkActionsOpen;
  }

  function scrollToStickyState() {
    if (!stickyTableRegion) return;

    stickyTableRegion.scrollIntoView({ block: "start" });
    const stickyOffset = getCssLengthValue(
      stickyTableRegion,
      "--table-sticky-top",
    );
    const targetOffset = stickyOffset;

    const scrollContainer = getScrollableAncestor(stickyTableRegion);
    if (scrollContainer instanceof HTMLElement) {
      scrollContainer.scrollTop += targetOffset;
      return;
    }

    const scrollingElement = document.scrollingElement;
    if (scrollingElement instanceof HTMLElement) {
      scrollingElement.scrollTop += targetOffset;
      return;
    }

    window.scrollBy(0, targetOffset);
  }

  function getScrollableAncestor(node: HTMLElement): HTMLElement | null {
    let current: HTMLElement | null = node.parentElement;

    while (current) {
      const style = getComputedStyle(current);
      const canScroll =
        /(auto|scroll)/.test(style.overflowY) &&
        current.scrollHeight > current.clientHeight;

      if (canScroll) {
        return current;
      }

      current = current.parentElement;
    }

    return null;
  }

  function getCssLengthValue(node: HTMLElement, property: string): number {
    const value = getComputedStyle(node).getPropertyValue(property).trim();
    if (!value) return 0;

    if (value.endsWith("px")) {
      return Number.parseFloat(value);
    }

    const probe = document.createElement("div");
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.height = value;
    document.body.appendChild(probe);
    const pixels = probe.getBoundingClientRect().height;
    probe.remove();
    return pixels;
  }
</script>

<Page data-audit-target="page">
  {#snippet header()}
    <Bar primary>
      <div>
        <h1>Container Reference Table</h1>
      </div>

      <div>
        <Button
          data-audit-action="toggle-bulk-actions"
          aria-expanded={bulkActionsOpen}
          onclick={toggleBulkActions}
        >
          {bulkActionsOpen ? "Hide Actions" : "Reference Actions"}
        </Button>
        <Button secondary>Refresh</Button>
      </div>
    </Bar>
  {/snippet}

  <TextLayout>
    <h1>Thesaurus of things that contain other things</h1>
    <p>
      A container may be humble or ceremonial, disposable or heirloom, open to
      the air or sealed against weather. This reference table catalogs boxes,
      bins, barrels, jars, pouches, crates, drums, and every other noun that
      wants to keep a smaller noun from rolling away.
    </p>

    <Form layout="above" fullWidth globalInputStyles>
      <Fieldset>
        {#snippet legend()}
          Reference Filters
        {/snippet}

        <FormItem>
          {#snippet label()}
            Search Terms
          {/snippet}
          <Input
            bind:value={query}
            placeholder="Search by container, family, or curator"
          />
        </FormItem>

        <FormItem>
          {#snippet label()}
            Family
          {/snippet}
          <Select bind:value={team} data-audit-action="open-team-select">
            <option value="all">All families</option>
            <option value="Boxes">Boxes</option>
            <option value="Bins">Bins</option>
            <option value="Barrels">Barrels</option>
            <option value="Crates">Crates</option>
            <option value="Cans">Cans</option>
            <option value="Jars">Jars</option>
            <option value="Totes">Totes</option>
            <option value="Pouches">Pouches</option>
          </Select>
        </FormItem>

        <FormItem>
          {#snippet label()}
            Visibility
          {/snippet}
          <Checkbox bind:checked={showClosed}>Include archived definitions</Checkbox>
        </FormItem>
      </Fieldset>
    </Form>

    {#if bulkActionsOpen}
      <div data-audit-target="bulk-actions-open">
        <Bar secondary>
          <div>{filteredRows.length} selected for lexical containment review</div>
          <div>
            <Button success>Assign Curator</Button>
            <Button warning>Shelve</Button>
            <Button danger>Dispute Term</Button>
          </div>
        </Bar>
      </div>
    {/if}

    <div style="--table-sticky-top: calc(var(--padding) + 2.5rem);">
      <Bar secondary>
        <div>
          Showing {filteredRows.length} items. {blockedCount} currently blocked.
        </div>
        <div>
          <Button
            data-audit-action="scroll-table"
            data-audit-scroll-selector='[data-audit-scroll-region="table"]'
            data-audit-scroll-offset="0"
            data-audit-scroll-offset-var="--table-sticky-top"
            secondary
            onclick={scrollToStickyState}
          >
            Scroll Preview
          </Button>
          <Button info>Export Glossary</Button>
        </div>
      </Bar>

      <div bind:this={stickyTableRegion} data-audit-scroll-region="table">
      <Table sticky>
      {#snippet thead()}
        <thead>
          <tr>
            <th>Entry</th>
            <th>Curator</th>
            <th>Family</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due</th>
            <th>Action</th>
          </tr>
        </thead>
      {/snippet}

      {#snippet tbody()}
        <tbody>
          {#each filteredRows as row}
            <tr tabindex="0">
              <th>
                <div>{row.task}</div>
                <div>{row.id}</div>
              </th>
              <td>{row.owner}</td>
              <td>{row.team}</td>
              <td>{row.priority}</td>
              <td>{row.status}</td>
              <td>{row.due}</td>
              <td><Button>Open</Button></td>
            </tr>
          {/each}
        </tbody>
      {/snippet}
      </Table>
      </div>
    </div>
  </TextLayout>
</Page>
