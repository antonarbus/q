import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiUnderline } from 'react-icons/ri'

export const UnderlineButton = (): React.JSX.Element => {
  const { editor } = useTiptap()
  const isActive = useTiptapState((ctx) => ctx.editor.isActive('underline'))

  return (
    <MenuButton
      isActive={isActive}
      title='Underline'
      onClick={() => {
        editor.chain().focus().toggleUnderline().run()
      }}
    >
      <RiUnderline />
    </MenuButton>
  )
}
