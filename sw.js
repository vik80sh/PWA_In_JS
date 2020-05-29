
var CACHE_STATIC_NAME = "static-v4";
var CACHE_DYNAMIC_NAME = "dynamic-v4";


self.addEventListener('install', function (event) {
    console.log(" [ Servive Worker ] Installing Service Worker... ", event)
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function (cache) {
                console.log(" [Service Worker ] Precaching App ")
                cache.addAll([
                    '/',
                    '/index.html',
                    '/src/js/app.js',
                    '/src/js/feed.js',
                    '/src/js/promise.js',
                    '/src/js/fetch.js',
                    '/src/css/app.css',
                    '/src/css/feed.css',
                    '/src/images/main-image.jpg',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
                ])
                // cache.add('/index.html')
                // cache.add('/src/js/app.js')
            })
    )
})

self.addEventListener('activate', function (event) {
    console.log("[ Service Workier ] Activating Service Worker... ", event);
    event.waitUntil(
        caches.keys()
            .then(function(keyList){
                return Promise.all(keyList.map(function(key){
                    if(key!==CACHE_STATIC_NAME && key!==CACHE_DYNAMIC_NAME){
                        console.log(" removed old cache ",key);
                        return caches.delete(key)
                    }
                }))
            })
    )
    
    return self.clientInformation.claim()
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (res) {
                if (res)
                    return res;
                else {
                    return fetch(event.request)
                        .then(function (res) {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then(function (cache) {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        })
                        .catch(function(err){})
                }
            })
    )
}) 