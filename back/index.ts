import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { activate } from './api/auth/activate'
import { getAccessToken } from './api/auth/getAccessToken'
import { logIn } from './api/auth/logIn'
import { logOut } from './api/auth/logOut'
import { register } from './api/auth/register'
import { requestPasswordReset } from './api/auth/requestPasswordReset'
import { resetPassword } from './api/auth/resetPassword'
import { deleteBookmark } from './api/bookmark/deleteBookmark'
import { getBookmarkCategories } from './api/bookmark/getBookmarkCategories'
import { getBookmark } from './api/bookmark/getBookmark'
import { getBookmarks } from './api/bookmark/getBookmarks'
import { saveBookmark } from './api/bookmark/saveBookmark'
import { getBucketCors } from './api/dev/getBucketCors'
import { setBucketCors } from './api/dev/setBucketCors'
import { test } from './api/dev/test'
import { deleteQuotation } from './api/quotation/deleteQuotation'
import { getQuotationCategories } from './api/quotation/getQuotationCategories'
import { getQuotation } from './api/quotation/getQuotation'
import { getQuotations } from './api/quotation/getQuotations'
import { saveQuotation } from './api/quotation/saveQuotation'
import { getFilesStats } from './api/file/getFilesStats'
import { api } from './shared/consts/api'
import { connectToDb } from './shared/db/connectToDb'
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware'
import { config } from './config'
import { getUsers } from './api/user/getUsers'
import { deleteUser } from './api/user/deleteUser'
import { countUniqueDailyVisitors } from './api/visitors/countUniqueDailyVisitors'
import { getUniqueDailyVisitors } from './api/visitors/getUniqueDailyVisitors'
import { fileUploadSignedUrl } from './api/file/fileUploadSignedUrl'
import { makeFilePublic } from './api/file/makeFilePublic'
import { health } from './api/dev/health'
import { asyncHandler } from './shared/utils/asyncHandler'
import { root } from './api/dev/root'
import { rootApi } from './api/dev/rootApi'
// import cors from 'cors'

const app = express()
void connectToDb()
app.use(morgan('dev')) // http logs in terminal
app.use(express.json({ limit: '50mb' })) // middleware based on body-parser will parse the JSON payload and add a 'body' property to the req object containing the parsed data
app.use(cookieParser()) // middleware parses the Cookie header and populates req.cookies with an object keyed by the cookie names
// app.use(cors())
// app.set('trust proxy', true) // for app engine

// dev
app[api.root.method](api.root.url, root)
app[api.rootApi.method](api.rootApi.url, rootApi)
app[api.health.method](api.health.url, asyncHandler(health))
app[api.test.method](api.test.url, asyncHandler(test))

app[api.setBucketCors.method](
  api.setBucketCors.url,
  asyncHandler(setBucketCors),
)

app[api.getBucketCors.method](
  api.getBucketCors.url,
  asyncHandler(getBucketCors),
)

// auth
app[api.register.method](api.register.url, asyncHandler(register))

app[api.resetPassword.method](
  api.resetPassword.url,
  asyncHandler(resetPassword),
)

app[api.requestPasswordReset.method](
  api.requestPasswordReset.url,
  asyncHandler(requestPasswordReset),
)

app[api.logIn.method](api.logIn.url, asyncHandler(logIn))

app[api.logOut.method](api.logOut.url, asyncHandler(logOut))

app[api.activate.method](api.activate.url, asyncHandler(activate))

app[api.getAccessToken.method](
  api.getAccessToken.url,
  asyncHandler(getAccessToken),
)

// user
app[api.getUsers.method](api.getUsers.url, asyncHandler(getUsers))

app[api.deleteUser.method](api.deleteUser.url, asyncHandler(deleteUser))

// quotation
app[api.saveQuotation.method](
  api.saveQuotation.url,
  asyncHandler(saveQuotation),
)

app[api.getQuotation.method](api.getQuotation.url, asyncHandler(getQuotation))

app[api.getQuotations.method](
  api.getQuotations.url,
  asyncHandler(getQuotations),
)

app[api.deleteQuotation.method](
  api.deleteQuotation.url,
  asyncHandler(deleteQuotation),
)

app[api.getQuotationCategories.method](
  api.getQuotationCategories.url,
  asyncHandler(getQuotationCategories),
)

// bookmark
app[api.getBookmark.method](api.getBookmark.url, asyncHandler(getBookmark))

app[api.deleteBookmark.method](
  api.deleteBookmark.url,
  asyncHandler(deleteBookmark),
)

app[api.saveBookmark.method](api.saveBookmark.url, asyncHandler(saveBookmark))

app[api.getBookmarks.method](api.getBookmarks.url, asyncHandler(getBookmarks))

app[api.getBookmarkCategories.method](
  api.getBookmarkCategories.url,
  asyncHandler(getBookmarkCategories),
)

// visitors
app[api.countUniqueDailyVisitors.method](
  api.countUniqueDailyVisitors.url,
  asyncHandler(countUniqueDailyVisitors),
)

app[api.getUniqueDailyVisitors.method](
  api.getUniqueDailyVisitors.url,
  asyncHandler(getUniqueDailyVisitors),
)

// files
app[api.fileUploadSignedUrl.method](
  api.fileUploadSignedUrl.url,
  asyncHandler(fileUploadSignedUrl),
)

app[api.makeFilePublic.method](
  api.makeFilePublic.url,
  asyncHandler(makeFilePublic),
)

app[api.getFilesStats.method](
  api.getFilesStats.url,
  asyncHandler(getFilesStats),
)

// error
app.use(errorHandlerMiddleware)

app.listen(config.back.port, () => {
  console.info(
    `🚀 ${config.installation} backend server started at ${config.back.baseUrl} based on ${config.installation} installation`,
  )
})
