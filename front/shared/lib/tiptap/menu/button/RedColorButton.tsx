import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiFontColor } from 'react-icons/ri'

export const RedColorButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('textStyle', { color: '#ef4444' })
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Red'
      onClick={() => {
        editor.chain().focus().setColor('#ef4444').run()
      }}
    >
      <RiFontColor color='#ef4444' />
    </MenuButton>
  )
}
