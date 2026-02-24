import { useTiptap } from '@tiptap/react'
import { TbTableOff } from 'react-icons/tb'
import { MenuButton } from './shared/MenuButton'

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
      <TbTableOff />
    </MenuButton>
  )
}
