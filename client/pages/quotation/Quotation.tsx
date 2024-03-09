import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useLoadQuotation } from '@entities/quotation'

export const Quotation = (): JSX.Element => {
  useLoadQuotation()

  return (
    <>
      <QuotationInfo />
      <Items />
    </>
  )
}
