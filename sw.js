const CACHE="iveco-v2.0-cache";
const ASSETS=["./","./index.html","./style.css","./enhance.css","./contrast.css","./app.js","./enhance.js","./payroll.js","./i18n.js","./config.js","./manifest.json","./manifest-es.json","./manifest-pt.json","./icon-192.png","./icon-512.png","./camion_iveco.jpg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(r=>{const net=fetch(e.request).then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return res}).catch(()=>r||caches.match("./index.html"));return r||net}));
});
