import { z } from 'zod'
//* V1
import { quotationSchema as quotationSchemaV1 } from './quotationSchemaV1'
//* V2
import {
  quotationSchema as quotationSchemaV2,
  type Quotation as QuotationV2,
} from './quotationSchemaV2'

const MIGRATE_FROM = 1
const MIGRATE_TO = 2

type Props = {
  document: Record<string, unknown>
}

type Res =
  | {
      status: 'MIGRATED'
      data: QuotationV2
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

export const migrateQuotationSchemaFromV1ToV2 = (props: Props): Res => {
  const messageList: string[] = []

  const shouldSkipMigrationForUnsupportedSchemaVersion =
    'quotationSchemaVersion' in props.document &&
    props.document.quotationSchemaVersion !== MIGRATE_FROM

  if (shouldSkipMigrationForUnsupportedSchemaVersion === true) {
    messageList.push('Document has latest version, migration is not required')

    return {
      status: 'SKIPPED',
      data: props.document,
      message: messageList.join(' | '),
    }
  }

  const oldDocumentValidationResult = quotationSchemaV1.safeParse(props.document)

  if (oldDocumentValidationResult.success === false) {
    const treeifiedError = z.treeifyError(oldDocumentValidationResult.error)

    messageList.push(
      `Document has version ${MIGRATE_FROM}, but structure is incorrect. Will not apply migration. Zod error: ${JSON.stringify(treeifiedError)}`,
    )

    return {
      status: 'CORRUPTED',
      data: null,
      message: messageList.join(' | '),
    }
  }

  // ======== ↓ MIGRATION ↓ ========

  //* For simple property addition or deletion migration is not required
  //* For missing property add default value e.g. z.string().default('foo')
  //* For failing validation use catch() e.g. z.string().catch('foo')

  //! hack! cast QuotationV2 type for actual QuotationV1 to let us set new values
  const newDocument = structuredClone(oldDocumentValidationResult.data) as unknown as QuotationV2

  //* TO BE IN EVERY MIGRATION FUNCTION
  newDocument.quotationSchemaVersion = MIGRATE_TO
  newDocument.type = 'quotation'

  newDocument.blocks.forEach((block) => {
    block.bookmarkSchemaVersion = 2

    if (block.type === 'boq') {
      block.boq.rows.forEach((row) => {
        row.bookmarkSchemaVersion = 2
      })
    }
  })

  // ======== ↑ MIGRATION ↑ ========

  const newDocumentValidationResult = quotationSchemaV2.safeParse(newDocument)

  if (newDocumentValidationResult.success === false) {
    const treeifiedError = z.treeifyError(newDocumentValidationResult.error)

    messageList.push(
      `Migration logic problem. Failed to migrate from V${MIGRATE_FROM} to V${MIGRATE_TO}. Document has version ${MIGRATE_FROM}, but structure is incorrect. Will not apply migration. Zod error: ${JSON.stringify(treeifiedError)}`,
    )

    return {
      status: 'MIGRATION_BUG',
      data: null,
      message: messageList.join(' | '),
    }
  }

  messageList.push(`Migrated from V${MIGRATE_FROM} to V${MIGRATE_TO}`)

  return {
    status: 'MIGRATED',
    data: newDocumentValidationResult.data,
    message: messageList.join(' | '),
  }
}
