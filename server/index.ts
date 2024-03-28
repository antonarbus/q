import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { activateRouter } from './api/activateRouter'
import { deleteQuotationRouter } from './api/deleteQuotationRouter'
import { getAccessTokenRouter } from './api/getAccessTokenRouter'
import { getBucketCors } from './api/getBucketCors'
import { getQuotationRouter } from './api/getQuotationRouter'
import { getQuotationsRouter } from './api/getQuotationsRouter'
import { hiRouter } from './api/hiRouter'
import { loginRouter } from './api/loginRouter'
import { logoutRouter } from './api/logoutRouter'
import { registerRouter } from './api/registerRouter'
import { resetRouter } from './api/resetRouter'
import { saveQuotationRouter } from './api/saveQuotationRouter'
import { setBucketCors } from './api/setBucketCors'
import { testRouter } from './api/testRouter'
import { uploadRouter } from './api/uploadRouter'
import { userEmailRouter } from './api/userEmailRouter'
import { usersRouter } from './api/usersRouter'
import { apiUrl } from './consts/apiUrl'
import { connectToDb } from './db/connectToDb'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import { multerMiddleware } from './middleware/multerMiddleware'
import type { Req, Res } from './types'

const app = express()
void connectToDb()
app.use(morgan('dev')) // http logs in terminal
app.use(express.json()) // parses incoming requests with JSON because we use lots of json, let it be default
app.use(cookieParser())
app.use(cors())
app.use(multerMiddleware.single('file'))
app.set('trust proxy', true) // for app engine

app.get(apiUrl.root, (_req: Req, res: Res) => res.send('i am express.js'))
app.get(apiUrl.api, (_req: Req, res: Res) => res.json({ message: '/api' }))
app.use(apiUrl.hi, hiRouter)
app.use(apiUrl.test, testRouter)
app.use(apiUrl.register, registerRouter)
app.use(apiUrl.reset, resetRouter)
app.use(apiUrl.login, loginRouter)
app.use(apiUrl.logout, logoutRouter)
app.use(apiUrl.activate, activateRouter)
app.use(apiUrl.getAccessToken, getAccessTokenRouter)
app.use(apiUrl.users, usersRouter)
app.use(apiUrl.user, userEmailRouter)
app.use(apiUrl.upload, uploadRouter)
app.use(apiUrl.setBucketCors, setBucketCors)
app.use(apiUrl.getBucketCors, getBucketCors)
app.use(apiUrl.saveQuotation, saveQuotationRouter)
app.use(apiUrl.getQuotation, getQuotationRouter)
app.use(apiUrl.getQuotations, getQuotationsRouter)
app.use(apiUrl.deleteQuotation, deleteQuotationRouter)

app.use(errorHandlerMiddleware)

const port = process.env.PORT_BACK_END
const domain = process.env.DOMAIN
const tellServerStarted = (): void => {
  console.info(`🚀 server started at ${domain}:${port}`)
}
app.listen(port, tellServerStarted)
