export const route = {
  root: '/',
  // auth
  login: 'login',
  logout: 'logout',
  register: 'register',
  requestPasswordReset: 'request-password-reset',
  resetPassword: 'reset-password',
  activate: 'activate',
  // quotation
  new: 'new',
  quotations: 'quotations',
  saveQuotation: 'save-quotation',
  editQuotation: 'edit-quotation',
  infoQuotation: 'info-quotation',
  // bookmark
  bookmarks: 'bookmarks',
  bookmark: 'bookmark',
  editBookmark: 'edit-bookmark',
  // item
  infoItem: 'info-item',
  // va
  settings: 'settings',
} as const
