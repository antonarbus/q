import { Title } from './Title'
import { SubtotalText } from './SubtotalText'
import { Price } from './Price'
import { BoqHeaderLayout } from './BoqHeaderLayout'

type Props = {
  itemIndex: number
}

// todo: integrate currency in price directly and create a logic to update only price part
// todo: something like I did in quotation.org originally

// todo: also maybe we do not need placeholder for Title and Subtotal

export const Header = ({ itemIndex }: Props): JSX.Element => {
  return (
    <BoqHeaderLayout
      title={<Title itemIndex={itemIndex} />}
      subtotalText={<SubtotalText itemIndex={itemIndex} />}
      price={<Price itemIndex={itemIndex} />}
    />
  )
}
