import { useTiptap } from '@tiptap/react'
import { TbColumnInsertRight } from 'react-icons/tb'
import { MenuButton } from './shared/MenuButton'

export const AddColumnAfterButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Add column after'
      onClick={() => {
        editor.chain().focus().addColumnAfter().run()
      }}
    >
      <TbColumnInsertRight />
    </MenuButton>
  )
}
