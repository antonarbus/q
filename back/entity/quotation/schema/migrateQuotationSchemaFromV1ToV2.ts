import { z } from 'zod'
import { quotationSchema as quotationSchemaV1 } from './quotationSchemaV1' //* <-- V1
import {
  quotationSchema as quotationSchemaV2, //* <-- V2
  type Quotation as QuotationV2, //* <-- V2
} from './quotationSchemaV2' //* <-- V2

const MIGRATE_FROM = 1
const MIGRATE_TO = 2

type Props = {
  document: Record<string, unknown>
  documentSchemaVersion: number
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
      status: 'ERROR'
      data: null
      message: string
    }

export const migrateQuotationSchemaFromV1ToV2 = (props: Props): Res => {
  // Run migration only for specific version
  if (props.documentSchemaVersion !== MIGRATE_FROM) {
    return {
      status: 'SKIPPED',
      data: props.document,
      message: 'Skipped',
    }
  }

  const oldDocumentValidationResult = quotationSchemaV1.safeParse(
    props.document,
  )

  if (oldDocumentValidationResult.success === false) {
    const treeifiedError = z.treeifyError(oldDocumentValidationResult.error)

    return {
      status: 'ERROR',
      data: null,
      message: `Document has version ${MIGRATE_FROM}, but structure is incorrect. Will not apply migration. Zod error: ${JSON.stringify(treeifiedError)}`,
    }
  }

  // ======== ↓ MIGRATION ↓ ========

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  const newDocument = structuredClone(
    oldDocumentValidationResult.data,
  ) as QuotationV2 // <-- hack! cast QuotationV2 type for actual QuotationV1 to let us set new values

  newDocument.quotationSchemaVersion = MIGRATE_TO //* <-- TO BE IN EVERY MIGRATION FUNCTION
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
