const gameBoardsCache = "GameBoard Cache";
const filesPath = [
  '/',
  "/index.html",
  "/App.js",
  "/index.js",
];

const self = this;
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(gameBoardsCache).then((cache) => {
      console.log("Open Cache");
      return cache.addAll(filesPath);
    })
  );
});


self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        } 
        return fetch(event.request)
          .then(response => {
            const responseClone = response.clone();
            caches.open(gameBoardsCache)
              .then(cache => cache.put(event.request.url, responseClone))
            return response;
          })
      .catch()
    })
  );
});
  
self.addEventListener("activate", () => {
  console.log("Activation");
  caches.keys()
    .then(keys => {
      keys.map(key => {
        if(key !== gameBoardsCache) {
          caches.delete(key);
        }
      })
    })
});