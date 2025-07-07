/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express'
import { activateHandler } from '@back/api/auth/activateHandler'
import { getAccessTokenHandler } from '@back/api/auth/getAccessTokenHandler'
import { logInHandler } from '@back/api/auth/logInHandler'
import { logOutHandler } from '@back/api/auth/logOutHandler'
import { registerHandler } from '@back/api/auth/registerHandler'
import { requestPasswordResetHandler } from '@back/api/auth/requestPasswordResetHandler'
import { resetPasswordHandler } from '@back/api/auth/resetPasswordHandler'
import { deleteBookmarkHandler } from '@back/api/bookmark/deleteBookmarkHandler'
import { getBookmarkHandler } from '@back/api/bookmark/getBookmarkHandler'
import { getBookmarkCategoriesHandler } from '@back/api/bookmark/getBookmarkCategoriesHandler'
import { getBookmarkListHandler } from '@back/api/bookmark/getBookmarkListHandler'
import { saveBookmarkHandler } from '@back/api/bookmark/saveBookmarkHandler'
import { getBucketCorsHandler } from '@back/api/dev/getBucketCorsHandler'
import { healthCheckHandler } from '@back/api/dev/healthCheckHandler'
import { rootHandler } from '@back/api/dev/rootHandler'
import { rootApiHandler } from '@back/api/dev/rootApiHandler'
import { setBucketCorsHandler } from '@back/api/dev/setBucketCorsHandler'
import { testHandler } from '@back/api/dev/testHandler'
import { fileUploadSignedUrlHandler } from '@back/api/file/fileUploadSignedUrlHandler'
import { getFileListHandler } from '@back/api/file/getFileListHandler'
import { saveFileInfoHandler } from '@back/api/file/saveFileInfoHandler'
import { deleteQuotationHandler } from '@back/api/quotation/deleteQuotationHandler'
import { getQuotationHandler } from '@back/api/quotation/getQuotationHandler'
import { getQuotationCategoriesHandler } from '@back/api/quotation/getQuotationCategories'
import { getQuotationListHandler } from '@back/api/quotation/getQuotationListHandler'
import { saveQuotationHandler } from '@back/api/quotation/saveQuotationHandler'
import { deleteUserHandler } from '@back/api/user/deleteUserHandler'
import { getUserListHandler } from '@back/api/user/getUserListHandler'
import { countUniqueDailyVisitorsHandler } from '@back/api/visitors/countUniqueDailyVisitorsHandler'
import { getUniqueDailyVisitorsHandler } from '@back/api/visitors/getUniqueDailyVisitorsHandler'
import { deleteFileHandler } from './file/deleteFileHandler'
import { proxyFileToBucketHandler } from './file/proxyFileToBucketHandler'
import { getBookmarkListAllHandler } from './bookmark/getBookmarkListAllHandler'
import { getQuotationListAllHandler } from './quotation/getQuotationListAllHandler'
import { getFileListAllHandler } from './file/getFileListAllHandler'

type Api = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  description: string
  handler: (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction,
  ) => void | Promise<void>
}

