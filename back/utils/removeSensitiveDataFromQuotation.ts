import { type Quotation } from '@entities/quotation'

type Props = {
  quotation: Quotation
}

export const removeSensitiveDataFromQuotation = ({
  quotation,
}: Props): Quotation => {
  delete quotation.email
  delete quotation.name
  delete quotation.category
  delete quotation.desc
  delete quotation.info
  delete quotation.createdAt
  delete quotation.updatedAt
  delete quotation.openedAt
  delete quotation.from
  delete quotation.to
  delete quotation.sharedWith

  quotation.blocks.forEach((block) => {
    delete block.email
    delete block.name
    delete block.category
    delete block.desc
    delete block.info
    delete block.createdAt
    delete block.updatedAt
  })

  return quotation
}
