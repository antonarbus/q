import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useLoadQuotationFromServer, useLoadTemplateOrLocalQuotationForRootRoute } from '@entities/quotation'

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
