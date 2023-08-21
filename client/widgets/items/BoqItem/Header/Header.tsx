import { Title } from './Title'
import { Subtotal } from './Subtotal'
import { theme } from 'client/app/theme'
import { BoqHeaderLayout } from 'client/shared/layouts/BoqHeaderLayout'
import { SubtotalText } from './Subtotal/SubtotalText'
import { Price } from './Subtotal/Price'
import { Currency } from './Subtotal/Currency'

interface Props {
  index: number
}

export const Header = ({ index }: Props): JSX.Element => {
  return (
    <BoqHeaderLayout
      // title={<Title index={index} />}
      title={<div contentEditable>title</div>}
      subtotalText={<SubtotalText index={index} />}
      // subtotalText={<div contentEditable>title</div>}
      // price={<Price index={index} />}
      price={<div contentEditable>price</div>}
      // currency={<Currency index={index} />}
      currency={<div contentEditable>currency</div>}
      outlinedForDevPurposes
    // hideContentForDevPurpose
    />
  )
}
