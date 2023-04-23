import { theme } from 'client/theme'
import { BoqHeaderTitle } from './BoqHeaderTitle'
import { RefResizableType } from 'client/types'
import { BoqHeaderSubtotal } from './BoqHeaderSubtotal'

type Props = {
  index: number
  itemRef: RefResizableType
}

export const BoqHeader = ({ index, itemRef }: Props) => {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: '10px 15px',
        background: '#343434e6',
        padding: 15,
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
