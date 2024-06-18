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

  quotation.items.forEach((item) => {
    delete item.email
    delete item.name
    delete item.category
    delete item.desc
    delete item.info
    delete item.createdAt
    delete item.updatedAt
  })

  return quotation
}
