const gameBoardsCache = "GameBoard Casche";
const filesPath = [
  // '/',
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
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("Activation");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
    })
  );
});
