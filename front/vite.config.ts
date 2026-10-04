import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    root: fileURLToPath(new URL("./ui", import.meta.url)),
    publicDir: fileURLToPath(new URL("./public", import.meta.url)),
    plugins: [react()],
    base: "./",
    server: {
        host: "127.0.0.1",
        port: 5173,
        strictPort: true,
    },
    build: {
        outDir: fileURLToPath(new URL("./ui-dist", import.meta.url)),
        emptyOutDir: true,
    },
});