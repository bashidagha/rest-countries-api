if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,i)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let r={};const c=e=>n(e,o),l={module:{uri:o},exports:r,require:c};s[o]=Promise.all(t.map((e=>l[e]||c(e)))).then((e=>(i(...e),r)))}}define(["./workbox-fa1f7b7e"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-CBOHZ0DM.js",revision:null},{url:"assets/index-CE5weptd.css",revision:null},{url:"index.html",revision:"e407a6e3f0bef7fb1768f4b998e196f4"},{url:"registerSW.js",revision:"ed7262fd4ac1c86d0d6c16a5f0143125"},{url:"pwa-192x192.png",revision:"9408b729b828420675a01c40f33e1b16"},{url:"pwa-512x512.png",revision:"b4e0e810fc8c01789b160b5710cc282d"},{url:"manifest.webmanifest",revision:"65786356ea33e15e0624af2c2bd98ded"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/flagcdn\.com\/.*$/,new e.CacheFirst({cacheName:"external-images-cache",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:604800}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com\/css2\?.*$/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
