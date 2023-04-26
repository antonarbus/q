
import { RefResizableType } from 'client/types'
import { BoqHeaderSubtotalText } from './BoqHeaderSubtotalText'
import { BoqHeaderSubtotalPrice } from './BoqHeaderSubtotalPrice'
import { BoqHeaderSubtotalCurrency } from './BoqHeaderSubtotalCurrency'

type Props = {
  index: number
  itemRef: RefResizableType
}

export const BoqHeaderSubtotal = ({ index, itemRef }: Props) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        flexShrink: 0,
        minWidth: 100
      }}
    >
      <BoqHeaderSubtotalText index={index} itemRef={itemRef} />
      <div
        css={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'baseline',
          gap: 10,
          width: '100%'
        }}
      >
        <BoqHeaderSubtotalPrice index={index} itemRef={itemRef} />
        <BoqHeaderSubtotalCurrency index={index} itemRef={itemRef} />
      </div>
    </div>
  )
}
