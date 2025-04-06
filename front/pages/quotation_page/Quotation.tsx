import { useSelector } from '@shared/lib/redux'
import { Outlet } from 'react-router-dom'
import { Blocks } from '@widgets/blocks'
import { InfoLeft, InfoRight } from '@widgets/quotation/info'
import { Search } from '@widgets/quotation/search'
import { useLoadQuotation } from '@features/quotation/load_quotation'
import { BackgroundMessage } from '@entities/quotation'
import { InfoAndSearchLayout } from './InfoAndSearchLayout'
import { arrayShapesEqualityFn } from '@shared/utils/arrayShapesEqualityFn'

export const Quotation = (): React.JSX.Element => {
  useLoadQuotation()

  const blocks = useSelector(
    (state) => state.quotation.blocks,
    arrayShapesEqualityFn,
  )

  const quotationKey = useSelector((state) => state.app.quotationKey)

  return (
    <>
      <InfoAndSearchLayout>
        <InfoLeft />
        <Search />
        <InfoRight />
      </InfoAndSearchLayout>
      <BackgroundMessage />
      <Blocks
        key={quotationKey}
        blocks={blocks}
      />
      <Outlet />
    </>
  )
}
