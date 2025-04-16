/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express'
import { activate } from '@back/api/auth/activate'
import { getAccessToken } from '@back/api/auth/getAccessToken'
import { logIn } from '@back/api/auth/logIn'
import { logOut } from '@back/api/auth/logOut'
import { register } from '@back/api/auth/register'
import { requestPasswordReset } from '@back/api/auth/requestPasswordReset'
import { resetPassword } from '@back/api/auth/resetPassword'
import { deleteBookmark } from '@back/api/bookmark/deleteBookmark'
import { getBookmark } from '@back/api/bookmark/getBookmark'
import { getBookmarkCategories } from '@back/api/bookmark/getBookmarkCategories'
import { getBookmarks } from '@back/api/bookmark/getBookmarks'
import { saveBookmark } from '@back/api/bookmark/saveBookmark'
import { getBucketCors } from '@back/api/dev/getBucketCors'
import { health } from '@back/api/dev/health'
import { root } from '@back/api/dev/root'
import { rootApi } from '@back/api/dev/rootApi'
import { setBucketCors } from '@back/api/dev/setBucketCors'
import { test } from '@back/api/dev/test'
import { fileUploadSignedUrl } from '@back/api/file/fileUploadSignedUrl'
import { getFilesStats } from '@back/api/file/getFilesStats'
import { makeFilePublic } from '@back/api/file/makeFilePublic'
import { deleteQuotation } from '@back/api/quotation/deleteQuotation'
import { getQuotation } from '@back/api/quotation/getQuotation'
import { getQuotationCategories } from '@back/api/quotation/getQuotationCategories'
import { getQuotations } from '@back/api/quotation/getQuotations'
import { saveQuotation } from '@back/api/quotation/saveQuotation'
import { deleteUser } from '@back/api/user/deleteUser'
import { getUsers } from '@back/api/user/getUsers'
import { countUniqueDailyVisitors } from '@back/api/visitors/countUniqueDailyVisitors'
import { getUniqueDailyVisitors } from '@back/api/visitors/getUniqueDailyVisitors'

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
    handler: root,
    description: `
      Root endpoint, no real purpose, good to show some info for dev purpose
    `,
  },
  rootApi: {
    url: '/api',
    method: 'get',
    handler: rootApi,
    description: `
      Root api endpoint, no real purpose, good to show some info for dev purpose
    `,
  },
  health: {
    url: '/api/health',
    method: 'get',
    handler: health,
    description: `
      Google Cloud Run checks this endpoint to see if the app is alive. 
      It checks if ExpressJS and DB connection are OK.
    `,
  },
  test: {
    url: '/api/test',
    method: 'get',
    handler: test,
    description: 'Test playground for dev purpose',
  },
  setBucketCors: {
    url: '/api/set-bucket-cors',
    method: 'get',
    handler: setBucketCors,
    description: 'Set CORS for bucket & visit the endpoint to apply',
  },
  getBucketCors: {
    url: '/api/get-bucket-cors',
    method: 'get',
    handler: getBucketCors,
    description: 'Get CORS for bucket. Visit the endpoint to apply.',
  },
  // auth
  register: {
    url: '/api/register',
    method: 'post',
    handler: register,
    description: 'When user clicks on register button',
  },
  logIn: {
    url: '/api/login',
    method: 'post',
    handler: logIn,
    description: 'When user clicks on login button',
  },
  logOut: {
    url: '/api/logout',
    method: 'get',
    handler: logOut,
    description: 'When user clicks on logout button',
  },
  activate: {
    url: '/api/activate',
    method: 'post',
    handler: activate,
    description: 'When user clicks on activate link in email',
  },
  getAccessToken: {
    url: '/api/get-access-token',
    method: 'get',
    handler: getAccessToken,
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
    handler: requestPasswordReset,
    description: `
      When user clicks on forgot password link to get an email with reset link
    `,
  },
  resetPassword: {
    url: '/api/reset-password',
    method: 'post',
    handler: resetPassword,
    description: 'When user clicks on reset password link in email',
  },
  // user
  getUsers: {
    url: '/api/get-users',
    method: 'get',
    handler: getUsers,
    description: 'Users list for admin page',
  },
  deleteUser: {
    url: '/api/delete-user',
    method: 'delete',
    handler: deleteUser,
    description: 'When admin deletes a user with button in table',
  },
  // quotation
  saveQuotation: {
    url: '/api/save-quotation',
    method: 'post',
    handler: saveQuotation,
    description: 'When user clicks on save button in the modal',
  },
  getQuotation: {
    url: '/api/get-quotation',
    method: 'post',
    handler: getQuotation,
    description: 'When user opens the quotation page',
  },
  getQuotations: {
    url: '/api/get-quotations',
    method: 'get',
    handler: getQuotations,
    description: 'For quotations table',
  },
  getQuotationCategories: {
    url: '/api/get-quotation-categories',
    method: 'get',
    handler: getQuotationCategories,
    description: 'For the category field on save quotation modal',
  },
  deleteQuotation: {
    url: '/api/delete-quotation',
    method: 'delete',
    handler: deleteQuotation,
    description: 'When user clicks on delete button in quotations table',
  },
  // bookmark
  saveBookmark: {
    url: '/api/save-bookmark',
    method: 'post',
    handler: saveBookmark,
    description: 'When user clicks on save button in the modal',
  },
  getBookmark: {
    url: '/api/get-bookmark',
    method: 'post',
    handler: getBookmark,
    description: 'When user clicks on bookmark in search or on bookmarks page',
  },
  getBookmarks: {
    url: '/api/get-bookmarks',
    method: 'get',
    handler: getBookmarks,
    description: 'For bookmarks table',
  },
  getBookmarkCategories: {
    url: '/api/get-bookmark-categories',
    method: 'get',
    handler: getBookmarkCategories,
    description: 'For the category field on save bookmark modal',
  },
  deleteBookmark: {
    url: '/api/delete-bookmark',
    method: 'delete',
    handler: deleteBookmark,
    description: 'When user clicks on delete button in bookmarks table',
  },
  // files
  fileUploadSignedUrl: {
    url: '/api/file-upload-signed-url',
    method: 'get',
    handler: fileUploadSignedUrl,
    description: `
      On file upload we send light request for Google Cloud Storage url
      where file is uploaded on client side
    `,
  },
  makeFilePublic: {
    url: '/api/make-file-public',
    method: 'patch',
    handler: makeFilePublic,
    description: 'After file is uploaded we make it public',
  },
  getFilesStats: {
    url: '/api/get-files-stats',
    method: 'get',
    handler: getFilesStats,
    description: 'Gets total files size and count for settings modal',
  },
  // visitors
  countUniqueDailyVisitors: {
    url: '/api/count-unique-daily-visitors',
    method: 'post',
    handler: countUniqueDailyVisitors,
    description: 'Records unique daily visitors per day',
  },
  getUniqueDailyVisitors: {
    url: '/api/get-unique-daily-visitors',
    method: 'get',
    handler: getUniqueDailyVisitors,
    description: 'Gets unique daily visitors for admin page',
  },
} as const satisfies Record<string, Api>
