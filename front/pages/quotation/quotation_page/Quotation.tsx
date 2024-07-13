import { useSelectorTyped } from '@lib_instances/store'
import { Outlet } from 'react-router-dom'
import { Blocks } from '@widgets/items'
import { Info } from '@widgets/quotation/info'
import { Search } from '@widgets/quotation/search'
import { useLoadQuotation } from '@features/quotation/load_quotation'
import { BackgroundMessage, itemsShapeEqualityFn } from '@entities/quotation'
import { InfoAndSearchLayout } from './InfoAndSearchLayout'

export const Quotation = (): JSX.Element => {
  useLoadQuotation()

  const blocks = useSelectorTyped(
    (state) => state.quotation.blocks,
    itemsShapeEqualityFn,
  )

  return (
    <>
      <InfoAndSearchLayout>
        <div css={{ width: '80px' }} /> {/* spacer to center the <Search /> */}
        <Search />
        <Info css={{ width: '80px' }} />
      </InfoAndSearchLayout>
      <BackgroundMessage />
      <Blocks items={blocks} />
      <Outlet />
    </>
  )
}
