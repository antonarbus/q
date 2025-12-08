import { activateHandler } from '@back/api/auth/activateHandler'
import { getAccessTokenHandler } from '@back/api/auth/getAccessTokenHandler'
import { logInHandler } from '@back/api/auth/logInHandler'
import { logOutHandler } from '@back/api/auth/logOutHandler'
import { registerHandler } from '@back/api/auth/registerHandler'
import { requestPasswordResetHandler } from '@back/api/auth/requestPasswordResetHandler'
import { resetPasswordHandler } from '@back/api/auth/resetPasswordHandler'
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
import { getQuotationCategoriesHandler } from '@back/api/quotation/getQuotationCategories'
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
import { apiRoute } from './apiRoute'

type Api = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  description: string
  handler: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction,
  ) => void | Promise<void>
}

//* Routes metadata is kept separately at apiRoutes for proper code splitting,
//* Otherwise handler functions leak into the frontend

export const api = {
  // dev
  root: {
    ...apiRoute.root,
    handler: rootHandler,
  },
  rootApi: {
    ...apiRoute.rootApi,
    handler: rootApiHandler,
  },
  health: {
    ...apiRoute.health,
    handler: healthCheckHandler,
  },
  test: {
    ...apiRoute.test,
    handler: testHandler,
  },
  setBucketCors: {
    ...apiRoute.setBucketCors,
    handler: setBucketCorsHandler,
  },
  getBucketCors: {
    ...apiRoute.getBucketCors,
    handler: getBucketCorsHandler,
  },
  // auth
  register: {
    ...apiRoute.register,
    handler: registerHandler,
  },
  logIn: {
    ...apiRoute.logIn,
    handler: logInHandler,
  },
  logOut: {
    ...apiRoute.logOut,
    handler: logOutHandler,
  },
  activate: {
    ...apiRoute.activate,
    handler: activateHandler,
  },
  getAccessToken: {
    ...apiRoute.getAccessToken,
    handler: getAccessTokenHandler,
  },
  requestPasswordReset: {
    ...apiRoute.requestPasswordReset,
    handler: requestPasswordResetHandler,
  },
  resetPassword: {
    ...apiRoute.resetPassword,
    handler: resetPasswordHandler,
  },
  // user
  getUserList: {
    ...apiRoute.getUserList,
    handler: getUserListHandler,
  },
  deleteUser: {
    ...apiRoute.deleteUser,
    handler: deleteUserHandler,
  },
  // quotation
  saveQuotation: {
    ...apiRoute.saveQuotation,
    handler: saveQuotationHandler,
  },
  getQuotation: {
    ...apiRoute.getQuotation,
    handler: getQuotationHandler,
  },
  getQuotationList: {
    ...apiRoute.getQuotationList,
    handler: getQuotationListHandler,
  },
  getQuotationListAll: {
    ...apiRoute.getQuotationListAll,
    handler: getQuotationListAllHandler,
  },
  getUniqueQuotationCategoryList: {
    ...apiRoute.getUniqueQuotationCategoryList,
    handler: getQuotationCategoriesHandler,
  },
  deleteQuotation: {
    ...apiRoute.deleteQuotation,
    handler: deleteQuotationHandler,
  },
  // bookmark
  saveBookmark: {
    ...apiRoute.saveBookmark,
    handler: saveBookmarkHandler,
  },
  getBookmark: {
    ...apiRoute.getBookmark,
    handler: getBookmarkHandler,
  },
  getBookmarkList: {
    ...apiRoute.getBookmarkList,
    handler: getBookmarkListHandler,
  },
  getBookmarkListAll: {
    ...apiRoute.getBookmarkListAll,
    handler: getBookmarkListAllHandler,
  },
  getUniqueBookmarkCategoryList: {
    ...apiRoute.getUniqueBookmarkCategoryList,
    handler: getBookmarkCategoriesHandler,
  },
  deleteBookmark: {
    ...apiRoute.deleteBookmark,
    handler: deleteBookmarkHandler,
  },
  // files
  proxyFileToBucket: {
    ...apiRoute.proxyFileToBucket,
    handler: proxyFileToBucketHandler,
  },
  fileUploadSignedUrl: {
    ...apiRoute.fileUploadSignedUrl,
    handler: fileUploadSignedUrlHandler,
  },
  saveFileInfo: {
    ...apiRoute.saveFileInfo,
    handler: saveFileInfoHandler,
  },
  getFileList: {
    ...apiRoute.getFileList,
    handler: getFileListHandler,
  },
  getFileListAll: {
    ...apiRoute.getFileListAll,
    handler: getFileListAllHandler,
  },
  deleteFile: {
    ...apiRoute.deleteFile,
    handler: deleteFileHandler,
  },
  // visitors
  countUniqueDailyVisitors: {
    ...apiRoute.countUniqueDailyVisitors,
    handler: countUniqueDailyVisitorsHandler,
  },
  getUniqueDailyVisitors: {
    ...apiRoute.getUniqueDailyVisitors,
    handler: getUniqueDailyVisitorsHandler,
  },
} as const satisfies Record<string, Api>
