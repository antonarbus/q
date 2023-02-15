// server.ts
import 'dotenv/config'
import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { loginRouter } from './api/loginRouter'
import { registerRouter } from './api/registerRouter'
import { userDetailsRouter } from './api/userDetailsRouter'
import { connectToDb } from './db/connectToDb'
import { logoutRouter } from './api/logoutRouter'
import { activateRouter } from './api/activateRouter'
import { refreshRouter } from './api/refreshRouter'
import { errorHandler } from './middleware/errorHandler'
import { usersRouter } from './api/usersRouter'

(async function () {
  const app = express()
  await connectToDb()
  app.use(morgan('dev')) // http logs in terminal
  app.use(express.json()) // parses incoming requests with JSON because we use lots of json, let it be default
  app.use(cookieParser())
  app.use(cors())
  app.get('/', (req: ReqType, res:ResType) => res.send('This is from express.js'))
  app.get('/api', (req: ReqType, res:ResType) => res.json({ message: '/api' }))

  // use router from separate file
  const hi = require('./api/hi')
  app.use('/api/hi', hi)

  app.use('/api/register', registerRouter)
  app.use('/api/login', loginRouter)
  app.use('/api/logout', logoutRouter)
  app.use('/api/activate', activateRouter)
  app.use('/api/refresh', refreshRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/user', userDetailsRouter)

  app.use(errorHandler)

  const port = process.env.PORT_BACK_END
  const domain = process.env.DOMAIN

  app.listen(port, () => console.log(`server started at ${domain}:${port}`))
})()
