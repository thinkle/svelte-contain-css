<script lang="ts">
  import Card from "$lib/Card.svelte";
  import Button from "$lib/controls/Button.svelte";
  import ButtonLink from "$lib/controls/ButtonLink.svelte";
  import Option from "$lib/controls/Option.svelte";
  import RadioButton from "$lib/controls/RadioButton.svelte";
  import Select from "$lib/controls/Select.svelte";
  import Slider from "$lib/controls/Slider.svelte";
  import DropdownMenu from "$lib/dropdowns/DropdownMenu.svelte";
  import Accordion from "$lib/layout/Accordion.svelte";
  import Bar from "$lib/layout/Bar.svelte";
  import Container from "$lib/layout/Container.svelte";
  import GridLayout from "$lib/layout/GridLayout.svelte";
  import Hero from "$lib/layout/Hero.svelte";
  import Page from "$lib/layout/Page.svelte";
  import ResponsiveText from "$lib/layout/ResponsiveText.svelte";
  import SplitPane from "$lib/layout/SplitPane.svelte";
  import TabBar from "$lib/layout/TabBar.svelte";
  import TabItem from "$lib/controls/TabItem.svelte";
  import Code from "$lib/misc/Code.svelte";
  import Tag from "$lib/misc/Tag.svelte";
  import Progress from "$lib/misc/Progress.svelte";
  import Dialog from "$lib/overlays/Dialog.svelte";
  import Tooltip from "$lib/overlays/Tooltip.svelte";
  import TextLayout from "$lib/typography/TextLayout.svelte";

  let activeTab = $state("overview");
  let selectedAudience = $state("enterprise");
  let rolloutTrack = $state("pilot");
  let rolloutPercent = $state(68);
  let launchBriefOpen = $state(false);

  function resolveProgressState(
    value: number,
  ): "uninitiated" | "inprogress" | "complete" {
    if (value >= 100) return "complete";
    if (value <= 0) return "uninitiated";
    return "inprogress";
  }

  let progressState = $derived(resolveProgressState(rolloutPercent));
</script>

<Hero
  bg="var(--primary-bg)"
  fg="var(--primary-fg)"
  --heading-fg="var(--primary-fg)"
>
  <TextLayout>
    <p>Product Launch Scenario</p>
    <h1>Ship the migration control center</h1>
    <p>
      This review page exercises hero treatment, tabs, split panes, overlays,
      status tags, and richer control states without relying on ad hoc demo
      chrome.
    </p>
    <p>
      <Tag success>Ready</Tag>
      <Tag info>Pilot</Tag>
      <Tag warning>Needs Comms Review</Tag>
    </p>
    <p>
      <Button
        primary
        data-audit-action="open-dialog"
        onclick={() => (launchBriefOpen = true)}
      >
        Open Launch Brief
      </Button>
      <ButtonLink href="#launch-plan">Jump To Plan</ButtonLink>
    </p>
  </TextLayout>
