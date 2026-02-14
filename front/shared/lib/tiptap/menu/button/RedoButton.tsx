import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiArrowGoForwardLine } from 'react-icons/ri'

export const RedoButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Redo'
      onClick={() => {
        editor.chain().focus().redo().run()
      }}
    >
      <RiArrowGoForwardLine size={16} />
    </MenuButton>
  )
}
