import { NumberColumn } from './NumberColumn'
import { DescriptionColumn } from './DescriptionColumn'
import { ItemColumn } from './ItemColumn'
import { QtyColumn } from './QtyColumn'
import { PriceColumn } from './PriceColumn'
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
