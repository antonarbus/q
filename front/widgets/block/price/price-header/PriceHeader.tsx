import { PriceHeaderLayout } from './PriceHeaderLayout'
import { PriceTitle } from './PriceTitle'
import type { JSX } from 'react'

export const PriceHeader = (): JSX.Element => {
  return <PriceHeaderLayout title={<PriceTitle />} />
}
