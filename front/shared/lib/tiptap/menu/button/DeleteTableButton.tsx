import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { FcDeleteDatabase } from 'react-icons/fc'

export const DeleteTableButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Delete table'
      onClick={() => {
        editor.chain().focus().deleteTable().run()
      }}
    >
      <FcDeleteDatabase />
    </MenuButton>
  )
}
