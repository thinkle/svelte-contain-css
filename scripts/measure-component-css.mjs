// Generated Sass size before Svelte scoping/pruning or app tree shaking.
// Optional argument: another checkout root for a before/after comparison.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as sass from "sass";
import postcss from "postcss";

const root = path.resolve(process.argv[2] ?? fileURLToPath(new URL("..", import.meta.url)));
function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}
const totals = { components: 0, bytes: 0, declarations: 0, varCalls: 0 };
for (const file of files(path.join(root, "src/lib")).filter(file => file.endsWith(".svelte"))) {
  const style = fs.readFileSync(file, "utf8").match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1];
  if (!style) continue;
  const { css } = sass.compileString(style.replaceAll("$lib/", ""), {
    url: pathToFileURL(file),
    loadPaths: [path.join(root, "src/lib")],
    style: "compressed",
  });
  totals.components++;
  totals.bytes += Buffer.byteLength(css);
  postcss.parse(css).walkDecls(decl => {
    totals.declarations++;
    totals.varCalls += (decl.value.match(/var\(/g) ?? []).length;
  });
}
console.log(JSON.stringify(totals, null, 2));
