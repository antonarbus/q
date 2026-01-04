import type { Quotation } from './quotationSchema'

type Props = {
  quotation: Quotation
}

export const hideQuotationPrivateData = (props: Props): void => {
  // Redact metadata timestamps
  props.quotation.meta.createdAt = new Date().toISOString()
  props.quotation.meta.updatedAt = new Date().toISOString()
  props.quotation.meta.openedAt = new Date().toISOString()

  // Redact user content data
  props.quotation.data.name = 'private'
  props.quotation.data.category = 'private'
  props.quotation.data.desc = 'private'
  props.quotation.data.info = 'private'

  // Redact block data (blocks don't have metadata anymore, only data)
  props.quotation.data.blocks.forEach((block) => {
    block.name = 'private'
    block.category = 'private'
    block.desc = 'private'
    block.info = 'private'

    if (block.type === 'boq') {
      block.boq.rows.forEach((row) => {
        row.name = 'private'
        row.category = 'private'
        row.desc = 'private'
        row.info = 'private'
      })
    }
  })
}
