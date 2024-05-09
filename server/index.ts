import 'dotenv/config'
import cookieParser from 'cookie-parser'
// import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { activateRouter } from './api/activateRouter'
import { deleteItemRouter } from './api/deleteItemRouter'
import { deleteQuotationRouter } from './api/deleteQuotationRouter'
import { getAccessTokenRouter } from './api/getAccessTokenRouter'
import { getBucketCors } from './api/getBucketCors'
import { getItemCategoriesRouter } from './api/getItemCategoriesRouter'
import { getItemRouter } from './api/getItemRouter'
import { getItemsRouter } from './api/getItemsRouter'
import { getQuotationCategoriesRouter } from './api/getQuotationCategoriesRouter'
import { getQuotationRouter } from './api/getQuotationRouter'
import { getQuotationsRouter } from './api/getQuotationsRouter'
import { logInRouter } from './api/logInRouter'
import { logOutRouter } from './api/logOutRouter'
import { registerRouter } from './api/registerRouter'
import { requestPasswordResetRouter } from './api/requestPasswordResetRouter'
import { resetPasswordRouter } from './api/resetPasswordRouter'
import { saveItemRouter } from './api/saveItemRouter'
import { saveQuotationRouter } from './api/saveQuotationRouter'
import { setBucketCors } from './api/setBucketCors'
import { testRouter } from './api/testRouter'
import { uploadRouter } from './api/uploadRouter'
import { apiUrl } from './consts/apiUrl'
import { connectToDb } from './db/connectToDb'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import type { Req, Res } from './types'

const app = express()
void connectToDb()
app.use(morgan('dev')) // http logs in terminal
app.use(express.json()) // middleware based on body-parser will parse the JSON payload and add a 'body' property to the req object containing the parsed data
app.use(cookieParser()) // middleware parses the Cookie header and populates req.cookies with an object keyed by the cookie names
// app.use(cors())
// app.set('trust proxy', true) // for app engine

app.get(apiUrl.root, (_req: Req, res: Res) => res.send('i am express.js'))
app.get(apiUrl.api, (_req: Req, res: Res) => res.json({ message: '/api' }))
app.use(apiUrl.test, testRouter)
app.use(apiUrl.register, registerRouter)
app.use(apiUrl.resetPassword, resetPasswordRouter)
app.use(apiUrl.requestPasswordReset, requestPasswordResetRouter)
app.use(apiUrl.logIn, logInRouter)
app.use(apiUrl.logOut, logOutRouter)
app.use(apiUrl.activate, activateRouter)
app.use(apiUrl.getAccessToken, getAccessTokenRouter)
app.use(apiUrl.upload, uploadRouter)
app.use(apiUrl.setBucketCors, setBucketCors)
app.use(apiUrl.getBucketCors, getBucketCors)
app.use(apiUrl.saveQuotation, saveQuotationRouter)
app.use(apiUrl.getQuotation, getQuotationRouter)
app.use(apiUrl.getItem, getItemRouter)
app.use(apiUrl.getQuotations, getQuotationsRouter)
app.use(apiUrl.deleteQuotation, deleteQuotationRouter)
app.use(apiUrl.deleteItem, deleteItemRouter)
app.use(apiUrl.saveItem, saveItemRouter)
app.use(apiUrl.getItems, getItemsRouter)
app.use(apiUrl.getItemCategories, getItemCategoriesRouter)
app.use(apiUrl.getQuotationCategories, getQuotationCategoriesRouter)

app.use(errorHandlerMiddleware)

const port = process.env.PORT_BACK_END
const domain = process.env.DOMAIN

app.listen(port, () => {
  console.info(`🚀 server started at ${domain}:${port}`)
})
