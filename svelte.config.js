import adapter from "@sveltejs/adapter-static";
import { sveltePreprocess } from "svelte-preprocess";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const config = {
  preprocess: sveltePreprocess({
    scss: {
      includePaths: ["src"],
      importer: [
        (url, prev) => {
          if (url.startsWith("$lib")) {
            return {
              file: path.resolve(__dirname, "src/lib", url.slice(5)),
            };
          }
          return null;
        },
      ],
    },
    // Add other preprocessors if needed
  }),
  kit: {
    adapter: adapter({
      // default options are shown. You can customize them as needed
      pages: "build",
      assets: "build",
      fallback: null,
    }),
    paths: {
      base: process.env.NODE_ENV === "production" ? "/svelte-contain-css" : "",
    },
    prerender: {
      handleMissingId: "ignore", // or 'ignore' or a custom function
    },
  },
};

export default config;
