import { PriceMainLayout } from './PriceMainLayout'
import { PriceValue } from './PriceValue'
import type { JSX } from 'react'

export const PriceMain = (): JSX.Element => {
  return <PriceMainLayout main={<PriceValue />} />
}
