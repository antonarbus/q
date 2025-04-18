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
import { getBookmarksHandler } from '@back/api/bookmark/getBookmarksHandler'
import { saveBookmarkHandler } from '@back/api/bookmark/saveBookmarkHandler'
import { getBucketCorsHandler } from '@back/api/dev/getBucketCorsHandler'
import { healthHandler } from '@back/api/dev/healthHandler'
import { rootHandler } from '@back/api/dev/rootHandler'
import { rootApiHandler } from '@back/api/dev/rootApiHandler'
import { setBucketCorsHandler } from '@back/api/dev/setBucketCorsHandler'
import { testHandler } from '@back/api/dev/testHandler'
import { fileUploadSignedUrlHandler } from '@back/api/file/fileUploadSignedUrlHandler'
import { getFilesStatsHandler } from '@back/api/file/getFilesStatsHandler'
import { makeFilePublicHandler } from '@back/api/file/makeFilePublicHandler'
import { deleteQuotationHandler } from '@back/api/quotation/deleteQuotationHandler'
import { getQuotationHandler } from '@back/api/quotation/getQuotationHandler'
import { getQuotationCategoriesHandler } from '@back/api/quotation/getQuotationCategories'
import { getQuotationsHandler } from '@back/api/quotation/getQuotationsHandler'
import { saveQuotationHandler } from '@back/api/quotation/saveQuotationHandler'
import { deleteUserHandler } from '@back/api/user/deleteUserHandler'
import { getUsersHandler } from '@back/api/user/getUsersHandler'
import { countUniqueDailyVisitorsHandler } from '@back/api/visitors/countUniqueDailyVisitorsHandler'
import { getUniqueDailyVisitorsHandler } from '@back/api/visitors/getUniqueDailyVisitorsHandler'

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
    url: '/api/health',
    method: 'get',
    handler: healthHandler,
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
  getUsers: {
    url: '/api/get-users',
    method: 'get',
    handler: getUsersHandler,
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
  getQuotations: {
    url: '/api/get-quotations',
    method: 'get',
    handler: getQuotationsHandler,
    description: 'For quotations table',
  },
  getQuotationCategories: {
    url: '/api/get-quotation-categories',
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
  getBookmarks: {
    url: '/api/get-bookmarks',
    method: 'get',
    handler: getBookmarksHandler,
    description: 'For bookmarks table',
  },
  getBookmarkCategories: {
    url: '/api/get-bookmark-categories',
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
  fileUploadSignedUrl: {
    url: '/api/file-upload-signed-url',
    method: 'get',
    handler: fileUploadSignedUrlHandler,
    description: `
      On file upload we send light request for Google Cloud Storage url
      where file is uploaded on client side
    `,
  },
  makeFilePublic: {
    url: '/api/make-file-public',
    method: 'patch',
    handler: makeFilePublicHandler,
    description: 'After file is uploaded we make it public',
  },
  getFilesStats: {
    url: '/api/get-files-stats',
    method: 'get',
    handler: getFilesStatsHandler,
    description: 'Gets total files size and count for settings modal',
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
