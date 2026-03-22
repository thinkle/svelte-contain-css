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
      id: "PLT-1042",
      task: "Stabilize SSO callback handling",
      owner: "TS",
      team: "Platform",
      priority: "P0",
      status: "Blocked",
      due: "Today",
    },
    {
      id: "MKT-221",
      task: "QA campaign attribution dashboard",
      owner: "AL",
      team: "Marketing",
      priority: "P1",
      status: "In Review",
      due: "Tomorrow",
    },
    {
      id: "OPS-878",
      task: "Backfill support SLA alerts",
      owner: "RJ",
      team: "Operations",
      priority: "P1",
      status: "In Progress",
      due: "Tue",
    },
    {
      id: "PLT-1048",
      task: "Ship migration retry banner copy",
      owner: "HS",
      team: "Platform",
      priority: "P2",
      status: "Ready",
      due: "Tue",
    },
    {
      id: "DS-55",
      task: "Audit density tokens for compact mode",
      owner: "AL",
      team: "Design",
      priority: "P2",
      status: "In Progress",
      due: "Wed",
    },
    {
      id: "OPS-881",
      task: "Resolve duplicate webhook replay jobs",
      owner: "RJ",
      team: "Operations",
      priority: "P0",
      status: "Blocked",
      due: "Wed",
    },
    {
      id: "SUP-399",
      task: "Update admin troubleshooting macros",
      owner: "MK",
      team: "Support",
      priority: "P3",
      status: "Done",
      due: "Thu",
    },
    {
      id: "PLT-1054",
      task: "Instrument CSV export completion events",
      owner: "TS",
      team: "Platform",
      priority: "P1",
      status: "In Review",
      due: "Thu",
    },
    {
      id: "MKT-228",
      task: "Finalize launch checklist for webinar",
      owner: "JD",
      team: "Marketing",
      priority: "P2",
      status: "Ready",
      due: "Fri",
    },
    {
      id: "DS-61",
      task: "Review icon sizing on navigation rails",
      owner: "HS",
      team: "Design",
      priority: "P3",
      status: "In Progress",
      due: "Fri",
    },
    {
      id: "OPS-889",
      task: "Reconcile nightly inventory drift report",
      owner: "RJ",
      team: "Operations",
      priority: "P2",
      status: "In Progress",
      due: "Next Mon",
    },
    {
      id: "SUP-405",
      task: "Publish escalation policy revision",
      owner: "MK",
      team: "Support",
      priority: "P2",
      status: "Ready",
      due: "Next Mon",
    },
  ];

  let query = $state("a");
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
        <h1>Operations Table</h1>
      </div>

      <div>
        <Button
          data-audit-action="toggle-bulk-actions"
          aria-expanded={bulkActionsOpen}
          onclick={toggleBulkActions}
        >
          {bulkActionsOpen ? "Hide Actions" : "Bulk Actions"}
        </Button>
        <Button secondary>Refresh</Button>
      </div>
    </Bar>
  {/snippet}

  <TextLayout>
    <h1>Sticky table workbench</h1>
    <p>
      This scenario exercises filters, an action bar, and a sticky-header table
      with enough rows to expose scrolling behavior.
    </p>

    <Form layout="above" fullWidth globalInputStyles>
      <Fieldset>
        {#snippet legend()}
          Filters
        {/snippet}

        <FormItem>
          {#snippet label()}
            Search Queue
          {/snippet}
          <Input bind:value={query} placeholder="Search by task, team, or owner" />
        </FormItem>

        <FormItem>
          {#snippet label()}
            Team
          {/snippet}
          <Select bind:value={team}>
            <option value="all">All teams</option>
            <option value="Platform">Platform</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="Design">Design</option>
            <option value="Support">Support</option>
          </Select>
        </FormItem>

        <FormItem>
          {#snippet label()}
            Visibility
          {/snippet}
          <Checkbox bind:checked={showClosed}>Include completed work</Checkbox>
        </FormItem>
      </Fieldset>
    </Form>

    {#if bulkActionsOpen}
      <div data-audit-target="bulk-actions-open">
        <Bar secondary>
          <div>{filteredRows.length} selected for scheduling review</div>
          <div>
            <Button success>Assign Owner</Button>
            <Button warning>Snooze</Button>
            <Button danger>Escalate</Button>
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
          <Button info>Export CSV</Button>
        </div>
      </Bar>

      <div bind:this={stickyTableRegion} data-audit-scroll-region="table">
      <Table sticky>
      {#snippet thead()}
        <thead>
          <tr>
            <th>Task</th>
            <th>Owner</th>
            <th>Team</th>
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
