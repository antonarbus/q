import { expect, test, describe } from 'vitest'
import { validateQuotation } from './validateQuotation'

describe('#validateQuotation', () => {
  test('Fast path: Validates document on latest schema without migration', async () => {
    const mockQuotationV2 = await import('./fixture/mockQuotationV2.json')
    const result = validateQuotation({ document: mockQuotationV2 })
    expect(result.status).toBe('VALIDATED')
  })

  test('Slow path: Migrates V1 document to the latest schema version and validates', async () => {
    const mockQuotationV1 = await import('./fixture/mockQuotationV1.json')
    const result = validateQuotation({ document: mockQuotationV1 })
    expect(result.status).toBe('VALIDATED')
  })

  test('Returns error when document is corrupted (invalid V1 structure)', () => {
    const corruptedDocument = {}
    const result = validateQuotation({ document: corruptedDocument })
    expect(result.status).toBe('ERROR')
  })
})
