import { Outlet } from 'react-router-dom'
import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useLoadQuotation } from '@features/quotation/load_quotation'

export const Quotation = (): JSX.Element => {
  useLoadQuotation()

  return (
    <>
      <QuotationInfo />
      <Items />
      <Outlet />
    </>
  )
}
