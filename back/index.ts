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
import { api } from './shared/consts/api'
import { connectToDb } from './shared/db/connectToDb'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import { config } from './config'
import { getUsersRouter } from './api/user/getUsersRouter'
import { deleteUserRouter } from './api/user/deleteUserRouter'
import { countUniqueDailyVisitorsRouter } from './api/visitors/countUniqueDailyVisitorsRouter'
import { getUniqueDailyVisitorsRouter } from './api/visitors/getUniqueDailyVisitorsRouter'
import { fileUploadSignedUrlRouter } from './api/upload/fileUploadSignedUrlRouter'
import { makeFilePublicRouter } from './api/upload/makeFilePublicRouter'
import { checkDbConnection, healthRouter } from './api/dev/healthRouter'
import { asyncHandler } from './shared/utils/asyncHandler'
// import cors from 'cors'

const app = express()
void connectToDb()
app.use(morgan('dev')) // http logs in terminal
app.use(express.json({ limit: '50mb' })) // middleware based on body-parser will parse the JSON payload and add a 'body' property to the req object containing the parsed data
app.use(cookieParser()) // middleware parses the Cookie header and populates req.cookies with an object keyed by the cookie names
// app.use(cors())
// app.set('trust proxy', true) // for app engine

app[api.root.method](
  api.root.url,
  (_req: Request, res: Response) => void res.send('i am express.js'),
)

// todo: do like this everywhere
app[api.health.method](api.health.url, asyncHandler(checkDbConnection))

app.get(
  api.api.url,
  (_req: Request, res: Response) => void res.json({ message: '/api' }),
)

// dev
app.use(api.test.url, testRouter)
app.use(api.setBucketCors.url, setBucketCors)
app.use(api.getBucketCors.url, getBucketCors)
// auth
app.use(api.register.url, registerRouter)
app.use(api.resetPassword.url, resetPasswordRouter)
app.use(api.requestPasswordReset.url, requestPasswordResetRouter)
app.use(api.logIn.url, logInRouter)
app.use(api.logOut.url, logOutRouter)
app.use(api.activate.url, activateRouter)
app.use(api.getAccessToken.url, getAccessTokenRouter)
// user
app.use(api.getUsers.url, getUsersRouter)
app.use(api.deleteUser.url, deleteUserRouter)
// quotation
app.use(api.saveQuotation.url, saveQuotationRouter)
app.use(api.getQuotation.url, getQuotationRouter)
app.use(api.getQuotations.url, getQuotationsRouter)
app.use(api.deleteQuotation.url, deleteQuotationRouter)
app.use(api.getQuotationCategories.url, getQuotationCategoriesRouter)
// bookmark
app.use(api.getBookmark.url, getBookmarkRouter)
app.use(api.deleteBookmark.url, deleteBookmarkRouter)
app.use(api.saveBookmark.url, saveBookmarkRouter)
app.use(api.getBookmarks.url, getBookmarksRouter)
app.use(api.getBookmarkCategories.url, getBookmarkCategoriesRouter)
// visitors
app.use(api.countUniqueDailyVisitors.url, countUniqueDailyVisitorsRouter)
app.use(api.getUniqueDailyVisitors.url, getUniqueDailyVisitorsRouter)
// files
app.use(api.fileUploadSignedUrl.url, fileUploadSignedUrlRouter)
app.use(api.makeFilePublic.url, makeFilePublicRouter)
app.use(api.getFilesStats.url, getFilesStatsRouter)
// error
app.use(errorHandlerMiddleware)

app.listen(config.back.port, () => {
  console.info(
    `🚀 ${config.installation} backend server started at ${config.back.baseUrl} based on ${config.installation} installation`,
  )
})
