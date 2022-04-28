const cacheName = 'v1';


//all pages, assets, css
const cacheAssets = [
    'index.html',
    'index.js'
]

//call install event
self.addEventListener('install',e=>{
    console.log('Service worker: Installed')
    //wait until the promise is finished
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache=>{
            console.log('Service Worker: Caching Files')
            cache.addAll(cacheAssets)
        }).then(()=>self.skipWaiting())//skip wiating when everything is done
    )
})

//Call activate event, cleanup any old cache
self.addEventListener('activate',e=>{
    console.log('Service worker: Activated')
    //Remove unwanted caches
    e.waitUntil(
        //loop through the caches and delete the cache we are not looping through
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache=>{
                    if (cache !== cacheName) {
                        console.log('Service worker: Clearing old Cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

//call fetch event to show cached files when offline
self.addEventListener('fetch', e=>{
    console.log('Service worker: Fetching')
    //check if the live site is availab
    e.respondWith(
        fetch(e.request).catch(()=>caches.match(e.request))
    )
})