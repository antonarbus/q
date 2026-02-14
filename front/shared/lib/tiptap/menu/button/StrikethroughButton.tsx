import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiStrikethrough } from 'react-icons/ri'

export const StrikethroughButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('strike')
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Strikethrough'
      onClick={() => {
        editor.chain().focus().toggleStrike().run()
      }}
    >
      <RiStrikethrough />
    </MenuButton>
  )
}
