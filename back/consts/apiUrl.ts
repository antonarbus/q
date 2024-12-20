import type { SearchQuery } from '@back/api/visitors/getUniqueDailyVisitorsRouter'

export const apiUrl = {
  root: '/',
  // auth
  register: '/api/register',
  logIn: '/api/login',
  logOut: '/api/logout',
  activate: '/api/activate',
  getAccessToken: '/api/get-access-token',
  requestPasswordReset: '/api/request-password-reset',
  resetPassword: '/api/reset-password',
  // user
  getUsers: '/api/get-users',
  deleteUser: '/api/delete-user',
  // quotation
  saveQuotation: '/api/save-quotation',
  getQuotation: '/api/get-quotation',
  getQuotations: '/api/get-quotations',
  getQuotationCategories: '/api/get-quotation-categories',
  deleteQuotation: '/api/delete-quotation',
  // bookmark
  saveBookmark: '/api/save-bookmark',
  getBookmark: '/api/get-bookmark',
  getBookmarks: '/api/get-bookmarks',
  getBookmarkCategories: '/api/get-bookmark-categories',
  deleteBookmark: '/api/delete-bookmark',
  // va
  upload: '/api/upload',
  // visitors
  countUniqueDailyVisitors: '/api/count-unique-daily-visitors',
  getUniqueDailyVisitors: '/api/get-unique-daily-visitors',
  // settings
  getFilesStats: '/api/get-files-stats',
  // dev
  api: '/api',
  test: '/api/test',
  setBucketCors: '/api/set-bucket-cors',
  getBucketCors: '/api/get-bucket-cors',
} as const
