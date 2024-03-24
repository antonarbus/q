import { Outlet } from 'react-router-dom'
import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useLoadTemplateQuotation } from '@features/quotation/load_quotation'

export const QuotationTemplate = (): JSX.Element => {
  useLoadTemplateQuotation()

  return (
    <>
      <QuotationInfo />
      <Items />
      <Outlet />
    </>
  )
}
