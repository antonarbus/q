import { theme } from 'client/theme'
import { BoqHeaderTitle } from './BoqHeaderTitle'
import { Resizable } from 're-resizable'

type Props = {
  index: number
  itemRef: React.MutableRefObject<Resizable>

}

export const BoqHeader = ({ index, itemRef }: Props) => {
  return (
    <div
      css={{
        background: '#343434e6',
        padding: 15,
        color: theme.colors.greyFont,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
      }}
    >
      <BoqHeaderTitle index={index} itemRef={itemRef} />
    </div>
  )
}
