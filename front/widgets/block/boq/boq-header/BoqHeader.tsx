import { BoqHeaderLayout } from './BoqHeaderLayout'
import { SubTotalPrice } from './SubTotalPrice'
import { SubtotalText } from './SubtotalText'
import { Title } from './Title'
import type { JSX } from 'react'

export const BoqHeader = (): JSX.Element => {
  return (
    <BoqHeaderLayout
      subTotalPrice={<SubTotalPrice />}
      subtotalText={<SubtotalText />}
      title={<Title />}
    />
  )
}
