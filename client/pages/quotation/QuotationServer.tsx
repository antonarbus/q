import { Outlet } from 'react-router-dom'
import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useLoadQuotationFromServer } from '@features/load_quotation'

export const QuotationServer = (): JSX.Element => {
  useLoadQuotationFromServer()

  return (
    <>
      <QuotationInfo />
      <Items />
      <Outlet />
    </>
  )
}
