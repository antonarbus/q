import { NumberColumn } from './column_headers/NumberColumn'
import { DescriptionColumn } from './column_headers/DescriptionColumn'
import { ItemColumn } from './column_headers/ItemColumn'
import { QtyColumn } from './column_headers/QtyColumn'
import { PriceColumn } from './column_headers/PriceColumn'
import { BoqColumnsLayout } from 'client/shared/layouts'

type Props = {
  itemIndex: number
}

export const BoqColumns = ({ itemIndex }: Props): JSX.Element => {
  return (
    <BoqColumnsLayout>
      <NumberColumn itemIndex={itemIndex} />
      <DescriptionColumn itemIndex={itemIndex} />
      <ItemColumn itemIndex={itemIndex} />
      <QtyColumn itemIndex={itemIndex} />
      <PriceColumn itemIndex={itemIndex} />
    </BoqColumnsLayout>
  )
}
