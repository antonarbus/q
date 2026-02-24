import { useTiptap } from '@tiptap/react'
import { TbColumnRemove } from 'react-icons/tb'
import { MenuButton } from './shared/MenuButton'

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
      <TbColumnRemove />
    </MenuButton>
  )
}
