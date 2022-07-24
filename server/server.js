// server.js
const express = require('express')
const app = express()
app.use(express.json()) // parses incoming requests with JSON payloads and is based on body-parser.

app.get('/', (req, res) => {
  res.send('This is from express.js')
})

app.get('/api', (req, res) => {
  res.json({ message: '/api' })
})

// use router from separate file
const hi = require('./api/hi')
app.use('/api/hi', hi)

const login = require('./api/login')
app.use('/api/login', login)

app.listen(3001, () => {
  console.log('server started at http://localhost:3001')
})
