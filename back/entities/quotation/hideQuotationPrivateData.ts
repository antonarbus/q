import type { Quotation } from './schemas'

type Props = {
  quotation: Quotation
}

export const hideQuotationPrivateData = (props: Props): void => {
  // Redact metadata timestamps
  props.quotation.createdAt = new Date().toISOString()
  props.quotation.updatedAt = new Date().toISOString()
  props.quotation.openedAt = new Date().toISOString()

  // Redact user content data
  props.quotation.name = 'private'
  props.quotation.category = 'private'
  props.quotation.desc = 'private'
  props.quotation.info = 'private'

  // Redact block data (blocks don't have metadata anymore, only data)
  props.quotation.blocks.forEach((block) => {
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
