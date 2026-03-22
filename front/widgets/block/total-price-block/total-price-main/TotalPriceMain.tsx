import { PriceMainLayout } from './TotalPriceMainLayout'
import { PriceValue } from './TotalPriceValue'

export const PriceMain = (): React.JSX.Element => {
  return <PriceMainLayout main={<PriceValue />} />
}
