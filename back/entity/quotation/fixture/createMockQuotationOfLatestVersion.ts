import type { Quotation } from '../schema'

type MockQuotationOverrides<T> = Partial<T>

/** Creates quotation of latest schema version where you may override any property  */
export const createMockQuotationOfLatestVersion = <T = Quotation>(
  overrides: MockQuotationOverrides<T> = {},
): Quotation => ({
  id: 'test-id-123',
  quotationSchemaVersion: 2,
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
  blocks: [
    {
      id: 'block-1',
      bookmarkSchemaVersion: 2,
      email: 'test@example.com',
      name: 'Text Block',
      category: 'text',
      desc: 'A text block',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      info: 'info',
      preview: 'preview',
      width: 100,
      height: 50,
      type: 'text',
      text: {
        html: '<p>Hello</p>',
        value: null,
      },
    },
  ],
  permissionLevel: 'OWNER',
  ...overrides,
})
