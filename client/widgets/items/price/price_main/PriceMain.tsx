import { PriceMainLayout } from './PriceMainLayout'
import { PriceValue } from './PriceValue'

export const PriceMain = (): JSX.Element => {
  return (
    <PriceMainLayout
      main={<PriceValue/>}
    />
  )
}
