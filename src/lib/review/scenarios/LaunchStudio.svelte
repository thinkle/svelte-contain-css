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
  import Inline from "$lib/layout/Inline.svelte";
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
  import Stack from "$lib/layout/Stack.svelte";

  let activeTab = $state("overview");
  let selectedAudience = $state("enterprise");
  let rolloutTrack = $state("pilot");
  let rolloutPercent = $state(68);
  let launchBriefOpen = $state(false);

  const audienceLabels: Record<string, string> = {
    enterprise: "Atlantic pact",
    midmarket: "Non-aligned observers",
    "self-serve": "Backchannel committee",
  };

  const rolloutLabels: Record<string, string> = {
    pilot: "Berlin buffer",
    canary: "Embassy cable",
    general: "Summit doctrine",
  };

  function resolveProgressState(
    value: number,
  ): "uninitiated" | "inprogress" | "complete" {
    if (value >= 100) return "complete";
    if (value <= 0) return "uninitiated";
    return "inprogress";
  }

  let progressState = $derived(resolveProgressState(rolloutPercent));
  let selectedAudienceLabel = $derived(audienceLabels[selectedAudience]);
  let rolloutTrackLabel = $derived(rolloutLabels[rolloutTrack]);
</script>

<Hero
  bg="var(--primary-bg)"
  fg="var(--primary-fg)"
  headingFg="var(--primary-fg)"
>
  <TextLayout>
    <p>Encyclopedia Of Strategic Containers</p>

    <Stack gap="0">
      <div>
        <Tag success>Stable</Tag>
        <Tag info>Briefing</Tag>
        <Tag warning>Needs Footnote</Tag>
      </div>
      <h1>Contain the cascade without spilling the tea</h1>
    </Stack>
    <p>
      Containment was a Cold War policy of limiting expansion by surrounding a
      rival power with alliances, aid, military readiness, and patient
      diplomacy. In this miniature entry, the doctrine is treated as a civic art
      of boundaries: buffers hold, channels stay open, and every communique is
      filed in a box marked "do not escalate before breakfast."
    </p>

    <Inline>
      <Button
        primary
        data-audit-action="open-dialog"
        onclick={() => (launchBriefOpen = true)}
      >
        Open Doctrine Brief
      </Button>
      <ButtonLink href="#launch-plan">Jump To Map Room</ButtonLink>
    </Inline>
  </TextLayout>
