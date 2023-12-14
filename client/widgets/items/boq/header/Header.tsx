import { Title } from './Title'
import { SubtotalText } from './SubtotalText'
import { Price } from './Price'
import { BoqHeaderLayout } from './BoqHeaderLayout'
import { type BoqEditorsRef } from 'client/entities/items'

type Props = {
  itemIndex: number
  boqEditorsRef?: BoqEditorsRef
}

// todo: integrate currency in price directly and create a logic to update only price part
// todo: something like I did in quotation.org originally

export const Header = ({
  itemIndex,
  boqEditorsRef,
}: Props): JSX.Element => {
  return (
    <BoqHeaderLayout
      title={<Title itemIndex={itemIndex} boqEditorsRef={boqEditorsRef} />}
      subtotalText={<SubtotalText itemIndex={itemIndex} boqEditorsRef={boqEditorsRef} />}
      price={<Price itemIndex={itemIndex} boqEditorsRef={boqEditorsRef} />}
    />
  )
}
