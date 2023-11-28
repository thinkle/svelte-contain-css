/* let cssVariableInjetion = injectVars(
    $$props,
    ['bg', 'fg', 'padding', 'cardWidth', 'cardHeight'],    
  ) */

export function injectVars(
  props: { [key: string]: string },
  prefix: string,
  varList: string[]
) {
  let cssVars = "";
  varList.forEach((v) => {
    if (props[v]) {
      const cssVarName = toKebabCase(v);
      cssVars += `--${prefix}-${cssVarName}: ${props[v]};`;
    }
  });
  return cssVars;
}
function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
