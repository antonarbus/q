import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { FcDeleteRow } from 'react-icons/fc'

export const DeleteRowButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Delete row'
      onClick={() => {
        editor.chain().focus().deleteRow().run()
      }}
    >
      <FcDeleteRow />
    </MenuButton>
  )
}
