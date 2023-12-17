import { NumberColumn } from './column_headers/NumberColumn'
import { DescriptionColumn } from './column_headers/DescriptionColumn'
import { ItemColumn } from './column_headers/ItemColumn'
import { QtyColumn } from './column_headers/QtyColumn'
import { PriceColumn } from './column_headers/PriceColumn'
import { BoqColumnsLayout } from './BoqColumnsLayout'

export const BoqColumns = (): JSX.Element => {
  return (
    <BoqColumnsLayout>
      <NumberColumn />
      <DescriptionColumn />
      <ItemColumn />
      <QtyColumn />
      <PriceColumn />
    </BoqColumnsLayout>
  )
}
