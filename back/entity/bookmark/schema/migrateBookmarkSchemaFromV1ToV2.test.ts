// oxlint-disable typescript/no-explicit-any
import { expect, it, describe, vi, assert } from 'vitest'
import { migrateBookmarkSchemaFromV1ToV2 } from './migrateBookmarkSchemaFromV1ToV2'
import { z } from 'zod'
import { bookmarkSchema } from './bookmarkSchemaV2'

describe('#migrateBookmarkSchemaFromV1ToV2', () => {
  it('migrates a valid V1 bookmark to V2', async () => {
    const mockBookmarkV1 = await import('../fixture/mockBookmarkV1.json')
    const result = migrateBookmarkSchemaFromV1ToV2({ document: mockBookmarkV1 })

    expect(result.status).toBe('MIGRATED')
    // Narrow the type
    assert(result.status === 'MIGRATED')
    expect(result.data.bookmarkSchemaVersion).toBe(2)
  }, 1000)

  it('skips migration when document version is not for migration', async () => {
    const mockBookmarkV2 = await import('../fixture/mockBookmarkV2.json')
    const result = migrateBookmarkSchemaFromV1ToV2({ document: mockBookmarkV2 })

    expect(result.status).toBe('SKIPPED')
  }, 1000)

  it('fails migration when document has invalid structure', () => {
    const invalidBookmark = {}

    const result = migrateBookmarkSchemaFromV1ToV2({
      document: invalidBookmark,
    })

    expect(result.status).toBe('CORRUPTED')
  }, 1000)

  it('returns error when migration happened, but it has a bug and produces invalid document', async () => {
    const mockBookmarkV1 = await import('../fixture/mockBookmarkV1.json')

    // Mock the V2 schema validation to fail (simulating a migration bug)
    vi.spyOn(bookmarkSchema, 'safeParse').mockReturnValue({
      success: false,
      // ZodError's constructor type is a `$constructor`, not a generic class — it can't take <T> directly, so we cast the constructed instance to the schema's expected error type for the mock
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          path: ['someRequiredField'],
          message: 'Required field missing after migration',
        },
      ]) as z.ZodError<z.infer<typeof bookmarkSchema>>,
    })

    const result = migrateBookmarkSchemaFromV1ToV2({ document: mockBookmarkV1 })

    expect(result.status).toBe('MIGRATION_BUG')
  }, 1000)
})