export const api = {
  // dev
  root: {
    url: '/',
    method: 'get',
    handler: rootHandler,
    description: `
      Root endpoint, no real purpose, good to show some info for dev purpose
    `,
  },
  rootApi: {
    url: '/api',
    method: 'get',
    handler: rootApiHandler,
    description: `
      Root api endpoint, no real purpose, good to show some info for dev purpose
    `,
  },
  health: {
    url: '/api/health-check',
    method: 'get',
    handler: healthCheckHandler,
    description: `
      Google Cloud Run checks this endpoint to see if the app is alive. 
      It checks if ExpressJS and DB connection are OK.
    `,
  },
  test: {
    url: '/api/test',
    method: 'get',
    handler: testHandler,
    description: 'Test playground for dev purpose',
  },
  setBucketCors: {
    url: '/api/set-bucket-cors',
    method: 'get',
    handler: setBucketCorsHandler,
    description: 'Set CORS for bucket & visit the endpoint to apply',
  },
  getBucketCors: {
    url: '/api/get-bucket-cors',
    method: 'get',
    handler: getBucketCorsHandler,
    description: 'Get CORS for bucket. Visit the endpoint to apply.',
  },
  // auth
  register: {
    url: '/api/register',
    method: 'post',
    handler: registerHandler,
    description: 'When user clicks on register button',
  },
  logIn: {
    url: '/api/login',
    method: 'post',
    handler: logInHandler,
    description: 'When user clicks on login button',
  },
  logOut: {
    url: '/api/logout',
    method: 'get',
    handler: logOutHandler,
    description: 'When user clicks on logout button',
  },
  activate: {
    url: '/api/activate',
    method: 'post',
    handler: activateHandler,
    description: 'When user clicks on activate link in email',
  },
  getAccessToken: {
    url: '/api/get-access-token',
    method: 'get',
    handler: getAccessTokenHandler,
    description: `
      Calls initially on app load (<AccessToken />) to get access token
      and puts it into memory (state.user.accessToken).
      Then for every protected request we add this token to the request header ("access-jwt-token").
      If access token is expired, backend responds with 401 and we
      a) save initial request config to resend it later
      b) call this endpoint to get new access token and save it in memory
      c) resend initial request with new access token
      d) if access token is still invalid, we log out user
    `,
  },
  requestPasswordReset: {
    url: '/api/request-password-reset',
    method: 'post',
    handler: requestPasswordResetHandler,
    description: `
      When user clicks on forgot password link to get an email with reset link
    `,
  },
  resetPassword: {
    url: '/api/reset-password',
    method: 'post',
    handler: resetPasswordHandler,
    description: 'When user clicks on reset password link in email',
  },
  // user
  getUserList: {
    url: '/api/get-user-list',
    method: 'get',
    handler: getUserListHandler,
    description: 'Users list for admin page',
  },
  deleteUser: {
    url: '/api/delete-user',
    method: 'delete',
    handler: deleteUserHandler,
    description: 'When admin deletes a user with button in table',
  },
  // quotation
  saveQuotation: {
    url: '/api/save-quotation',
    method: 'post',
    handler: saveQuotationHandler,
    description: 'When user clicks on save button in the modal',
  },
  getQuotation: {
    url: '/api/get-quotation',
    method: 'post',
    handler: getQuotationHandler,
    description: 'When user opens the quotation page',
  },
  getQuotationList: {
    url: '/api/get-quotation-list',
    method: 'get',
    handler: getQuotationListHandler,
    description: 'User quotations table',
  },
  getQuotationListAll: {
    url: '/api/get-quotation-list-all',
    method: 'post', // idiomatically not correct, here "post" is used instead of "get" to send data in body which is automatically stringified and parsed
    handler: getQuotationListAllHandler,
    description: 'All quotations table',
  },
  getUniqueQuotationCategoryList: {
    url: '/api/get-unique-quotation-category-list',
    method: 'get',
    handler: getQuotationCategoriesHandler,
    description: 'For the category field on save quotation modal',
  },
  deleteQuotation: {
    url: '/api/delete-quotation',
    method: 'delete',
    handler: deleteQuotationHandler,
    description: 'When user clicks on delete button in quotations table',
  },
  // bookmark
  saveBookmark: {
    url: '/api/save-bookmark',
    method: 'post',
    handler: saveBookmarkHandler,
    description: 'When user clicks on save button in the modal',
  },
  getBookmark: {
    url: '/api/get-bookmark',
    method: 'post',
    handler: getBookmarkHandler,
    description: 'When user clicks on bookmark in search or on bookmarks page',
  },
  getBookmarkList: {
    url: '/api/get-bookmark-list',
    method: 'get',
    handler: getBookmarkListHandler,
    description: 'User bookmarks table',
  },
  getBookmarkListAll: {
    url: '/api/get-bookmark-list-all',
    method: 'get',
    handler: getBookmarkListAllHandler,
    description: 'All bookmarks table',
  },
  getUniqueBookmarkCategoryList: {
    url: '/api/get-unique-bookmark-category-list',
    method: 'get',
    handler: getBookmarkCategoriesHandler,
    description: 'For the category field on save bookmark modal',
  },
  deleteBookmark: {
    url: '/api/delete-bookmark',
    method: 'delete',
    handler: deleteBookmarkHandler,
    description: 'When user clicks on delete button in bookmarks table',
  },
  // files
  proxyFileToBucket: {
    url: '/uploads/:fileId', // <-- not under /api
    method: 'get',
    handler: proxyFileToBucketHandler,
    description: `
      Get file data from db, generate 5 min singed url
      to Google Cloud Storage and redirect request.
    `,
  },
  fileUploadSignedUrl: {
    url: '/api/file-upload-signed-url',
    method: 'get',
    handler: fileUploadSignedUrlHandler,
    description: `
      On file upload we send light request for Google Cloud Storage url
      where file is uploaded on client side
    `,
  },
  saveFileInfo: {
    url: '/api/save-file-info',
    method: 'patch',
    handler: saveFileInfoHandler,
    description:
      'After file is uploaded we make it public and add info into File db',
  },
  getFileList: {
    url: '/api/get-file-list',
    method: 'get',
    handler: getFileListHandler,
    description: 'Get file list for settings modal',
  },
  getFileListAll: {
    url: '/api/get-file-list-all',
    method: 'post', // idiomatically not correct, here "post" is used instead of "get" to send data in body which is automatically stringified and parsed
    handler: getFileListAllHandler,
    description: 'All files table',
  },
  deleteFile: {
    url: '/api/delete-file',
    method: 'delete',
    handler: deleteFileHandler,
    description:
      'Delete file from the bucket + from quotations db + from quotation json',
  },
  // visitors
  countUniqueDailyVisitors: {
    url: '/api/count-unique-daily-visitors',
    method: 'post',
    handler: countUniqueDailyVisitorsHandler,
    description: 'Records unique daily visitors per day',
  },
  getUniqueDailyVisitors: {
    url: '/api/get-unique-daily-visitors',
    method: 'get',
    handler: getUniqueDailyVisitorsHandler,
    description: 'Gets unique daily visitors for admin page',
  },
} as const satisfies Record<string, Api>
