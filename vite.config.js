import { defineConfig } from "vite";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { transform } from "esbuild";

const classicScripts = ["lessons-data.js", "angular-course-data.js", "learner-profiles.js", "app.js", "content-protection.js"];

const isolationHeaders = {
  "Cross-Origin-Embedder-Policy": "credentialless",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Robots-Tag": "noai, noimageai"
};

export default defineConfig({
  plugins: [{
    name: "khotwa-classic-script-assets",
    apply: "build",
    async generateBundle() {
      for (const fileName of classicScripts) {
        const raw = await readFile(resolve(fileName), "utf8");
        const minified = await transform(raw, { minify: true, charset: "utf8", legalComments: "none" });
        this.emitFile({ type: "asset", fileName, source: minified.code });
      }
    }
  }],
  server: { headers: isolationHeaders },
  preview: { headers: isolationHeaders }
});
