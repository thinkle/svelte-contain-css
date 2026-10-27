<script lang="ts">
  import { themeState } from "./themeState.svelte";
  import { fullThemes, colorThemes, typographyThemes, extraThemes, headingThemes } from "./themeConfig";
  import ThemeStyle from "./ThemeStyle.svelte";
  import { accentCss, accentMode } from "./accents";

  const fullTheme = $derived(fullThemes[themeState.fullTheme]);
  const fullCss = $derived(themeState.headingTheme ? (fullTheme.cssWithoutHeadings ?? fullTheme.css) : fullTheme.css);
  const usingFull = $derived(themeState.fullTheme !== 0);
  const accents = $derived(
    accentCss(
      { primary: themeState.primaryAccent, secondary: themeState.secondaryAccent },
      accentMode(colorThemes[themeState.colorTheme].file, usingFull),
    ),
  );
</script>

<ThemeStyle id="full-injected-style" css={fullCss} />
<ThemeStyle id="color-injected-style" css={usingFull ? "" : colorThemes[themeState.colorTheme].css} />
<ThemeStyle id="typography-injected-style" css={usingFull ? "" : typographyThemes[themeState.typographyTheme].css} />
<ThemeStyle id="heading-injected-style" css={headingThemes[themeState.headingTheme].css} />
{#each extraThemes as theme, index}
  <ThemeStyle id={`extra-${index}-injected-style`} css={themeState.enabledExtras[index] ? theme.css : ""} />
{/each}
<ThemeStyle id="accent-injected-style" css={accents} />
<ThemeStyle id="extra-raw-injected-style" css={themeState.rawCss ? `:root { ${themeState.rawCss} }` : ""} />
