import type { Quotation } from './quotationSchema'

type MockQuotationOverrides = Partial<Quotation>

export const createMockQuotation = (
  overrides: MockQuotationOverrides = {},
): Quotation => ({
  id: 'test-id-123',
  type: 'quotation',
  email: 'owner@example.com',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  openedAt: null,
  viewedAt: null,
  access: {
    level: 'nobody',
    userList: [],
  },
  name: 'quotation name',
  category: 'quotation category',
  desc: 'quotation description',
  info: 'quotation information',
  blocks: [],
  permissionLevel: 'OWNER',
  ...overrides,
})
