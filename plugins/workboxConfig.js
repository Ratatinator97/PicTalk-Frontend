workbox.routing.registerRoute(
  new RegExp('https://api\\.pictalk\\.xyz/pictalk/image/.*\\.(png|jpg|jpeg|gif)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'pictos',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [200] }),
      new workbox.rangeRequests.RangeRequestsPlugin(),
    ],
    matchOptions: {
      ignoreSearch: false,
      ignoreVary: true
    }
  }),
);