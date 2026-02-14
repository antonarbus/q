import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiSubscript } from 'react-icons/ri'

export const SubscriptButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('subscript')
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Subscript'
      onClick={() => {
        editor.chain().focus().toggleSubscript().run()
      }}
    >
      <RiSubscript size={16} />
    </MenuButton>
  )
}
