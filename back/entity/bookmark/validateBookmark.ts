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

export const validateBookmark = (props: Props): Res => {
  // Fast path: Try validating as latest version first
  const latestVersionValidation = bookmarkSchema.safeParse(props.document)

  // Already at latest version!
  if (latestVersionValidation.success) {
    return {
      status: 'VALIDATED',
      data: latestVersionValidation.data,
      message: 'Schema has valid latest version',
    }
  }

  // Slow path: Document needs migration
  let currentDocument: Record<string, unknown> = props.document

  let currentVersion =
    typeof props.document.schemaVersion === 'number' // In initial version "schemaVersion" field did not exist
      ? props.document.schemaVersion
      : 1

  const messageList: string[] = []

  // Go though the list of migration steps and update document structure
  for (const migrate of migrateBookmarkSchemaList) {
    const migrationResult = migrate({
      document: currentDocument,
      documentSchemaVersion: currentVersion,
    })

    messageList.push(migrationResult.message)

    if (migrationResult.status === 'ERROR') {
      return {
        status: 'ERROR',
        data: null,
        message: messageList.join(' | '),
      }
    }

    currentDocument = migrationResult.data

    currentVersion =
      typeof currentDocument.schemaVersion === 'number'
        ? currentDocument.schemaVersion
        : currentVersion
  }

  // Validate as the latest version after migration
  const migratedDocumentValidationResult =
    bookmarkSchema.safeParse(currentDocument)

  if (migratedDocumentValidationResult.success !== true) {
    console.error(
      `Document has the latest version ${currentVersion} schema, but validation failed 🤷‍♂️`,
    )

    messageList.push(
      `Document has the latest version ${currentVersion} schema, but validation failed 🤷‍♂️`,
    )

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
