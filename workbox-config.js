module.exports = {
  globDirectory: "deployment/web", // as the static resources will be
  globPatterns: [
    "**/*.{json,png,css,ico,jpg,gif,html,js,eot,svg,ttf,woff,woff2,txt,xml}",
  ],
  // set URLs that served by the server and you do nt have direct access to them from within your project.
  // e.g. in a mendix application the client js & css
  // e.g. if your styles request external resources fonts, images, etc..
  templatedURLs: {
    "mxclientsystem/mxui/mxui.js": "mxui-client-core",
    "mxclientsystem/mxui/ui/mxui.css": "mxui-styling",
    "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700":
      "font-set-1",
  },
  // here you set URLs patterns for the resources the will be requested in runtime, or later by user interaction
  // you may will customize this for the needs of your application
  runtimeCaching: [
    {
      // Match any same-origin request that contains has the following path.
      urlPattern: /mxclientsystem\/dojo/,
      // Apply a cache-first strategy.
      handler: "CacheFirst",
    },
    {
      // Match any cross-origin request that contains that comes from this origin.
      urlPattern: /https:\/\/fonts\.googleapis\.com/,
      // Apply a cache-first strategy.
      handler: "CacheFirst",
    },
  ],
  // generate a service worker file 'sw.js' and put it in 'theme' folder.
  swDest: "theme/sw.js",
  ignoreURLParametersMatching: [/./], // this is needed to ignore mx cache busting
  cleanupOutdatedCaches: true,
  cacheId: "MxApp-Cache",
};
