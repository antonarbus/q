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
    description: `
      Root endpoint, no real purpose, good to show some info for dev purpose
    `,
  },
  rootApi: {
    url: '/api',
    method: 'get',
    description: `
      Root api endpoint, no real purpose, good to show some info for dev purpose
    `,
  },
  health: {
    url: '/api/health-check',
    method: 'get',
    description: `
      Google Cloud Run checks this endpoint to see if the app is alive.
      It checks if ExpressJS and DB connection are OK.
    `,
  },
  test: {
    url: '/api/test',
    method: 'get',
    description: 'Test playground for dev purpose',
  },
  setBucketCors: {
    url: '/api/set-bucket-cors',
    method: 'get',
    description: 'Set CORS for bucket & visit the endpoint to apply',
  },
  getBucketCors: {
    url: '/api/get-bucket-cors',
    method: 'get',
    description: 'Get CORS for bucket. Visit the endpoint to apply.',
  },
  // user
  registerUser: {
    url: '/api/register-user',
    method: 'post',
    description: 'When user clicks on register button',
  },
  logIn: {
    url: '/api/login',
    method: 'post',
    description: 'When user clicks on login button',
  },
  logOut: {
    url: '/api/logout',
    method: 'get',
    description: 'When user clicks on logout button',
  },
  activate: {
    url: '/api/activate',
    method: 'post',
    description: 'When user clicks on activate link in email',
  },
  getAccessToken: {
    url: '/api/get-access-token',
    method: 'get',
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
    description: `
      When user clicks on forgot password link to get an email with reset link
    `,
  },
  resetPassword: {
    url: '/api/reset-password',
    method: 'post',
    description: 'When user clicks on reset password link in email',
  },
  // user
  getUserList: {
    url: '/api/get-user-list',
    method: 'get',
    description: 'Users list for admin page',
  },
  deleteUser: {
    url: '/api/delete-user',
    method: 'delete',
    description: 'When admin deletes a user with button in table',
  },
  // quotation
  saveQuotation: {
    url: '/api/save-quotation',
    method: 'post',
    description: 'When user clicks on save button in the modal',
  },
  getQuotation: {
    url: '/api/get-quotation',
    method: 'post',
    description: 'When user opens the quotation page',
  },
  getQuotationList: {
    url: '/api/get-quotation-list',
    method: 'get',
    description: 'User quotations table',
  },
  getQuotationListAll: {
    url: '/api/get-quotation-list-all',
    method: 'post', // idiomatically not correct, here "post" is used instead of "get" to send data in body which is automatically stringified and parsed
    description: 'All quotations table',
  },
  getUniqueQuotationCategoryList: {
    url: '/api/get-unique-quotation-category-list',
    method: 'get',
    description: 'For the category field on save quotation modal',
  },
  deleteQuotation: {
    url: '/api/delete-quotation',
    method: 'delete',
    description: 'When user clicks on delete button in quotations table',
  },
  // bookmark
  saveBookmark: {
    url: '/api/save-bookmark',
    method: 'post',
    description: 'When user clicks on save button in the modal',
  },
  getBookmark: {
    url: '/api/get-bookmark',
    method: 'post',
    description: 'When user clicks on bookmark in search or on bookmarks page',
  },
  getBookmarkList: {
    url: '/api/get-bookmark-list',
    method: 'get',
    description: 'User bookmarks table',
  },
  getBookmarkListAll: {
    url: '/api/get-bookmark-list-all',
    method: 'get',
    description: 'All bookmarks table',
  },
  getUniqueBookmarkCategoryList: {
    url: '/api/get-unique-bookmark-category-list',
    method: 'get',
    description: 'For the category field on save bookmark modal',
  },
  deleteBookmark: {
    url: '/api/delete-bookmark',
    method: 'delete',
    description: 'When user clicks on delete button in bookmarks table',
  },
  // files
  proxyFileToBucket: {
    url: '/uploads/:fileId', // <-- not under /api
    method: 'get',
    description: `
      Get file data from db, generate 5 min singed url
      to Google Cloud Storage and redirect request.
    `,
  },
  fileUploadSignedUrl: {
    url: '/api/file-upload-signed-url',
    method: 'get',
    description: `
      On file upload we send light request for Google Cloud Storage url
      where file is uploaded on client side
    `,
  },
  saveFileInfo: {
    url: '/api/save-file-info',
    method: 'patch',
    description:
      'After file is uploaded we make it public and add info into File db',
  },
  getFileList: {
    url: '/api/get-file-list',
    method: 'get',
    description: 'Get file list for settings modal',
  },
  getFileListAll: {
    url: '/api/get-file-list-all',
    method: 'post', // idiomatically not correct, here "post" is used instead of "get" to send data in body which is automatically stringified and parsed
    description: 'All files table',
  },
  deleteFile: {
    url: '/api/delete-file',
    method: 'delete',
    description:
      'Delete file from the bucket + from quotations db + from quotation json',
  },
  // visitors
  countUniqueDailyVisitors: {
    url: '/api/count-unique-daily-visitors',
    method: 'post',
    description: 'Records unique daily visitors per day',
  },
  getUniqueDailyVisitors: {
    url: '/api/get-unique-daily-visitors',
    method: 'get',
    description: 'Gets unique daily visitors for admin page',
  },
} as const satisfies Record<string, Route>
