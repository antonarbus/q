import { migrateQuotationSchemaFromV1ToV2 } from './schema/migrateQuotationSchemaFromV1ToV2'
import { type Quotation, quotationSchema } from './schema'

const migrateQuotationSchemaList = [
  migrateQuotationSchemaFromV1ToV2,
  // migrateQuotationSchemaFromV2ToV3,
  // migrateQuotationSchemaFromV3ToV4,
]

type Props = {
  document: Record<string, unknown>
}

type Res =
  | {
      status: 'VALIDATED'
      data: Quotation
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
export const validateQuotation = (props: Props): Res => {
  // Fast path: Try validating as latest version first
  const latestVersionValidation = quotationSchema.safeParse(props.document)

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
  for (const migrate of migrateQuotationSchemaList) {
    const migrationResult = migrate({ document: currentDocument })
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
    quotationSchema.safeParse(currentDocument)

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
