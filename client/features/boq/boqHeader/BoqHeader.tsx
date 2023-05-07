import { theme } from 'client/theme'
import { BoqHeaderTitle } from './BoqHeaderTitle'
import { TRefResizable } from 'client/types'
import { BoqHeaderSubtotal } from './BoqHeaderSubtotal'

type TProps = {
  index: number
  itemRef: TRefResizable
}

export const BoqHeader = ({ index, itemRef }: TProps) => {
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
        borderTopRightRadius: 6
      }}
    >
      <BoqHeaderTitle index={index} itemRef={itemRef} />
      <BoqHeaderSubtotal index={index} itemRef={itemRef} />
    </div>
  )
}
