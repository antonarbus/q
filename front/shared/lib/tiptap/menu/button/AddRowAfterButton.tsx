import { useTiptap } from '@tiptap/react'
import { TbRowInsertBottom } from 'react-icons/tb'
import { MenuButton } from './shared/MenuButton'

export const AddRowAfterButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Add row below'
      onClick={() => {
        editor.chain().focus().addRowAfter().run()
      }}
    >
      <TbRowInsertBottom />
    </MenuButton>
  )
}
