import { theme } from 'client/theme'
import { BoqHeaderTitle } from './BoqHeaderTitle'

type Props = {
  index: number

}

export const BoqHeader = ({ index }: Props) => {
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
      <BoqHeaderTitle index={index} />
    </div>
  )
}
