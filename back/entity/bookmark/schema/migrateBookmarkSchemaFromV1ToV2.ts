/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import { z } from 'zod'
import { bookmarkSchema as bookmarkSchemaV1 } from './bookmarkSchemaV1' //* <-- V1
import {
  bookmarkSchema as bookmarkSchemaV2, //* <-- V2
  type Bookmark as BookmarkV2, //* <-- V2
} from './bookmarkSchemaV2' //* <-- V2

const MIGRATE_FROM = 1
const MIGRATE_TO = 2

type Props = {
  document: Record<string, unknown>
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
      status: 'CORRUPTED'
      data: null
      message: string
    }
  | {
      status: 'MIGRATION_BUG'
      data: null
      message: string
    }

export const migrateBookmarkSchemaFromV1ToV2 = (props: Props): Res => {
  const shouldSkipMigrationForUnsupportedSchemaVersion =
    'bookmarkSchemaVersion' in props.document &&
    props.document.bookmarkSchemaVersion !== MIGRATE_FROM

  if (shouldSkipMigrationForUnsupportedSchemaVersion === true) {
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
      status: 'CORRUPTED',
      data: null,
      message: `Document has version ${MIGRATE_FROM}, but structure is incorrect. Will not apply migration. Zod error: ${JSON.stringify(treeifiedError)}`,
    }
  }

  // ======== ↓ MIGRATION ↓ ========

  const newDocument = structuredClone(
    oldDocumentValidationResult.data,
  ) as BookmarkV2 // <-- hack! cast QuotationV2 type for actual QuotationV1 to let us set new values

  newDocument.bookmarkSchemaVersion = MIGRATE_TO //* <-- TO BE IN EVERY MIGRATION FUNCTION

  // ======== ↑ MIGRATION ↑ ========

  const newDocumentValidationResult = bookmarkSchemaV2.safeParse(newDocument)

  if (newDocumentValidationResult.success === false) {
    const treeifiedError = z.treeifyError(newDocumentValidationResult.error)

    return {
      status: 'MIGRATION_BUG',
      data: null,
      message: `Migration logic problem. Failed to migrate from V${MIGRATE_FROM} to V${MIGRATE_TO}. Document has version ${MIGRATE_FROM}, but structure is incorrect. Will not apply migration. Zod error: ${JSON.stringify(treeifiedError)}`,
    }
  }

  return {
    status: 'MIGRATED',
    data: newDocumentValidationResult.data,
    message: `Migrated from V${MIGRATE_FROM} to V${MIGRATE_TO}`,
  }
}
