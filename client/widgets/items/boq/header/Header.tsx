import { BoqHeaderLayout } from './BoqHeaderLayout'
import { SubTotalPrice } from './SubTotalPrice'
import { SubtotalText } from './SubtotalText'
import { Title } from './Title'

export const Header = (): JSX.Element => {
  return (
    <BoqHeaderLayout
      title={<Title />}
      subtotalText={<SubtotalText />}
      subTotalPrice={<SubTotalPrice />}
    />
  )
}
