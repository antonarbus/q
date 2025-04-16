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
    description: 'Root endpoint, no real purpose',
  },
  rootApi: {
    url: '/api',
    method: 'get',
    handler: rootApi,
    description: 'description',
  },
  health: {
    url: '/api/health',
    method: 'get',
    handler: health,
    description: `
      Google Cloud Run checks this endpoint to see if the app is alive. 
      It runs ExpressJs server and checks the db connection.
    `,
  },
  test: {
    url: '/api/test',
    method: 'get',
    handler: test,
    description: 'description',
  },
  setBucketCors: {
    url: '/api/set-bucket-cors',
    method: 'get',
    handler: setBucketCors,
    description: 'description',
  },
  getBucketCors: {
    url: '/api/get-bucket-cors',
    method: 'get',
    handler: getBucketCors,
    description: 'description',
  },
  // auth
  register: {
    url: '/api/register',
    method: 'post',
    handler: register,
    description: 'description',
  },
  logIn: {
    url: '/api/login',
    method: 'post',
    handler: logIn,
    description: 'description',
  },
  logOut: {
    url: '/api/logout',
    method: 'get',
    handler: logOut,
    description: 'description',
  },
  activate: {
    url: '/api/activate',
    method: 'post',
    handler: activate,
    description: 'description',
  },
  getAccessToken: {
    url: '/api/get-access-token',
    method: 'get',
    handler: getAccessToken,
    description: 'description',
  },
  requestPasswordReset: {
    url: '/api/request-password-reset',
    method: 'post',
    handler: requestPasswordReset,
    description: 'description',
  },
  resetPassword: {
    url: '/api/reset-password',
    method: 'post',
    handler: resetPassword,
    description: 'description',
  },
  // user
  getUsers: {
    url: '/api/get-users',
    method: 'get',
    handler: getUsers,
    description: 'description',
  },
  deleteUser: {
    url: '/api/delete-user',
    method: 'delete',
    handler: deleteUser,
    description: 'description',
  },
  // quotation
  saveQuotation: {
    url: '/api/save-quotation',
    method: 'post',
    handler: saveQuotation,
    description: 'description',
  },
  getQuotation: {
    url: '/api/get-quotation',
    method: 'post',
    handler: getQuotation,
    description: 'description',
  },
  getQuotations: {
    url: '/api/get-quotations',
    method: 'get',
    handler: getQuotations,
    description: 'description',
  },
  getQuotationCategories: {
    url: '/api/get-quotation-categories',
    method: 'get',
    handler: getQuotationCategories,
    description: 'description',
  },
  deleteQuotation: {
    url: '/api/delete-quotation',
    method: 'delete',
    handler: deleteQuotation,
    description: 'description',
  },
  // bookmark
  saveBookmark: {
    url: '/api/save-bookmark',
    method: 'post',
    handler: saveBookmark,
    description: 'description',
  },
  getBookmark: {
    url: '/api/get-bookmark',
    method: 'post',
    handler: getBookmark,
    description: 'description',
  },
  getBookmarks: {
    url: '/api/get-bookmarks',
    method: 'get',
    handler: getBookmarks,
    description: 'description',
  },
  getBookmarkCategories: {
    url: '/api/get-bookmark-categories',
    method: 'get',
    handler: getBookmarkCategories,
    description: 'description',
  },
  deleteBookmark: {
    url: '/api/delete-bookmark',
    method: 'delete',
    handler: deleteBookmark,
    description: 'description',
  },
  // files
  fileUploadSignedUrl: {
    url: '/api/file-upload-signed-url',
    method: 'get',
    handler: fileUploadSignedUrl,
    description: 'description',
  },
  makeFilePublic: {
    url: '/api/make-file-public',
    method: 'patch',
    handler: makeFilePublic,
    description: 'description',
  },
  getFilesStats: {
    url: '/api/get-files-stats',
    method: 'get',
    handler: getFilesStats,
    description: 'description',
  },
  // visitors
  countUniqueDailyVisitors: {
    url: '/api/count-unique-daily-visitors',
    method: 'post',
    handler: countUniqueDailyVisitors,
    description: 'description',
  },
  getUniqueDailyVisitors: {
    url: '/api/get-unique-daily-visitors',
    method: 'get',
    handler: getUniqueDailyVisitors,
    description: 'description',
  },
} as const satisfies Record<string, Api>
