import { PriceHeaderLayout } from './TotalPriceHeaderLayout'
import { PriceTitle } from './TotalPriceTitle'

export const PriceHeader = (): React.JSX.Element => {
  return <PriceHeaderLayout title={<PriceTitle />} />
}
