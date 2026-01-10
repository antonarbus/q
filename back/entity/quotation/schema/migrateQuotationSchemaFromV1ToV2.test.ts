import { expect, test, describe } from 'vitest'
import { createMockQuotation } from '../createMockQuotation.test-helper'
import { migrateQuotationSchemaFromV1ToV2 } from './migrateQuotationSchemaFromV1ToV2'

describe('#migrateQuotationSchemaFromV1ToV2', () => {
  test('Successfully migrates a valid V1 quotation to V2', () => {
    const quotationV1 = createMockQuotation({
      quotationSchemaVersion: undefined, // V1 doesn't have this field
      type: undefined, // V1 doesn't have this field
      blocks: [
        {
          id: 'block-1',
          bookmarkSchemaVersion: undefined,
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
          isFroala: false,
          type: 'text',
          text: {
            html: '<p>Hello</p>',
            value: null,
          },
        },
      ],
    })

    const result = migrateQuotationSchemaFromV1ToV2({
      document: quotationV1,
      documentSchemaVersion: 1,
    })

    expect(result.status).toBe('MIGRATED')
    expect(result.message).toBe('Migrated from V1 to V2')

    if (result.status === 'MIGRATED') {
      expect(result.data.quotationSchemaVersion).toBe(2)
      expect(result.data.type).toBe('quotation')
      expect(result.data.id).toBe(quotationV1.id)
      expect(result.data.email).toBe(quotationV1.email)
      expect(result.data.blocks).toHaveLength(1)
      expect(result.data.blocks[0].bookmarkSchemaVersion).toBe(2)
    }
  })

  test('skips migration when document is not V1', () => {
    const quotationV2 = createMockQuotation()

    const result = migrateQuotationSchemaFromV1ToV2({
      document: quotationV2,
      documentSchemaVersion: 2,
    })

    expect(result.status).toBe('SKIPPED')
    expect(result.message).toBe('Skipped')
    expect(result.data).toEqual(quotationV2)
  })

  test('returns error when V1 document has invalid structure', () => {
    const invalidQuotationV1 = {
      id: 'test-id',
      // Missing required fields like email, name, etc.
    }

    const result = migrateQuotationSchemaFromV1ToV2({
      document: invalidQuotationV1,
      documentSchemaVersion: 1,
    })

    expect(result.status).toBe('ERROR')
    expect(result.data).toBe(null)

    expect(result.message).toContain(
      'Document has version 1, but structure is incorrect',
    )

    expect(result.message).toContain('Zod error')
  })
})
