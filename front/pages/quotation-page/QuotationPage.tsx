import { BackgroundMessage } from '@entities/quotation'
import { useSelector } from '@shared/lib/redux'
import { arrayShapesEqualityFn } from '@shared/util/arrayShapesEqualityFn'
import { BlockMany } from '@widgets/block'
import { InfoLeft, InfoRight } from '@widgets/quotation/info'
import { Search } from '@widgets/quotation/search'
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
