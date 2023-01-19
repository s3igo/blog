import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    // Astro v2.0でexperimentalが外れる予定
    experimental: { contentCollections: true },
});
