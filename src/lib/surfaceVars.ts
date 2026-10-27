/**
 * Put a component (or every component of one kind inside a context) in a
 * color family: a role such as `primary`, or one your app defines with its
 * own `--<role>-bg` / `--<role>-fg`.
 *
 * ```svelte
 * <div style={surfaceVars("primary", "tile")}>
 *   <Tile>...</Tile>          <!-- a primary Tile: on-primary pins, else mix -->
 * </div>
 * ```
 *
 * `<Bar primary>` is sugar for exactly this, so the sugar, a context and an
 * app-defined role all resolve the same way. Setting `--tile-bg` by hand
 * instead takes the Tile out of every family: its text, links and headings
 * then mix from its own colors under every theme. See
 * docs/color-families.md.
 *
 * The variables written are private transport (`--_<prefix>-role-*`,
 * `--_<prefix>-on-*`); themes write `--on-<role>-…` pins, never these.
 */
const TONES = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "danger",
  "muted",
] as const;

const HEADING_GROUPS: Record<number, string | null> = {
  1: "major",
  2: "major",
  3: null,
  4: null,
  5: "minor",
  6: "minor",
};

function chain(names: string[]): string {
  return names.reduceRight<string>(
    (rest, name) => (rest ? `var(${name}, ${rest})` : `var(${name})`),
    "",
  );
}

export function surfaceVars(role: string, prefix: string): string {
  const p = `--_${prefix}`;
  const on = `--on-${role}`;
  const vars: string[] = [
    `${p}-role-bg: var(--${role}-bg)`,
    `${p}-role-fg: var(--${role}-fg)`,
  ];
  for (const tone of TONES) {
    vars.push(`${p}-on-${tone}-text-fg: var(${on}-${tone}-text-fg)`);
  }
  vars.push(`${p}-on-link-text-fg: var(${on}-link-text-fg)`);
  vars.push(`${p}-on-link-hover-text-fg: var(${on}-link-hover-text-fg)`);
  for (let level = 1; level <= 6; level++) {
    const group = HEADING_GROUPS[level];
    for (const channel of ["fg", "bg"]) {
      const names = [
        `${on}-heading-${level}-${channel}`,
        ...(group ? [`${on}-heading-${group}-${channel}`] : []),
        `${on}-heading-${channel}`,
      ];
      vars.push(`${p}-on-h${level}-${channel}: ${chain(names)}`);
    }
  }
  return vars.join("; ") + ";";
}
