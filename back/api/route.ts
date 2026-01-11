type Route = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  description: string
}

export const route = {
  // dev
  root: {
    url: '/',
    method: 'get',
    description: 'Root endpoint for dev info',
  },
  rootApi: {
    url: '/api',
    method: 'get',
    description: 'Root api endpoint for dev info',
  },
  health: {
    url: '/api/health',
    method: 'get',
    description: 'Google Cloud Run health check endpoint',
  },
  test: {
    url: '/api/dev/test',
    method: 'get',
    description: 'Test playground for dev purpose',
  },
  getBucketCors: {
    url: '/api/dev/bucket-cors',
    method: 'get',
    description: 'Get CORS configuration for bucket',
  },
  setBucketCors: {
    url: '/api/dev/bucket-cors',
    method: 'patch',
    description: 'Update CORS configuration for bucket',
  },
  // users
  registerUser: {
    url: '/api/users',
    method: 'post',
    description: 'Register new user',
  },
  logIn: {
    url: '/api/users/sessions',
    method: 'post',
    description: 'User login (create session)',
  },
  logOut: {
    url: '/api/users/sessions',
    method: 'delete',
    description: 'User logout (delete session)',
  },
  activate: {
    url: '/api/users/activate',
    method: 'post',
    description: 'Activate user account via email link',
  },
  getAccessToken: {
    url: '/api/users/access-token',
    method: 'get',
    description: 'Get new access token using refresh token',
  },
  requestPasswordReset: {
    url: '/api/users/password-reset-requests',
    method: 'post',
    description: 'Request password reset email',
  },
  resetPassword: {
    url: '/api/users/password-resets',
    method: 'post',
    description: 'Reset password via email link',
  },
  getUserList: {
    url: '/api/users',
    method: 'get',
    description: 'Get users list (admin only)',
  },
  deleteUser: {
    url: '/api/users/:id',
    method: 'delete',
    description: 'Delete user (admin only)',
  },
  // quotations
  saveQuotation: {
    url: '/api/quotations',
    method: 'post',
    description: 'Create or update quotation',
  },
  getQuotation: {
    url: '/api/quotations/:id', // ! fixed
    method: 'get',
    description: 'Get single quotation by ID',
  },
  getQuotationList: {
    url: '/api/quotations',
    method: 'get',
    description: 'Get user quotations list',
  },
  getQuotationListAll: {
    url: '/api/quotations/all',
    method: 'get',
    description: 'Get all quotations (admin only)',
  },
  getUniqueQuotationCategoryList: {
    url: '/api/quotations/categories',
    method: 'get',
    description: 'Get unique quotation categories',
  },
  deleteQuotation: {
    url: '/api/quotations/:id',
    method: 'delete',
    description: 'Delete quotation',
  },
  // bookmarks
  saveBookmark: {
    url: '/api/bookmarks',
    method: 'post',
    description: 'Create or update bookmark',
  },
  getBookmark: {
    url: '/api/bookmarks/:id',
    method: 'get',
    description: 'Get single bookmark by ID',
  },
  getBookmarkList: {
    url: '/api/bookmarks',
    method: 'get',
    description: 'Get user bookmarks list',
  },
  getBookmarkListAll: {
    url: '/api/bookmarks/all',
    method: 'get',
    description: 'Get all bookmarks (admin only)',
  },
  getUniqueBookmarkCategoryList: {
    url: '/api/bookmarks/categories',
    method: 'get',
    description: 'Get unique bookmark categories',
  },
  deleteBookmark: {
    url: '/api/bookmarks/:id',
    method: 'delete',
    description: 'Delete bookmark',
  },
  // files
  proxyFileToBucket: {
    url: '/uploads/:fileId',
    method: 'get',
    description: 'Proxy file from Google Cloud Storage with signed URL',
  },
  fileUploadSignedUrl: {
    url: '/api/files/upload-urls',
    method: 'post',
    description: 'Create signed URL for direct file upload to storage',
  },
  saveFileInfo: {
    url: '/api/files/:id',
    method: 'patch',
    description: 'Update file info after upload',
  },
  getFileList: {
    url: '/api/files',
    method: 'get',
    description: 'Get user files list',
  },
  getFileListAll: {
    url: '/api/files/all',
    method: 'get',
    description: 'Get all files (admin only)',
  },
  deleteFile: {
    url: '/api/files/:id',
    method: 'delete',
    description: 'Delete file from storage and database',
  },
  // visitors
  countUniqueDailyVisitors: {
    url: '/api/visitors/daily',
    method: 'post',
    description: 'Record unique daily visitor',
  },
  getUniqueDailyVisitors: {
    url: '/api/visitors/daily',
    method: 'get',
    description: 'Get unique daily visitors stats (admin only)',
  },
} as const satisfies Record<string, Route>
