import { activateHandler } from '@back/api/user/activateHandler'
import { getAccessTokenHandler } from '@back/api/user/getAccessTokenHandler'
import { logInHandler } from '@back/api/user/logInHandler'
import { logOutHandler } from '@back/api/user/logOutHandler'
import { registerUserHandler } from '@back/api/user/registerUserHandler'
import { requestPasswordResetHandler } from '@back/api/user/requestPasswordResetHandler'
import { resetPasswordHandler } from '@back/api/user/resetPasswordHandler'
import { deleteBookmarkHandler } from '@back/api/bookmark/deleteBookmarkHandler'
import { getBookmarkCategoriesHandler } from '@back/api/bookmark/getBookmarkCategoriesHandler'
import { getBookmarkHandler } from '@back/api/bookmark/getBookmarkHandler'
import { getBookmarkListHandler } from '@back/api/bookmark/getBookmarkListHandler'
import { saveBookmarkHandler } from '@back/api/bookmark/saveBookmarkHandler'
import { getBucketCorsHandler } from '@back/api/dev/getBucketCorsHandler'
import { healthCheckHandler } from '@back/api/dev/healthCheckHandler'
import { rootApiHandler } from '@back/api/dev/rootApiHandler'
import { rootHandler } from '@back/api/dev/rootHandler'
import { setBucketCorsHandler } from '@back/api/dev/setBucketCorsHandler'
import { testHandler } from '@back/api/dev/testHandler'
import { fileUploadSignedUrlHandler } from '@back/api/file/fileUploadSignedUrlHandler'
import { getFileListHandler } from '@back/api/file/getFileListHandler'
import { saveFileInfoHandler } from '@back/api/file/saveFileInfoHandler'
import { deleteQuotationHandler } from '@back/api/quotation/deleteQuotationHandler'
import { getQuotationCategoriesHandler } from '@back/api/quotation/getQuotationCategoriesHandler'
import { getQuotationHandler } from '@back/api/quotation/getQuotationHandler'
import { getQuotationListHandler } from '@back/api/quotation/getQuotationListHandler'
import { saveQuotationHandler } from '@back/api/quotation/saveQuotationHandler'
import { deleteUserHandler } from '@back/api/user/deleteUserHandler'
import { getUserListHandler } from '@back/api/user/getUserListHandler'
import { countUniqueDailyVisitorsHandler } from '@back/api/visitors/countUniqueDailyVisitorsHandler'
import { getUniqueDailyVisitorsHandler } from '@back/api/visitors/getUniqueDailyVisitorsHandler'
import type { NextFunction, Request, Response } from 'express'
import { getBookmarkListAllHandler } from './bookmark/getBookmarkListAllHandler'
import { deleteFileHandler } from './file/deleteFileHandler'
import { getFileListAllHandler } from './file/getFileListAllHandler'
import { proxyFileToBucketHandler } from './file/proxyFileToBucketHandler'
import { getQuotationListAllHandler } from './quotation/getQuotationListAllHandler'
import { route } from './route'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'

type Api = {
  path: string
  url: string | ((id: string) => string)
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  description: string
  handler: (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction,
  ) => HttpResponse<unknown> | Promise<HttpResponse<unknown>>
}

//* Routes metadata is kept separately at apiRoutes for proper code splitting,
//* Otherwise handler functions leak into the frontend

export const api = {
  // dev
  root: {
    ...route.root,
    handler: rootHandler,
  },
  rootApi: {
    ...route.rootApi,
    handler: rootApiHandler,
  },
  health: {
    ...route.health,
    handler: healthCheckHandler,
  },
  test: {
    ...route.test,
    handler: testHandler,
  },
  setBucketCors: {
    ...route.setBucketCors,
    handler: setBucketCorsHandler,
  },
  getBucketCors: {
    ...route.getBucketCors,
    handler: getBucketCorsHandler,
  },
  // auth
  register: {
    ...route.registerUser,
    handler: registerUserHandler,
  },
  logIn: {
    ...route.logIn,
    handler: logInHandler,
  },
  logOut: {
    ...route.logOut,
    handler: logOutHandler,
  },
  activate: {
    ...route.activate,
    handler: activateHandler,
  },
  getAccessToken: {
    ...route.getAccessToken,
    handler: getAccessTokenHandler,
  },
  requestPasswordReset: {
    ...route.requestPasswordReset,
    handler: requestPasswordResetHandler,
  },
  resetPassword: {
    ...route.resetPassword,
    handler: resetPasswordHandler,
  },
  // user
  getUserList: {
    ...route.getUserList,
    handler: getUserListHandler,
  },
  deleteUser: {
    ...route.deleteUser,
    handler: deleteUserHandler,
  },
  // quotation
  saveQuotation: {
    ...route.saveQuotation,
    handler: saveQuotationHandler,
  },
  getUniqueQuotationCategoryList: {
    ...route.getUniqueQuotationCategoryList,
    handler: getQuotationCategoriesHandler,
  },
  getQuotation: {
    ...route.getQuotation,
    handler: getQuotationHandler,
  },
  getQuotationList: {
    ...route.getQuotationList,
    handler: getQuotationListHandler,
  },
  getQuotationListAll: {
    ...route.getQuotationListAll,
    handler: getQuotationListAllHandler,
  },
  deleteQuotation: {
    ...route.deleteQuotation,
    handler: deleteQuotationHandler,
  },
  // bookmark
  saveBookmark: {
    ...route.saveBookmark,
    handler: saveBookmarkHandler,
  },
  getUniqueBookmarkCategoryList: {
    ...route.getUniqueBookmarkCategoryList,
    handler: getBookmarkCategoriesHandler,
  },
  getBookmark: {
    ...route.getBookmark,
    handler: getBookmarkHandler,
  },
  getBookmarkList: {
    ...route.getBookmarkList,
    handler: getBookmarkListHandler,
  },
  getBookmarkListAll: {
    ...route.getBookmarkListAll,
    handler: getBookmarkListAllHandler,
  },
  deleteBookmark: {
    ...route.deleteBookmark,
    handler: deleteBookmarkHandler,
  },
  // files
  proxyFileToBucket: {
    ...route.proxyFileToBucket,
    handler: proxyFileToBucketHandler,
  },
  fileUploadSignedUrl: {
    ...route.fileUploadSignedUrl,
    handler: fileUploadSignedUrlHandler,
  },
  saveFileInfo: {
    ...route.saveFileInfo,
    handler: saveFileInfoHandler,
  },
  getFileList: {
    ...route.getFileList,
    handler: getFileListHandler,
  },
  getFileListAll: {
    ...route.getFileListAll,
    handler: getFileListAllHandler,
  },
  deleteFile: {
    ...route.deleteFile,
    handler: deleteFileHandler,
  },
  // visitors
  countUniqueDailyVisitors: {
    ...route.countUniqueDailyVisitors,
    handler: countUniqueDailyVisitorsHandler,
  },
  getUniqueDailyVisitors: {
    ...route.getUniqueDailyVisitors,
    handler: getUniqueDailyVisitorsHandler,
  },
} as const satisfies Record<string, Api>
