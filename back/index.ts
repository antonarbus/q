import express, { type Request, type Response } from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { activateRouter } from './api/auth/activateRouter'
import { getAccessTokenRouter } from './api/auth/getAccessTokenRouter'
import { logInRouter } from './api/auth/logInRouter'
import { logOutRouter } from './api/auth/logOutRouter'
import { registerRouter } from './api/auth/registerRouter'
import { requestPasswordResetRouter } from './api/auth/requestPasswordResetRouter'
import { resetPasswordRouter } from './api/auth/resetPasswordRouter'
import { deleteBookmarkRouter } from './api/bookmark/deleteBookmarkRouter'
import { getBookmarkCategoriesRouter } from './api/bookmark/getBookmarkCategoriesRouter'
import { getBookmarkRouter } from './api/bookmark/getBookmarkRouter'
import { getBookmarksRouter } from './api/bookmark/getBookmarksRouter'
import { saveBookmarkRouter } from './api/bookmark/saveBookmarkRouter'
import { getBucketCors } from './api/dev/getBucketCors'
import { setBucketCors } from './api/dev/setBucketCors'
import { testRouter } from './api/dev/testRouter'
import { deleteQuotationRouter } from './api/quotation/deleteQuotationRouter'
import { getQuotationCategoriesRouter } from './api/quotation/getQuotationCategoriesRouter'
import { getQuotationRouter } from './api/quotation/getQuotationRouter'
import { getQuotationsRouter } from './api/quotation/getQuotationsRouter'
import { saveQuotationRouter } from './api/quotation/saveQuotationRouter'
import { getFilesStatsRouter } from './api/settings/getFilesStatsRouter'
import { uploadRouter } from './api/va/uploadRouter'
import { apiUrl } from './consts/apiUrl'
import { connectToDb } from './db/connectToDb'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import { config } from './config'
import { getUsersRouter } from './api/user/getUsersRouter'
import { deleteUserRouter } from './api/user/deleteUserRouter'
import { countUniqueDailyVisitorsRouter } from './api/visitors/countUniqueDailyVisitorsRouter'
import { getUniqueDailyVisitorsRouter } from './api/visitors/getUniqueDailyVisitorsRouter'
// import cors from 'cors'

const app = express()
void connectToDb()
app.use(morgan('dev')) // http logs in terminal
app.use(express.json({ limit: '50mb' })) // middleware based on body-parser will parse the JSON payload and add a 'body' property to the req object containing the parsed data
app.use(cookieParser()) // middleware parses the Cookie header and populates req.cookies with an object keyed by the cookie names
// app.use(cors())
// app.set('trust proxy', true) // for app engine

app.get(
  apiUrl.root,
  (_req: Request, res: Response) => void res.send('i am express.js'),
)

app.get(
  apiUrl.api,
  (_req: Request, res: Response) => void res.json({ message: '/api' }),
)

// dev
app.use(apiUrl.test, testRouter)
app.use(apiUrl.setBucketCors, setBucketCors)
app.use(apiUrl.getBucketCors, getBucketCors)
// auth
app.use(apiUrl.register, registerRouter)
app.use(apiUrl.resetPassword, resetPasswordRouter)
app.use(apiUrl.requestPasswordReset, requestPasswordResetRouter)
app.use(apiUrl.logIn, logInRouter)
app.use(apiUrl.logOut, logOutRouter)
app.use(apiUrl.activate, activateRouter)
app.use(apiUrl.getAccessToken, getAccessTokenRouter)
// user
app.use(apiUrl.getUsers, getUsersRouter)
app.use(apiUrl.deleteUser, deleteUserRouter)
// quotation
app.use(apiUrl.saveQuotation, saveQuotationRouter)
app.use(apiUrl.getQuotation, getQuotationRouter)
app.use(apiUrl.getQuotations, getQuotationsRouter)
app.use(apiUrl.deleteQuotation, deleteQuotationRouter)
app.use(apiUrl.getQuotationCategories, getQuotationCategoriesRouter)
// bookmark
app.use(apiUrl.getBookmark, getBookmarkRouter)
app.use(apiUrl.deleteBookmark, deleteBookmarkRouter)
app.use(apiUrl.saveBookmark, saveBookmarkRouter)
app.use(apiUrl.getBookmarks, getBookmarksRouter)
app.use(apiUrl.getBookmarkCategories, getBookmarkCategoriesRouter)
// visitors
app.use(apiUrl.countUniqueDailyVisitors, countUniqueDailyVisitorsRouter)
app.use(apiUrl.getUniqueDailyVisitors, getUniqueDailyVisitorsRouter)
// va
app.use(apiUrl.upload, uploadRouter)
// settings
app.use(apiUrl.getFilesStats, getFilesStatsRouter)
// error
app.use(errorHandlerMiddleware)

app.listen(config.back.port, () => {
  console.info(
    `🚀 ${config.installation} backend server started at ${config.back.baseUrl} based on ${config.installation} installation`,
  )
})
