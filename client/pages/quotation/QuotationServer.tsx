import { Outlet } from 'react-router-dom'
import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useLoadServerQuotation } from '@features/load_quotation'

export const QuotationServer = (): JSX.Element => {
  useLoadServerQuotation()

  return (
    <>
      <QuotationInfo />
      <Items />
      <Outlet />
    </>
  )
}
