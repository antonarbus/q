import 'dotenv/config'
import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { loginRouter } from './api/login/login'
import { registerRouter } from './api/register/register'

console.log(process.env.MONGO_DB_USER_NAME)

const app = express()
app.use(express.json()) // parses incoming requests with JSON because we use lots of json, let it be default
app.get('/', (req: ReqType, res:ResType) => {
  res.send('This is from express.js')
})

app.get('/api', (req: ReqType, res:ResType) => {
  res.json({ message: '/api' })
})

// use router from separate file
const hi = require('./api/hi')
app.use('/api/hi', hi)

app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)

app.listen(3001, () => {
  console.log('server started at http://localhost:3001')
})
