import { Title } from './Title'
import { Subtotal } from './Subtotal'
import { theme } from 'client/app/theme'

interface Props {
  index: number
}

export const Header = ({ index }: Props): JSX.Element => {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: '10px',
        background: '#343434e6',
        padding: '10px 15px',
        color: theme.colors.greyFont,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      }}
    >
      <Title index={index} />
      <Subtotal index={index} />
    </div>
  )
}
