# Mendix PWA - Precaching With Workbox

In this __'How to!'__ we'll see how we can convert our mendix app to a PWA and enable precaching for the static resources.

## Prerequisites:
You need to have `workbox-cli` installed globally on your machine, you can do so by openning your cmd/terminal and typing:

```sh
$ npm install -g workbox-cli@alpha 

```

> `Workbox` is needed to generate a service worker file which includes the relative paths to the resources that we're going to pre-cache, and to define the caching strategies which will be followed when a certain resource will be requested.
