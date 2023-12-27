import { Title } from './Title'
import { SubtotalText } from './SubtotalText'
import { SubTotalPrice } from './SubTotalPrice'
import { BoqHeaderLayout } from './BoqHeaderLayout'

// todo: integrate currency in price directly and create a logic to update only price part
// todo: something like I did in quotation.org originally

export const Header = (): JSX.Element => {
  return (
    <BoqHeaderLayout
      title={<Title />}
      subtotalText={<SubtotalText />}
      subTotalPrice={<SubTotalPrice />}
    />
  )
}
