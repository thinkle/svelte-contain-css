import { spawn } from "node:child_process";
import process from "node:process";

const themes = [
  "light",
  "dark",
  "bootstrap",
  "purple",
  "material",
  "retro",
  "light-or-dark",
  "canyon-modern-serif-fancy",
  "forest-editorial-rounded",
  "dark-ibm-layered",
  "light-airy-solid",
];

const scenarios = [
  "incredible-app-shell",
  "table-workbench",
  "layout-workbench",
];

const options = parseArgs(process.argv.slice(2));
const selectedThemes = options.themes.length ? options.themes : themes;
const selectedScenarios = options.scenarios.length ? options.scenarios : scenarios;

for (const theme of selectedThemes) {
  for (const scenario of selectedScenarios) {
    console.log(`capturing ${theme} / ${scenario}`);
    await runCapture(theme, scenario, options.extraArgs);
  }
}

function parseArgs(argv) {
  const parsed = {
    themes: [],
    scenarios: [],
    extraArgs: [],
  };

  for (const arg of argv) {
    if (arg.startsWith("--themes=")) {
      parsed.themes = arg
        .slice("--themes=".length)
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
      continue;
    }

    if (arg.startsWith("--scenarios=")) {
      parsed.scenarios = arg
        .slice("--scenarios=".length)
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
      continue;
    }

    parsed.extraArgs.push(arg);
  }

  return parsed;
}

function runCapture(theme, scenario, extraArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        "scripts/capture-review.mjs",
        `--theme=${theme}`,
        `--scenario=${scenario}`,
        ...extraArgs,
      ],
      {
        cwd: process.cwd(),
        env: process.env,
        stdio: "inherit",
      },
    );

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(`capture failed for ${theme} / ${scenario} with code ${code}`),
      );
    });

    child.on("error", reject);
  });
}
