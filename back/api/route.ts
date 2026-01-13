type Route = {
  path: string
  url: string | ((id: string) => string)
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  description: string
}

export const route = {
  // dev
  root: {
    path: '/',
    url: '/',
    method: 'get',
    description: 'Root endpoint for dev info',
  },
  rootApi: {
    path: '/api',
    url: '/api',
    method: 'get',
    description: 'Root api endpoint for dev info',
  },
  health: {
    path: '/api/health',
    url: '/api/health',
    method: 'get',
    description: 'Google Cloud Run health check endpoint',
  },
  test: {
    path: '/api/dev/test',
    url: '/api/dev/test',
    method: 'get',
    description: 'Test playground for dev purpose',
  },
  getBucketCors: {
    path: '/api/dev/bucket-cors',
    url: '/api/dev/bucket-cors',
    method: 'get',
    description: 'Get CORS configuration for bucket',
  },
  setBucketCors: {
    path: '/api/dev/bucket-cors',
    url: '/api/dev/bucket-cors',
    method: 'patch',
    description: 'Update CORS configuration for bucket',
  },
  // users
  registerUser: {
    path: '/api/users',
    url: '/api/users',
    method: 'post',
    description: 'Register new user',
  },
  logIn: {
    path: '/api/users/sessions',
    url: '/api/users/sessions',
    method: 'post',
    description: 'User login (create session)',
  },
  logOut: {
    path: '/api/users/sessions',
    url: '/api/users/sessions',
    method: 'delete',
    description: 'User logout (delete session)',
  },
  activate: {
    path: '/api/users/activate',
    url: '/api/users/activate',
    method: 'post',
    description: 'Activate user account via email link',
  },
  getAccessToken: {
    path: '/api/users/access-token',
    url: '/api/users/access-token',
    method: 'get',
    description: 'Get new access token using refresh token',
  },
  requestPasswordReset: {
    path: '/api/users/password-reset-requests',
    url: '/api/users/password-reset-requests',
    method: 'post',
    description: 'Request password reset email',
  },
  resetPassword: {
    path: '/api/users/password-resets',
    url: '/api/users/password-resets',
    method: 'post',
    description: 'Reset password via email link',
  },
  getUserList: {
    path: '/api/users',
    url: '/api/users',
    method: 'get',
    description: 'Get users list (admin only)',
  },
  deleteUser: {
    path: '/api/users/:id',
    url: (id: string) => `/api/users/${id}`,
    method: 'delete',
    description: 'Delete user (admin only)',
  },
  // quotations
  saveQuotation: {
    path: '/api/quotations',
    url: '/api/quotations',
    method: 'post',
    description: 'Create or update quotation',
  },
  getQuotation: {
    path: '/api/quotations/:id', // ! fixed
    url: (id: string) => `/api/quotations/${id}`,
    method: 'get',
    description: 'Get single quotation by ID',
  },
  getQuotationList: {
    path: '/api/quotations',
    url: '/api/quotations',
    method: 'get',
    description: 'Get user quotations list',
  },
  getQuotationListAll: {
    path: '/api/quotations/all',
    url: '/api/quotations/all',
    method: 'get',
    description: 'Get all quotations (admin only)',
  },
  getUniqueQuotationCategoryList: {
    path: '/api/quotations/categories',
    url: '/api/quotations/categories',
    method: 'get',
    description: 'Get unique quotation categories',
  },
  deleteQuotation: {
    path: '/api/quotations/:id', // ! fixed
    url: (id: string) => `/api/quotations/${id}`,
    method: 'delete',
    description: 'Delete quotation',
  },
  // bookmarks
  saveBookmark: {
    path: '/api/bookmarks',
    url: '/api/bookmarks',
    method: 'post',
    description: 'Create or update bookmark',
  },
  getBookmark: {
    path: '/api/bookmarks/:id',
    url: (id: string) => `/api/bookmarks/${id}`,
    method: 'get',
    description: 'Get single bookmark by ID',
  },
  getBookmarkList: {
    path: '/api/bookmarks',
    url: '/api/bookmarks',
    method: 'get',
    description: 'Get user bookmarks list',
  },
  getBookmarkListAll: {
    path: '/api/bookmarks/all',
    url: '/api/bookmarks/all',
    method: 'get',
    description: 'Get all bookmarks (admin only)',
  },
  getUniqueBookmarkCategoryList: {
    path: '/api/bookmarks/categories',
    url: '/api/bookmarks/categories',
    method: 'get',
    description: 'Get unique bookmark categories',
  },
  deleteBookmark: {
    path: '/api/bookmarks/:id',
    url: (id: string) => `/api/bookmarks/${id}`,
    method: 'delete',
    description: 'Delete bookmark',
  },
  // files
  proxyFileToBucket: {
    path: '/uploads/:fileId',
    url: '/uploads/:fileId',
    method: 'get',
    description: 'Proxy file from Google Cloud Storage with signed URL',
  },
  fileUploadSignedUrl: {
    path: '/api/files/upload-urls',
    url: '/api/files/upload-urls',
    method: 'post',
    description: 'Create signed URL for direct file upload to storage',
  },
  saveFileInfo: {
    path: '/api/files/:id',
    url: (id: string) => `/api/files/${id}`,
    method: 'patch',
    description: 'Update file info after upload',
  },
  getFileList: {
    path: '/api/files',
    url: '/api/files',
    method: 'get',
    description: 'Get user files list',
  },
  getFileListAll: {
    path: '/api/files/all',
    url: '/api/files/all',
    method: 'get',
    description: 'Get all files (admin only)',
  },
  deleteFile: {
    path: '/api/files/:id',
    url: (id: string) => `/api/files/${id}`,
    method: 'delete',
    description: 'Delete file from storage and database',
  },
  // visitors
  countUniqueDailyVisitors: {
    path: '/api/visitors/daily',
    url: '/api/visitors/daily',
    method: 'post',
    description: 'Record unique daily visitor',
  },
  getUniqueDailyVisitors: {
    path: '/api/visitors/daily',
    url: '/api/visitors/daily',
    method: 'get',
    description: 'Get unique daily visitors stats (admin only)',
  },
} as const satisfies Record<string, Route>
