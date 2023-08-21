
import { SubtotalText } from './SubtotalText'
import { Price } from './Price'
import { Currency } from './Currency'

interface Props {
  index: number
}

export const Subtotal = ({ index }: Props): JSX.Element => {
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
      <SubtotalText index={index} />
      <div
        css={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'baseline',
          gap: 10,
          width: '100%',
        }}
      >
        <Price index={index} />
        <Currency index={index} />
      </div>
    </div>
  )
}
