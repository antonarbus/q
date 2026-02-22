import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiCodeLine } from 'react-icons/ri'

export const CodeButton = (): React.JSX.Element => {
  const { editor } = useTiptap()
  const isActive = useTiptapState((ctx) => ctx.editor.isActive('code'))

  return (
    <MenuButton
      isActive={isActive}
      title='Inline code'
      onClick={() => {
        editor.chain().focus().toggleCode().run()
      }}
    >
      <RiCodeLine />
    </MenuButton>
  )
}
