import { useSelector } from '@shared/lib/redux'
import { Outlet } from 'react-router-dom'
import { BlockMany } from '@widgets/block'
import { InfoLeft, InfoRight } from '@widgets/quotation/info'
import { Search } from '@widgets/quotation/search'
import { BackgroundMessage } from '@entities/quotation'
import { InfoAndSearchLayout } from './InfoAndSearchLayout'
import { arrayShapesEqualityFn } from '@shared/util/arrayShapesEqualityFn'

export const Quotation = (): React.JSX.Element => {
  const blocks = useSelector(
    (state) => state.quotation.blocks,
    arrayShapesEqualityFn,
  )

  return (
    <>
      <InfoAndSearchLayout>
        <InfoLeft />
        <Search />
        <InfoRight />
      </InfoAndSearchLayout>
      <BackgroundMessage />
      <BlockMany blocks={blocks} />
      <Outlet />
    </>
  )
}
