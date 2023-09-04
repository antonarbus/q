import { Title } from './Title'
import { BoqHeaderLayout } from 'client/shared/layouts'
import { Currency } from './Currency'
import { SubtotalText } from './SubtotalText'
import { Price } from './Price'

interface Props {
  index: number
}

// todo: now we have a placeholder for price and currency
// todo: what if we do not want currency to be shown at all
// todo: if we delete it, we still have some space reserved, which is not good, it should disappear completely
// todo: integrate currency in price directly and create a logic to update only price part
// todo: something like I did in quotation.org originally

// todo: also maybe we do not need placeholder for Title and Subtotal

export const Header = ({ index }: Props): JSX.Element => {
  return (
    <BoqHeaderLayout
      title={<Title index={index} />}
      subtotalText={<SubtotalText index={index} />}
      price={<Price index={index} />}
      currency={<Currency index={index} />}
    />
  )
}