</Hero>
<Page data-audit-target="page">
  {#snippet header()}<Bar --bar-border-top="none" --bar-border-bottom="none">
      <div><strong>Containment Studio</strong></div>
      <div>
        <DropdownMenu triggerAuditAction="open-launch-menu">
          {#snippet label()}
            Quick Actions
          {/snippet}
          <li><button type="button">Duplicate memo</button></li>
          <li><button type="button">Share doctrine</button></li>
          <li><button type="button">Archive communique</button></li>
        </DropdownMenu>
      </div>
    </Bar>
  {/snippet}
  <Container maxWidth="1100px">
    <GridLayout card>
      <Card>
        {#snippet header()}
          <h3>Sphere</h3>
        {/snippet}
        <ResponsiveText>
          {#snippet xs()}Pocket doctrine{/snippet}
          {#snippet small()}Narrow buffer{/snippet}
          {#snippet medium()}Balanced boundary{/snippet}
          {#snippet large()}Wide diplomatic lane{/snippet}
          {#snippet xl()}Grand strategy briefing{/snippet}
        </ResponsiveText>
        <p>
          The inner sphere marks the states, offices, and observers expected to
          receive the first memo before policy hardens into posture.
        </p>
      </Card>
      <Card>
        {#snippet header()}
          <h3>Stability</h3>
        {/snippet}
        <Progress state={progressState} value={rolloutPercent} max={100}>
          {rolloutPercent}% boundary confidence
        </Progress>
      </Card>
      <Card>
        {#snippet header()}
          <h3>Margin Note</h3>
        {/snippet}
        <Inline>
          <Tooltip tooltipText="Diplomatic cables also need explanatory hover text.">
            <Button data-audit-action="show-tooltip" data-audit-focus="true">
              Review Margin Note
            </Button>
          </Tooltip>
        </Inline>
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
                A containment policy normally joins military preparedness,
                economic assistance, diplomatic signaling, and public patience.
                The entries below summarize the map-room logic without pretending
                that history ever fits neatly inside one filing cabinet.
              </p>
            </TextLayout>

            <Accordion>
              <details open>
                <summary>Doctrine brief</summary>
                <p>
                  The memo argues for containment by strong boundaries and calm
                  escalation paths. The footnotes are mildly theatrical, because
                  every serious doctrine needs one sentence wearing a tiny hat.
                </p>
              </details>
              <details>
                <summary data-audit-action="open-accordion">
                  Boundary checklist
                </summary>
                <div data-audit-target="accordion-open">
                  <p>
                    Remaining risks are limited to vague metaphors, leaky
                    margins, and one suspiciously ambitious sidebar.
                  </p>
                  <Inline wrap="wrap">
                    <Tag success>Buffers Stable</Tag>
                    <Tag warning>Footnotes Pending</Tag>
                  </Inline>
                </div>
              </details>
              <details>
                <summary>Fallback plan</summary>
                <p>
                  If a crisis escalates, return the matter to the old treaty
                  room, serve lukewarm coffee, and let the ambassadors discover
                  whether their sternest sentences still fit inside the folder.
                </p>
              </details>
            </Accordion>
          {/snippet}

          {#snippet right()}
            <TextLayout>
              <h2>Policy controls</h2>
            </TextLayout>
            <Card>
              {#snippet header()}
                <h3>Sphere and boundary</h3>
              {/snippet}

              <Stack gap="var(--space-sm)">
                <RadioButton bind:group={selectedAudience} value="enterprise">
                  Atlantic pact
                </RadioButton>
                <RadioButton bind:group={selectedAudience} value="midmarket">
                  Non-aligned observers
                </RadioButton>
                <RadioButton bind:group={selectedAudience} value="self-serve">
                  Backchannel committee
                </RadioButton>
              </Stack>

              <div>
                <Select bind:value={rolloutTrack}>
                  <Option value="pilot"><strong>Berlin</strong> buffer</Option>
                  <Option value="canary"><strong>Embassy</strong> cable</Option>
                  <Option value="general"
                    ><strong>Summit</strong> doctrine</Option
                  >
                </Select>
              </div>

              <p>
                <strong>Boundary confidence:</strong>
                {rolloutPercent}%
              </p>
              <div>
                <Slider bind:value={rolloutPercent} min={0} max={100} />
              </div>
              <Progress state={progressState} value={rolloutPercent} max={100}>
                {selectedAudienceLabel} · {rolloutTrackLabel}
              </Progress>
            </Card>
          {/snippet}
        </SplitPane>
      {:else if activeTab === "readiness"}
        <div data-audit-target="readiness-tab">
          <TextLayout>
            <h2>Readiness board</h2>
            <p>
              Containment depended on slow maintenance: cables answered on time,
              boundaries rehearsed before emergencies, and public explanations
              prepared before rumors filled the room.
            </p>
          </TextLayout>
          <GridLayout card --card-width="var(--card-width-small)">
            <Card>
              {#snippet header()}
                <h3>Map Room</h3>
              {/snippet}
              <Inline><Tag success>Stable</Tag></Inline>
              <p>Boundaries rehearsed and annotation alerts verified.</p>
            </Card>
            <Card>
              {#snippet header()}
                <h3>Historian</h3>
              {/snippet}
              <Inline><Tag warning>Reviewing</Tag></Inline>
              <p>One paragraph still confuses containment with a casserole lid.</p>
            </Card>
            <Card>
              {#snippet header()}
                <h3>Protocol Desk</h3>
              {/snippet}
              <Inline><Tag info>Queued</Tag></Inline>
              <p>Memo templates are prepared for the next boxed-in briefing.</p>
            </Card>
          </GridLayout>
        </div>
      {:else}
        <TextLayout>
          <h2>Timeline</h2>
          <p>
            The short chronology begins with a warning, becomes a doctrine, and
            ends as a habit of institutions. The dates matter, but so does the
            recurring act of putting tension into procedural containers.
          </p>
          <Code
            language="text"
            code={`1946: The long telegram frames expansion as a pressure problem.
1947: The Truman Doctrine names aid as a boundary tool.
1949: NATO turns the boundary into an institution.`}
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
          <h2>Doctrine brief</h2>
          <p>
            The brief treats containment as an argument for patience under
            pressure. It is less a wall than a series of labeled compartments:
            alliances, aid, signals, reserves, and enough coffee to keep the
            night staff civil.
          </p>
        </TextLayout>
        <GridLayout card --card-width="var(--card-width-small)">
          <Card>
            {#snippet header()}
              <h3>Sphere</h3>
            {/snippet}
            <strong>{selectedAudienceLabel}</strong>
          </Card>
          <Card>
            {#snippet header()}
              <h3>Boundary</h3>
            {/snippet}
            <strong>{rolloutTrackLabel}</strong>
          </Card>
          <Card>
            {#snippet header()}
              <h3>Confidence</h3>
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
