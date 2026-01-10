import { expect, test, describe } from 'vitest'
import { createMockQuotation } from '../createMockQuotation.test-helper'
import { migrateQuotationSchemaFromV1ToV2 } from './migrateQuotationSchemaFromV1ToV2'

describe('#migrateQuotationSchemaFromV1ToV2', () => {
  test('Successfully migrates a valid V1 quotation to V2', () => {
    const mockQuotation = createMockQuotation()

    mockQuotation.quotationSchemaVersion = undefined
    mockQuotation.type = undefined
    mockQuotation.blocks.at(0).bookmarkSchemaVersion = undefined

    const result = migrateQuotationSchemaFromV1ToV2({
      document: mockQuotation,
      documentSchemaVersion: 1,
    })

    expect(result.status).toBe('MIGRATED')

    if (result.status === 'MIGRATED') {
      expect(result.data.quotationSchemaVersion).toBe(2)
      expect(result.data.type).toBe('quotation')
      expect(result.data.blocks[0]?.bookmarkSchemaVersion).toBe(2)
    }
  })

  test('skips migration when document is not V1', () => {
    const mockQuotation = createMockQuotation()

    const result = migrateQuotationSchemaFromV1ToV2({
      document: mockQuotation,
      documentSchemaVersion: 2,
    })

    expect(result.status).toBe('SKIPPED')
  })

  test('returns error when V1 document has invalid structure', () => {
    const invalidQuotation = {
      id: 'test-id',
      // Missing required fields like email, name, etc.
    }

    const result = migrateQuotationSchemaFromV1ToV2({
      document: invalidQuotation,
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
