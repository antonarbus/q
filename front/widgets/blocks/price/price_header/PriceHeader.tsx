import { PriceHeaderLayout } from './PriceHeaderLayout'
import { PriceTitle } from './PriceTitle'

export const PriceHeader = (): React.JSX.Element => {
  return <PriceHeaderLayout title={<PriceTitle />} />
}
