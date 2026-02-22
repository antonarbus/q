import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiYoutubeLine } from 'react-icons/ri'

export const YouTubeButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='YouTube video'
      onClick={() => {
        const src = window.prompt('YouTube URL')

        if (src === null || src.trim() === '') {
          return
        }

        editor.commands.setYoutubeVideo({ src })
      }}
    >
      <RiYoutubeLine />
    </MenuButton>
  )
}
