import { expect, it, describe } from 'vitest'
import { validateBookmark } from './validateBookmark'

describe('#validateBookmark', () => {
  it('fast path: Validates document on latest schema without migration', async () => {
    const mockBookmarkV2 = await import('./fixture/mockBookmarkV2.json')
    const result = validateBookmark({ document: mockBookmarkV2 })
    expect(result.status).toBe('VALIDATED')
  }, 1000)

  it('slow path: Migrates V1 document to V2 and validates', async () => {
    const mockBookmarkV1 = await import('./fixture/mockBookmarkV1.json')
    const result = validateBookmark({ document: mockBookmarkV1 })
    expect(result.status).toBe('VALIDATED')
  }, 1000)

  it('returns error when document is corrupted (invalid V1 structure)', () => {
    const corruptedDocument = {}
    const result = validateBookmark({ document: corruptedDocument })
    expect(result.status).toBe('ERROR')
  }, 1000)
})
