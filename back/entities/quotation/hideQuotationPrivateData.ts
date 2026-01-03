import type { Quotation } from './quotationSchema'

type Props = {
  quotation: Quotation
}

export const hideQuotationPrivateData = (props: Props): void => {
  // Remove sensitive metadata for public/shared quotations
  // These fields come from DB, redact them after merge
  props.quotation.name = 'private'
  props.quotation.category = 'private'
  props.quotation.desc = 'private'
  props.quotation.info = 'private'
  props.quotation.createdAt = new Date().toISOString()
  props.quotation.updatedAt = new Date().toISOString()
  props.quotation.openedAt = new Date().toISOString()

  // Redact sensitive metadata from blocks
  props.quotation.blocks.forEach((block) => {
    block.name = 'private'
    block.category = 'private'
    block.desc = 'private'
    block.info = 'private'
    block.createdAt = new Date().toISOString()
    block.updatedAt = new Date().toISOString()

    if (block.type === 'boq') {
      block.boq.rows.forEach((row) => {
        row.name = 'private'
        row.category = 'private'
        row.desc = 'private'
        row.info = 'private'
        row.createdAt = new Date().toISOString()
        row.updatedAt = new Date().toISOString()
      })
    }
  })
}
