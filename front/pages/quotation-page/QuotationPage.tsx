import { BackgroundMessage } from '@front/entities/quotation/ui/BackgroundMessage'
import { useSelector } from '@front/shared/lib/redux'
import { arrayShapesEqualityFn } from '@front/shared/util/arrayShapesEqualityFn'
import { BlockMany } from '@front/widgets/block'
import { InfoLeft, InfoRight } from '@front/widgets/quotation/info'
import { Search } from '@front/widgets/quotation/search'
import { Outlet } from 'react-router-dom'
import { InfoAndSearchLayout } from './InfoAndSearchLayout'

export const QuotationPage = (): React.JSX.Element => {
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
