import { Outlet } from 'react-router-dom'
import { Items } from '@widgets/items'
import { Info } from '@widgets/quotation/info'
import { Search } from '@widgets/quotation/search'
import { useLoadQuotation } from '@features/quotation/load_quotation'
import { BackgroundMessage } from '@entities/quotation'
import { InfoAndSearchLayout } from './InfoAndSearchLayout'

export const Quotation = (): JSX.Element => {
  useLoadQuotation()

  return (
    <>
      <InfoAndSearchLayout>
        <div css={{ width: '80px' }}></div>{' '}
        {/* Spacer to center the <Search /> */}
        <Search />
        <Info /> {/* it is also 80px as the spacer */}
      </InfoAndSearchLayout>
      <BackgroundMessage />
      <Items />
      <Outlet />
    </>
  )
}
