import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useLoadQuotationFromServer, useLoadTemplateOrLocalQuotationForRootRoute } from '@features/load_quotation'

export const Quotation = (): JSX.Element => {
  useLoadTemplateOrLocalQuotationForRootRoute()
  useLoadQuotationFromServer()

  return (
    <>
      <QuotationInfo />
      <Items />
    </>
  )
}
