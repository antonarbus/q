import { useSelectorTyped } from '@lib_instances/store'
import { Outlet } from 'react-router-dom'
import { Blocks } from '@widgets/blocks'
import { Info } from '@widgets/quotation/info'
import { Search } from '@widgets/quotation/search'
import { useLoadQuotation } from '@features/quotation/load_quotation'
import { BackgroundMessage, arrayShapesEqualityFn } from '@entities/quotation'
import { InfoAndSearchLayout } from './InfoAndSearchLayout'

export const Quotation = (): JSX.Element => {
  useLoadQuotation()

  const blocks = useSelectorTyped(
    (state) => state.quotation.blocks,
    arrayShapesEqualityFn,
  )

  return (
    <>
      <InfoAndSearchLayout>
        <div css={{ width: '80px' }} /> {/* spacer to center the <Search /> */}
        <Search />
        <Info css={{ width: '80px' }} />
      </InfoAndSearchLayout>
      <BackgroundMessage />
      <Blocks blocks={blocks} />
      <Outlet />
    </>
  )
}
