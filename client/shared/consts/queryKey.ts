export const queryKey = {
  // auth
  logIn: 'logIn',
  logOut: 'logOut',
  activate: 'activate',
  register: 'register',
  requestPasswordReset: 'requestPasswordReset',
  resetPassword: 'resetPassword',
  getAccessToken: 'getAccessToken',
  // quotation
  getQuotation: 'getQuotation',
  getQuotations: 'getQuotations',
  getQuotationCategories: 'getQuotationCategories',
  saveQuotation: 'saveQuotation',
  deleteQuotation: 'deleteQuotation',
  // bookmark
  getBookmark: 'getBookmark',
  getBookmarks: 'getBookmarks',
  getBookmarkCategories: 'getBookmarkCategories',
  deleteBookmark: 'deleteBookmark',
  saveBookmark: 'saveBookmark',
  // settings
  getFilesStats: 'getFilesStats',
} as const
