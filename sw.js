self.addEventListener('fetch',event=>{
    event.respondWith(route(event.request))
})

function route(request) {
    let url=new URL(request.url)
   if (location.host==url.host) {
    return fetch(request)
   }
   return cacheFetch(request)
}
function cacheFetch(request) {
 return caches.match(request).then(res=>{
 if(res){
 return res;
 }
 return fetch(request).then(response=>{
 const clone=response.clone()
 caches.open("v").then(cache=>{
 cache.put(request,clone)
 })
 return response;
 });
 }).catch(err=> {
 console.log(err);
 });
}