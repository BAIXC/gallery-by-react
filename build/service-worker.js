"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/galley-by-react/index.html","a28405f7a4b4c07e7ffa1b4769652513"],["/galley-by-react/static/css/main.0e06433f.css","42d5f8a4358489e91262406be974d759"],["/galley-by-react/static/js/main.8e808f6c.js","fc43c7dc37456be81f506251f1761518"],["/galley-by-react/static/media/1.54babf9a.jpg","54babf9a02c68ca7ac235dfde48b04b4"],["/galley-by-react/static/media/10.eaac24fc.jpg","eaac24fce096c83aeba9d6862279f635"],["/galley-by-react/static/media/11.95adb99a.jpg","95adb99a67aa605e494d0d46693a65b4"],["/galley-by-react/static/media/12.48ba2598.jpg","48ba25989b7d251f0a6e19654b713eed"],["/galley-by-react/static/media/14.7689acf0.jpg","7689acf02656d6254ad95c7d22bbc174"],["/galley-by-react/static/media/15.fb5f5464.jpg","fb5f5464891288ef69bf82e9a6e032ab"],["/galley-by-react/static/media/16.47a51cd0.jpg","47a51cd04b4395268f356c3ecedd7712"],["/galley-by-react/static/media/17.73c346c4.jpg","73c346c456fc43de5666a891471377ea"],["/galley-by-react/static/media/18.7017b7f4.jpg","7017b7f4200f0e861a92bdb87bf3db4e"],["/galley-by-react/static/media/3.ae842fe1.jpg","ae842fe176080b1b013a0136486621d5"],["/galley-by-react/static/media/4.6a185c2a.jpg","6a185c2addb5d006ff4db878367c9a98"],["/galley-by-react/static/media/5.adbfd871.jpg","adbfd871ce0b7d294ca27f42c82ca623"],["/galley-by-react/static/media/6.da790bf6.jpg","da790bf64606d667b7e0addb1413b767"],["/galley-by-react/static/media/7.ae4efaa8.jpg","ae4efaa8bddae65acd3ce00c39347ec1"],["/galley-by-react/static/media/8.40888408.jpg","408884082d72184a8df88bb8dd3eb4ff"],["/galley-by-react/static/media/9.e87f76b5.jpg","e87f76b5777100c88c60792f46e28302"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,a,t,r){var n=new URL(e);return r&&n.pathname.match(r)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],r=new URL(a,self.location),n=createCacheKey(r,hashParamName,t,/\.\w{8}\./);return[r.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var r=new Request(t,{credentials:"same-origin"});return fetch(r).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/galley-by-react/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});