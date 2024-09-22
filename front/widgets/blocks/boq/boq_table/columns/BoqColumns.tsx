import { BoqColumnsLayout } from './BoqColumnsLayout'
import { DescriptionColumn } from './column_headers/DescriptionColumn'
import { ItemPriceColumn } from './column_headers/ItemPriceColumn'
import { NumberColumn } from './column_headers/NumberColumn'
import { PriceColumn } from './column_headers/PriceColumn'
import { QtyColumn } from './column_headers/QtyColumn'

export const BoqColumns = (): React.JSX.Element => {
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
