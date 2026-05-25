import withPWAInit from "@ducanh2912/next-pwa";

// next-pwa wraps the Next config and generates the service worker + Workbox
// runtime caching. We keep PWA disabled in dev so hot-reload isn't intercepted
// by a cached service worker.
const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    runtimeCaching: [
      {
        // Leaflet/OSM map tiles → cache-first so the map works offline once
        // the area has been browsed.
        urlPattern: /^https:\/\/[abc]?\.?basemaps\.cartocdn\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "map-tiles",
          expiration: { maxEntries: 600, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: /^https:\/\/unpkg\.com\/leaflet.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "leaflet-assets",
          expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 90 },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts",
          expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
        },
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
