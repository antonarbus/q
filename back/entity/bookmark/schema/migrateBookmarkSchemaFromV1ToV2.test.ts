import { expect, test, describe, vi } from 'vitest'
import { migrateBookmarkSchemaFromV1ToV2 } from './migrateBookmarkSchemaFromV1ToV2'
import { z } from 'zod'
import { bookmarkSchema } from './bookmarkSchemaV2'

describe('#migrateBookmarkSchemaFromV1ToV2', () => {
  test('Migrates a valid V1 bookmark to V2', async () => {
    const mockBookmarkV1 = await import('../fixture/mockBookmarkV1.json')
    const result = migrateBookmarkSchemaFromV1ToV2({ document: mockBookmarkV1 })

    expect(result.status).toBe('MIGRATED')

    if (result.status === 'MIGRATED') {
      expect(result.data.bookmarkSchemaVersion).toBe(2)
    }
  })

  test('Skips migration when document version is not for migration', async () => {
    const mockBookmarkV2 = await import('../fixture/mockBookmarkV2.json')
    const result = migrateBookmarkSchemaFromV1ToV2({ document: mockBookmarkV2 })

    expect(result.status).toBe('SKIPPED')
  })

  test('Fails migration when document has invalid structure', () => {
    const invalidBookmark = {}

    const result = migrateBookmarkSchemaFromV1ToV2({
      document: invalidBookmark,
    })

    expect(result.status).toBe('CORRUPTED')
  })

  test('Returns error when migration happened, but it has a bug and produces invalid document', async () => {
    const mockBookmarkV1 = await import('../fixture/mockBookmarkV1.json')

    // Mock the V2 schema validation to fail (simulating a migration bug)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-type-assertion
    vi.spyOn(bookmarkSchema, 'safeParse').mockReturnValue({
      success: false,
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          path: ['someRequiredField'],
          message: 'Required field missing after migration',
        },
      ]),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const result = migrateBookmarkSchemaFromV1ToV2({ document: mockBookmarkV1 })

    expect(result.status).toBe('MIGRATION_BUG')
    expect(result.message).toContain('Failed to migrate from V1 to V2')

    vi.restoreAllMocks()
  })
})
