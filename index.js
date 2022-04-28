//make sure sw is supported
if ('serviceWorker' in navigator) {
    //register when the window loads
    window.addEventListener('load',() =>{
        navigator.serviceWorker.register('./sw_cached_site.js')
        .then(reg=>{
            console.log('Service worker: Registered')
        })
        .catch(err=>console.log(`Service worker: Error: ${err}`))
    })
}