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
        editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()
      }}
    >
      <RiMarkPenLine color='#fef08a' />
    </MenuButton>
  )
}
