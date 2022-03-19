import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { dependencies } from "./package.json";

/* import { visualizer } from "rollup-plugin-visualizer"; */
// npm run build will create a file stats.html in root directory
const pwaOptions = {
  devOptions: {
    enabled: true,
  },
  registerType: "autoUpdate",
  includeAssets: [],
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,jpg,svg,ico,txt,woff,woff2,ttf,eot}"],
    maximumFileSizeToCacheInBytes: 5000000,
  },
  manifest: {
    name: "Senf.koeln",
    short_name: "Senf",
    description:
      "Digitale Beteiligung für ein lebenswerteres Kölner Stadtbild. Bürgerbeteiligung / Partizpation – niedrigschwellig, digital und mobil",
    theme_color: "#ffffff",
    icons: [
      {
        src: "android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "android-chrome-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "android-chrome-320x320.png",
        sizes: "320x320",
        type: "image/png",
      },

      {
        src: "android-chrome-320x320.png",
        sizes: "320x320",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
};
function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (["react", "react-router-dom", "react-dom", "firebase"].includes(key))
      return;
    chunks[key] = [key];
  });
  return chunks;
}
export default defineConfig(({ command, mode }) => {
  return {
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-router-dom", "react-dom"],
            ...renderChunks(dependencies),
          },
        },
      },
    },
    plugins: [
      react(),
      VitePWA(
        pwaOptions
      ) /* , visualizer({ gzipSize: true, brotliSize: true } )*/,
    ],
  };
});
