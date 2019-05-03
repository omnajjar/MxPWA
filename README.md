# Mendix PWA - Precaching With Workbox

In this __How to!__ we'll see how we can convert our mendix app to a PWA and enable precaching for the static resources using [Workbox](https://developers.google.com/web/tools/workbox/).

## Prerequisites:

1. You need to have [Nodejs](https://nodejs.org/en/) installed on your machine.

2. You need to install [Workbox CLI](https://developers.google.com/web/tools/workbox/modules/workbox-cli) globally on your machine:

```sh
> npm install workbox-cli --global
```
3. You need to have [Lighthouse](https://developers.google.com/web/tools/lighthouse/) on you machine (You can skip this step if you have chrome installed on your machine).

4. The explanation is assuming that you have a blank mendix app (this does __NOT__ mean that you cannot use it for an existing app, but rather for the seek of clarity in folder structures and naming conventions).

***

## Implementation:

**1.** First, let's start by copying some files into our mendix app.

__>>__ Copy the following files in the `MX_APP_ROOT_FOLDER/theme` folder:

* [robots.txt](https://github.com/omnajjar/MxPWA/blob/master/robots.txt), [learn more](https://support.google.com/webmasters/answer/6062608).

* [manifest.json](https://github.com/omnajjar/MxPWA/blob/master/manifest.json), [learn more](https://developer.mozilla.org/en-US/docs/Web/Manifest).
```js
//manifest.json
{
  "short_name": "Mendix PWA",
  "name": "Mendix Starter PWA",
  "start_url": "index.html",
  "icons": [
    {
      "src": "logo.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "logo.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "display": "standalone",
  "theme_color": "#0595DB",
  "background_color": "#ffffff"
}
```
* [logo.png](https://github.com/omnajjar/MxPWA/blob/master/logo.png) your app's logo.

* [swRegister.js](https://github.com/omnajjar/MxPWA/blob/master/swRegister.js) this script will register the service worker in the browser.

__>>__ Copy the following files in the `MX_APP_ROOT_FOLDER` folder:

* [workbox-config.js](https://github.com/omnajjar/MxPWA/blob/master/workbox-config.js), the configuration file which will be used by `workbox` to generate the service worker.

> This configurations understand how a mendix application works. However, you can customize it for your app's needs, for more information check [here](https://developers.google.com/web/tools/workbox/modules/workbox-cli#configuration).

```js
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

```

**2.** Add the required meta tags & scripts to `MX_APP_ROOT_FOLDER/theme/index.html` file.

__>>__ add the following tags inside your `<head>...</head>` tag:
```html
        <meta name="description" content="This a Mendix PWA Starter App.">
        <meta name="theme-color" content="#ffffff">
        <link rel="manifest" href="/manifest.json">
```
__>>__ add the following `<noscript>...</noscript>` tag inside your `<body>...</body>` tag:
```html
        <noscript>
            <div class="noscript-container">
                <h3>Please enable javascript in your browser</h3>
                <h4><a class="mx-link" href='https://www.wikihow.com/Enable-JavaScript'>How to enable javascript in my browser</a></h4>
            </div>
        </noscript>
```
__>>__ add the following script inside your `<body>...</body>` tag:
```html
        <noscript>
            <div class="noscript-container">
                <h3>Please enable javascript in your browser</h3>
                <h4><a class="mx-link" href='https://www.wikihow.com/Enable-JavaScript'>How to enable javascript in my browser</a></h4>
            </div>
        </noscript>
```

__>>__ add the following script before the closing `body` tag:
```html
      ....
      <script src="swRegister.js"></script>
      </body>
      ....
```
> **Note**: If you're targeting IOS devices, please consider checking this [article](https://medium.com/appscope/designing-native-like-progressive-web-apps-for-ios-1b3cdda1d0e8) as well, as we are here focusing on android devices.

**3.** Generating service worker using workbox.

__>>__ Open your command line in your `MX_APP_ROOT_FOLDER` and run the following command:
```sh
> workbox generateSW
```
This command will make use of the configuration in our `workbox-config.js` to generate a service worker `sw.js` in the `theme` folder of our app.

> **Note**: before running this command, make sure that you have built your application (in other words your `deployment/web` folder is not empty) by running the app locally this folder will be generated.



**4.** Repeat.

Perform this command each time you have change in your static assets (new mendix pages are also considered static assets).
> You're most likely going to perform this only before creating your (test/accpetance/production) build.


***
## Development Tips:

1. When running locally, it is recommended to use specific port numbers for developing PWAs which is different from the the ones you use for the normal web apps as the PWAs make use of service workers which will be registered in the browser and linked to your app domain and intercept requests for resources to this domain and return the resources from the cache if these resources are already cached, therefore using the same port numbers **without clearing the cache** when switching between apps could lead to the wrong assets being served, e.g. consider you have the app `my_pwa` is running on `localhost:3000`, this app registered a service worker and this service worker saved `index.html` in the cache, now you want to work on your `my_normal_app` (not a pwa) which is also running on `localhost:3000`, if `my_normal_app` requests `index.html` the already registered service worker will intercept this request and return back the cached `index.html` which belongs to a completely different app and that's completely wrong and confusing, so make sure to clear your cache and unregister service workers before switching to work on a different app that runs on the same port. 
