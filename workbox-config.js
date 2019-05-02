module.exports = {
  globDirectory: "deployment/web",
  globPatterns: [
    "**/*.{json,png,css,ico,jpg,gif,html,js,eot,svg,ttf,woff,woff2,txt,xml}",
  ],
  templatedURLs: {
    "mxclientsystem/mxui/mxui.js": "mxui-client-core",
    "mxclientsystem/mxui/ui/mxui.css": "mxui-styling",
    "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700":
      "font-set-1",
  },
  // here you set URLs patterns for the resources the will be requested in runtime, or later by user interaction
  runtimeCaching: [
    {
      // Match any same-origin request that contains 'api'.
      urlPattern: /mxclientsystem\/dojo/,
      // Apply a cache-first strategy.
      handler: "CacheFirst",
    },
    {
      // Match any same-origin request that contains 'api'.
      urlPattern: /https:\/\/fonts\.googleapis\.com/,
      // Apply a cache-first strategy.
      handler: "CacheFirst",
    },
  ],
  swDest: "theme/sw.js",
  ignoreURLParametersMatching: [/./], // this is needed to ignore mx cache busting
  cleanupOutdatedCaches: true,
  cacheId: "MxApp-Cache",
};
