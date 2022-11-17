console.log('Service Worker Loaded...')

self.addEventListener('push', e => {
  const data = e.data.json()
  console.log('Push Recieved...')
  self.registration.showNotification(data.title, {
    body: 'Notified by Elaya Worker',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiUuQ8A8HjZIb481o3ppXJH4NNdGtuoYUuvQ&usqp=CAU'
  })
})
