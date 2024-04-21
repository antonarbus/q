import { Outlet } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { Items } from '@widgets/items'
import { QuotationInfo } from '@widgets/quotation'
import { useLoadQuotation } from '@features/quotation/load_quotation'

export const Quotation = (): JSX.Element => {
  useLoadQuotation()

  useEffectOnce(() => {
    console.log(666)
  })

  return (
    <>
      <QuotationInfo />
      <Items />
      <Outlet />
    </>
  )
}
