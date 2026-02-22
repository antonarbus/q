import { MenuButton } from './shared/MenuButton'
import { RiYoutubeLine } from 'react-icons/ri'

type Props = {
  onClick: () => void
}

export const YouTubeButton = (props: Props): React.JSX.Element => {
  return (
    <MenuButton
      isActive={false}
      title='YouTube video'
      onClick={props.onClick}
    >
      <RiYoutubeLine />
    </MenuButton>
  )
}
