import { Title } from './Title'
import { SubtotalText } from './SubtotalText'
import { SubTotalPrice } from './SubTotalPrice'
import { BoqHeaderLayout } from './BoqHeaderLayout'

export const Header = (): JSX.Element => {
  return (
    <BoqHeaderLayout
      title={<Title />}
      subtotalText={<SubtotalText />}
      subTotalPrice={<SubTotalPrice />}
    />
  )
}
