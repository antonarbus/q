import type { JSX } from 'react'
import { PriceHeaderLayout } from './PriceHeaderLayout'
import { PriceTitle } from './PriceTitle'

export const PriceHeader = (): JSX.Element => {
  return <PriceHeaderLayout title={<PriceTitle />} />
}
