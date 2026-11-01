import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Ensaio do Claude: página pré-renderizada em HTML estático (para alojamento sem Node, como a Amen).
    prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: false },
  },
});
