import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig(({ mode }) => ({
  base: mode === "pages" ? "/ballena-azul-website/" : "/",
  plugins: [react(), mode === "pages" ? null : basicSsl()].filter(Boolean),
  server: {
    https: mode !== "pages",
    // Bind IPv4 + IPv6 — "localhost" alone often listens only on [::1] on Windows
    host: true,
    port: 5173,
    strictPort: true,
    open: "/register",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
}));
