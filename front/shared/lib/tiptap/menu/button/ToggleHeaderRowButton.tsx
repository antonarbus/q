import { useTiptap } from '@tiptap/react'
import { TbTableRow } from 'react-icons/tb'
import { MenuButton } from './shared/MenuButton'

export const ToggleHeaderRowButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Toggle header row'
      onClick={() => {
        editor.chain().focus().toggleHeaderRow().run()
      }}
    >
      <TbTableRow />
    </MenuButton>
  )
}
