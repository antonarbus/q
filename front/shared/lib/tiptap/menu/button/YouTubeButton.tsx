import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiYoutubeLine } from 'react-icons/ri'
import { confirmWithDialog } from '@front/shared/component/ConfirmationDialog'

export const YouTubeButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='YouTube video'
      onClick={async () => {
        const href = await confirmWithDialog({
          title: 'YouTube URL',
          inputLabel: 'Url',
          description: '',
          confirmButtonText: 'Add',
          rejectButtonText: 'Cancel',
        })

        if (href === false) {
          return
        }

        if (href === null || href.trim() === '') {
          return
        }

        editor.commands.setYoutubeVideo({ src: href })
      }}
    >
      <RiYoutubeLine />
    </MenuButton>
  )
}
