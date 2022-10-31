self.addEventListener("fetch", event => {

});
const ASSETS = [

    "/",
    "/index.html",
    "/src/index.js",
    "/src/index.css",
    "/src/App.js",
    "/src/App.css",
    "/src/Context.js",
    "/src/components/Analysis/index.js",
    "/src/components/Analysis/PieChart.js",
    "/src/components/Header/index.js",
    "/src/components/Header/index.css",
    "/src/components/Input/index.js",
    "/src/components/Input/index.css",
    "/src/components/Transactions/index.js",
    "/src/components/Transactions/index.css",
    "/src/components/Transactions/Transaction.css",
    "/src/components/User/index.css",
    "/src/components/User/index.js",
    "/src/components/User/createAcount.js",
    "/src/components/Home.js",


];
let cache_name = "SimiCart"; // The string used to identify our cache
self.addEventListener("install", event => {

    event.waitUntil(
        caches
            .open(cache_name)
            .then(cache => {
                return cache.addAll(ASSETS);
            })
            .catch(err => console.log(err))
    );
});

self.addEventListener("fetch", event => {
    if (event.request.url === "https://mman.vercel.app/") {
        // or whatever your app's URL is
        event.respondWith(
            fetch(event.request).catch(err =>
                self.cache.open(cache_name).then(cache => cache.match("/offline.html"))
            )
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});