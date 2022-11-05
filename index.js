const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

// Set static path
app.use(express.static(path.join(__dirname, "client")))
app.use(bodyParser.json())

// Keys generated by command
// ./node_modules/.bin/web-push generate-vapid-keys
const publicVapidKey = 'BG8yD1Alr9PqiZ5yLZfvb1YhTw_KDiGjsRWP9ZPu5f1VPxvmZ3aoMPpHLouGw2iTXdoodVev_NOl8bvvXSxAVCE'
const privateVapidKey = 'tmnu9joSE44LW04gNze5zZq6Ikd_3BQkZdkQr_CSXhY'

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

// Subscribe Route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body

  // Send 201 - resource created
  res.status(201).json({})

  // Create payload
  const payload = JSON.stringify({ title: 'Push Test' })

  // Pass object into sendNotification
  webpush.sendNotification(subscription, payload).catch(err => console.error(err))
})

const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
