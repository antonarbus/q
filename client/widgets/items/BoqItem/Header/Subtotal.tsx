
import { SubtotalText } from './SubtotalText'
import { Price } from './Price'
import { Currency } from './Currency'

interface Props {
  itemIndex: number
}

export const Subtotal = ({ itemIndex }: Props): JSX.Element => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        flexShrink: 0,
        minWidth: 100,
      }}
    >
      <SubtotalText itemIndex={itemIndex} />
      <div
        css={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'baseline',
          gap: 10,
          width: '100%',
        }}
      >
        <Price itemIndex={itemIndex} />
        <Currency itemIndex={itemIndex} />
      </div>
    </div>
  )
}
