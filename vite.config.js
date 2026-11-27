import { defineConfig } from "vite";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { transform } from "esbuild";

const classicScripts = ["lessons-data.js", "angular-course-data.js", "learner-profiles.js", "smart-code-coach.js", "app.js", "content-protection.js"];

const isolationHeaders = {
  "Cross-Origin-Embedder-Policy": "credentialless",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Robots-Tag": "noai, noimageai"
};

export default defineConfig({
  plugins: [
    {
      name: "khotwa-classic-script-assets",
      apply: "build",
      async generateBundle() {
        for (const fileName of classicScripts) {
          const raw = await readFile(resolve(fileName), "utf8");
          const minified = await transform(raw, { minify: true, charset: "utf8", legalComments: "none" });
          this.emitFile({ type: "asset", fileName, source: minified.code });
        }
      }
    },
    {
      name: "khotwa-deferred-css-and-preload",
      apply: "build",
      transformIndexHtml: {
        order: "post",
        handler(html) {
          let modified = html;
          if (!modified.includes('rel="preload" href="/app.js"')) {
            modified = modified.replace(
              '<link rel="dns-prefetch" href="https://learn-step.dev">',
              '<link rel="dns-prefetch" href="https://learn-step.dev">\n<link rel="preload" href="/app.js" as="script">'
            );
          }
          // Cleanly remove any pre-existing or empty noscript stylesheet tags from Vite's bundling pass
          modified = modified.replace(/<noscript>\s*(<link rel="stylesheet"[^>]*?>)?\s*<\/noscript>/gi, "");
          modified = modified.replace(/<link rel="stylesheet"([^>]*?)href="([^"]+?)"([^>]*?)>/g, (match, before, href, after) => {
            const cleanBefore = before.replace(/\s*(media="[^"]*"|onload="[^"]*")/g, "");
            const cleanAfter = after.replace(/\s*(media="[^"]*"|onload="[^"]*")/g, "");
            return `<link rel="preload" href="${href}" as="style">\n  <link rel="stylesheet"${cleanBefore}href="${href}"${cleanAfter} media="print" onload="this.media='all'">\n  <noscript><link rel="stylesheet"${cleanBefore}href="${href}"${cleanAfter}></noscript>`;
          });
          return modified;
        }
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("csharp-") || id.includes("csharp_") || id.includes("csharp")) {
            return "csharp";
          }
        }
      }
    }
  },
  server: { headers: isolationHeaders },
  preview: { headers: isolationHeaders }
});
