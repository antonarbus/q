import { Outlet } from 'react-router-dom'
import { Items } from '@widgets/items'
import { Info } from '@widgets/quotation/info'
import { Search } from '@widgets/quotation/search'
import { useLoadQuotation } from '@features/quotation/load_quotation'
import { InfoAndSearchLayout } from './InfoAndSearchLayout'

export const Quotation = (): JSX.Element => {
  useLoadQuotation()

  return (
    <>
      <InfoAndSearchLayout>
        <Info />
        <Search />
      </InfoAndSearchLayout>
      <Items />
      <Outlet />
    </>
  )
}
