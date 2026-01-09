import { BackgroundMessage } from '@entity/quotation/ui/BackgroundMessage'
import { useSelector } from '@shared/lib/redux'
import { arrayShapesEqualityFn } from '@shared/util/arrayShapesEqualityFn'
import { BlockMany } from '@widget/block'
import { InfoLeft, InfoRight } from '@widget/quotation/info'
import { Search } from '@widget/quotation/search'
import type { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import { InfoAndSearchLayout } from './InfoAndSearchLayout'

export const QuotationPage = (): JSX.Element => {
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
