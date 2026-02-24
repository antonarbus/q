import { useTiptap } from '@tiptap/react'
import { TbRowInsertTop } from 'react-icons/tb'
import { MenuButton } from './shared/MenuButton'

export const AddRowBeforeButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Add row above'
      onClick={() => {
        editor.chain().focus().addRowBefore().run()
      }}
    >
      <TbRowInsertTop />
    </MenuButton>
  )
}
