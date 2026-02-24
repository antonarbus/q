import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { FcDeleteColumn } from 'react-icons/fc'

export const DeleteColumnButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Delete column'
      onClick={() => {
        editor.chain().focus().deleteColumn().run()
      }}
    >
      <FcDeleteColumn />
    </MenuButton>
  )
}
