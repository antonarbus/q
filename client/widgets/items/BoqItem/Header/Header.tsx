import { Title } from './Title'
import { BoqHeaderLayout } from 'client/shared/layouts/BoqHeaderLayout'
import { Currency } from './Currency'
import { SubtotalText } from './SubtotalText'
import { Price } from './Price'

interface Props {
  index: number
}

export const Header = ({ index }: Props): JSX.Element => {
  return (
    <BoqHeaderLayout
      title={<Title index={index} />}
      subtotalText={<SubtotalText index={index} />}
      price={<Price index={index} />}
      currency={<Currency index={index} />}
      outlinedForDevPurposes
    />
  )
}
