import { useTiptap } from '@tiptap/react'
import { TbRowRemove } from 'react-icons/tb'
import { MenuButton } from './shared/MenuButton'

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
      <TbRowRemove />
    </MenuButton>
  )
}
