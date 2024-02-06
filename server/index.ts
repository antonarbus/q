import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import multer from 'multer'
import { activateRouter } from './api/activateRouter'
import { hiRouter } from './api/hiRouter'
import { loginRouter } from './api/loginRouter'
import { logoutRouter } from './api/logoutRouter'
import { refreshRouter } from './api/refreshRouter'
import { registerRouter } from './api/registerRouter'
import { uploadRouter } from './api/uploadRouter'
import { userEmailRouter } from './api/userEmailRouter'
import { usersRouter } from './api/usersRouter'
import { apiUrl } from './apiUrls'
import { connectToDb } from './db/connectToDb'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import type { Req, Res } from './types'

const multerMid = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } })

void (async (): Promise<void> => {
  const app = express()
  // todo: but do I really have to wait for db to start? let's leave it as it is for now
  await connectToDb()
  app.use(morgan('dev')) // http logs in terminal
  app.use(express.json()) // parses incoming requests with JSON because we use lots of json, let it be default
  app.use(cookieParser())
  app.use(cors())
  app.use(multerMid.single('file'))
  app.set('trust proxy', true) // for app engine

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
  app.use(apiUrl.upload, uploadRouter)

  app.use(errorHandlerMiddleware)

  const port = process.env.PORT_BACK_END
  const domain = process.env.DOMAIN

  app.listen(port, () => {
    console.info(`server started at ${domain}:${port}`)
  })
})()
