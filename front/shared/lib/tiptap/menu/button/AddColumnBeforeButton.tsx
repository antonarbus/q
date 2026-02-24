import { useTiptap } from '@tiptap/react'
import { TbColumnInsertLeft } from 'react-icons/tb'
import { MenuButton } from './shared/MenuButton'

export const AddColumnBeforeButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Add column before'
      onClick={() => {
        editor.chain().focus().addColumnBefore().run()
      }}
    >
      <TbColumnInsertLeft />
    </MenuButton>
  )
}
