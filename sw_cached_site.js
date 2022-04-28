const cacheName = 'v2';




//call install event
self.addEventListener('install',e=>{
    console.log('Service worker: Installed')

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
        fetch(e.request).then(res=>{
            //make a clone of the response
            const resClone = res.clone();
            //open cache
            caches.open(cacheName).then(cache=>{
                //add response to the cache
                cache.put(e.request, resClone)
            })
            return res
        }).catch(err=>{
            caches.match(e.request).then(res=>res)
        })
    )
})