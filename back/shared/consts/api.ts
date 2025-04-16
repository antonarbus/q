type Api = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  description: string
}

export const api = {
  // root
  root: {
    url: '/',
    method: 'get',
    description: 'Root endpoint, no real purpose',
  },
  // health
  health: {
    url: '/api/health',
    method: 'get',
    description: `
      Google Cloud Run checks this endpoint to see if the app is alive. 
      It runs ExpressJs server and checks the db connection.
    `,
  },
  // auth
  register: {
    url: '/api/register',
    method: 'post',
    description: 'description',
  },
  logIn: {
    url: '/api/login',
    method: 'post',
    description: 'description',
  },
  logOut: {
    url: '/api/logout',
    method: 'get',
    description: 'description',
  },
  activate: {
    url: '/api/activate',
    method: 'post',
    description: 'description',
  },
  getAccessToken: {
    url: '/api/get-access-token',
    method: 'get',
    description: 'description',
  },
  requestPasswordReset: {
    url: '/api/request-password-reset',
    method: 'post',
    description: 'description',
  },
  resetPassword: {
    url: '/api/reset-password',
    method: 'post',
    description: 'description',
  },
  // user
  getUsers: {
    url: '/api/get-users',
    method: 'get',
    description: 'description',
  },
  deleteUser: {
    url: '/api/delete-user',
    method: 'delete',
    description: 'description',
  },
  // quotation
  saveQuotation: {
    url: '/api/save-quotation',
    method: 'post',
    description: 'description',
  },
  getQuotation: {
    url: '/api/get-quotation',
    method: 'post',
    description: 'description',
  },
  getQuotations: {
    url: '/api/get-quotations',
    method: 'get',
    description: 'description',
  },
  getQuotationCategories: {
    url: '/api/get-quotation-categories',
    method: 'get',
    description: 'description',
  },
  deleteQuotation: {
    url: '/api/delete-quotation',
    method: 'delete',
    description: 'description',
  },
  // bookmark
  saveBookmark: {
    url: '/api/save-bookmark',
    method: 'post',
    description: 'description',
  },
  getBookmark: {
    url: '/api/get-bookmark',
    method: 'post',
    description: 'description',
  },
  getBookmarks: {
    url: '/api/get-bookmarks',
    method: 'get',
    description: 'description',
  },
  getBookmarkCategories: {
    url: '/api/get-bookmark-categories',
    method: 'get',
    description: 'description',
  },
  deleteBookmark: {
    url: '/api/delete-bookmark',
    method: 'delete',
    description: 'description',
  },
  // files
  fileUploadSignedUrl: {
    url: '/api/file-upload-signed-url',
    method: 'get',
    description: 'description',
  },
  makeFilePublic: {
    url: '/api/make-file-public',
    method: 'patch',
    description: 'description',
  },
  getFilesStats: {
    url: '/api/get-files-stats',
    method: 'get',
    description: 'description',
  },
  // visitors
  countUniqueDailyVisitors: {
    url: '/api/count-unique-daily-visitors',
    method: 'post',
    description: 'description',
  },
  getUniqueDailyVisitors: {
    url: '/api/get-unique-daily-visitors',
    method: 'get',
    description: 'description',
  },
  // dev
  rootApi: {
    url: '/api',
    method: 'get',
    description: 'description',
  },
  test: {
    url: '/api/test',
    method: 'get',
    description: 'description',
  },
  setBucketCors: {
    url: '/api/set-bucket-cors',
    method: 'get',
    description: 'description',
  },
  getBucketCors: {
    url: '/api/get-bucket-cors',
    method: 'get',
    description: 'description',
  },
} as const satisfies Record<string, Api>
