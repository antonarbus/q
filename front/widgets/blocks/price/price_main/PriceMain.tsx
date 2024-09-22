import { PriceMainLayout } from './PriceMainLayout'
import { PriceValue } from './PriceValue'

export const PriceMain = (): React.JSX.Element => {
  return <PriceMainLayout main={<PriceValue />} />
}
