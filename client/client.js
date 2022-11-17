const publicVapidKey = 'BG8yD1Alr9PqiZ5yLZfvb1YhTw_KDiGjsRWP9ZPu5f1VPxvmZ3aoMPpHLouGw2iTXdoodVev_NOl8bvvXSxAVCE'

let subscription = null

// Check for service worker
if ('serviceWorker' in navigator) {
  registerSwAndPush().catch(err => console.error(err))
}

async function sendbutton() {
  // Send Push Notification
  console.log('Sending Push...')
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  })
  console.log('Push Sent...')
}

// Register SW, Register Push
async function registerSwAndPush() {
  // Register Service Worker
  console.log('Registering service worker...')
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  })
  console.log('Service Worker Registered...')

  // Register Push
  console.log('Registering Push...')
  subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })
  console.log('Push Registered...')
}

// Convert base64 to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
