(function() {
  // util function that will check you're app is running now on localhost
  function _isLocalhost() {
    return (
      window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
      )
    );
  }

  // if service worker is supported, register valid service worker.
  function registerSW() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        var swURL = "sw.js";
        _registerValidSW(swURL);
        // Also, you can use _isLocalhost util function to register service worker only when you're NOT in localhost
        // if (!_isLocalhost()) {
        //   _registerValidSW(swURL);
        // }
        // and comment out the above line of code.
      });
    }
  }

  function _registerValidSW(swURL) {
    // Check if the service worker can be found.
    fetch(swURL)
      .then(response => {
        // Ensure service worker exists, and that we really are getting a JS file.
        if (
          response.status === 200 ||
          response.headers.get("content-type") === "application/javascript"
        ) {
          navigator.serviceWorker
            .register(swURL)
            .then(registration => {
              registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === "installed") {
                    if (navigator.serviceWorker.controller) {
                      // At this point, the old content will have been purged and
                      // the fresh content will have been added to the cache.
                      // It's the perfect time to display a "New content is
                      // available; please refresh." message in your web app.
                      console.log("New content is available; please refresh.");
                      //e.g. Here you can for example show a popup for the user informing him of a new version of your app.
                      // e.g. alert("Please refresh your browser to get new available content!");
                    } else {
                      // At this point, everything has been precached.
                      // It's the perfect time to display a
                      // "Content is cached for offline use." message.
                      console.log("Content is cached for offline use.");
                    }
                  }
                };
              };
            })
            .catch(error => {
              console.error("Error during service worker registration:", error);
            });
        }
      })
      .catch(() => {
        console.log(
          "No internet connection found. App is running in offline mode.",
        );
      });
  }

  // unregister an existing sw.
  function unregisterSW() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
      });
    }
  }
  registerSW();
})();
