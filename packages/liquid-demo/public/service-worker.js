importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js')

workbox.core.clientsClaim()

workbox.core.skipWaiting()

workbox.precaching.cleanupOutdatedCaches()

workbox.routing.registerRoute(new RegExp('/graphql'), new workbox.strategies.StaleWhileRevalidate({}), 'GET')
workbox.routing.registerRoute(new RegExp('/image'), new workbox.strategies.CacheFirst({}), 'GET')
