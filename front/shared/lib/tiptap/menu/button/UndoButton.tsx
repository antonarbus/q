import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiArrowGoBackLine } from 'react-icons/ri'

export const UndoButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Undo'
      onClick={() => {
        editor.chain().focus().undo().run()
      }}
    >
      <RiArrowGoBackLine size={16} />
    </MenuButton>
  )
}
