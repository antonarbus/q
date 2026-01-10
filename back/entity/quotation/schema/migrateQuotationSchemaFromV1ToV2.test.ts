import { expect, test, describe, vi } from 'vitest'
import { migrateQuotationSchemaFromV1ToV2 } from './migrateQuotationSchemaFromV1ToV2'
import { z } from 'zod'
import { quotationSchema } from './quotationSchemaV2'

describe('#migrateQuotationSchemaFromV1ToV2', () => {
  test('Migrates a valid V1 quotation to V2', async () => {
    const mockQuotationV1 = await import('../fixture/mockQuotationV1.json')

    const result = migrateQuotationSchemaFromV1ToV2({
      document: mockQuotationV1,
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

  test('Skips migration when document is not V1', async () => {
    const mockQuotationV2 = await import('../fixture/mockQuotationV2.json')

    const result = migrateQuotationSchemaFromV1ToV2({
      document: mockQuotationV2,
    })

    expect(result.status).toBe('SKIPPED')
  })

  test('Fails migration when V1 document has invalid structure', () => {
    const invalidQuotation = {}

    const result = migrateQuotationSchemaFromV1ToV2({
      document: invalidQuotation,
    })

    expect(result.status).toBe('CORRUPTED')
  })

  test('Returns error when migration has a bug and produces invalid V2 document', async () => {
    const mockQuotationV1 = await import('../fixture/mockQuotationV1.json')

    // Mock the V2 schema validation to fail (simulating a migration bug)
    vi.spyOn(quotationSchema, 'safeParse').mockReturnValue({
      success: false,
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          path: ['someRequiredField'],
          message: 'Required field missing after migration',
        },
      ]),
    })

    const result = migrateQuotationSchemaFromV1ToV2({
      document: mockQuotationV1,
    })

    expect(result.status).toBe('ERROR')
    expect(result.message).toContain('Failed to migrate from V1 to V2')
  })
})
