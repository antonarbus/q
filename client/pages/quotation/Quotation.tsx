import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useFetchQuotation } from '@entities/quotation'

export const Quotation = (): JSX.Element => {
  useFetchQuotation()

  return (
    <>
      <QuotationInfo />
      <Items />
    </>
  )
}