</Hero>
<Page data-audit-target="page">
  {#snippet header()}<Bar borderTop="none" borderBottom="none">
      <div><strong>Launch Studio</strong></div>
      <div>
        <DropdownMenu triggerAuditAction="open-launch-menu">
          {#snippet label()}
            Quick Actions
          {/snippet}
          <li><button type="button">Duplicate brief</button></li>
          <li><button type="button">Share plan</button></li>
          <li><button type="button">Archive launch</button></li>
        </DropdownMenu>
      </div>
    </Bar>
  {/snippet}
  <Container maxWidth="1100px">
    <GridLayout card>
      <Card>
        {#snippet header()}
          <h3>Audience</h3>
        {/snippet}
        <ResponsiveText>
          {#snippet xs()}Compact lane{/snippet}
          {#snippet small()}Narrow launch lane{/snippet}
          {#snippet medium()}Balanced launch lane{/snippet}
          {#snippet large()}Wide launch lane{/snippet}
          {#snippet xl()}Executive launch lane{/snippet}
        </ResponsiveText>
        <p>Enterprise rollout is first in line.</p>
      </Card>
      <Card>
        {#snippet header()}
          <h3>Coverage</h3>
        {/snippet}
        <Progress state={progressState} value={rolloutPercent} max={100}>
          {rolloutPercent}% launch readiness
        </Progress>
      </Card>
      <Card>
        {#snippet header()}
          <h3>CTA Surface</h3>
        {/snippet}
        <p>
          <Tooltip tooltipText="Use this to expose secondary explanatory text.">
            <Button data-audit-action="show-tooltip" data-audit-focus="true">
              Review Help Copy
            </Button>
          </Tooltip>
        </p>
      </Card>
    </GridLayout>
  </Container>

  <div id="launch-plan">
    <Container border height="36rem">
      <TabBar sticky>
        <TabItem
          active={activeTab === "overview"}
          onclick={() => (activeTab = "overview")}
        >
          Overview
        </TabItem>
        <TabItem
          active={activeTab === "readiness"}
          data-audit-action="switch-tab"
          onclick={() => (activeTab = "readiness")}
        >
          Readiness
        </TabItem>
        <TabItem
          active={activeTab === "timeline"}
          onclick={() => (activeTab = "timeline")}
        >
          Timeline
        </TabItem>
      </TabBar>

      {#if activeTab === "overview"}
        <SplitPane leftWidth="1.25fr" rightWidth="0.9fr">
          {#snippet left()}
            <TextLayout>
              <h2>Decision stack</h2>
              <p>
                The left pane uses an accordion to exercise native details
                styling in a denser app surface.
              </p>
            </TextLayout>

            <Accordion>
              <details open>
                <summary>Launch brief</summary>
                <p>
                  Messaging is approved for enterprise accounts. Support macros
                  still need a final pass.
                </p>
              </details>
              <details>
                <summary data-audit-action="open-accordion">
                  Readiness checklist
                </summary>
                <div data-audit-target="accordion-open">
                  <p>
                    Remaining blockers are limited to docs and rollout comms.
                  </p>
                  <p>
                    <Tag success>QA Signed Off</Tag>
                    <Tag warning>Docs Pending</Tag>
                  </p>
                </div>
              </details>
              <details>
                <summary>Fallback plan</summary>
                <p>
                  Traffic can be routed back to the old experience inside five
                  minutes if error rate rises.
                </p>
              </details>
            </Accordion>
          {/snippet}

          {#snippet right()}
            <TextLayout>
              <h2>Control surface</h2>
            </TextLayout>
            <Card>
              {#snippet header()}
                <h3>Audience and rollout</h3>
              {/snippet}

              <p>
                <RadioButton bind:group={selectedAudience} value="enterprise">
                  Enterprise
                </RadioButton>
                <RadioButton bind:group={selectedAudience} value="midmarket">
                  Mid-market
                </RadioButton>
                <RadioButton bind:group={selectedAudience} value="self-serve">
                  Self-serve
                </RadioButton>
              </p>

              <p>
                <Select bind:value={rolloutTrack}>
                  <Option value="pilot"><strong>Pilot</strong> ring</Option>
                  <Option value="canary"><strong>Canary</strong> ring</Option>
                  <Option value="general"
                    ><strong>General</strong> availability</Option
                  >
                </Select>
              </p>

              <p>
                <strong>Rollout percentage:</strong>
                {rolloutPercent}%
              </p>
              <p>
                <Slider bind:value={rolloutPercent} min={0} max={100} />
              </p>
              <Progress state={progressState} value={rolloutPercent} max={100}>
                {selectedAudience} · {rolloutTrack}
              </Progress>
            </Card>
          {/snippet}
        </SplitPane>
      {:else if activeTab === "readiness"}
        <div data-audit-target="readiness-tab">
          <TextLayout>
            <h2>Readiness board</h2>
            <p>
              This tab gives the harness a second named state while exercising
              row layouts and semantic tag surfaces.
            </p>
          </TextLayout>
          <GridLayout card --card-width="var(--card-width-small)">
            <Card>
              {#snippet header()}
                <h3>Engineering</h3>
              {/snippet}
              <p><Tag success>Green</Tag></p>
              <p>Rollback rehearsed and metrics alerts verified.</p>
            </Card>
            <Card>
              {#snippet header()}
                <h3>Marketing</h3>
              {/snippet}
              <p><Tag warning>Reviewing</Tag></p>
              <p>Announcement email still needs regional approval.</p>
            </Card>
            <Card>
              {#snippet header()}
                <h3>Support</h3>
              {/snippet}
              <p><Tag info>Queued</Tag></p>
              <p>Macro updates are prepared for the pilot cohort.</p>
            </Card>
          </GridLayout>
        </div>
      {:else}
        <TextLayout>
          <h2>Timeline</h2>
          <p>
            Timeline is intentionally quiet. It exists to show a third tab state
            without adding more bespoke chrome.
          </p>
          <Code
            language="svelte"
            code={`<Hero>
  <Tag success>Ready</Tag>
  <ButtonLink href="#launch-plan">Jump To Plan</ButtonLink>
</Hero>`}
          />
        </TextLayout>
      {/if}
    </Container>
  </div>

  {#if launchBriefOpen}
    <Dialog
      open={launchBriefOpen}
      onClose={() => {
        launchBriefOpen = false;
      }}
    >
      <div data-audit-target="dialog-open">
        <TextLayout>
          <h2>Launch brief</h2>
          <p>
            This dialog exercises overlay surfaces, sticky close affordances,
            and nested content containers.
          </p>
        </TextLayout>
        <GridLayout card --card-width="var(--card-width-small)">
          <Card>
            {#snippet header()}
              <h3>Target cohort</h3>
            {/snippet}
            <p>{selectedAudience}</p>
          </Card>
          <Card>
            {#snippet header()}
              <h3>Release track</h3>
            {/snippet}
            <p>{rolloutTrack}</p>
          </Card>
          <Card>
            {#snippet header()}
              <h3>Readiness</h3>
            {/snippet}
            <Progress state={progressState} value={rolloutPercent} max={100}>
              {rolloutPercent}%
            </Progress>
          </Card>
        </GridLayout>
      </div>
    </Dialog>
  {/if}
</Page>
