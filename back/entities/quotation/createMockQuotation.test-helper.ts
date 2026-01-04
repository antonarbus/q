import type { Quotation } from './quotationSchema'

type MockQuotationOverrides = {
  meta?: Partial<Quotation['meta']>
  data?: Partial<Quotation['data']>
  permission?: Partial<Quotation['permission']>
}

export const createMockQuotation = (
  overrides: MockQuotationOverrides = {},
): Quotation => ({
  meta: {
    id: 'test-id-123',
    email: 'owner@example.com',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    openedAt: null,
    viewedAt: null,
    access: {
      level: 'nobody',
      userList: [],
    },
    ...overrides.meta,
  },
  data: {
    name: 'quotation name',
    category: 'quotation category',
    desc: 'quotation description',
    info: 'quotation information',
    blocks: [],
    ...overrides.data,
  },
  permission: {
    permissionLevel: 'OWNER',
    ...overrides.permission,
  },
})
