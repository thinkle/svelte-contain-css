import type { Reporter, TestCase, TestResult } from "@playwright/test/reporter";

/**
 * Custom Playwright reporter that prints helpful debug instructions when tests fail.
 */
class DebugHelperReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === "failed" || result.status === "timedOut") {
      // Extract the test file path to determine the route
      const testFile = test.location.file;
      const routeMatch = testFile.match(/tests\/(.+)\.spec\.ts$/);

      if (routeMatch) {
        const testName = routeMatch[1];
        const route = `/svelte-contain-css/tests/${testName}`;

        console.log("\n" + "=".repeat(70));
        console.log("🔧 DEBUG HELP");
        console.log("=".repeat(70));
        console.log(`Test "${test.title}" failed.`);
        console.log("\nTo debug this test manually:");
        console.log("  1. Start the dev server:  npm run dev");
        console.log(`  2. Visit: http://localhost:5173${route}`);
        console.log("  3. Reproduce the test steps manually to see what's happening");
        console.log("=".repeat(70) + "\n");
      }
    }
  }
}

export default DebugHelperReporter;
