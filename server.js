const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const express = require('express')
const next = require('next')({ dev })
const handle = next.getRequestHandler()

next.prepare().then(() => {
  const app = express()
  const http = require('http').createServer(app)

  const io = require('socket.io').listen(http)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/api', require('./api/router')(io))

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  http.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
