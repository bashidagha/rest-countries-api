import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            devOptions: { enabled: true },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/flagcdn\.com\/.*$/,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "external-images-cache",
                            expiration: {
                                maxEntries: 100, // Store up to 100 images
                                maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 7 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern:
                            /^https:\/\/fonts\.googleapis\.com\/css2\?.*$/,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "google-fonts-stylesheets",
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
            manifest: {
                name: "Countries List",
                short_name: "Countries",
                description: "Countries List",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
