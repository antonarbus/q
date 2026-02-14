import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiItalic } from 'react-icons/ri'

export const ItalicButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('italic')
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Italic'
      onClick={() => {
        editor.chain().focus().toggleItalic().run()
      }}
    >
      <RiItalic size={16} />
    </MenuButton>
  )
}
