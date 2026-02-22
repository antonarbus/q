import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { GoQuote } from 'react-icons/go'

export const QuoteButton = (): React.JSX.Element => {
  const { editor } = useTiptap()
  const isActive = useTiptapState((ctx) => ctx.editor.isActive('blockquote'))

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
