import { BoqHeaderLayout } from './BoqHeaderLayout'
import { SubTotalPrice } from './SubTotalPrice'
import { SubtotalText } from './SubtotalText'
import { Title } from './Title'

export const BoqHeader = (): React.JSX.Element => {
  return (
    <BoqHeaderLayout
      subTotalPrice={<SubTotalPrice />}
      subtotalText={<SubtotalText />}
      title={<Title />}
    />
  )
}
