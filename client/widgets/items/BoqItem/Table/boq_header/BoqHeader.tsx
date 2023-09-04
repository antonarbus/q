import { NumberColHeader } from './NumberHeader'
import { DescriptionColHeader } from './DescriptionHeader'
import { ItemColHeader } from './ItemHeader'
import { QtyHeader } from './QtyHeader'
import { PriceHeader } from './PriceHeader'
import { BoqColsHeaderLayout } from 'client/shared/layouts/BoqColsHeaderLayout'

interface Props {
  index: number
}

export const BoqColsHeader = ({ index }: Props): JSX.Element => {
  return (
    <BoqColsHeaderLayout>
      <NumberColHeader index={index} />
      <DescriptionColHeader index={index} />
      <ItemColHeader index={index} />
      <QtyHeader index={index} />
      <PriceHeader index={index} />
    </BoqColsHeaderLayout>
  )
}
