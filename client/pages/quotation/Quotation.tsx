import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useLoadQuotationFromServer, useLoadQuotationFromBrowser } from '@features/load_quotation'

export const Quotation = (): JSX.Element => {
  useLoadQuotationFromBrowser()
  useLoadQuotationFromServer()

  return (
    <>
      <QuotationInfo />
      <Items />
    </>
  )
}
