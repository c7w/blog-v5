import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://new-blog.c7w.tech",
  prefetch: true,
  integrations: [sitemap(), tailwind()],
});
