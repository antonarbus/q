import { NumberColHeader } from './NumberColHeader'
import { DescriptionColHeader } from './DescriptionColHeader'
import { ItemColHeader } from './ItemColHeader'
import { QtyColHeader } from './QtyColHeader'
import { PriceColHeader } from './PriceColHeader'
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
      <QtyColHeader index={index} />
      <PriceColHeader index={index} />
    </BoqColsHeaderLayout>
  )
}
