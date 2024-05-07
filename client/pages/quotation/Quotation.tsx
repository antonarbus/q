import { Outlet } from 'react-router-dom'
import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useLoadQuotation } from '@features/quotation/load_quotation'

export const Quotation = (): JSX.Element => {
  useLoadQuotation()

  throw new Error('xxx')

  return (
    <>
      <QuotationInfo />
      <Items />
      <Outlet />
    </>
  )
}
