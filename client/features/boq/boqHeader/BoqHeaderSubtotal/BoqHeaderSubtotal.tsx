
import { BoqHeaderSubtotalText } from './BoqHeaderSubtotalText'
import { BoqHeaderSubtotalPrice } from './BoqHeaderSubtotalPrice'
import { BoqHeaderSubtotalCurrency } from './BoqHeaderSubtotalCurrency'

type TProps = {
  index: number
}

export const BoqHeaderSubtotal = ({ index }: TProps) => {
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
      <BoqHeaderSubtotalText index={index} />
      <div
        css={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'baseline',
          gap: 10,
          width: '100%'
        }}
      >
        <BoqHeaderSubtotalPrice index={index} />
        <BoqHeaderSubtotalCurrency index={index} />
      </div>
    </div>
  )
}
