import { expect, test, describe } from 'vitest'
import { migrateQuotationSchemaFromV1ToV2 } from './migrateQuotationSchemaFromV1ToV2'

describe('#migrateQuotationSchemaFromV1ToV2', () => {
  test('Successfully migrates a valid V1 quotation to V2', async () => {
    const mockQuotationV1 = await import('../fixture/mockQuotationV1.json')

    const result = migrateQuotationSchemaFromV1ToV2({
      document: mockQuotationV1,
      documentSchemaVersion: 1,
    })

    expect(result.status).toBe('MIGRATED')

    if (result.status === 'MIGRATED') {
      expect(result.data.quotationSchemaVersion).toBe(2)
      expect(result.data.type).toBe('quotation')

      result.data.blocks.forEach((block) => {
        expect(block.bookmarkSchemaVersion).toBe(2)

        if (block.type === 'boq') {
          block.boq.rows.forEach((row) => {
            expect(row.bookmarkSchemaVersion).toBe(2)
          })
        }
      })
    }
  })

  test('skips migration when document is not V1', async () => {
    const mockQuotationV2 = await import('../fixture/mockQuotationV2.json')

    const result = migrateQuotationSchemaFromV1ToV2({
      document: mockQuotationV2,
      documentSchemaVersion: 2,
    })

    expect(result.status).toBe('SKIPPED')
  })

  test('returns error when V1 document has invalid structure', () => {
    const invalidQuotation = {}

    const result = migrateQuotationSchemaFromV1ToV2({
      document: invalidQuotation,
      documentSchemaVersion: 1,
    })

    expect(result.status).toBe('ERROR')
  })
})
