import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiDoubleQuotesL } from 'react-icons/ri'

export const BlockquoteButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('blockquote')
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Blockquote'
      onClick={() => {
        editor.chain().focus().toggleBlockquote().run()
      }}
    >
      <RiDoubleQuotesL />
    </MenuButton>
  )
}
