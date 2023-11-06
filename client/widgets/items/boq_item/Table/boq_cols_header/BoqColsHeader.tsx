import { NumberColHeader } from './NumberColHeader'
import { DescriptionColHeader } from './DescriptionColHeader'
import { ItemColHeader } from './ItemColHeader'
import { QtyColHeader } from './QtyColHeader'
import { PriceColHeader } from './PriceColHeader'
import { BoqColsHeaderLayout } from 'client/shared/layouts'

type Props = {
  itemIndex: number
}

export const BoqColsHeader = ({ itemIndex }: Props): JSX.Element => {
  return (
    <BoqColsHeaderLayout>
      <NumberColHeader itemIndex={itemIndex} />
      <DescriptionColHeader itemIndex={itemIndex} />
      <ItemColHeader itemIndex={itemIndex} />
      <QtyColHeader itemIndex={itemIndex} />
      <PriceColHeader itemIndex={itemIndex} />
    </BoqColsHeaderLayout>
  )
}
