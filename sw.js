// Service worker minimo: permette le notifiche su Android e apre l'evento al tocco.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var url = event.notification.data && event.notification.data.url;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      if (url) return self.clients.openWindow(url);
      if (list.length) return list[0].focus();
      return self.clients.openWindow('./');
    })
  );
});
