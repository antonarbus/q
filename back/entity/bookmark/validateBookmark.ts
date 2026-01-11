/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-restricted-syntax */
import { migrateBookmarkSchemaFromV1ToV2 } from './schema/migrateBookmarkSchemaFromV1ToV2'
import { type Bookmark, bookmarkSchema } from './schema'

const migrateBookmarkSchemaList = [
  migrateBookmarkSchemaFromV1ToV2,
  // migrateBookmarkSchemaFromV2ToV3,
  // migrateBookmarkSchemaFromV3ToV4,
]

type Props = {
  document: Record<string, unknown>
}

type Res =
  | {
      status: 'VALIDATED'
      data: Bookmark
      message: string
    }
  | {
      status: 'ERROR'
      data: null
      message: string
    }

/**
 * If document from the bucket has the latest schema it is validated
 * If schema version is outdated, document structure is progressively updated and validated
 */
export const validateBookmark = (props: Props): Res => {
  const messageList: string[] = []

  // Fast path: Try validating as latest version first
  const latestVersionValidation = bookmarkSchema.safeParse(props.document)

  // Already at latest version!
  if (latestVersionValidation.success) {
    messageList.push('Schema has valid latest version')

    return {
      status: 'VALIDATED',
      data: latestVersionValidation.data,
      message: messageList.join(' | '),
    }
  }

  // Slow path: Document needs migration
  let currentDocument: Record<string, unknown> = props.document

  // Go though the list of migration steps and update document structure
  for (const migrate of migrateBookmarkSchemaList) {
    const migrationResult = migrate({ document: currentDocument })

    if (
      migrationResult.status === 'MIGRATION_BUG' ||
      migrationResult.status === 'CORRUPTED'
    ) {
      messageList.push('Migration logic problem')
      messageList.push(migrationResult.message)

      return {
        status: 'ERROR',
        data: null,
        message: messageList.join(' | '),
      }
    }

    if (
      migrationResult.status === 'SKIPPED' ||
      migrationResult.status === 'MIGRATED'
    ) {
      // Assign migrated document to the currentDocument and go to next migration
      currentDocument = migrationResult.data
      messageList.push(migrationResult.message)
    }
  }

  // Validate as the latest version after migration
  const migratedDocumentValidationResult =
    bookmarkSchema.safeParse(currentDocument)

  if (migratedDocumentValidationResult.success !== true) {
    const msg = `Document has the latest schema version, but validation failed for some unknown reason 🤷‍♂️`

    console.error(msg)
    messageList.push(msg)

    return {
      status: 'ERROR',
      data: null,
      message: messageList.join(' | '),
    }
  }

  return {
    status: 'VALIDATED',
    data: migratedDocumentValidationResult.data,
    message: messageList.join(' | '),
  }
}
