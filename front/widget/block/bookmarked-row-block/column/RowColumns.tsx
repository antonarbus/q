import { ColumnsLayout } from './ColumnsLayout'
import { DescriptionColumn } from './column-header/DescriptionColumn'
import { ItemPriceColumn } from './column-header/ItemPriceColumn'
import { NumberColumn } from './column-header/NumberColumn'
import { PriceColumn } from './column-header/PriceColumn'
import { QtyColumn } from './column-header/QtyColumn'

export const RowColumns = (): React.JSX.Element => {
  return (
    <ColumnsLayout>
      <NumberColumn />
      <DescriptionColumn />
      <ItemPriceColumn />
      <QtyColumn />
      <PriceColumn />
    </ColumnsLayout>
  )
}
