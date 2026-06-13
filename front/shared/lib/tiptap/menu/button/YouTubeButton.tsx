import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiYoutubeLine } from 'react-icons/ri'
import { confirmWithDialog } from '@front/shared/component/confirmation-dialog/confirmWithDialog'

export const YouTubeButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='YouTube video'
      onClick={() =>
        void (async (): Promise<void> => {
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

          if (href.trim() === '') {
            return
          }

          editor.commands.setYoutubeVideo({ src: href })
        })()
      }
    >
      <RiYoutubeLine />
    </MenuButton>
  )
}
