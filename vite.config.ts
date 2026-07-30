import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { siteConfig } from "./site.config";

export default defineConfig({
  plugins: [
    {
      name: "inject-site-config-into-markdown",
      enforce: "pre",
      transform(source, id) {
        if (!id.replace(/\\/g, "/").includes("/content/guide.md?raw")) {
          return null;
        }

        return source
          .split("{{MODPACK_DOWNLOAD_URL}}")
          .join(siteConfig.modpack.downloadUrl);
      },
    },
    react(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
