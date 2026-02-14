import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiListOrdered2 } from 'react-icons/ri'

export const OrderedListButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('orderedList')
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Ordered List'
      onClick={() => {
        editor.chain().focus().toggleOrderedList().run()
      }}
    >
      <RiListOrdered2 />
    </MenuButton>
  )
}
