import withPWAInit from "@ducanh2912/next-pwa";

// next-pwa wraps the Next config and generates the service worker + Workbox
// runtime caching. PWA is disabled in dev so hot-reload isn't intercepted.
const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // Cache pages as you navigate, but NOT aggressively — aggressive caching is
  // what made stale builds stick around after a deploy.
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: false,
  reloadOnOnline: true,
  workboxOptions: {
    // Activate the new service worker immediately and drop old caches, so a
    // fresh deploy shows up on a normal refresh instead of one version behind.
    skipWaiting: true,
    clientsClaim: true,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      // --- Remote, effectively-immutable assets → cache-first ----------------
      {
        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts",
          expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
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
        // Map tiles — cache-first so the map works offline once browsed.
        urlPattern: /^https:\/\/[abc]?\.?basemaps\.cartocdn\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "map-tiles",
          expiration: { maxEntries: 600, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        // Landmark hero photos from Wikimedia — keep them available offline.
        urlPattern: /^https:\/\/(commons|upload)\.wikimedia\.org\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "wikimedia-images",
          expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 60 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },

      // --- Our own immutable build output → cache-first ----------------------
      {
        urlPattern: /\/_next\/static\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "next-static",
          expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: /\.(?:js|css|woff2?|png|jpe?g|svg|gif|webp|ico)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "static-assets",
          expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },

      // --- Pages, RSC payloads, data → network-first -------------------------
      // Always try the network first (so a new deploy is seen on refresh), and
      // fall back to cache only when offline.
      {
        urlPattern: ({ sameOrigin }) => sameOrigin,
        handler: "NetworkFirst",
        options: {
          cacheName: "app-pages",
          networkTimeoutSeconds: 3,
          expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 7 },
          cacheableResponse: { statuses: [0, 200] },
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
