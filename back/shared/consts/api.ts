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
    method: 'method',
    description: 'description',
  },
  logIn: {
    url: '/api/login',
    method: 'method',
    description: 'description',
  },
  logOut: {
    url: '/api/logout',
    method: 'method',
    description: 'description',
  },
  activate: {
    url: '/api/activate',
    method: 'method',
    description: 'description',
  },
  getAccessToken: {
    url: '/api/get-access-token',
    method: 'method',
    description: 'description',
  },
  requestPasswordReset: {
    url: '/api/request-password-reset',
    method: 'method',
    description: 'description',
  },
  resetPassword: {
    url: '/api/reset-password',
    method: 'method',
    description: 'description',
  },
  // user
  getUsers: {
    url: '/api/get-users',
    method: 'method',
    description: 'description',
  },
  deleteUser: {
    url: '/api/delete-user',
    method: 'method',
    description: 'description',
  },
  // quotation
  saveQuotation: {
    url: '/api/save-quotation',
    method: 'method',
    description: 'description',
  },
  getQuotation: {
    url: '/api/get-quotation',
    method: 'method',
    description: 'description',
  },
  getQuotations: {
    url: '/api/get-quotations',
    method: 'method',
    description: 'description',
  },
  getQuotationCategories: {
    url: '/api/get-quotation-categories',
    method: 'method',
    description: 'description',
  },
  deleteQuotation: {
    url: '/api/delete-quotation',
    method: 'method',
    description: 'description',
  },
  // bookmark
  saveBookmark: {
    url: '/api/save-bookmark',
    method: 'method',
    description: 'description',
  },
  getBookmark: {
    url: '/api/get-bookmark',
    method: 'method',
    description: 'description',
  },
  getBookmarks: {
    url: '/api/get-bookmarks',
    method: 'method',
    description: 'description',
  },
  getBookmarkCategories: {
    url: '/api/get-bookmark-categories',
    method: 'method',
    description: 'description',
  },
  deleteBookmark: {
    url: '/api/delete-bookmark',
    method: 'method',
    description: 'description',
  },
  // files
  upload: {
    url: '/api/upload',
    method: 'method',
    description: 'description',
  }, // not in use
  fileUploadSignedUrl: {
    url: '/api/file-upload-signed-url',
    method: 'method',
    description: 'description',
  },
  makeFilePublic: {
    url: '/api/make-file-public',
    method: 'method',
    description: 'description',
  },
  getFilesStats: {
    url: '/api/get-files-stats',
    method: 'method',
    description: 'description',
  },
  // visitors
  countUniqueDailyVisitors: {
    url: '/api/count-unique-daily-visitors',
    method: 'method',
    description: 'description',
  },
  getUniqueDailyVisitors: {
    url: '/api/get-unique-daily-visitors',
    method: 'method',
    description: 'description',
  },
  // dev
  api: {
    url: '/api',
    method: 'method',
    description: 'description',
  },
  test: {
    url: '/api/test',
    method: 'method',
    description: 'description',
  },
  setBucketCors: {
    url: '/api/set-bucket-cors',
    method: 'method',
    description: 'description',
  },
  getBucketCors: {
    url: '/api/get-bucket-cors',
    method: 'method',
    description: 'description',
  },
} as const satisfies Record<string, Api>
