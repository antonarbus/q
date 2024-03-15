import { Outlet } from 'react-router-dom'
import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useLoadQuotationFromBrowser } from '@features/load_quotation'

export const QuotationLocal = (): JSX.Element => {
  useLoadQuotationFromBrowser()

  return (
    <>
      <QuotationInfo />
      <Items />
      <Outlet />
    </>
  )
}
