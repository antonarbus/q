import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiMarkPenLine } from 'react-icons/ri'

export const HighlightButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('highlight')
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Highlight'
      onClick={() => {
        editor.chain().focus().toggleHighlight({ color: '#f8d38d' }).run()
      }}
    >
      <RiMarkPenLine color='#f8d38d' />
    </MenuButton>
  )
}
