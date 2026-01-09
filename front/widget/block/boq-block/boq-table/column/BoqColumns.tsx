import type { JSX } from 'react'
import { BoqColumnsLayout } from './BoqColumnsLayout'
import { DescriptionColumn } from './column-header/DescriptionColumn'
import { ItemPriceColumn } from './column-header/ItemPriceColumn'
import { NumberColumn } from './column-header/NumberColumn'
import { PriceColumn } from './column-header/PriceColumn'
import { QtyColumn } from './column-header/QtyColumn'

export const BoqColumns = (): JSX.Element => {
  return (
    <BoqColumnsLayout>
      <NumberColumn />
      <DescriptionColumn />
      <ItemPriceColumn />
      <QtyColumn />
      <PriceColumn />
    </BoqColumnsLayout>
  )
}
