import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiFontColor } from 'react-icons/ri'

export const RedColorButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('textStyle', { color: '#f05959' })
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Red'
      onClick={() => {
        editor.chain().focus().setColor('#f05959').run()
      }}
    >
      <RiFontColor color='#f05959' />
    </MenuButton>
  )
}
