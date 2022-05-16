const storage_name = "js101-v.1";

const self = this;

self.addEventListener('fetch', (event) => {
    // Open the cache
    event.respondWith(caches.open(storage_name).then((cache) => {
      // Go to the network first
      return fetch(event.request.url).then((fetchedResponse) => {
        cache.put(event.request, fetchedResponse.clone());
        return fetchedResponse;
      }).catch(() => {
        // If the network is unavailable, get
        return cache.match(event.request.url);
      });
    }));
});