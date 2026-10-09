/* Handstand Quest service worker — bump CACHE_NAME when shell assets change */
const CACHE_NAME = "handstand-quest-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./exercises/bail.png",
  "./exercises/chest-to-wall.png",
  "./exercises/cool-down.png",
  "./exercises/elevated-pike.png",
  "./exercises/freestanding.png",
  "./exercises/heel-pull.png",
  "./exercises/hollow.png",
  "./exercises/kick-up.png",
  "./exercises/pike-hold.png",
  "./exercises/plank.png",
  "./exercises/scap-pushup.png",
  "./exercises/shoulder-opener.png",
  "./exercises/toe-pull.png",
  "./exercises/wall-walk.png",
  "./exercises/wrist-rocks.png",
  "./exercises/cat-cow.png",
  "./exercises/wall-angels.png",
  "./exercises/forward-fold.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok && res.type === "basic") {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return res;
        })
        .catch(() => cached);
      // Prefer cache for app-shell navigations when offline; otherwise network-first with cache fallback
      return cached || network;
    })
  );
});
