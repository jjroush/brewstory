const withMdxEnhanced = require("next-mdx-enhanced");
const withOffline = require("next-offline");

const nextConfig = {
  layoutPath: "mdx-layouts",
  target: "serverless",
  transformManifest: manifest => ["/"].concat(manifest),
  generateInDevMode: true,
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};

module.exports = withOffline(withMdxEnhanced(nextConfig)());
