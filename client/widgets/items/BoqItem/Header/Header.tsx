import { Title } from './Title'
import { BoqHeaderLayout } from 'client/shared/layouts'
import { Currency } from './Currency'
import { SubtotalText } from './SubtotalText'
import { Price } from './Price'

interface Props {
  itemIndex: number
}

// todo: now we have a placeholder for price and currency
// what if we do not want currency to be shown at all
// if we delete it, we still have some space reserved, which is not good, it should disappear completely
// integrate currency in price directly and create a logic to update only price part
// something like I did in quotation.org originally

// also maybe we do not need placeholder for Title and Subtotal

export const Header = ({ itemIndex }: Props): JSX.Element => {
  return (
    <BoqHeaderLayout
      title={<Title itemIndex={itemIndex} />}
      subtotalText={<SubtotalText itemIndex={itemIndex} />}
      price={<Price itemIndex={itemIndex} />}
      currency={<Currency itemIndex={itemIndex} />}
    />
  )
}
