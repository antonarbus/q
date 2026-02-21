import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { GoQuote } from 'react-icons/go'

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
      <GoQuote />
    </MenuButton>
  )
}
