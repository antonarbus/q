import { nanoid } from 'nanoid'
import type { Quotation } from './quotationSchema'

export const createEmptyQuotation = (
  overrides: Partial<Quotation>,
): Quotation => ({
  id: nanoid(),
  type: 'quotation',
  email: 'unknown@gmail.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  openedAt: null,
  viewedAt: null,
  access: {
    level: 'nobody',
    userList: [],
  },
  name: '',
  category: '',
  desc: '',
  info: '',
  blocks: [],
  permissionLevel: 'NEW',
  ...overrides,
})
