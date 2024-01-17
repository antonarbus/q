import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { loginRouter } from './api/loginRouter'
import { registerRouter } from './api/registerRouter'
import { userEmailRouter } from './api/userEmailRouter'
import { connectToDb } from './db/connectToDb'
import { logoutRouter } from './api/logoutRouter'
import { activateRouter } from './api/activateRouter'
import { refreshRouter } from './api/refreshRouter'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import { usersRouter } from './api/usersRouter'
import { hiRouter } from './api/hiRouter'
import type { Req, Res } from './types'
import { apiUrl } from './apiUrls'

void (async (): Promise<void> => {
  const app = express()
  // todo: but do I really have to wait for db to start? let's leave it as it is for now
  await connectToDb()
  app.use(morgan('dev')) // http logs in terminal
  app.use(express.json()) // parses incoming requests with JSON because we use lots of json, let it be default
  app.use(cookieParser())
  app.use(cors())

  app.get(apiUrl.root, (_req: Req, res: Res) => res.send('i am express.js'))
  app.get(apiUrl.api, (_req: Req, res: Res) => res.json({ message: '/api' }))
  app.use(apiUrl.hi, hiRouter)
  app.use(apiUrl.register, registerRouter)
  app.use(apiUrl.login, loginRouter)
  app.use(apiUrl.logout, logoutRouter)
  app.use(apiUrl.activate, activateRouter)
  app.use(apiUrl.refresh, refreshRouter)
  app.use(apiUrl.users, usersRouter)
  app.use(apiUrl.user, userEmailRouter)

  app.use(errorHandlerMiddleware)

  const port = process.env.PORT_BACK_END
  const domain = process.env.DOMAIN

  app.listen(port, () => {
    console.info(`server started at ${domain}:${port}`)
  })
})()
