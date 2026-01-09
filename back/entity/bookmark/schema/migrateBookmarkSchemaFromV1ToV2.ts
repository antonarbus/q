import { z } from 'zod'
import { produce } from 'immer'
import { bookmarkSchema as bookmarkSchemaV1 } from './bookmarkSchemaV1' //* <-- V1
import {
  bookmarkSchema as bookmarkSchemaV2, //* <-- V2
  type Bookmark as BookmarkV2, //* <-- V2
} from './bookmarkSchemaV2' //* <-- V2

const MIGRATE_FROM = 1
const MIGRATE_TO = 2

type Props = {
  document: Record<string, unknown>
  documentSchemaVersion: number
}

type Res =
  | {
      status: 'MIGRATED'
      data: BookmarkV2
      message: string
    }
  | {
      status: 'SKIPPED'
      data: Props['document']
      message: string
    }
  | {
      status: 'ERROR'
      data: null
      message: string
    }

/**
 * If document from the bucket has the latest schema it is just validated
 * If schema version is outdated, document structure is progressively updated and validated
 */
export const migrateBookmarkSchemaFromV1ToV2 = (props: Props): Res => {
  // Run migration only for specific version
  if (props.documentSchemaVersion !== MIGRATE_FROM) {
    return {
      status: 'SKIPPED',
      data: props.document,
      message: 'Skipped',
    }
  }

  const oldDocumentValidationResult = bookmarkSchemaV1.safeParse(props.document)

  if (oldDocumentValidationResult.success === false) {
    const treeifiedError = z.treeifyError(oldDocumentValidationResult.error)

    return {
      status: 'ERROR',
      data: null,
      message: `Document has version ${MIGRATE_FROM}, but structure is incorrect. Will not apply migration. Zod error: ${JSON.stringify(treeifiedError)}`,
    }
  }

  const newDocument = produce(
    oldDocumentValidationResult.data,
    // hack! draft has type BookmarkV1, but we use BookmarkV2 to let us set new target values
    (draft: BookmarkV2) => {
      draft.bookmarkSchemaVersion = MIGRATE_TO //* <-- TO BE IN EVERY MIGRATION FUNCTION
    },
  )

  const newDocumentValidationResult = bookmarkSchemaV2.safeParse(newDocument)

  if (newDocumentValidationResult.success === false) {
    const treeifiedError = z.treeifyError(newDocumentValidationResult.error)

    return {
      status: 'ERROR',
      data: null,
      message: `Failed to migrate from V${MIGRATE_FROM} to V${MIGRATE_TO}. Document has version ${MIGRATE_FROM}, but structure is incorrect. Will not apply migration. Zod error: ${JSON.stringify(treeifiedError)}`,
    }
  }

  return {
    status: 'MIGRATED',
    data: newDocumentValidationResult.data,
    message: `Migrated from V${MIGRATE_FROM} to V${MIGRATE_TO}`,
  }
}
