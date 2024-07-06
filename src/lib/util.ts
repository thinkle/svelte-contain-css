import { cssProperties } from "./cssprops";

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
  for (let prop in props) {
    if (prop[0] == "-" && prop[1] == "-") {
      cssVars += `${prop}: ${props[prop]};`;
    }
  }
  return cssVars;
}
function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function copyCSSVariables(
  origin: HTMLElement,
  target: HTMLElement,
  variableList: string[] = cssProperties
) {
  const styles = getComputedStyle(origin);
  for (let v of variableList) {
    target.style.setProperty(`--${v}`, styles.getPropertyValue(`--${v}`));
  }
}
